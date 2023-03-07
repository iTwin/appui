/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Identifier, ImportSpecifier, JSCodeshift, JSXAttribute, JSXIdentifier, Literal } from "jscodeshift";

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

export function isLiteral(j: JSCodeshift, source: Source): source is Literal {
  return j(source).isOfType(j.Literal);
}
