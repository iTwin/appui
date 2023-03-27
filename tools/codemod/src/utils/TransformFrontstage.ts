import { JSCodeshift, ASTPath, JSXElement, ObjectProperty, SpreadProperty } from "jscodeshift";
import { handleConditionalExpression, takeFirstArrayExpressionElement } from "./ExpressionHandles";
import { appendStagePanelSection, getStagePanelSectionProperty } from "./TransformStagePanel";
import { ConfigExpression, jsxElementToUniFormat, buildProperty, ExpressionKind, isSpecifiedConfigExpression, createEmptyConfig, isExpressionKind } from "./TransformUtils";
import { transformZone } from "./TransformZone";
import { isSpecifiedJSXElement } from "./typeGuards";

export function transformFrontstage(j: JSCodeshift, frontstage: ASTPath<JSXElement>): ConfigExpression { // TODO: registerMethod
  const uni = jsxElementToUniFormat(j, frontstage);
  const { name: configName, attrMap, spreadAttr } = uni;

  const frontstageProps: (ObjectProperty | SpreadProperty)[] = [];

  // Add ---------------------------
  // id <- id / key
  // contentGroup <- contentGroup
  // usage <- usage
  // version <- version
  // contentManipulation <- topLeft / contentManipulationTools
  // toolSettings <- topCenter / toolSettings
  // viewNavigation <- topRight / viewNavigationTools
  // statusBar <- bottomCenter / statusBar
  // topPanel <- topPanel, topMostPanel
  // leftPanel <- centerLeft, bottomLeft, leftPanel
  // rightPanel <- centerRight, bottomRight, rightPanel
  // bottomPanel <- bottomPanel, bottomMostPanel
  // style <- style
  // itemId <- itemId
  // className <- className

  // Ignore ------------------------
  // applicationData
  // defaultTool
  // defaultContentId
  // isInFooterMode
  // isIModelIndependent
  // runtimeProps

  const handledExpressions = new Set(["key", "applicationData", "defaultTool", "defaultContentId", "isInFooterMode", "isIModelIndependent", "runtimeProps"]);

  const idExpr = attrMap.getAttributeExpression("id") ?? attrMap.getAttributeExpression("key");
  if (idExpr) {
    const id = buildProperty(j, "id", idExpr);
    frontstageProps.push(id);
    handledExpressions.add("id");
  }
  else {
    // TODO: Handle missing mandatory property
  }

  const contentGroupExpr = attrMap.getAttributeExpression("contentGroup");
  if (contentGroupExpr) {
    const contentGroup = buildProperty(j, "contentGroup", contentGroupExpr);
    frontstageProps.push(contentGroup);
    handledExpressions.add("contentGroup");
  }
  else {
    // TODO: Handle missing mandatory property
  }

  const usageExpr = attrMap.getAttributeExpression("usage");
  if (usageExpr) {
    const usage = buildProperty(j, "usage", usageExpr);
    frontstageProps.push(usage);
    handledExpressions.add("usage");
  }

  const versionExpr = attrMap.getAttributeExpression("version");
  if (versionExpr) {
    const version = buildProperty(j, "version", versionExpr);
    frontstageProps.push(version);
    handledExpressions.add("version");
  }
  else {
    // TODO: Handle missing mandatory property
  }

  const contentManipulationExpr = attrMap.getAttributeExpression("contentManipulationTools") ?? attrMap.getAttributeExpression("topLeft");
  if (contentManipulationExpr) {
    const modifiedContentManipulationExpr = handleToolWidget(j, contentManipulationExpr);
    const contentManipulation = buildProperty(j, "contentManipulation", modifiedContentManipulationExpr);
    frontstageProps.push(contentManipulation);
    handledExpressions.add("contentManipulationTools");
    handledExpressions.add("topLeft");
  }

  const toolSettingsExpr = attrMap.getAttributeExpression("toolSettings") ?? attrMap.getAttributeExpression("topCenter");
  if (toolSettingsExpr) {
    const modifiedToolSettingsExpr = handleToolWidget(j, toolSettingsExpr);
    const toolSettings = buildProperty(j, "toolSettings", modifiedToolSettingsExpr);
    frontstageProps.push(toolSettings);
    handledExpressions.add("toolSettings");
    handledExpressions.add("topCenter");
  }

  const viewNavigationExpr = attrMap.getAttributeExpression("viewNavigationTools") ?? attrMap.getAttributeExpression("topRight");
  if (viewNavigationExpr) {
    const modifiedViewNavigationExpr = handleToolWidget(j, viewNavigationExpr);
    const viewNavigation = buildProperty(j, "viewNavigation", modifiedViewNavigationExpr);
    frontstageProps.push(viewNavigation);
    handledExpressions.add("viewNavigationTools");
    handledExpressions.add("topRight");
  }

  const statusBarExpr = attrMap.getAttributeExpression("statusBar") ?? attrMap.getAttributeExpression("bottomCenter");
  if (statusBarExpr) {
    const modifiedStatusBarExpr = handleToolWidget(j, statusBarExpr);
    const statusBar = buildProperty(j, "statusBar", modifiedStatusBarExpr);
    frontstageProps.push(statusBar);
    handledExpressions.add("statusBar");
    handledExpressions.add("bottomCenter");
  }

  let topPanelExpr = attrMap.getAttributeExpression("topPanel");
  let topPanelEnd = attrMap.getAttributeExpression("topMostPanel");
  if (topPanelExpr || topPanelEnd) {
    if (topPanelExpr) {
      topPanelExpr = handleSideStagePanel(j, topPanelExpr);
      if (topPanelExpr)
        handledExpressions.add("topPanel");
    }
    else {
      topPanelExpr = createEmptyConfig(j, j.jsxIdentifier("StagePanel"));
    }
    if (topPanelExpr && topPanelEnd) {
      topPanelEnd = handleSideStagePanel(j, topPanelEnd);
      if (topPanelEnd && isSpecifiedConfigExpression(topPanelEnd, "StagePanel")) {
        handledExpressions.add("topMostPanel");
        const start = getStagePanelSectionProperty(j, topPanelEnd, "start")?.value;
        const end = getStagePanelSectionProperty(j, topPanelEnd, "end")?.value;
        let successfulAppend: boolean = true;
        if (start && isExpressionKind(start) && isSpecifiedConfigExpression(topPanelExpr, "StagePanel"))
          successfulAppend = appendStagePanelSection(j, topPanelExpr, "end", start) && successfulAppend ? true : false;
        if (end && isExpressionKind(end) && isSpecifiedConfigExpression(topPanelExpr, "StagePanel"))
          successfulAppend = appendStagePanelSection(j, topPanelExpr, "end", end) && successfulAppend ? true : false;
        if ((start || end) && successfulAppend)
          handledExpressions.add("topMostPanel");
      }
    }
    if (topPanelExpr) {
      const topPanel = buildProperty(j, "topPanel", topPanelExpr);
      frontstageProps.push(topPanel);
    }
  }

  let leftPanelExpr = attrMap.getAttributeExpression("leftPanel");
  let leftPanelStart = attrMap.getAttributeExpression("centerLeft");
  let leftPanelEnd = attrMap.getAttributeExpression("bottomLeft");
  if (leftPanelExpr || leftPanelStart || leftPanelEnd) {
    if (leftPanelExpr) {
      leftPanelExpr = handleSideStagePanel(j, leftPanelExpr);
      if (leftPanelExpr)
        handledExpressions.add("leftPanel");
    }
    else {
      leftPanelExpr = createEmptyConfig(j, j.jsxIdentifier("StagePanel"));
    }
    leftPanelStart = leftPanelStart ? handleSideStagePanelZone(j, leftPanelStart) : undefined;
    let successfulAppend: boolean = true;
    if (leftPanelExpr && leftPanelStart)
      successfulAppend = appendStagePanelSection(j, leftPanelExpr as ConfigExpression, "start", leftPanelStart) && successfulAppend ? true : false;
    if (leftPanelExpr && successfulAppend)
      handledExpressions.add("centerLeft");
    successfulAppend = true;
    leftPanelEnd = leftPanelEnd ? handleSideStagePanelZone(j, leftPanelEnd) : undefined;
    if (leftPanelExpr && leftPanelEnd)
      successfulAppend = appendStagePanelSection(j, leftPanelExpr as ConfigExpression, "end", leftPanelEnd) && successfulAppend ? true : false;
    if (leftPanelExpr && successfulAppend)
      handledExpressions.add("bottomLeft");
    if (leftPanelExpr) {
      const leftPanel = buildProperty(j, "leftPanel", leftPanelExpr);
      frontstageProps.push(leftPanel);
    }
  }

  let rightPanelExpr = attrMap.getAttributeExpression("rightPanel");
  let rightPanelStart = attrMap.getAttributeExpression("centerRight");
  let rightPanelEnd = attrMap.getAttributeExpression("bottomRight");
  if (rightPanelExpr || rightPanelStart || rightPanelEnd) {
    if (rightPanelExpr) {
      rightPanelExpr = handleSideStagePanel(j, rightPanelExpr);
      if (rightPanelExpr)
        handledExpressions.add("rightPanel");
    }
    else {
      rightPanelExpr = createEmptyConfig(j, j.jsxIdentifier("StagePanel"));
    }
    rightPanelStart = rightPanelStart ? handleSideStagePanelZone(j, rightPanelStart) : undefined;
    let successfulAppend: boolean = true;
    if (rightPanelExpr && rightPanelStart)
      successfulAppend = appendStagePanelSection(j, rightPanelExpr as ConfigExpression, "start", rightPanelStart) && successfulAppend ? true : false;
    if (rightPanelExpr && successfulAppend)
      handledExpressions.add("centerRight");
    successfulAppend = true;
    rightPanelEnd = rightPanelEnd ? handleSideStagePanelZone(j, rightPanelEnd) : undefined;
    if (rightPanelExpr && rightPanelEnd)
      successfulAppend = appendStagePanelSection(j, rightPanelExpr as ConfigExpression, "end", rightPanelEnd) && successfulAppend ? true : false;
    if (rightPanelExpr && successfulAppend)
      handledExpressions.add("bottomRight");
    if (rightPanelExpr) {
      const rightPanel = buildProperty(j, "rightPanel", rightPanelExpr);
      frontstageProps.push(rightPanel);
    }
  }

  let bottomPanelExpr = attrMap.getAttributeExpression("bottomPanel");
  let bottomPanelEnd = attrMap.getAttributeExpression("bottomMostPanel");
  if (bottomPanelExpr || bottomPanelEnd) {
    if (bottomPanelExpr) {
      bottomPanelExpr = handleSideStagePanel(j, bottomPanelExpr);
      if (bottomPanelExpr)
        handledExpressions.add("bottomPanel");
    }
    else {
      bottomPanelExpr = createEmptyConfig(j, j.jsxIdentifier("StagePanel"));
    }
    if (bottomPanelExpr && bottomPanelEnd) {
      bottomPanelEnd = handleSideStagePanel(j, bottomPanelEnd);
      if (bottomPanelEnd && isSpecifiedConfigExpression(bottomPanelEnd, "StagePanel")) {
        const start = getStagePanelSectionProperty(j, bottomPanelEnd, "start")?.value;
        const end = getStagePanelSectionProperty(j, bottomPanelEnd, "end")?.value;
        let successfulAppend: boolean = true;
        if (start && isExpressionKind(start) && isSpecifiedConfigExpression(bottomPanelExpr, "StagePanel"))
          successfulAppend = appendStagePanelSection(j, bottomPanelExpr, "end", start) && successfulAppend ? true : false;
        if (end && isExpressionKind(end) && isSpecifiedConfigExpression(bottomPanelExpr, "StagePanel"))
          successfulAppend = appendStagePanelSection(j, bottomPanelExpr, "end", end) && successfulAppend ? true : false;
        if ((start || end) && successfulAppend)
          handledExpressions.add("bottomMostPanel");
      }
    }
    if (bottomPanelExpr) {
      const bottomPanel = buildProperty(j, "bottomPanel", bottomPanelExpr);
      frontstageProps.push(bottomPanel);
    }
  }

  const styleExpr = attrMap.getAttributeExpression("style");
  if (styleExpr) {
    const style = buildProperty(j, "style", styleExpr);
    frontstageProps.push(style);
    handledExpressions.add("style");
  }

  const itemIdExpr = attrMap.getAttributeExpression("itemId");
  if (itemIdExpr) {
    const itemId = buildProperty(j, "itemId", itemIdExpr);
    frontstageProps.push(itemId);
    handledExpressions.add("itemId");
  }

  const classNameExpr = attrMap.getAttributeExpression("className");
  if (classNameExpr) {
    const className = buildProperty(j, "className", classNameExpr);
    frontstageProps.push(className);
    handledExpressions.add("className");
  }

  spreadAttr.forEach((expr) => {
    const spreadProperty = buildProperty(j, null, expr);
    frontstageProps.push(spreadProperty);
  });

  attrMap.forEach((value, key) => {
    if (handledExpressions.has(key) === false && value && value !== "UnhandledExpression") {
      const unhandledProp = j.objectProperty(j.identifier(key), value);
      frontstageProps.push(unhandledProp);
    }
  });

  return { ...j.objectExpression(frontstageProps), configName };
}

