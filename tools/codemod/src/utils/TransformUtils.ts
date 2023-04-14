/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ObjectExpression, ObjectProperty, JSCodeshift, ASTPath, JSXElement, JSXIdentifier, Identifier, JSXMemberExpression, MemberExpression, SpreadProperty, ASTNode, RestElement, Property, Collection, ExpressionStatement, ArrayExpression, ConditionalExpression } from "jscodeshift";

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

export function isExpressionKind(j: JSCodeshift, source: ASTNode): source is ExpressionKind {
  return j(source).isOfType(j.Expression);
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