import { ASTPath, JSCodeshift, JSXElement } from "jscodeshift";
import { ExpressionKind, jsxElementToUniFormat } from "./TransformUtils";

export function transformZone(j: JSCodeshift, zone: ASTPath<JSXElement>): ExpressionKind {
  const { attrMap, spreadAttr } = jsxElementToUniFormat(j, zone);

  // Add ---------------------------
  // widgets <- widgets

  // Ignore ------------------------
  // applicationData
  // allowsMerging
  // mergeWithZone
  // initialWidth
  // style
  // itemId
  // className

  // Unknown -----------------------
  // defaultState
  // runtimeProps

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