function handleToolWidget(j: JSCodeshift, expression: ExpressionKind): ExpressionKind {
  function handleExpression(expr: ExpressionKind): ExpressionKind {
    let newExpr: ExpressionKind | undefined = undefined;
    if (!newExpr && expr.type === "ConditionalExpression")
      newExpr = handleConditionalExpression(j, expr, handleExpression);
    if (!newExpr && expr.type === "ArrayExpression")
      newExpr = takeFirstArrayExpressionElement(j, expr);
    if (!newExpr) {
      // TODO: log warning
      return expr;
    }
    return newExpr;
  }
  return handleExpression(expression);
}

function handleSideStagePanel(j: JSCodeshift, expression: ExpressionKind): ConfigExpression | undefined {
  if (isSpecifiedJSXElement(expression, "StagePanel")) {
    expression = transformFrontstage(j, j(expression).getAST()[0]);
  }
  if (isSpecifiedConfigExpression(expression, "StagePanel")) {
    return expression;
  }
  return undefined;
}

function handleSideStagePanelZone(j: JSCodeshift, expression: ExpressionKind): ExpressionKind | undefined {
  if (isSpecifiedJSXElement(expression, "Zone")) {
    expression = transformZone(j, j(expression).getAST()[0]);
  }
  if (expression.type === "Identifier" && expression.name === "undefined") {
    return undefined;
  }
  return expression;
}

