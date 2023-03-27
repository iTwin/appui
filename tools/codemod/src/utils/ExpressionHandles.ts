import { ArrayExpression, ConditionalExpression, JSCodeshift, JSXElement } from "jscodeshift";
import { ExpressionKind } from "./TransformUtils";
import { transformZone } from "./TransformZone";

export function handleAsZone(j: JSCodeshift, expression: JSXElement): ExpressionKind {
  return transformZone(j, j(expression).getAST()[0]);
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