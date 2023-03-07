/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, JSCodeshift, ObjectProperty } from "jscodeshift";
import { isIdentifier } from "../utils/typeGuards";

export function isProperty(j: JSCodeshift, path: ASTPath<ObjectProperty>, name: string) {
  const key = path.value.key;
  if (isIdentifier(j, key) && key.name === name)
    return true;
  return false;
}

export function removeProperty(j: JSCodeshift, path: ASTPath<ObjectProperty>, name: string) {
  if (!isProperty(j, path, name))
    return false;

  path.replace();
  return true;
}

export function renameProperty(j: JSCodeshift, path: ASTPath<ObjectProperty>, name: string, newName: string) {
  const key = path.value.key;
  if (!isIdentifier(j, key) || key.name !== name)
    return false;

  key.name = newName;
  return true;
}
