/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, JSXIdentifier, ObjectExpression } from "jscodeshift";
import { isJSXAttribute, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier } from "./TypeCheck";

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
  if (!value) {
    throw new Error("Element must hold value");
  }
  if (!isSpreadExpression(name, value)) {
    const prop: Omit<ObjectProperty, "type"> = j.objectProperty(name!, value);
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

export function chain(...handles: AttributeHandle[]): AttributeHandle {
  return (j, attr) => {
    if (handles.length === 1)
      return identity(j, attr);

    let prop = attr;
    handles.forEach((handle) => {
      prop = handle(j, prop);
    });

    return prop as ConfigProperty;
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

function isSpreadExpression(name: NameType | undefined, expr: any): expr is JSXSpreadAttribute["argument"] | SpreadProperty["argument"] {
  return name ? false : true;
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
    if (jsxAttr.value === null) {
      throw new Error("Attribute must hold value");
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

  if (!isSpreadExpression(prop.name, prop.value)) {
    return {
      type: "ObjectProperty",
      key: prop.name!,
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