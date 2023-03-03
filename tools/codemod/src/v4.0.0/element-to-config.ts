/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { ASTPath, ObjectExpression, API, FileInfo, JSCodeshift, ObjectProperty, JSXAttribute, JSXElement, SpreadProperty } from "jscodeshift";
import { isJsxAttribute } from "typescript";
import { AttributeHandle, ConfigProperty, ConfigToObjectProperty, frontstageAttrHandles, JSXtoElementAttribute } from "./Utils/ElementToConfig";
import { isArrayExpression, isJSXAttribute, isJSXElement, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier } from "./Utils/TypeCheck";

const frontstageAttrNames = {
  "key": "",
  "id": "id",
  "version": "version",
  "defaultTool": "",
  "contentGroup": "contentGroup",
  "isInFooterMode": "",
  "usage": "usage",
  "applicationData": "",
  "contentManipulationTools": "contentManipulation",
  "viewNavigationTools": "viewNavigation",
  "toolSettings": "toolSettings",
  "statusBar": "statusBar",
  "leftPanel": "leftPanel",
  "topPanel": "topPanel",
  "rightPanel": "rightPanel",
  "bottomPanel": "bottomPanel"
}

const widgetAttrNames = {
  "id": "id",
  "key": "",
  "isFreeform": "",
  "isToolSettings": "",
  "isStatusBar": "",
  "element": "element",
  "control": "control"
}

const stagePanelAttrNames = {
  "size": "size",
  "pinned": "pinned",
  "defaultState": "defaultState"
}

function transformStagePanel(j: JSCodeshift, stagePanel: ASTPath<JSXElement>): ObjectExpression {
  const properties: (ObjectProperty | SpreadProperty)[] = [];
  stagePanel.node.openingElement.attributes.forEach((attr) => {
    if (isJSXAttribute(j, attr)) {
      const name = getAttributeName(j, attr, stagePanelAttrNames);
      if (!name)
        return;

      const expression = getAttributeExpression(j, attr);
      const property = j.objectProperty(
        j.identifier(name),
        expression,
      );
      properties.push(property);
    }
    else {
      const property = j.spreadProperty(attr.argument);
      properties.push(property);
    }
  });
  return j.objectExpression(properties);
}

function transformWidget(j: JSCodeshift, widget: ASTPath<JSXElement>): ObjectExpression {
  const properties: ObjectProperty[] = [];
  widget.node.openingElement.attributes.forEach((attr) => {
    if (!isJSXAttribute(j, attr)) {
      throw new Error('Unsupported attribute');
    }

    const name = getAttributeName(j, attr, widgetAttrNames);
    if (!name)
      return;

    const expression = getAttributeExpression(j, attr);

    const property = j.objectProperty(
      j.identifier(name),
      expression,
    );
    properties.push(property);
  });
  return j.objectExpression(properties);
}

function transformZone(j: JSCodeshift, zone: ASTPath<JSXElement>): ObjectExpression {
  let obj: ObjectExpression | undefined;
  zone.node.openingElement.attributes.forEach((attr) => {
    if (!isJSXAttribute(j, attr) || attr.name.name !== "widgets") {
      throw new Error('Unsupported attribute');
    }

    const value = attr.value;
    if (isJSXExpressionContainer(j, value) && isArrayExpression(j, value.expression)) {
      const elements = value.expression.elements;
      if (elements.length > 1 || elements.length == 0) {
        throw new Error('Array contains invalid amount of elements');
      }
      const widget: ASTPath<JSXElement> = j(value.expression).findJSXElements("Widget").get();
      obj = transformWidget(j, widget);
    }
    else {
      throw new Error('Wrong expression type');
    }
  });
  if (!obj)
    throw new Error('Zone has no attributes');

  return obj;
}

function transformFrontstage(j: JSCodeshift, frontstage: ASTPath<JSXElement>): ObjectExpression {
  const properties: ObjectProperty[] = [];
  frontstage.node.openingElement.attributes.forEach((attr) => {
    if (!isJSXAttribute(j, attr))
      return;

    let name = getAttributeName(j, attr, frontstageAttrNames);
    if (!name)
      return;

    let expression = getAttributeExpression(j, attr);
    if (isJSXElement(j, expression) && isJSXIdentifier(j, expression.openingElement.name)) {
      const elementName = expression.openingElement.name.name;
      const element: ASTPath<JSXElement> = j(expression).get();
      if (elementName === "Zone") {
        expression = transformZone(j, element)
      }
      else if (elementName === "StagePanel") {
        expression = transformStagePanel(j, element)
      }
      else {
        throw new Error('Unsupported JSXElement');
      }
    }

    const property = j.objectProperty(
      j.identifier(name),
      expression,
    );
    properties.push(property);
  });
  return j.objectExpression(properties);
}

function handleJSXElement(j: JSCodeshift, element: ASTPath<JSXElement>, handles: Map<string, AttributeHandle | undefined>): ConfigProperty[] {
  const props: ConfigProperty[] = [];
  element.node.openingElement.attributes.forEach((attr) => {
    if (!isJSXAttribute(j, attr))
      return;

    const elAttr = JSXtoElementAttribute(j, attr);
    const attrHandle = handles.get(elAttr.name.name);
    if (attrHandle === undefined)
      return;
    const configProp = attrHandle(j, elAttr);
    props.push(configProp);
  });
  return props;
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const frontstages = root.findJSXElements("Frontstage");
  // frontstages.forEach((frontstage) => {
  //   const config = transformFrontstage(j, frontstage)
  //   frontstage.replace(config);
  // });

  frontstages.forEach((frontstage) => {
    const configProps = handleJSXElement(j, frontstage, frontstageAttrHandles);
    const props = configProps.map((configProp) => ConfigToObjectProperty(j, configProp));
    const obj = j.objectExpression(props);
    frontstage.replace(obj);
  });

  return root.toSource({ trailingComma: true });
}

function getAttributeExpression(j: JSCodeshift, attribute: JSXAttribute) {
  const value = attribute.value;
  if (isJSXExpressionContainer(j, value)) {
    if (!isJSXEmptyExpression(j, value.expression)) {
      return value.expression;
    }
    else {
      throw new Error('Empty expression not allowed');
    }
  }
  return value;
}

function getAttributeName(j: JSCodeshift, attribute: JSXAttribute, map): string | undefined {
  const name = isJSXIdentifier(j, attribute.name) ? map[attribute.name.name] : undefined;
  return name !== "" ? name : undefined;
}
