/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ObjectExpression, ObjectProperty, JSCodeshift, ASTPath, JSXElement, JSXIdentifier, Identifier, JSXMemberExpression, MemberExpression, SpreadProperty, ASTNode, RestElement, Property, Collection, ExpressionStatement, ArrayExpression, ConditionalExpression } from "jscodeshift";
import { ObjectExpressionCollection, useObjectExpression } from "./ObjectExpression";
import { transformAbstractWidget } from "../v4.0.0/widget";

export type ExpressionKind = ExpressionStatement["expression"];
export type PatternKind = RestElement["argument"];
export interface ConfigExpression extends ObjectExpression {
  configName: JSXIdentifier | JSXMemberExpression; // TODO: figure out a better way to store
}

export class AttributeMap extends Map<string, ExpressionKind | "UnhandledExpression"> {
  public getAttributeExpression(name: string, errorHandle?: () => void): ExpressionKind | undefined {
    const attrExpr = this.get(name);
    if (attrExpr === "UnhandledExpression" || attrExpr === undefined) {
      errorHandle?.();
      return undefined;
    }
    return attrExpr;
  }
}

export interface UniFormat {
  name: JSXIdentifier | JSXMemberExpression;
  attrMap: AttributeMap;
  spreadAttr: ExpressionKind[];
}

export const expressionKindTypes = new Set(["Identifier", "FunctionExpression", "ThisExpression", "ArrayExpression", "ObjectExpression", "Literal", "SequenceExpression", "UnaryExpression", "BinaryExpression", "AssignmentExpression", "MemberExpression", "UpdateExpression", "LogicalExpression", "ConditionalExpression", "NewExpression", "CallExpression", "ArrowFunctionExpression", "YieldExpression", "GeneratorExpression", "ComprehensionExpression", "ClassExpression", "Super", "TaggedTemplateExpression", "TemplateLiteral", "MetaProperty", "AwaitExpression", "ImportExpression", "ChainExpression", "OptionalCallExpression", "OptionalMemberExpression", "JSXIdentifier", "JSXExpressionContainer", "JSXElement", "JSXFragment", "JSXMemberExpression", "JSXText", "PrivateName", "TypeCastExpression", "DoExpression", "BindExpression", "ParenthesizedExpression", "DirectiveLiteral", "StringLiteral", "NumericLiteral", "BigIntLiteral", "NullLiteral", "BooleanLiteral", "RegExpLiteral", "Import", "TSAsExpression", "TSNonNullExpression", "TSTypeParameter", "TSTypeAssertion"]);
export function isExpressionKind(source: ASTNode): source is ExpressionKind {
  return expressionKindTypes.has(source.type);
}

export const patternKindTypes = new Set(["Identifier", "RestElement", "SpreadElementPattern", "PropertyPattern", "ObjectPattern", "ArrayPattern", "AssignmentPattern", "SpreadPropertyPattern", "JSXIdentifier", "PrivateName", "TSAsExpression", "TSNonNullExpression", "TSTypeParameter", "TSTypeAssertion", "TSParameterProperty"]);
export function isPatternKind(source: ASTNode): source is PatternKind {
  return patternKindTypes.has(source.type);
}

export function isSpecifiedConfigExpression(source: ASTNode, name: string): source is ConfigExpression {
  return source.type === "ObjectExpression" && "configName" in source && getName((source as ConfigExpression).configName) === name;
}

export function getName(name: JSXIdentifier | Identifier | JSXMemberExpression | MemberExpression): string | undefined {
  if (name.type === "JSXIdentifier" || name.type === "Identifier")
    return name.name;
  if (name.property.type === "JSXIdentifier" || name.property.type === "Identifier")
    return name.property.name;
  return undefined;
}

export function buildProperty(j: JSCodeshift, name: string | null, expression: ExpressionKind): ObjectProperty | SpreadProperty {
  if (name !== null) {
    const identifier = j.identifier(name);
    if (expression.type === "Identifier" && expression.name === name) {
      const objProperty = j.objectProperty(identifier, identifier);
      objProperty.shorthand = true; // TODO: write tests for this functionality
      return objProperty;
    }
    return j.objectProperty(identifier, expression);
  }

  return j.spreadProperty(expression);
}

