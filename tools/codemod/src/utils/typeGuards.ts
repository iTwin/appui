/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type {
  ArrayExpression, ASTNode, CallExpression, Identifier, ImportSpecifier, JSCodeshift, JSXAttribute, JSXElement, JSXEmptyExpression,
  JSXExpressionContainer, JSXIdentifier, Literal, MemberExpression, ObjectExpression,
} from "jscodeshift";

type Source = Parameters<JSCodeshift>[0];

export function isJSXIdentifierType(j: JSCodeshift, source: Source): source is JSXIdentifier {
  return j(source).isOfType(j.JSXIdentifier);
}

export function isJSXAttribute(j: JSCodeshift, source: Source): source is JSXAttribute {
  return j(source).isOfType(j.JSXAttribute);
}

export function isImportSpecifier(j: JSCodeshift, source: Source): source is ImportSpecifier {
  return j(source).isOfType(j.ImportSpecifier);
}

export function isArrayExpression(j: JSCodeshift, path: any): path is ArrayExpression {
  return j(path).isOfType(j.ArrayExpression);
}

export function isJSXElement(j: JSCodeshift, path: any): path is JSXElement {
  return j(path).isOfType(j.JSXElement);
}

export function isSpecifiedJSXElement(j: JSCodeshift, path: any, name: string): path is JSXElement {
  return isJSXElement(j, path) && isJSXIdentifierType(j, path.openingElement.name) && path.openingElement.name.name === name;
}

export function isJSXEmptyExpression(j: JSCodeshift, path: any): path is JSXEmptyExpression {
  return j(path).isOfType(j.JSXEmptyExpression);
}

export function isJSXExpressionContainer(j: JSCodeshift, path: any): path is JSXExpressionContainer {
  return j(path).isOfType(j.JSXExpressionContainer);
}

export function isSpecifiedJSXAttribute(j: JSCodeshift, path: any, name: string): path is JSXAttribute {
  return isJSXAttribute(j, path) && isJSXIdentifierType(j, path.name) && path.name.name === name;
}

export function isLiteral(j: JSCodeshift, source: Source): source is Literal {
  return j(source).isOfType(j.Literal);
}

export function isObjectExpression(j: JSCodeshift, source: Source): source is ObjectExpression {
  return j(source).isOfType(j.ObjectExpression);
}

export function isJSXIdentifier(source: ASTNode): source is JSXIdentifier {
  return source.type === "JSXIdentifier";
}

export function isIdentifier(source: ASTNode): source is Identifier {
  return source.type === "Identifier";
}

export function isCallExpression(source: ASTNode): source is CallExpression {
  return source.type === "CallExpression";
}

export function isMemberExpression(source: ASTNode): source is MemberExpression {
  return source.type === "MemberExpression";
}

export function isIdentifierType(j: JSCodeshift, source: Source): source is Identifier {
  return j(source).isOfType(j.Identifier);
}
