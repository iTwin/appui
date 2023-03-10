/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { API, ArrayExpression, ASTPath, FileInfo, JSCodeshift, JSXAttribute, JSXElement } from "jscodeshift";
import { isArrayExpression, isJSXAttribute, isSpecifiedJSXAttribute, isSpecifiedJSXElement } from "../utils/typeGuards";
import { AttributeHandle, chain, configToObjectExpression, extractExpression, getJSXAttributeExpression, handleAsStagePanel, handleAsToolWidget, handleJSXElement, rename } from "./Utils/jsxElementAttributeHandles";


export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const frontstages = root.findJSXElements("Frontstage");
  frontstages.forEach((frontstage) => {
    const frontstageAttrHandles = new Map<string | undefined, AttributeHandle | null>([
      ["key", null],
      ["id", extractExpression],
      ["version", extractExpression],
      ["defaultTool", null],
      ["defaultContentId", null],
      ["applicationData", null],
      ["isImodelIndependent", null],
      ["topLeft", chain(rename("contentManipulation"), extractExpression, handleAsToolWidget())],
      ["topCenter", chain(rename("toolSettings"), extractExpression, handleAsToolWidget())],
      ["topRight", chain(rename("viewNavigation"), extractExpression, handleAsToolWidget())],
      ["bottomCenter", chain(rename("statusBar"), extractExpression, handleAsToolWidget())],
      ["contentGroup", extractExpression],
      ["isInFooterMode", null],
      ["usage", extractExpression],
      ["applicationData", null],
      ["contentManipulationTools", chain(rename("contentManipulation"), extractExpression, handleAsToolWidget())],
      ["viewNavigationTools", chain(rename("viewNavigation"), extractExpression, handleAsToolWidget())],
      ["toolSettings", chain(extractExpression, handleAsToolWidget())],
      ["statusBar", chain(extractExpression, handleAsToolWidget())],
      ["centerRight", null],
      ["bottomRight", null],
      ["centerLeft", null],
      ["bottomLeft", null],
      ["topMostPanel", null],
      ["bottomMostPanel", null],
    ]);

    // TODO: Check if zone and tool attributes do not overlap

    const rightPanelStart = getPanelWidgets(j, frontstage, "centerRight");
    const rightPanelEnd = getPanelWidgets(j, frontstage, "bottomRight");
    frontstageAttrHandles.set("rightPanel", chain(extractExpression, handleAsStagePanel(rightPanelStart, rightPanelEnd)));

    const leftPanelStart = getPanelWidgets(j, frontstage, "centerLeft");
    const leftPanelEnd = getPanelWidgets(j, frontstage, "bottomLeft");
    frontstageAttrHandles.set("leftPanel", chain(extractExpression, handleAsStagePanel(leftPanelStart, leftPanelEnd)));

    const topPanelEnd = getPanelWidgets(j, frontstage, "topMostPanel");
    frontstageAttrHandles.set("topPanel", chain(extractExpression, handleAsStagePanel(undefined, topPanelEnd)));

    const bottomPanelEnd = getPanelWidgets(j, frontstage, "bottomMostPanel");
    frontstageAttrHandles.set("bottomPanel", chain(extractExpression, handleAsStagePanel(undefined, bottomPanelEnd)));

    const configProps = handleJSXElement(j, frontstage, frontstageAttrHandles);

    const obj = configToObjectExpression(j, configProps);
    frontstage.replace(obj);
  });

  return root.toSource({ trailingComma: true });
}

function getPanelWidgets(j: JSCodeshift, frontstage: ASTPath<JSXElement>, attrName: string) {
  const attr = frontstage.node.openingElement.attributes?.find((val) => isSpecifiedJSXAttribute(j, val, attrName)) as JSXAttribute | undefined;
  const attrExpr = attr ? getJSXAttributeExpression(j, attr) : undefined;
  if (attrExpr && (isSpecifiedJSXElement(j, attrExpr, "Zone") || isSpecifiedJSXElement(j, attrExpr, "StagePanel"))) {
    const widgetsAttr = attrExpr.openingElement.attributes?.find((val) => isSpecifiedJSXAttribute(j, val, "widgets")) as JSXAttribute | undefined;
    const widgetsExpr = widgetsAttr ? getJSXAttributeExpression(j, widgetsAttr) : undefined;
    if (widgetsExpr && isArrayExpression(j, widgetsExpr)) {
      return widgetsExpr;
    }
  }
  return undefined;
}