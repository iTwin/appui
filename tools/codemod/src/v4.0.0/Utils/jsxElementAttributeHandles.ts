/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, JSXIdentifier, ObjectExpression } from "jscodeshift";
import { isIdentifier, isJSXAttribute, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier } from "../../utils/typeGuards";
export interface ElementAttribute extends Omit<JSXAttribute, "type" | "name" | "value"> {
  type: "ElementAttribute";
  name?: JSXIdentifier;
  value: NonNullable<JSXAttribute["value"]> | JSXSpreadAttribute["argument"];
}

export interface ConfigProperty extends Omit<ObjectProperty, "type" | "key" | "value"> {
  type: "ConfigProperty";
  name?: Identifier;
  value: ObjectProperty["value"] | SpreadProperty["argument"];
}

type NameType = ElementAttribute["name"] | ConfigProperty["name"];
type ValueType = ElementAttribute["value"] | ConfigProperty["value"];

export type AttributeHandle = (j: JSCodeshift, attr: ElementAttribute | ConfigProperty) => ConfigProperty | undefined;
export type AttributeHandleMap = Map<string | undefined, AttributeHandle | null>;

export function buildConfigProperty(j: JSCodeshift, value: ValueType, name?: NameType): ConfigProperty | undefined {
  if (!isSpreadExpression(name, value)) {
    const prop: Omit<ObjectProperty, "type"> = j.objectProperty(name!, value);
    if (!isIdentifier(j, prop.key)) {
      console.warn('Unexpected identifier type');
      return undefined;
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

    let prop: ElementAttribute | ConfigProperty | undefined = attr;
    handles.forEach((handle) => {
      if (!prop)
        return undefined;
      prop = handle(j, prop);
    });
    if (!prop)
      return undefined;
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
    console.warn("Attribute cannot contain empty expression");
    return undefined;
  }
  return buildConfigProperty(j, expr, attr.name);
};

function isSpreadExpression(name: NameType | undefined, expr: any): expr is JSXSpreadAttribute["argument"] | SpreadProperty["argument"] {
  return name ? false : true;
}

export function jsxToElementAttribute(j: JSCodeshift, jsxAttr: JSXAttribute | JSXSpreadAttribute): ElementAttribute | undefined {
  if (isJSXAttribute(j, jsxAttr)) {
    if (!isJSXIdentifier(j, jsxAttr.name)) {
      console.warn("Non spread attribute must have name");
      return undefined;
    }

    if (jsxAttr.value === null) {
      console.warn("Attribute must hold value");
      return undefined;
    }

    return {
      type: "ElementAttribute",
      name: jsxAttr.name,
      value: jsxAttr.value!,
      ...(jsxAttr as Omit<JSXAttribute, "type" | "name" | "value">),
    };
  }

  return {
    type: "ElementAttribute",
    value: jsxAttr.argument,
    ...(jsxAttr as Omit<JSXSpreadAttribute, "type" | "argument">),
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