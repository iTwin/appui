/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { FileInfo, API, Options, ASTPath, JSCodeshift, JSXElement, ObjectProperty, SpreadProperty, Collection, JSXIdentifier, ObjectExpression, Property } from "jscodeshift";
import { ConfigExpression, jsxElementToUniFormat, buildProperty, isSpecifiedConfigExpression, isExpressionKind, ExpressionKind, uniFormatToObjectExpression, concatExpressions, getObjectProperty, handleConditionalExpression, takeFirstArrayExpressionElement } from "../utils/TransformUtils";
import { isSpecifiedJSXElement } from "../utils/typeGuards";
import { useObjectExpression, ObjectExpressionCollection } from "../utils/ObjectExpression";
import { transformAbstractWidget } from "./widget";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.findJSXElements("Widget").forEach((widget) => {
    const widgetConfig = transformWidget(j, widget);
    widget.replace(widgetConfig);
  });
  root.findJSXElements("Zone").forEach((zone) => {
    const zoneConfig = transformZone(j, zone);
    zone.replace(zoneConfig);
  });
  root.findJSXElements("StagePanel").forEach((stagePanel) => {
    const stagePanelConfig = transformStagePanel(j, stagePanel);
    stagePanel.replace(stagePanelConfig);
  });
  root.findJSXElements("Frontstage").forEach((frontstage) => {
    const frontstageConfig = transformFrontstage(j, frontstage);
    frontstage.replace(frontstageConfig);
  });

  return root.toSource(options.printOptions);
}

