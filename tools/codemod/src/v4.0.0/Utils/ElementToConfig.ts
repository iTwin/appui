/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ExpressionKind } from "ast-types/gen/kinds";
import { IdentifierKind, JSXElementKind, JSXExpressionContainerKind, JSXFragmentKind, JSXIdentifierKind, LiteralKind } from "ast-types/gen/kinds";
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, Expression } from "jscodeshift";
import { isAttrOrProp, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier } from "./TypeCheck";

export interface ElementAttribute extends Omit<JSXAttribute, "type" | "name" | "value"> {
  type: "ElementAttribute";
  name?: JSXIdentifierKind;
  value: Exclude<JSXAttribute["value"], null> | JSXSpreadAttribute["argument"];
}

export interface ConfigProperty extends Omit<ObjectProperty, "type" | "key" | "value"> {
  type: "ConfigProperty";
  name?: ObjectProperty["key"];
  value: ObjectProperty["value"] | SpreadProperty["argument"];
}

type NameType = ElementAttribute["name"] | ConfigProperty["name"];
type ValueType = ElementAttribute["value"] | ConfigProperty["value"];

export type AttributeHandle = (j: JSCodeshift, attr: ElementAttribute | ConfigProperty) => ConfigProperty;

export function buildConfigProperty(j: JSCodeshift, value: ValueType, name?: NameType): ConfigProperty {
  if (isSpreadExpression(name, value)) {
    const prop: Omit<ObjectProperty, "type"> = j.objectProperty(name, value);
    return {
      type: "ConfigProperty",
      name: prop.key,
      ...prop,
    };
  }

  const spreadProp: Omit<SpreadProperty, "type"> = j.spreadProperty(value);
  return {
    type: "ConfigProperty",
    value: spreadProp.argument,
    ...spreadProp,
  };
}

export function chain(first: AttributeHandle, second: AttributeHandle): AttributeHandle {
  return (j, attr) => {
    const prop = first(j, attr);
    return second(j, prop);
  };
}

export function rename(newName: string): AttributeHandle {
  return (j, attr) => {
    return buildConfigProperty(j, attr.value, j.identifier(newName));
  }
}

export const identity: AttributeHandle = (j, attr) => {
  return buildConfigProperty(j, attr.value, attr.name);
}

export const unwrapExpressionContainer: AttributeHandle = (j, attr) => {
  const expr = isJSXExpressionContainer(j, attr.value) ? attr.value.expression : attr.value;
  if (isJSXEmptyExpression(j, expr))
    throw new Error("Attribute cannot contain empty expression");
  return buildConfigProperty(j, expr, attr.name);
};


export const frontstageAttrHandles = new Map<string, AttributeHandle | undefined>([
  ["key", undefined],
  ["id", unwrapExpressionContainer],
  ["version", unwrapExpressionContainer],
  ["defaultTool", undefined],
  ["contentGroup", unwrapExpressionContainer],
  ["isInFooterMode", undefined],
  ["usage", unwrapExpressionContainer],
  ["applicationData", undefined],
  ["contentManipulationTools", chain(rename("contentManipulationTools"), unwrapExpressionContainer)],
  ["viewNavigationTools", chain(rename("viewNavigation"), unwrapExpressionContainer)],
  ["toolSettings", unwrapExpressionContainer],
  ["statusBar", unwrapExpressionContainer],
  ["leftPanel", unwrapExpressionContainer],
  ["topPanel", unwrapExpressionContainer],
  ["rightPanel", unwrapExpressionContainer],
  ["bottomPanel", unwrapExpressionContainer],
]);

export const widgetAttrHandles = new Map<string, AttributeHandle | undefined>([
  ["id", unwrapExpressionContainer],
  ["key", undefined],
  ["isFreeform", undefined],
  ["isToolSettings", undefined],
  ["isStatusBar", undefined],
  ["element", unwrapExpressionContainer],
  ["control", unwrapExpressionContainer],
]);

export const stagePanelAttrHandles = new Map<string, AttributeHandle | undefined>([
  ["size", unwrapExpressionContainer],
  ["pinned", unwrapExpressionContainer],
  ["defaultState", unwrapExpressionContainer],
]);

function isSpreadExpression(name: NameType | undefined, expr: any): expr is Exclude<JSXAttribute["value"], null> | ObjectProperty["value"] {
  return name ? true : false;
}

export function JSXtoElementAttribute(j: JSCodeshift, jsxAttr: JSXAttribute): ElementAttribute {

  let name: JSXIdentifierKind | undefined;
  if (isJSXIdentifier(j, jsxAttr.name)) {
    name = jsxAttr.name;
  }
  else {
    name = undefined;
  }
  if (jsxAttr.value === undefined || jsxAttr.value === null) {
    throw new Error("Attribute must hold value")
  }

  return {
    type: "ElementAttribute",
    name: name,
    value: jsxAttr.value!,
    ...(jsxAttr as Omit<JSXAttribute, "type" | "name">),
  }
}

export function ConfigToObjectProperty(j: JSCodeshift, prop: ConfigProperty): ObjectProperty | SpreadProperty {

  if (isSpreadExpression(prop.name, prop.value)) {
    return {
      type: "ObjectProperty",
      key: prop.name,
      ...(prop as Omit<ConfigProperty, "type" | "name">),
    }
  }

  return {
    type: "SpreadProperty",
    argument: prop.value,
    ...(prop as Omit<ConfigProperty, "type" | "name" | "value">),
  }
}