/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { ASTPath, API, FileInfo, JSCodeshift, JSXElement } from "jscodeshift";
import { isSpecifiedJSXElement, isArrayExpression } from "../utils/typeGuards";
import { AttributeHandle, chain, ConfigProperty, configToObjectExpression, extractExpression, identity, jsxToElementAttribute, rename } from "./Utils/jsxElementAttributeHandles";

const frontstageAttrHandles = new Map<string | undefined, AttributeHandle | null>([
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

const stagePanelAttrHandles = new Map<string | undefined, AttributeHandle | null>([
  ["size", extractExpression],
  ["pinned", extractExpression],
  ["defaultState", extractExpression],
  [undefined, identity],
]);

function handleJSXElement(j: JSCodeshift, element: ASTPath<JSXElement>, handles: Map<string | undefined, AttributeHandle | null>): ConfigProperty[] {
  const props: ConfigProperty[] = [];
  element.node.openingElement.attributes!.forEach((attr) => {
    const elAttr = jsxToElementAttribute(j, attr);
    const key = elAttr.name ? elAttr.name.name : undefined;
    const attrHandle = handles.get(key);
    if (attrHandle === null)
      return;
    if (attrHandle === undefined)
      throw new Error("Handle was not found");
    const configProp = attrHandle(j, elAttr);
    props.push(configProp);
  });
  return props;
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const frontstages = root.findJSXElements("Frontstage");
  frontstages.forEach((frontstage) => {
    const configProps = handleJSXElement(j, frontstage, frontstageAttrHandles);

    const zonePropNames = new Set<string>(["contentManipulation", "viewNavigation", "toolSettings", "statusBar"]);
    configProps.forEach((prop) => {
      if (!prop.name || !zonePropNames.has(prop.name.name))
        return;

      const zone = prop.value;
      if (!isSpecifiedJSXElement(j, zone, "Zone"))
        throw new Error("Expression did not match expected shape");

      const zoneConfigProps = handleJSXElement(j, j(zone).get(), zoneAttrHandles);
      const widgets = zoneConfigProps.find((prop) => prop.name && prop.name.name === "widgets" ? true : false);
      if (!widgets || !isArrayExpression(j, widgets.value))
        throw new Error("Expression did not match expected shape");

      if (widgets.value.elements.length === 0)
        throw new Error("Not implemented");

      const widget = widgets.value.elements[0];
      if (!isSpecifiedJSXElement(j, widget, "Widget"))
        throw new Error("Expression did not match expected shape");

      const widgetConfigProps = handleJSXElement(j, j(widget).get(), widgetAttrHandles);
      prop.value = configToObjectExpression(j, widgetConfigProps); // replace
    });

    const stagePanelPropNames = new Set<string>(["leftPanel", "topPanel", "rightPanel", "bottomPanel"]);
    configProps.forEach((prop) => {
      if (!prop.name || !stagePanelPropNames.has(prop.name.name))
        return;

      const stagePanel = prop.value;
      if (!isSpecifiedJSXElement(j, stagePanel, "StagePanel"))
        throw new Error("Expression did not match expected shape");

      const stagePanelProps = handleJSXElement(j, j(stagePanel).get(), stagePanelAttrHandles);
      prop.value = configToObjectExpression(j, stagePanelProps); // replace
    });

    const obj = configToObjectExpression(j, configProps);
    frontstage.replace(obj);
  });

  return root.toSource({ trailingComma: true });
}
