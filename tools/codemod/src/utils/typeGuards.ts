/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ImportSpecifier, JSCodeshift, JSXAttribute, JSXIdentifier } from "jscodeshift";

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
