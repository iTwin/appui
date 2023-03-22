/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, ASTPath, Expression, FileInfo, JSCodeshift, JSXAttribute, JSXElement, Options } from "jscodeshift";
import { AttributeHandle, chain, configToObjectExpression, extractExpression, getJSXAttributeExpression, handleAsStagePanel, handleAsToolWidget, handleJSXElement, identity, rename, unknownAttributeWarning } from "../utils/jsxElementAttributeHandles";
import { isSpecifiedJSXAttribute, isSpecifiedJSXElement } from "../utils/TypeGuards";

export default function transformer(file: FileInfo, api: API, options: Options) {
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
      ["runtimeProps", chain(extractExpression, unknownAttributeWarning)],
      [undefined, identity],
    ]);

    // Remove same purpose attribute handler
    const contentManipulationTools = getJSXAttribute(j, frontstage, "contentManipulationTools");
    const topLeft = getJSXAttribute(j, frontstage, "topLeft");
    if (contentManipulationTools && topLeft)
      frontstageAttrHandles.set("topLeft", null);

    const viewNavigationTools = getJSXAttribute(j, frontstage, "viewNavigationTools");
    const topRight = getJSXAttribute(j, frontstage, "topRight");
    if (viewNavigationTools && topRight)
      frontstageAttrHandles.set("topRight", null);

    const toolSettings = getJSXAttribute(j, frontstage, "toolSettings");
    const topCenter = getJSXAttribute(j, frontstage, "topCenter");
    if (toolSettings && topCenter)
      frontstageAttrHandles.set("topCenter", null);

    const statusBar = getJSXAttribute(j, frontstage, "statusBar");
    const bottomCenter = getJSXAttribute(j, frontstage, "bottomCenter");
    if (statusBar && bottomCenter)
      frontstageAttrHandles.set("bottomCenter", null);

    // Extract relevant widget information for converting stage panels to it's config form
    const rightPanelStart = getPanelWidgets(j, frontstage, "centerRight");
    const rightPanelEnd = getPanelWidgets(j, frontstage, "bottomRight");
    let rightPanel = getJSXAttribute(j, frontstage, "rightPanel");
    if ((rightPanelStart || rightPanelEnd) && !rightPanel) {
      const openingElement = j.jsxOpeningElement(j.jsxIdentifier("StagePanel"));
      const jsxElement = j.jsxElement(openingElement);
      rightPanel = j.jsxAttribute(j.jsxIdentifier("rightPanel"), jsxElement)
      frontstage.node.openingElement.attributes?.push(rightPanel);
    }
    frontstageAttrHandles.set("rightPanel", chain(extractExpression, handleAsStagePanel(rightPanelStart, rightPanelEnd)));

    const leftPanelStart = getPanelWidgets(j, frontstage, "centerLeft");
    const leftPanelEnd = getPanelWidgets(j, frontstage, "bottomLeft");
    let leftPanel = getJSXAttribute(j, frontstage, "leftPanel");
    if ((leftPanelStart || leftPanelEnd) && !leftPanel) {
      const openingElement = j.jsxOpeningElement(j.jsxIdentifier("StagePanel"));
      const jsxElement = j.jsxElement(openingElement);
      leftPanel = j.jsxAttribute(j.jsxIdentifier("leftPanel"), jsxElement)
      frontstage.node.openingElement.attributes?.push(leftPanel);
    }
    frontstageAttrHandles.set("leftPanel", chain(extractExpression, handleAsStagePanel(leftPanelStart, leftPanelEnd)));

    const topPanelEnd = getPanelWidgets(j, frontstage, "topMostPanel");
    let topPanel = getJSXAttribute(j, frontstage, "topPanel");
    if (topPanelEnd && !topPanel) {
      const openingElement = j.jsxOpeningElement(j.jsxIdentifier("StagePanel"));
      const jsxElement = j.jsxElement(openingElement);
      topPanel = j.jsxAttribute(j.jsxIdentifier("topPanel"), jsxElement)
      frontstage.node.openingElement.attributes?.push(topPanel);
    }
    frontstageAttrHandles.set("topPanel", chain(extractExpression, handleAsStagePanel(undefined, topPanelEnd)));

    const bottomPanelEnd = getPanelWidgets(j, frontstage, "bottomMostPanel");
    let bottomPanel = getJSXAttribute(j, frontstage, "bottomPanel");
    if (bottomPanelEnd && !bottomPanel) {
      const openingElement = j.jsxOpeningElement(j.jsxIdentifier("StagePanel"));
      const jsxElement = j.jsxElement(openingElement);
      bottomPanel = j.jsxAttribute(j.jsxIdentifier("bottomPanel"), jsxElement)
      frontstage.node.openingElement.attributes?.push(bottomPanel);
    }
    frontstageAttrHandles.set("bottomPanel", chain(extractExpression, handleAsStagePanel(undefined, bottomPanelEnd)));

    // Construct frontstage config
    const configProps = handleJSXElement(j, frontstage, frontstageAttrHandles);
    const obj = configToObjectExpression(j, configProps);
    frontstage.replace(obj);
  });

  return root.toSource(options.printOptions);
}

function getJSXAttribute(j: JSCodeshift, element: ASTPath<JSXElement>, attrName: string) {
  return element.node.openingElement.attributes?.find((val) => isSpecifiedJSXAttribute(val, attrName)) as JSXAttribute | undefined;
}

function getPanelWidgets(j: JSCodeshift, frontstage: ASTPath<JSXElement>, attrName: string): Expression | undefined {
  const attr = getJSXAttribute(j, frontstage, attrName);
  const attrExpr = attr ? getJSXAttributeExpression(attr) : undefined;
  if (attrExpr && (isSpecifiedJSXElement(attrExpr, "Zone") || isSpecifiedJSXElement(attrExpr, "StagePanel"))) {
    const widgetsAttr = attrExpr.openingElement.attributes?.find((val) => isSpecifiedJSXAttribute(val, "widgets")) as JSXAttribute | undefined;
    if (widgetsAttr) {
      const expr = getJSXAttributeExpression(widgetsAttr);
      return expr ? expr : undefined;
    }
  }
  return undefined;
}
