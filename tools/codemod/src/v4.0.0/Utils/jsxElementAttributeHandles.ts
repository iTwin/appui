/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { JSCodeshift, ObjectProperty, JSXAttribute, SpreadProperty, JSXSpreadAttribute, Identifier, JSXIdentifier, ObjectExpression, ArrayExpression, JSXElement, ASTPath, Expression, JSXExpressionContainer } from "jscodeshift";
import { isArrayExpression, isIdentifier, isJSXAttribute, isJSXEmptyExpression, isJSXExpressionContainer, isJSXIdentifier, isSpecifiedJSXAttribute, isSpecifiedJSXElement } from "../../utils/typeGuards";
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
  element.node.openingElement.attributes?.forEach((attr) => {
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
    for (let handle of handles) {
      if (!prop)
        return undefined;
      prop = handle(j, prop);
    }

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
      console.warn(`Attribute (${jsxAttr.name.name}) must hold value`);
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

export const unknownAttributeWarning: AttributeHandle = (j, attr) => {
  console.warn(`Attribute handle not implemented for ${attr.name?.name}`);
  return identity(j, attr);
}

const widgetDefaultAttrHandles = new Map<string | undefined, AttributeHandle | null>([
  ["id", extractExpression],
  ["key", null],
  ["iconSpec", chain(rename("icon"), extractExpression)],
  ["labelKey", extractExpression],
  ["tooltipKey", extractExpression],
  ["preferredPanelSize", extractExpression],
  ["icon", chain(extractExpression, unknownAttributeWarning)],
  ["classId", chain(extractExpression, unknownAttributeWarning)],
  ["label", chain(extractExpression, unknownAttributeWarning)],
  ["tooltip", chain(extractExpression, unknownAttributeWarning)],
  ["defaultState", extractExpression],
  ["fillZone", null],
  ["isFreeform", null],
  ["isToolSettings", null],
  ["isStatusBar", null],
  ["canPopout", extractExpression],
  ["mergeWithZone", null],
  ["applicationData", null],
  ["floatingContainerId", chain(extractExpression, unknownAttributeWarning)],
  ["isFloatingStateSupported", chain(rename("canFloat"), extractExpression)],
  ["isFloatingStateWindowResizable", chain(extractExpression, unknownAttributeWarning)],
  ["defaultFloatingPosition", chain(extractExpression, unknownAttributeWarning)],
  ["priority", extractExpression],
  ["syncEventIds", chain(extractExpression, unknownAttributeWarning)],
  ["stateFunc", chain(extractExpression, unknownAttributeWarning)],
  ["badgeType", chain(rename("badge"), extractExpression)],
  ["onWidgetStateChanged", chain(extractExpression, unknownAttributeWarning)],
  ["saveTransientState", chain(extractExpression, unknownAttributeWarning)],
  ["restoreTransientState", chain(extractExpression, unknownAttributeWarning)],
  ["defaultFloatingSize", chain(extractExpression, unknownAttributeWarning)],
  ["hideWithUiWhenFloating", chain(extractExpression, unknownAttributeWarning)],
  ["allowedPanelTargets", chain(extractExpression, unknownAttributeWarning)],
  ["providerId", chain(extractExpression, unknownAttributeWarning)],
  ["element", chain(rename("content"), extractExpression)],
  ["control", null],
]);

function pushExpression(j: JSCodeshift, elements: ArrayExpression["elements"], expression: Expression): void {
  if (isArrayExpression(j, expression))
    elements.push(...expression.elements);
  else
    elements.push(j.spreadElement(expression as any));
}

export function handleAsStagePanel(start?: Expression, end?: Expression): AttributeHandle {
  const stagePanelAttrHandles = new Map<string | undefined, AttributeHandle | null>([
    ["allowedZones", null],
    ["applicationData", null],
    ["header", chain(extractExpression, unknownAttributeWarning)], // What is this?
    ["resizable", extractExpression],
    ["maxSize", extractExpression],
    ["minSize", extractExpression],
    ["size", extractExpression],
    ["pinned", extractExpression],
    ["defaultState", extractExpression],
    ["widgets", null],
    ["panelZones", null],
    ["runtimeProps", chain(extractExpression, unknownAttributeWarning)],
    [undefined, identity],
  ]);

  return (j, attr) => {
    const stagePanel = attr.value;
    if (!isSpecifiedJSXElement(j, stagePanel, "StagePanel")) {
      console.warn("Expression did not match expected shape");
      return undefined;
    }

    const stagePanelProps = handleJSXElement(j, j(stagePanel).get(), stagePanelAttrHandles);
    const widgetsAttr = stagePanel.openingElement.attributes?.find((val) => isSpecifiedJSXAttribute(j, val, "widgets")) as JSXAttribute | undefined;
    let widgets: Expression | undefined = undefined;
    if (widgetsAttr) {
      const widgetElAttr = jsxToElementAttribute(j, widgetsAttr);
      if (widgetElAttr)
        widgets = extractExpression(j, widgetElAttr)?.value;
    }

    const panelZonesAttr = stagePanel.openingElement.attributes?.find((val) => isSpecifiedJSXAttribute(j, val, "panelZones")) as JSXAttribute | undefined;
    let panelZonesStart: Expression | undefined = undefined;
    let panelZonesMiddle: Expression | undefined = undefined;
    let panelZonesEnd: Expression | undefined = undefined;
    if (panelZonesAttr) {
      j(panelZonesAttr).find(j.ObjectProperty).forEach((prop) => {
        if (isIdentifier(j, prop.node.key)) {
          const name = prop.node.key.name;
          if (name === "start") {
            j(prop).find(j.ObjectProperty).forEach((innerProp) => {
              if (isIdentifier(j, innerProp.node.key) && innerProp.node.key.name === "widgets") {
                panelZonesStart = innerProp.node.value;
              }
            });
          }
          else if (name === "middle") {
            j(prop).find(j.ObjectProperty).forEach((innerProp) => {
              if (isIdentifier(j, innerProp.node.key) && innerProp.node.key.name === "widgets") {
                panelZonesMiddle = innerProp.node.value;
              }
            });
          }
          else if (name === "end") {
            j(prop).find(j.ObjectProperty).forEach((innerProp) => {
              if (isIdentifier(j, innerProp.node.key) && innerProp.node.key.name === "widgets") {
                panelZonesEnd = innerProp.node.value;
              }
            });
          }
        }
      });
    }


    if (widgets || panelZonesStart || panelZonesMiddle || panelZonesEnd || start || end) {
      const startWidgets = j.arrayExpression([]);
      const endWidgets = j.arrayExpression([]);
      if (widgets)
        pushExpression(j, startWidgets.elements, widgets);
      if (panelZonesStart)
        pushExpression(j, startWidgets.elements, panelZonesStart);
      if (panelZonesMiddle)
        pushExpression(j, endWidgets.elements, panelZonesMiddle);
      if (panelZonesEnd)
        pushExpression(j, endWidgets.elements, panelZonesEnd);
      if (start)
        pushExpression(j, startWidgets.elements, start);
      if (end)
        pushExpression(j, endWidgets.elements, end);

      startWidgets.elements.forEach((elem, index) => {
        if (isSpecifiedJSXElement(j, elem, "Widget")) {
          const elemConfigProps = handleJSXElement(j, j(elem).get(), widgetDefaultAttrHandles);
          startWidgets.elements[index] = configToObjectExpression(j, elemConfigProps);
        }
      });
      endWidgets.elements.forEach((elem, index) => {
        if (isSpecifiedJSXElement(j, elem, "Widget")) {
          const elemConfigProps = handleJSXElement(j, j(elem).get(), widgetDefaultAttrHandles);
          endWidgets.elements[index] = configToObjectExpression(j, elemConfigProps);
        }
      });

      const sectionsObjProps: ObjectProperty[] = [];
      if (startWidgets.elements.length !== 0)
        sectionsObjProps.push(j.objectProperty(j.identifier("start"), startWidgets));
      if (endWidgets.elements.length !== 0)
        sectionsObjProps.push(j.objectProperty(j.identifier("end"), endWidgets));

      if (sectionsObjProps.length !== 0) {
        const sectionsObj = j.objectExpression(sectionsObjProps);
        const sectionsProp = buildConfigProperty(j, sectionsObj, j.identifier("sections"));
        if (sectionsProp)
          stagePanelProps.push(sectionsProp);
      }
    }

    const newValue = configToObjectExpression(j, stagePanelProps);
    return buildConfigProperty(j, newValue, attr.name);
  };
}

export function handleAsWidget(): AttributeHandle {
  return (j, attr) => {
    const widget = attr.value;
    if (!isSpecifiedJSXElement(j, widget, "Widget")) {
      console.warn("Expression did not match expected shape");
      return undefined;
    }

    const widgetConfigProps = handleJSXElement(j, j(widget).get(), widgetDefaultAttrHandles);
    const newValue = configToObjectExpression(j, widgetConfigProps);
    return buildConfigProperty(j, newValue, attr.name);
  };
}

export function handleAsToolWidget(): AttributeHandle {
  const zoneAttrHandles = new Map<string | undefined, AttributeHandle | null>([
    ["widgets", extractExpression],
  ]);

  return (j, attr) => {
    const zone = attr.value;
    if (!isSpecifiedJSXElement(j, zone, "Zone")) {
      unsupportedExpressionWarning(zone.type, [j.JSXElement.toString()]);
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

    const widgetConfigProps = handleJSXElement(j, j(widget).get(), widgetDefaultAttrHandles);
    const newValue = configToObjectExpression(j, widgetConfigProps);
    return buildConfigProperty(j, newValue, attr.name);
  };
}

export function unsupportedExpressionWarning(received?: string, expected?: string[]) {
  let message = "Expression did not match expected types. "
  if (expected) {
    message += "\n\tExpected types: ";
    expected.forEach((type) => message += type);
  }
  if (received) {
    message += "\n\tReceived type: ";
    message += received;
  }
}

export function getJSXAttributeExpression(j: JSCodeshift, attr: JSXAttribute): JSXAttribute["value"] | JSXExpressionContainer["expression"] {
  return isJSXExpressionContainer(j, attr.value) ? attr.value.expression : attr.value;
}