export function jsxElementToUniFormat(j: JSCodeshift, element: ASTPath<JSXElement>): UniFormat {
  const name = element.node.openingElement.name as JSXIdentifier | JSXMemberExpression;
  const attrMap = new AttributeMap();
  const spreadAttr: ExpressionKind[] = [];
  element.node.openingElement.attributes?.forEach((attr) => {
    if (attr.type === "JSXAttribute") {
      if (attr.name.type !== "JSXIdentifier")
        return;
      const key = attr.name.name;
      const value = attr.value;
      if (!value)
        attrMap.set(key, j.identifier(key));
      else if (value.type === "JSXExpressionContainer")
        attrMap.set(key, value.expression.type === "JSXEmptyExpression" ? "UnhandledExpression" : value.expression);
      else
        attrMap.set(key, value);
    }
    else {
      spreadAttr.push(attr.argument);
    }
  });

  return {
    name,
    attrMap,
    spreadAttr,
  };
}

export function uniFormatToObjectExpression(j: JSCodeshift, uni: UniFormat) {
  const props: (ObjectProperty | SpreadProperty)[] = [];
  uni.attrMap.forEach((value, key) => {
    if (value !== "UnhandledExpression")
      props.push(buildProperty(j, key, value));
  });
  uni.spreadAttr.forEach((expr) => {
    const spreadProperty = buildProperty(j, null, expr);
    props.push(spreadProperty);
  });
  return j.objectExpression(props);
}

export function getObjectProperty(j: JSCodeshift, expression: ObjectExpression, propName: string): ObjectProperty | Property | undefined {
  let spreadWarn = false;
  for (const prop of expression.properties) {
    if (prop.type === "Property" || prop.type === "ObjectProperty") {
      if (("name" in prop.key && prop.key.name === propName) || (prop.key.type === "Literal" && prop.key.value === propName)) {
        return prop;
      }
    }
    else if (prop.type === "SpreadElement" || prop.type === "SpreadProperty") {
      spreadWarn = true;
    }
  }
  if (spreadWarn) {
    // TODO: log warning
  }
  return undefined;
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

export function buildDefaultStagePanelConfigExpression(j: JSCodeshift): ConfigExpression {
  return { ...j.objectExpression([]), configName: j.jsxIdentifier("StagePanel") };
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

export function handleCanFloatProperty(j: JSCodeshift, objectToProperties: Map<ASTPath<ObjectExpression>, ObjectProperty[]>, canFloatProperty: string): Parameters<ObjectExpressionCollection["removeProperty"]>[1] {
  return (path, property) => {
    let objectProperties = objectToProperties.get(path);
    if (!objectProperties) {
      objectProperties = [];
      objectToProperties.set(path, objectProperties);
    }

    if (property.type === "ObjectProperty") {
      const newProperty = j.objectProperty(j.identifier(canFloatProperty), property.value);
      objectProperties.push(newProperty);
    }
  };
}

export function takeFirstArrayExpressionElement(j: JSCodeshift, expression: ArrayExpression): ExpressionKind | undefined {
  const elements = expression.elements;
  if (elements.length === 0)
    return j.identifier("undefined");
  if (elements.length > 1) {
    // TODO: log warning
  }
  const element = elements[0];
  if (element === null) {
    // TODO: log warning
    return undefined;
  }
  if (element.type === "SpreadElement") {
    // TODO: log warning
    return j.memberExpression(element.argument, j.literal(0), true);
  }
  if (element.type === "RestElement") {
    // TODO: log warning
    return undefined;
  }
  return element;
}

export function handleConditionalExpression(j: JSCodeshift, expression: ConditionalExpression, handle: (expr: ExpressionKind) => ExpressionKind): ConditionalExpression {
  const consequent = handle(expression.consequent);
  const alternate = handle(expression.alternate);
  return j.conditionalExpression(expression.test, consequent, alternate);
}

export function concatExpressions(j: JSCodeshift, expression1: ExpressionKind | undefined, expression2: ExpressionKind | undefined): ArrayExpression {
  const result = j.arrayExpression([]);
  if (expression1?.type === "ArrayExpression")
    result.elements.push(...expression1.elements);
  else if (expression1)
    result.elements.push(j.spreadElement(expression1));
  if (expression2?.type === "ArrayExpression")
    result.elements.push(...expression2.elements);
  else if (expression2)
    result.elements.push(j.spreadElement(expression2));

  return result;
}