/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo, MemberExpression } from "jscodeshift";
import { removeProperty, renameProperty } from "../utils/objectProperty";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Determine Widget objects.
  const widgets = root.find(j.ObjectExpression).filter((path) => {
    const typeIdentifier = j(path).closest(j.VariableDeclarator).find(j.TSTypeReference).find(j.Identifier).paths()[0];
    if (typeIdentifier?.value.name === "Widget") {
      return true;
    }
    return false;
  });

  // `isFloatingStateSupported` renamed to `canFloat`. Type changed to union of `boolean` or `CanFloatWidgetOptions`:
  //  `isFloatingStateWindowResizable` can be configured via `canFloat.isResizable`
  //  `floatingContainerId` can be configured via `canFloat.containerId`
  //  `defaultFloatingPosition` can be configured via `canFloat.defaultPosition`
  //  `defaultFloatingSize` can be configured via `canFloat.defaultSize`
  //  `hideWithUiWhenFloating` can be configured via `canFloat.hideWithUi`

  widgets.find(j.ObjectProperty).forEach((path) => {
    if (
      removeProperty(j, path, "onWidgetStateChanged") ||
      removeProperty(j, path, "saveTransientState") ||
      removeProperty(j, path, "restoreTransientState") ||
      removeProperty(j, path, "internalData") ||
      removeProperty(j, path, "applicationData") ||
      renameProperty(j, path, "badgeType", "badge")
    )
      return;

    if (renameProperty(j, path, "getWidgetContent", "content")) {
      const functionExpression = j(path).find(j.ArrowFunctionExpression);
      const element = functionExpression.find(j.JSXElement).nodes()[0];
      if (!element)
        return;

      functionExpression.at(0).replaceWith(element);
      return;
    }

    if (renameProperty(j, path, "allowedPanelTargets", "allowedPanels")) {
      const arrayExpression = j(path).find(j.ArrayExpression);
      const newElements: MemberExpression[] = [];
      arrayExpression.find(j.Literal).forEach((literal) => {
        const value = literal.value.value;
        switch (value) {
          case "left":
          case "right":
          case "bottom":
          case "top": {
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            newElements.push(j.memberExpression(j.identifier("StagePanelLocation"), j.identifier(capitalized)));
            break;
          }
        }
      });
      arrayExpression.paths()[0].value.elements = newElements;
      // TODO: add `StagePanelLocation` to import declaration.
      return;
    }
  });

  return root.toSource();
}
