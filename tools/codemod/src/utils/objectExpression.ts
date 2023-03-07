/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Collection, JSCodeshift } from "jscodeshift";

export function findObjects(j: JSCodeshift, root: Collection, name: string) {
  return root.find(j.ObjectExpression).filter((path) => {
    const typeIdentifier = j(path).closest(j.VariableDeclarator).find(j.TSTypeReference).find(j.Identifier).paths()[0];
    if (typeIdentifier?.value.name === name) {
      return true;
    }
    return false;
  });
}
