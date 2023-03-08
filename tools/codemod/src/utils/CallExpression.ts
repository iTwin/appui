/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { CallExpression, Collection, JSCodeshift } from "jscodeshift";
import { NodeFilter } from "./NodeFilter";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  findCallExpressions(name?: string): CallExpressionCollection;
}

interface CallExpressionCollection extends Collection<CallExpression>, CallExpressionMethods {
}

interface CallExpressionMethods {
}

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
  const methods: GlobalMethods = {
    findCallExpressions(this: Collection, name) {
      const filter = toFilter(name);
      return this.find(j.CallExpression, filter);
    }
  };
  j.registerMethods(methods);
}

export function useCallExpression(j: JSCodeshift) {
  usePlugin(j, callExpressionPlugin);
}
