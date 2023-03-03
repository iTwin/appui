/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ExpressionKind } from "ast-types/gen/kinds";
import { IdentifierKind, JSXElementKind, JSXExpressionContainerKind, JSXFragmentKind, JSXIdentifierKind, LiteralKind } from "ast-types/gen/kinds";
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, Expression } from "jscodeshift";
import { isAttrOrProp, isJSXEmptyExpression, isJSXExpressionContainer } from "./TypeCheck";

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
    if (isAttrOrProp(j, attr)) {
      return buildConfigProperty(j, attr.value, j.identifier(newName));
    }
    throw new Error('Cannot perform rename');
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

]);

function getName(j: JSCodeshift, attr: JSXAttribute | ConfigProperty): string {
  return (j(attr.name).get() as Identifier).name;
}

function isSpreadExpression(name: NameType | undefined, expr: any): expr is Exclude<JSXAttribute["value"], null> | ObjectProperty["value"] {
  return name ? true : false;
}