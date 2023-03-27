import { JSCodeshift, ASTPath, JSXElement, ObjectProperty, SpreadProperty, Property, ObjectExpression } from "jscodeshift";
import { concatExpressions } from "./ExpressionHandles";
import { buildProperty, ConfigExpression, ExpressionKind, getObjectProperty, isExpressionKind, jsxElementToUniFormat } from "./TransformUtils"

export function transformStagePanel(j: JSCodeshift, stagePanel: ASTPath<JSXElement>): ConfigExpression { // TODO: registerMethod
  const { name: configName, attrMap, spreadAttr } = jsxElementToUniFormat(j, stagePanel);

  const stagePanelProps: (ObjectProperty | SpreadProperty)[] = [];

  // Add ---------------------------
  // defaultState <- defaultState
  // maxSize <- maxSize
  // minSize <- minSize
  // pinned <- pinned
  // resizable <- resizable
  // size <- size
  // sections <- widgets, panelZones

  // Remove ------------------------
  // key
  // allowedZones
  // applicationData
  // runtimeProps

  // Unknown -----------------------
  // header

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

export function buildDefaultStagePanelConfigExpression(j: JSCodeshift): ConfigExpression {
  return { ...j.objectExpression([]), configName: j.jsxIdentifier("StagePanel") };
}

function extractSectionsFromPanelZones(j: JSCodeshift, expression: ObjectExpression) {
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