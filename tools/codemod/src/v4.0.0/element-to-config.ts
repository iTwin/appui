/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { ASTPath, API, FileInfo, JSCodeshift, JSXElement } from "jscodeshift";
import { AttributeHandle, ConfigProperty, configToObjectExpression, frontstageAttrHandles, jsxToElementAttribute, widgetAttrHandles, zoneAttrHandles } from "./Utils/ElementToConfig";
import { isArrayExpression, isSpecifiedJSXElement } from "./Utils/TypeCheck";

function handleJSXElement(j: JSCodeshift, element: ASTPath<JSXElement>, handles: Map<string | undefined, AttributeHandle | null>): ConfigProperty[] {
  const props: ConfigProperty[] = [];
  element.node.openingElement.attributes.forEach((attr) => {
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

  // const widgets = root.findJSXElements("Widget");
  // widgets.forEach((widget) => {
  //   const configProps = handleJSXElement(j, widget, widgetAttrHandles);
  //   const props = configProps.map((configProp) => ConfigToObjectProperty(j, configProp));
  //   const obj = j.objectExpression(props);
  //   widget.replace(obj);
  // });

  // const stagePanels = root.findJSXElements("StagePanel");
  // stagePanels.forEach((stagePanel) => {
  //   const configProps = handleJSXElement(j, stagePanel, stagePanelAttrHandles);
  //   const props = configProps.map((configProp) => ConfigToObjectProperty(j, configProp));
  //   const obj = j.objectExpression(props);
  //   stagePanel.replace(obj);
  // });

  const frontstages = root.findJSXElements("Frontstage");
  frontstages.forEach((frontstage) => {
    const configProps = handleJSXElement(j, frontstage, frontstageAttrHandles);

    // -----------------------------------------------------------------------------------------------
    const contentManipulation = configProps.find((prop) => prop.name?.name === "contentManipulation" || prop.name?.name === "viewNavigation");
    if (!contentManipulation)
      throw new Error("Couldn't find contentManipulation");

    const zone = contentManipulation.value;
    if (!isSpecifiedJSXElement(j, zone, "Zone"))
      throw new Error("Expression did not match expected shape");

    const zoneConfigProps = handleJSXElement(j, j(zone).get(), zoneAttrHandles);
    const widgets = zoneConfigProps.find((prop) => prop.name.name === "widgets" ? true : false);
    if (!widgets || !isArrayExpression(j, widgets.value))
      throw new Error("Expression did not match expected shape");

    if (widgets.value.elements.length === 0)
      throw new Error("Not implemented");

    const widget = widgets.value.elements[0];
    if (!isSpecifiedJSXElement(j, widget, "Widget"))
      throw new Error("Couldn't find contentManipulation");

    const widgetConfigProps = handleJSXElement(j, j(widget).get(), widgetAttrHandles);
    contentManipulation.value = configToObjectExpression(j, widgetConfigProps); // replace
    // -----------------------------------------------------------------------------------------------


    const obj = configToObjectExpression(j, configProps);
    frontstage.replace(obj);
  });



  return root.toSource({ trailingComma: true });
}
