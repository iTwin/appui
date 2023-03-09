/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { CallExpression, Collection, JSCodeshift, MemberExpression } from "jscodeshift";
import { isIdentifier, isObjectExpression } from "./typeGuards";
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
  renameTo(name: string): this;
}

type ArgumentsFilter = (arg: CallExpression["arguments"][0]) => boolean;

function callExpressionPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    findCallExpressions(this: Collection, name) {
      return this.find(j.CallExpression, (expr) => {
        const expression = toExpressionName(expr.callee);
        return expression === name;
      }) as CallExpressionCollection;
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
    renameTo(this: CallExpressionCollection, name) {
      const callee = toExpressionKind(j, name);
      return this.forEach((path) => {
        path.value.callee = callee;
      });
    }
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

export type ExpressionKind = MemberExpression["object"];

export function toExpressionName(kind: ExpressionKind) {
  let name = "";
  while (kind) {
    if (isIdentifier(kind)) {
      name = `${kind.name}${name}`;
      break;
    }
    if (kind.type === "MemberExpression" && kind.property.type === "Identifier") {
      name = `.${kind.property.name}${name}`
      kind = kind.object;
      continue;
    }
    break;
  }
  return name;
}

export function toExpressionKind(j: JSCodeshift, name: string): ExpressionKind {
  const parts = name.split(".");
  const obj = parts.slice(0, -1).join(".");
  const prop = parts[parts.length - 1];
  const expr = j.memberExpression(j.identifier(obj), j.identifier(prop));
  return expr;
}
