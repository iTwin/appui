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
  ["contentManipulationTools", chain(rename("contentManipulation"), extractExpression,)],
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
      if (!isSpecifiedJSXElement(j, zone, "Zone")) {
        console.warn("Expression did not match expected shape");
        return;
      }

      const zoneConfigProps = handleJSXElement(j, j(zone).get(), zoneAttrHandles);
      const widgets = zoneConfigProps.find((prop) => prop.name && prop.name.name === "widgets" ? true : false);
      if (!widgets || !isArrayExpression(j, widgets.value)) {
        console.warn("Expression did not match expected shape");
        return;
      }

      if (widgets.value.elements.length === 0) {
        console.warn("Not implemented");
        return;
      }

      const widget = widgets.value.elements[0];
      if (!isSpecifiedJSXElement(j, widget, "Widget")) {
        console.warn("Expression did not match expected shape");
        return;
      }

      const widgetConfigProps = handleJSXElement(j, j(widget).get(), widgetAttrHandles);
      prop.value = configToObjectExpression(j, widgetConfigProps); // replace
    });

    const stagePanelPropNames = new Set<string>(["leftPanel", "topPanel", "rightPanel", "bottomPanel"]);
    configProps.forEach((prop) => {
      if (!prop.name || !stagePanelPropNames.has(prop.name.name))
        return;

      const stagePanel = prop.value;
      if (!isSpecifiedJSXElement(j, stagePanel, "StagePanel")) {
        console.warn("Expression did not match expected shape");
        return;
      }

      const stagePanelProps = handleJSXElement(j, j(stagePanel).get(), stagePanelAttrHandles);
      prop.value = configToObjectExpression(j, stagePanelProps); // replace
    });

    const obj = configToObjectExpression(j, configProps);
    frontstage.replace(obj);
  });

  return root.toSource({ trailingComma: true });
}
