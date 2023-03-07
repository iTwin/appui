/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { CallExpression, Collection, JSCodeshift } from "jscodeshift";
import once from "jscodeshift/src/utils/once";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends CallExpressionMethods {
  }
}

type RecursiveMatchNode<T> =
  | (T extends {}
    ? {
      [K in keyof T]?: RecursiveMatchNode<T[K]>;
    }
    : T)
  | ((value: T) => boolean);

interface CallExpressionMethods {
  findCallExpressions(name?: string): Collection<CallExpression>;
}

export function once<A extends any[]>(fn: (...args: A) => void) {
  let called = false;
  return function (...args: A) {
    if (called)
      return;
    called = true;
    fn(...args);
  }
}

function toFilter(name: string | undefined): RecursiveMatchNode<CallExpression> | undefined {
  const names = name ? name.split('.') : [];
  if (names.length === 2) {
    return {
      callee: {
        object: {
          name: names[0],
        },
        property: {
          name: names[1],
        },
      },
    };
  }
  return undefined;
}

export const registerCallExpression = once((j: JSCodeshift) => {
  const methods: CallExpressionMethods = {
    findCallExpressions(this: Collection, name) {
      const filter = toFilter(name);
      return this.find(j.CallExpression, filter);
    }
  };
  j.registerMethods(methods);
});
