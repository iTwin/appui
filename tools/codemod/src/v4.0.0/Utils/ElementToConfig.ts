/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ExpressionKind } from "ast-types/gen/kinds";
import { IdentifierKind, JSXElementKind, JSXExpressionContainerKind, JSXFragmentKind, JSXIdentifierKind, LiteralKind } from "ast-types/gen/kinds";
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, Expression, JSXIdentifier, ObjectExpression } from "jscodeshift";
import { isAttrOrProp, isJSXAttribute, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier } from "./TypeCheck";

export interface ElementAttribute extends Omit<JSXAttribute, "type" | "name" | "value"> {
  type: "ElementAttribute";
  name?: JSXIdentifier;
  value: Exclude<JSXAttribute["value"], null> | JSXSpreadAttribute["argument"];
}

export interface ConfigProperty extends Omit<ObjectProperty, "type" | "key" | "value"> {
  type: "ConfigProperty";
  name?: Identifier; // TODO: check if this type will always be the case
  value: ObjectProperty["value"] | SpreadProperty["argument"];
}

type NameType = ElementAttribute["name"] | ConfigProperty["name"];
type ValueType = ElementAttribute["value"] | ConfigProperty["value"];

export type AttributeHandle = (j: JSCodeshift, attr: ElementAttribute | ConfigProperty) => ConfigProperty;
export type AttributeHandleMap = Map<string | undefined, AttributeHandle | null>;

export function buildConfigProperty(j: JSCodeshift, value: ValueType, name?: NameType): ConfigProperty {
  if (isSpreadExpression(name, value)) {
    const prop: Omit<ObjectProperty, "type"> = j.objectProperty(name, value);
    if (!isIdentifier(j, prop.key)) {
      // never
      throw new Error('Unexpected identifier type');
    }
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

export const extractExpression: AttributeHandle = (j, attr) => {
  const expr = isJSXExpressionContainer(j, attr.value) ? attr.value.expression : attr.value;
  if (isJSXEmptyExpression(j, expr)) {
    throw new Error("Attribute cannot contain empty expression");
  }
  return buildConfigProperty(j, expr, attr.name);
};


export const frontstageAttrHandles = new Map<string | undefined, AttributeHandle | null>([
  ["key", null],
  ["id", extractExpression],
  ["version", extractExpression],
  ["defaultTool", null],
  ["contentGroup", extractExpression],
  ["isInFooterMode", null],
  ["usage", extractExpression],
  ["applicationData", null],
  ["contentManipulationTools", chain(rename("contentManipulation"), extractExpression)],
  ["viewNavigationTools", chain(rename("viewNavigation"), extractExpression)],
  ["toolSettings", extractExpression],
  ["statusBar", extractExpression],
  ["leftPanel", extractExpression],
  ["topPanel", extractExpression],
  ["rightPanel", extractExpression],
  ["bottomPanel", extractExpression],
]);

export const zoneAttrHandles = new Map<string | undefined, AttributeHandle | null>([
  ["widgets", extractExpression],
]);

export const widgetAttrHandles = new Map<string | undefined, AttributeHandle | null>([
  ["id", extractExpression],
  ["key", null],
  ["isFreeform", null],
  ["isToolSettings", null],
  ["isStatusBar", null],
  ["element", extractExpression],
  ["control", extractExpression],
]);

export const stagePanelAttrHandles = new Map<string | undefined, AttributeHandle | null>([
  ["size", extractExpression],
  ["pinned", extractExpression],
  ["defaultState", extractExpression],
  [undefined, identity],
]);

function isSpreadExpression(name: NameType | undefined, expr: any): expr is Exclude<JSXAttribute["value"], null> | ObjectProperty["value"] {
  return name ? true : false;
}

function isIdentifier(j: JSCodeshift, path: any): path is Identifier {
  return j(path).isOfType(j.Identifier);
}

export function jsxToElementAttribute(j: JSCodeshift, jsxAttr: JSXAttribute | JSXSpreadAttribute): ElementAttribute {

  if (isJSXAttribute(j, jsxAttr)) {
    let name: JSXIdentifier | undefined;
    if (isJSXIdentifier(j, jsxAttr.name)) {
      name = jsxAttr.name;
    }
    else {
      throw new Error("Non spread attribute must have name");
    }
    if (jsxAttr.value === undefined) {
      throw new Error("Attribute must hold value")
    }

    return {
      type: "ElementAttribute",
      name: name,
      value: jsxAttr.value,
      ...(jsxAttr as Omit<JSXAttribute, "type" | "name">),
    }
  }

  return {
    type: "ElementAttribute",
    name: undefined,
    value: jsxAttr.argument,
    ...(jsxAttr as Omit<JSXSpreadAttribute, "type">),
  }
}

export function configToObjectProperty(j: JSCodeshift, prop: ConfigProperty): ObjectProperty | SpreadProperty {

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

export function configToObjectExpression(j: JSCodeshift, configProps: ConfigProperty[]): ObjectExpression {
  const props = configProps.map((configProp) => configToObjectProperty(j, configProp));
  return j.objectExpression(props);
}