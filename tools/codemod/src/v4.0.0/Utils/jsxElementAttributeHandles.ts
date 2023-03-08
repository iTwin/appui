/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, JSXIdentifier, ObjectExpression, ArrayExpression, JSXElement, ASTPath } from "jscodeshift";
import { isArrayExpression, isIdentifier, isJSXAttribute, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier, isSpecifiedJSXElement } from "../../utils/typeGuards";
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

export function handleJSXElement(j: JSCodeshift, element: ASTPath<JSXElement>, handles: Map<string | undefined, AttributeHandle | null>): ConfigProperty[] {
  const props: ConfigProperty[] = [];
  element.node.openingElement.attributes!.forEach((attr) => {
    const elAttr = jsxToElementAttribute(j, attr);
    if (!elAttr)
      return; // Most likely something wrong on our end

    const key = elAttr.name ? elAttr.name.name : undefined;
    let attrHandle = handles.get(key);
    attrHandle = attrHandle !== undefined ? attrHandle : extractExpression;
    if (attrHandle === null)
      return;

    const configProp = attrHandle(j, elAttr);
    if (!configProp)
      return;
    props.push(configProp);
  });
  return props;
}

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

export function handleAsStagePanel(start?: ArrayExpression, end?: ArrayExpression): AttributeHandle {
  const stagePanelAttrHandles = new Map<string | undefined, AttributeHandle | null>([
    ["size", extractExpression],
    ["pinned", extractExpression],
    ["defaultState", extractExpression],
    [undefined, identity],
  ]);

  return (j, attr) => {
    const stagePanel = attr.value;
    if (!isSpecifiedJSXElement(j, stagePanel, "StagePanel")) {
      console.warn("Expression did not match expected shape");
      return undefined;
    }
    const stagePanelProps = handleJSXElement(j, j(stagePanel).get(), stagePanelAttrHandles);
    const newValue = configToObjectExpression(j, stagePanelProps);
    return buildConfigProperty(j, newValue, attr.name);
  };
}

export function handleAsToolWidget(): AttributeHandle {
  const zoneAttrHandles = new Map<string | undefined, AttributeHandle | null>([
    ["widgets", extractExpression],
  ]);
  const widgetAttrHandles = new Map<string | undefined, AttributeHandle | null>([
    ["id", extractExpression],
    ["key", null],
    ["isFreeform", null],
    ["isToolSettings", null],
    ["isStatusBar", null],
    ["element", extractExpression],
    ["control", extractExpression],
  ]);

  return (j, attr) => {
    const zone = attr.value;
    if (!isSpecifiedJSXElement(j, zone, "Zone")) {
      console.warn("Expression did not match expected shape");
      return undefined;
    }

    const zoneConfigProps = handleJSXElement(j, j(zone).get(), zoneAttrHandles);
    const widgets = zoneConfigProps.find((prop) => prop.name && prop.name.name === "widgets" ? true : false);
    if (!widgets || !isArrayExpression(j, widgets.value)) {
      console.warn("Expression did not match expected shape");
      return undefined;
    }

    if (widgets.value.elements.length === 0) {
      console.warn("Not implemented");
      return undefined;
    }

    const widget = widgets.value.elements[0];
    if (!isSpecifiedJSXElement(j, widget, "Widget")) {
      console.warn("Expression did not match expected shape");
      return undefined;
    }

    const widgetConfigProps = handleJSXElement(j, j(widget).get(), widgetAttrHandles);
    const newValue = configToObjectExpression(j, widgetConfigProps);
    return buildConfigProperty(j, newValue, attr.name);
  };
}