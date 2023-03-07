/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, ASTPath, FileInfo, JSCodeshift, MemberExpression, ObjectExpression, ObjectProperty } from "jscodeshift";
import { findObjects } from "../utils/objectExpression";
import { isProperty, removeProperty, renameProperty } from "../utils/objectProperty";
import { isLiteral } from "../utils/typeGuards";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const widgets = findObjects(j, root, "Widget");

  const objectToProperties = new Map<ASTPath<ObjectExpression>, ObjectProperty[]>();
  widgets.find(j.ObjectProperty).forEach((path) => {
    if (
      removeProperty(j, path, "onWidgetStateChanged") ||
      removeProperty(j, path, "saveTransientState") ||
      removeProperty(j, path, "restoreTransientState") ||
      removeProperty(j, path, "internalData") ||
      removeProperty(j, path, "applicationData") ||
      renameProperty(j, path, "isFloatingStateSupported", "canFloat") ||
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

    const canFloatProperty = getCanFloatProperty(j, path);
    if (canFloatProperty) {
      const objectExpression = j(path).closest(j.ObjectExpression).paths()[0];
      if (!objectExpression)
        return;

      let objectProperties = objectToProperties.get(objectExpression);
      if (!objectProperties) {
        objectProperties = [];
        objectToProperties.set(objectExpression, objectProperties);
      }

      const newProperty = j.objectProperty(j.identifier(canFloatProperty), path.value.value);
      objectProperties.push(newProperty);
      path.replace();
      return;
    }
  });

  for (const [objectExpression, properties] of objectToProperties) {
    if (properties.length === 0)
      continue;
    let canFloat = j(objectExpression).find(j.ObjectProperty).filter((path) => {
      return isProperty(j, path, "canFloat");
    }).nodes()[0];
    if (!canFloat) {
      const newCanFloat = j.objectProperty(j.identifier("canFloat"), j.objectExpression(properties));
      objectExpression.value.properties.push(newCanFloat);
      continue;
    }

    if (isLiteral(j, canFloat.value) && canFloat.value.value === false)
      continue;
    canFloat.value = j.objectExpression(properties);
  }

  return root.toSource();
}

function getCanFloatProperty(j: JSCodeshift, path: ASTPath<ObjectProperty>) {
  if (isProperty(j, path, "isFloatingStateWindowResizable")) {
    return "isResizable";
  }
  if (isProperty(j, path, "floatingContainerId")) {
    return "containerId";
  }
  if (isProperty(j, path, "defaultFloatingPosition")) {
    return "defaultPosition";
  }
  if (isProperty(j, path, "defaultFloatingSize")) {
    return "defaultSize";
  }
  if (isProperty(j, path, "hideWithUiWhenFloating")) {
    return "hideWithUi";
  }
}