export function transformFrontstage(j: JSCodeshift, frontstage: ASTPath<JSXElement>): ConfigExpression { // TODO: registerMethod
  const uni = jsxElementToUniFormat(j, frontstage);
  const { name: configName, attrMap, spreadAttr } = uni;

  const frontstageProps: (ObjectProperty | SpreadProperty)[] = [];

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

export function transformStagePanel(j: JSCodeshift, stagePanel: ASTPath<JSXElement>): ConfigExpression { // TODO: registerMethod
  const { name: configName, attrMap, spreadAttr } = jsxElementToUniFormat(j, stagePanel);

  const stagePanelProps: (ObjectProperty | SpreadProperty)[] = [];

  const handledExpressions = new Set(["key", "allowedZones", "applicationData", "runtimeProps", "isInFooterMode", "isIModelIndependent", "runtimeProps"]);

  const defaultStateExpr = attrMap.getAttributeExpression("defaultState");
  if (defaultStateExpr) {
    const defaultState = buildProperty(j, "defaultState", defaultStateExpr);
    stagePanelProps.push(defaultState);
    handledExpressions.add("defaultState");
  }

  const maxSizeExpr = attrMap.getAttributeExpression("maxSize");
  if (maxSizeExpr) {
    const maxSize = buildProperty(j, "maxSize", maxSizeExpr);
    stagePanelProps.push(maxSize);
    handledExpressions.add("maxSize");
  }

  const minSizeExpr = attrMap.getAttributeExpression("minSize");
  if (minSizeExpr) {
    const minSize = buildProperty(j, "minSize", minSizeExpr);
    stagePanelProps.push(minSize);
    handledExpressions.add("minSize");
  }

  const pinnedExpr = attrMap.getAttributeExpression("pinned");
  if (pinnedExpr) {
    const pinned = buildProperty(j, "pinned", pinnedExpr);
    stagePanelProps.push(pinned);
    handledExpressions.add("pinned");
  }

  const resizableExpr = attrMap.getAttributeExpression("resizable");
  if (resizableExpr) {
    const resizable = buildProperty(j, "resizable", resizableExpr);
    stagePanelProps.push(resizable);
    handledExpressions.add("resizable");
  }

  const sizeExpr = attrMap.getAttributeExpression("size");
  if (sizeExpr) {
    const size = buildProperty(j, "size", sizeExpr);
    stagePanelProps.push(size);
    handledExpressions.add("size");
  }

  let panelZonesExpr = attrMap.getAttributeExpression("panelZones");
  let widgetsExpr = attrMap.getAttributeExpression("widgets");
  if (panelZonesExpr || widgetsExpr) {
    let startExpr = j.arrayExpression([]);
    let endExpr = j.arrayExpression([]);
    if (panelZonesExpr?.type === "ObjectExpression") {
      const [start, end] = extractSectionsFromPanelZones(j, panelZonesExpr);
      startExpr = concatExpressions(j, startExpr, start);
      endExpr = concatExpressions(j, endExpr, end);
      handledExpressions.add("panelZones");
    }
    if (widgetsExpr) {
      startExpr = concatExpressions(j, startExpr, widgetsExpr);
      handledExpressions.add("widgets");
    }

    const sectionsObjectProps: ObjectProperty[] = [];
    if (startExpr.elements.length > 0)
      sectionsObjectProps.push(j.objectProperty(j.identifier("start"), startExpr));
    if (endExpr.elements.length > 0)
      sectionsObjectProps.push(j.objectProperty(j.identifier("end"), endExpr));

    if (sectionsObjectProps.length > 0) {
      const sectionsObject = j.objectExpression(sectionsObjectProps);
      const sections = buildProperty(j, "sections", sectionsObject);
      stagePanelProps.push(sections);
    }
  }

  spreadAttr.forEach((expr) => {
    const spreadProperty = buildProperty(j, null, expr);
    stagePanelProps.push(spreadProperty);
  });

  attrMap.forEach((value, key) => {
    if (handledExpressions.has(key) === false && value && value !== "UnhandledExpression") {
      const unhandledProp = j.objectProperty(j.identifier(key), value);
      stagePanelProps.push(unhandledProp);
    }
  });

  return { ...j.objectExpression(stagePanelProps), configName };
}

export function transformZone(j: JSCodeshift, zone: ASTPath<JSXElement>): ExpressionKind {
  const { attrMap, spreadAttr } = jsxElementToUniFormat(j, zone);

  const widgetsExpr = attrMap.getAttributeExpression("widgets");
  if (widgetsExpr)
    return widgetsExpr;

  if (spreadAttr.length === 1) {
    return spreadAttr[0];
  }
  else if (spreadAttr.length > 1) {
    // TODO: log warning
    return spreadAttr[0];
  }

  return j.identifier("undefined");
}

export function transformWidget(j: JSCodeshift, widget: ASTPath<JSXElement>): ConfigExpression { // TODO: registerMethod
  const uni = jsxElementToUniFormat(j, widget);
  const widgetObj = uniFormatToObjectExpression(j, uni);

  replaceWidgetObjectExpression(j, j(widgetObj));
  return { ...widgetObj, configName: uni.name };
}

export function handleSideStagePanel(j: JSCodeshift, expression: ExpressionKind): ConfigExpression | undefined {
  if (isSpecifiedJSXElement(expression, "StagePanel")) {
    expression = transformFrontstage(j, j(expression).getAST()[0]);
  }
  if (isSpecifiedConfigExpression(expression, "StagePanel")) {
    return expression;
  }
  return undefined;
}

export function handleSideStagePanelZone(j: JSCodeshift, expression: ExpressionKind): ExpressionKind | undefined {
  if (isSpecifiedJSXElement(expression, "Zone")) {
    expression = transformZone(j, j(expression).getAST()[0]);
  }
  if (expression.type === "Identifier" && expression.name === "undefined") {
    return undefined;
  }
  return expression;
}

export function createEmptyConfig(j: JSCodeshift, configName: JSXIdentifier): ConfigExpression {
  return { ...j.objectExpression([]), configName };
}

export function handleToolWidget(j: JSCodeshift, expression: ExpressionKind): ExpressionKind {
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

export function extractSectionsFromPanelZones(j: JSCodeshift, expression: ObjectExpression) {
  const result: [ExpressionKind | undefined, ExpressionKind | undefined] = [undefined, undefined]

  const start = getObjectProperty(j, expression, "start")?.value;
  if (start && start.type === "ObjectExpression") {
    const startWidgets = getObjectProperty(j, start, "widgets")?.value;
    if (startWidgets && isExpressionKind(startWidgets))
      result[0] = startWidgets;
  }
  else if (start && isExpressionKind(start)) {
    result[0] = j.memberExpression(start, j.identifier("widgets"));
  }

  const middle = getObjectProperty(j, expression, "middle")?.value;
  if (middle && middle.type === "ObjectExpression") {
    const middleWidgets = getObjectProperty(j, middle, "widgets")?.value;
    if (middleWidgets && isExpressionKind(middleWidgets)) {
      if (result[0])
        result[0] = concatExpressions(j, result[0], middleWidgets);
      else
        result[0] = middleWidgets;
    }
  }
  else if (middle && isExpressionKind(middle)) {
    const middleMemberExpr = j.memberExpression(middle, j.identifier("widgets"))
    if (result[0])
      result[0] = concatExpressions(j, result[0], middleMemberExpr);
    else
      result[0] = middleMemberExpr;
  }

  const end = getObjectProperty(j, expression, "end")?.value;
  if (end && end.type === "ObjectExpression") {
    const endWidgets = getObjectProperty(j, end, "widgets")?.value;
    if (endWidgets && isExpressionKind(endWidgets))
      result[1] = endWidgets;
  }
  else if (end && isExpressionKind(end)) {
    result[1] = j.memberExpression(end, j.identifier("widgets"));
  }

  return result;
}

export function appendStagePanelSection(j: JSCodeshift, stagePanel: ConfigExpression, sectionToAppend: "start" | "end", exprToAppend: ExpressionKind): "Success" | undefined {
  let sections = getObjectProperty(j, stagePanel, "sections");
  if (!sections) {
    sections = j.objectProperty(j.identifier("sections"), j.objectExpression([]));
    stagePanel.properties.push(sections);
  }
  if (sections.value.type !== "ObjectExpression") {
    // TODO: log warning
    return undefined;
  }

  let section = getObjectProperty(j, sections.value, sectionToAppend);
  if (!section) {
    section = j.objectProperty(j.identifier(sectionToAppend), j.arrayExpression([]));
    sections.value.properties.push(section);
  }
  if (!isExpressionKind(section.value)) {
    // TODO: log warning
    return undefined;
  }

  section.value = concatExpressions(j, section.value, exprToAppend);
  return "Success";
}

export function getStagePanelSectionProperty(j: JSCodeshift, stagePanel: ConfigExpression, sectionToGet: "start" | "end"): ObjectProperty | Property | undefined {
  const sections = getObjectProperty(j, stagePanel, "sections");
  if (!sections)
    return undefined;
  if (sections.value.type !== "ObjectExpression") {
    // TODO: log warning
    return undefined;
  }

  const section = getObjectProperty(j, sections.value, sectionToGet);
  if (!section)
    return undefined;
  if (!isExpressionKind(section.value)) {
    // TODO: log warning
    return undefined;
  }

  return section;
}

export function replaceWidgetObjectExpression(j: JSCodeshift, widget: Collection<ObjectExpression>) {
  useObjectExpression(j);
  transformAbstractWidget(j, widget as ObjectExpressionCollection)
    .removeProperty("key", (_path, property) => {
      const idProp = getObjectProperty(j, _path.node, "id");
      if (idProp === undefined && property.type === "ObjectProperty") {
        const newIdProp = j.objectProperty(j.identifier("id"), property.value);
        _path.node.properties.push(newIdProp);
      }
    })
    .removeProperty("control")
    .removeProperty("isFreeform")
    .removeProperty("isToolSettings")
    .removeProperty("isStatusBar")
    .removeProperty("fillZone")
    .removeProperty("syncEventIds")
    .removeProperty("stateFunc")
    .renameProperty("iconSpec", "icon")
    .renameProperty("isFloatingStateSupported", "canFloat")
    .renameProperty("badgeType", "badge")
    .renameProperty("element", "content");
}
