import { ObjectExpression, ObjectProperty, JSCodeshift, ASTPath, JSXElement, JSXIdentifier, JSXExpressionContainer, Identifier, ArrayExpression, ArrowFunctionExpression, AssignmentExpression, AwaitExpression, BigIntLiteral, BinaryExpression, BindExpression, BooleanLiteral, CallExpression, ChainExpression, ClassExpression, ComprehensionExpression, ConditionalExpression, DirectiveLiteral, DoExpression, FunctionExpression, GeneratorExpression, Import, ImportExpression, JSXFragment, JSXMemberExpression, JSXText, Literal, LogicalExpression, MemberExpression, MetaProperty, NewExpression, NullLiteral, NumericLiteral, OptionalCallExpression, OptionalMemberExpression, ParenthesizedExpression, PrivateName, RegExpLiteral, SequenceExpression, StringLiteral, Super, TaggedTemplateExpression, TemplateLiteral, ThisExpression, TSAsExpression, TSNonNullExpression, TSTypeAssertion, TSTypeParameter, TypeCastExpression, UnaryExpression, UpdateExpression, YieldExpression, SpreadProperty, ASTNode, ArrayPattern, AssignmentPattern, ObjectPattern, PropertyPattern, RestElement, SpreadElementPattern, SpreadPropertyPattern, TSParameterProperty, Property } from "jscodeshift";

export type ExpressionKind = Identifier | FunctionExpression | ThisExpression | ArrayExpression | ObjectExpression | Literal | SequenceExpression | UnaryExpression | BinaryExpression | AssignmentExpression | MemberExpression | UpdateExpression | LogicalExpression | ConditionalExpression | NewExpression | CallExpression | ArrowFunctionExpression | YieldExpression | GeneratorExpression | ComprehensionExpression | ClassExpression | Super | TaggedTemplateExpression | TemplateLiteral | MetaProperty | AwaitExpression | ImportExpression | ChainExpression | OptionalCallExpression | OptionalMemberExpression | JSXIdentifier | JSXExpressionContainer | JSXElement | JSXFragment | JSXMemberExpression | JSXText | PrivateName | TypeCastExpression | DoExpression | BindExpression | ParenthesizedExpression | DirectiveLiteral | StringLiteral | NumericLiteral | BigIntLiteral | NullLiteral | BooleanLiteral | RegExpLiteral | Import | TSAsExpression | TSNonNullExpression | TSTypeParameter | TSTypeAssertion;
export type PatternKind = Identifier | RestElement | SpreadElementPattern | PropertyPattern | ObjectPattern | ArrayPattern | AssignmentPattern | SpreadPropertyPattern | JSXIdentifier | PrivateName | TSAsExpression | TSNonNullExpression | TSTypeParameter | TSTypeAssertion | TSParameterProperty;
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

export function objectExpressionToUniFormat() {

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