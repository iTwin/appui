/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute } from "jscodeshift";
import { isAttrOrProp } from "./TypeCheck";

export interface ConfigProperty extends Omit<ObjectProperty, "type" | "key"> {
  type: "ConfigProperty";
  name: ObjectProperty["key"];
}

export interface ConfigSpreadProperty extends Omit<SpreadProperty, "type"> {
  type: "ConfigSpreadProperty";
}

export type AttributeHandle = (j: JSCodeshift, attr: JSXAttribute | JSXSpreadAttribute | ConfigProperty | ConfigSpreadProperty) => ConfigProperty | ConfigSpreadProperty;

export function buildProperty(j: JSCodeshift, name: ObjectProperty["key"], value: ObjectProperty["value"]): ConfigProperty {
  const prop: Omit<ObjectProperty, "type"> = j.objectProperty(name, value);
  return {
    type: "ConfigProperty",
    name: prop.key,
    ...prop,
  };
}

export function chain(first: AttributeHandle, second: AttributeHandle): AttributeHandle {
  return (j, attr) => {
    const prop = first(j, attr);
    return second(j, prop);
  };
}

//const skipAttribute: AttributeHandle = () => [{}, {}];

export function renameAttribute(newName: string): AttributeHandle {
  return (j, attr) => {
    if (isAttrOrProp(j, attr)) {
      return buildProperty(j, j.identifier(newName), attr.value);
    }
    throw new Error('Cannot perform rename');
  }
}

// const unwrapAttribute: AttributeHandle = (j, attr) => { return [{}, {}]; }

export const frontstageAttrHandles = new Map<string, AttributeHandle>();
