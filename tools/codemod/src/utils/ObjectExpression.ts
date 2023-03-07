/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Collection, JSCodeshift, ObjectExpression } from "jscodeshift";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends ObjectExpressionMethods {
  }
}

interface ObjectExpressionMethods {
  findObjectExpressions(name?: string): Collection<ObjectExpression>;
}

function objectExpressionPlugin(j: JSCodeshift) {
  const methods: ObjectExpressionMethods = {
    findObjectExpressions(this: Collection, name) {
      return this.find(j.ObjectExpression).filter((path) => {
        const typeIdentifier = j(path).closest(j.VariableDeclarator).find(j.TSTypeReference).find(j.Identifier).paths()[0];
        if (typeIdentifier?.value.name === name) {
          return true;
        }
        return false;
      });
    }
  };
  j.registerMethods(methods);
}

export function useObjectExpression(j: JSCodeshift) {
  usePlugin(j, objectExpressionPlugin);
}
