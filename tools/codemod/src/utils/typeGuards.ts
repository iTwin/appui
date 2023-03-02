/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, ExpressionStatement, ImportSpecifier, JSCodeshift, JSXAttribute, JSXIdentifier } from "jscodeshift";

export function isExpressionsStatement(j: JSCodeshift, path: any): path is ASTPath<ExpressionStatement> {
  return j(path).isOfType(j.ExpressionStatement);
}

export function isJSXIdentifier(j: JSCodeshift, path: any): path is JSXIdentifier {
  return j(path).isOfType(j.JSXIdentifier);
}

export function isJSXAttribute(j: JSCodeshift, path: any): path is JSXAttribute {
  return j(path).isOfType(j.JSXAttribute);
}

export function isImportSpecifier(j: JSCodeshift, path: any): path is ImportSpecifier {
  return j(path).isOfType(j.ImportSpecifier);
}
