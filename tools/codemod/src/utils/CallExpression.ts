/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { CallExpression, Collection, JSCodeshift } from "jscodeshift";
import { NodeFilter } from "./NodeFilter";
import { isObjectExpression } from "./typeGuards";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  findCallExpressions(name?: string): CallExpressionCollection;
}

type CallExpressionCollection = Collection<CallExpression> & CallExpressionMethods;

interface CallExpressionMethods {
  getArguments<N = any>(index: number, filter?: ArgumentsFilter): Collection<N>;
}

type ArgumentsFilter = (arg: CallExpression["arguments"][0]) => boolean;

function toFilter(name: string | undefined): NodeFilter<CallExpression> | undefined {
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

function callExpressionPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    findCallExpressions(this: Collection, name) {
      const filter = toFilter(name);
      return this.find(j.CallExpression, filter) as CallExpressionCollection;
    }
  };
  const methods: CallExpressionMethods = {
    getArguments(this: CallExpressionCollection, index, filter) {
      return this.map((path) => {
        const arg = path.value.arguments[index];
        if (arg === undefined)
          return undefined;
        if (filter && !filter(arg))
          return undefined;
        return j(arg).paths();
      });
    },
  };
  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.CallExpression);
}

export function useCallExpression(j: JSCodeshift) {
  usePlugin(j, callExpressionPlugin);
}

export function objectExpressionFilter(j: JSCodeshift): ArgumentsFilter {
  return (arg) => isObjectExpression(j, arg);
}
