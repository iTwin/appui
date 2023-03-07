/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ArrayExpression, Identifier, ImportSpecifier, JSCodeshift, JSXAttribute, JSXElement, JSXEmptyExpression, JSXExpressionContainer, JSXIdentifier } from "jscodeshift";

type Source = Parameters<JSCodeshift>[0];

export function isJSXIdentifier(j: JSCodeshift, source: Source): source is JSXIdentifier {
  return j(source).isOfType(j.JSXIdentifier);
}

export function isJSXAttribute(j: JSCodeshift, source: Source): source is JSXAttribute {
  return j(source).isOfType(j.JSXAttribute);
}

export function isImportSpecifier(j: JSCodeshift, source: Source): source is ImportSpecifier {
  return j(source).isOfType(j.ImportSpecifier);
}

export function isIdentifier(j: JSCodeshift, source: Source): source is Identifier {
  return j(source).isOfType(j.Identifier);
}

export function isArrayExpression(j: JSCodeshift, path: any): path is ArrayExpression {
  return j(path).isOfType(j.ArrayExpression);
}

export function isJSXElement(j: JSCodeshift, path: any): path is JSXElement {
  return j(path).isOfType(j.JSXElement);
}

export function isSpecifiedJSXElement(j: JSCodeshift, path: any, name: string): path is JSXElement {
  return isJSXElement(j, path) && isJSXIdentifier(j, path.openingElement.name) && path.openingElement.name.name === name;
}

export function isJSXEmptyExpression(j: JSCodeshift, path: any): path is JSXEmptyExpression {
  return j(path).isOfType(j.JSXEmptyExpression);
}

export function isJSXExpressionContainer(j: JSCodeshift, path: any): path is JSXExpressionContainer {
  return j(path).isOfType(j.JSXExpressionContainer);
}
