/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { JSCodeshift, JSXAttribute, ArrayExpression, JSXElement, JSXEmptyExpression, JSXExpressionContainer, JSXIdentifier } from "jscodeshift";
import { ConfigProperty, ElementAttribute } from "./ElementToConfig";

export function isAttrOrProp(j: JSCodeshift, path: any): path is ElementAttribute | ConfigProperty {

  return (path.type === "ElementAttribute" || path.type === "ConfigProperty");
}

export function isArrayExpression(j: JSCodeshift, path: any): path is ArrayExpression {
  return j(path).isOfType(j.ArrayExpression);
}

export function isJSXElement(j: JSCodeshift, path: any): path is JSXElement {
  return j(path).isOfType(j.JSXElement);
}

export function isJSXEmptyExpression(j: JSCodeshift, path: any): path is JSXEmptyExpression {
  return j(path).isOfType(j.JSXEmptyExpression);
}

export function isJSXExpressionContainer(j: JSCodeshift, path: any): path is JSXExpressionContainer {
  return j(path).isOfType(j.JSXExpressionContainer);
}

export function isJSXIdentifier(j: JSCodeshift, path: any): path is JSXIdentifier {
  return j(path).isOfType(j.JSXIdentifier);
}

export function isJSXAttribute(j: JSCodeshift, path: any): path is JSXAttribute {
  return j(path).isOfType(j.JSXAttribute);
}