/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type {
  ArrayExpression, ASTNode, BooleanLiteral, CallExpression, Identifier, ImportSpecifier, JSCodeshift, JSXAttribute, JSXElement, JSXEmptyExpression,
  JSXExpressionContainer, JSXIdentifier, Literal, MemberExpression, ObjectExpression,
} from "jscodeshift";

type Source = Parameters<JSCodeshift>[0];

export function isJSXIdentifierType(source: ASTNode): source is JSXIdentifier {
  return source.type === "JSXIdentifier";
}

export function isJSXAttribute(source: ASTNode): source is JSXAttribute {
  return source.type === "JSXAttribute";
}

export function isImportSpecifier(source: ASTNode): source is ImportSpecifier {
  return source.type === "ImportSpecifier";
}

export function isArrayExpression(source: ASTNode): source is ArrayExpression {
  return source.type === "ArrayExpression";
}

export function isJSXElement(source: ASTNode): source is JSXElement {
  return source.type === "JSXElement";
}

export function isSpecifiedJSXElement(source: ASTNode, name: string): source is JSXElement {
  return isJSXElement(source) && isJSXIdentifierType(source.openingElement.name) && source.openingElement.name.name === name;
}

export function isJSXEmptyExpression(source: ASTNode): source is JSXEmptyExpression {
  return source.type === "JSXEmptyExpression";
}

export function isJSXExpressionContainer(source: ASTNode): source is JSXExpressionContainer {
  return source.type === "JSXExpressionContainer";
}

export function isSpecifiedJSXAttribute(source: ASTNode, name: string): source is JSXAttribute {
  return isJSXAttribute(source) && isJSXIdentifierType(source.name) && source.name.name === name;
}

export function isLiteral(source: ASTNode): source is Literal {
  return source.type === "Literal";
}

export function isBooleanLiteral(source: ASTNode): source is BooleanLiteral {
  return source.type === "BooleanLiteral";
}

export function isObjectExpression(source: ASTNode): source is ObjectExpression {
  return source.type === "ObjectExpression";
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