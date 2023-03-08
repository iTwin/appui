/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, ASTPath, Collection, FileInfo, JSCodeshift, MemberExpression, ObjectExpression, ObjectProperty } from "jscodeshift";
import { useObjectExpression } from "../utils/objectExpression";
import { isLiteral } from "../utils/typeGuards";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  useObjectExpression(j);

  const root = j(file.source);

  const objectToProperties = new Map<ASTPath<ObjectExpression>, ObjectProperty[]>();
  root.findObjectExpressions("Widget")
    .removeProperty("onWidgetStateChanged")
    .removeProperty("saveTransientState")
    .removeProperty("restoreTransientState")
    .removeProperty("internalData")
    .removeProperty("applicationData")
    .renameProperty("isFloatingStateSupported", "canFloat")
    .renameProperty("badgeType", "badge")
    .renameProperty("getWidgetContent", "content", (_path, property) => {
      const functionExpression = j(property).find(j.ArrowFunctionExpression);
      const element = functionExpression.find(j.JSXElement).nodes()[0];
      if (!element)
        return;

      functionExpression.at(0).replaceWith(element);
    })
    .renameProperty("allowedPanelTargets", "allowedPanels", (_path, property) => {
      const arrayExpression = j(property).find(j.ArrayExpression);
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
    })
    .removeProperty("isFloatingStateWindowResizable", handleCanFloatProperty(j, objectToProperties, "isResizable"))
    .removeProperty("floatingContainerId", handleCanFloatProperty(j, objectToProperties, "containerId"))
    .removeProperty("defaultFloatingPosition", handleCanFloatProperty(j, objectToProperties, "defaultPosition"))
    .removeProperty("defaultFloatingSize", handleCanFloatProperty(j, objectToProperties, "defaultSize"))
    .removeProperty("hideWithUiWhenFloating", handleCanFloatProperty(j, objectToProperties, "hideWithUi"));

  for (const [objectExpression, properties] of objectToProperties) {
    if (properties.length === 0)
      continue;
    const canFloat = objectExpression.value.properties.find((property) => {
      if (property.type === "ObjectProperty" && property.key.type === "Identifier" && property.key.name === "canFloat")
        return true;
      return false;
    }) as ObjectProperty | undefined;

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

function handleCanFloatProperty(j: JSCodeshift, objectToProperties: Map<ASTPath<ObjectExpression>, ObjectProperty[]>, canFloatProperty: string): Parameters<Collection["removeProperty"]>[1] {
  return (path, property) => {
    let objectProperties = objectToProperties.get(path);
    if (!objectProperties) {
      objectProperties = [];
      objectToProperties.set(path, objectProperties);
    }

    if (property.type === "ObjectProperty") {
      const newProperty = j.objectProperty(j.identifier(canFloatProperty), property.value);
      objectProperties.push(newProperty);
    }
  };
}
