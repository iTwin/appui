/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { ASTNode, Collection, JSCodeshift } from "jscodeshift";
import { toExpressionKind, toExpressionName, useCallExpression } from "./CallExpression";
import { useImportDeclaration } from "./ImportDeclaration";
import { sortSpecifiers, useImportSpecifier } from "./ImportSpecifier";
import retainFirstComment from "./retainFirstComment";
import { isJSXIdentifier } from "./typeGuards";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  contains(other: Collection): boolean;
  concat(other: Collection): this;
  rename(from: string, to: string): this;
}

function extensionsPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    contains(this: Collection, other) {
      const paths = this.paths();
      const otherPaths = other.paths();
      for (const path of paths) {
        if (otherPaths.indexOf(path) >= 0)
          return true;
      }
      return false;
    },
    concat(this: Collection, other) {
      const paths = [...this.paths(), ...other.paths()];
      const proto = Object.getPrototypeOf(this);
      const collection = new proto.constructor(paths, this, this.getTypes());
      return collection;
    },
    rename(this: Collection, sourceStr, targetStr) {
      useImportDeclaration(j);
      useImportSpecifier(j);
      useCallExpression(j);

      const source = parseRename(sourceStr);
      const target = parseRename(targetStr);

      const sourceDeclarations = this.findImportDeclarations(source.module);
      const sourceSpecifiers = sourceDeclarations.findSpecifiers(source.specifier);

      const sourceLocalSpecifierName = sourceSpecifiers.getLocalName() || source.specifier;
      const sourceExpr = updateExpressionSpecifier(source.expr, sourceLocalSpecifierName);

      retainFirstComment(j, this, () => {
        let updateSpecifiers = false;
        if (source.isIdentifier) {
          const rootIdentifiers = this.find(j.Identifier)
            .filter((path) => {
              const expression = toExpressionName(path.value);
              return expression === sourceExpr;
            })
            .filter((path) => {
              return path.name !== "property"
                && path.name !== "local"
                && path.name !== "imported";
            });
          rootIdentifiers.forEach((path) => {
            const callee = toExpressionKind(j, target.expr);
            path.replace(callee);
            updateSpecifiers = true;
          });
        } else {
          const callExpressions = this.findCallExpressions(sourceExpr);
          callExpressions.renameTo(target.expr);
          if (callExpressions.size() > 0) {
            updateSpecifiers = true;
          }

          const memberExpressions = this.find(j.MemberExpression).filter((path) => {
            const expression = toExpressionName(path.value);
            return expression === sourceExpr;
          });
          memberExpressions.forEach((path) => {
            const callee = toExpressionKind(j, target.expr);
            path.replace(callee);
            updateSpecifiers = true;
          });
        }

        this.findJSXElements(sourceExpr).forEach((path) => {
          const identifier = path.value.openingElement.name as ASTNode;
          if (!isJSXIdentifier(identifier)) {
            return;
          }

          identifier.name = target.expr;
          const closingIdentifier = path.value.closingElement?.name;
          if (closingIdentifier && isJSXIdentifier(closingIdentifier)) {
            closingIdentifier.name = target.expr;
          }
          updateSpecifiers = true;
        });

        if (!updateSpecifiers)
          return;

        const targetDeclarations = this.findImportDeclarations(target.module);
        const targetSpecifiers = targetDeclarations.findSpecifiers(target.specifier);
        const isMoved = target.specifier === sourceLocalSpecifierName;
        if (isMoved || !sourceSpecifiers.isUsed()) {
          sourceSpecifiers.remove();
        }

        // Add new declaration.
        if (targetDeclarations.size() === 0 && target.module) {
          const newDeclaration = j.importDeclaration([j.importSpecifier(j.identifier(target.specifier))], j.literal(target.module));
          sourceDeclarations.insertAfter(newDeclaration);
        }

        // Use existing target declaration.
        if (targetDeclarations.size() > 0 && targetSpecifiers.size() === 0) {
          const targetDeclaration = targetDeclarations.nodes()[0];
          targetDeclaration.specifiers = sortSpecifiers(j, [
            ...targetDeclaration.specifiers ?? [],
            j.importSpecifier(j.identifier(target.specifier)),
          ]);
        }

        // Remove empty source declarations.
        sourceDeclarations.forEach((path) => {
          const specifiers = path.value.specifiers || [];
          if (specifiers.length === 0)
            path.replace();
        });
      });


      return this;
    }
  };
  j.registerMethods(globalMethods);
}

export function useExtensions(j: JSCodeshift) {
  usePlugin(j, extensionsPlugin);
}

function parseRename(rename: string) {
  let substrings = rename.split(":");
  if (substrings.length === 1) {
    return {
      module: "",
      ...parseExpression(rename)
    };
  }
  const module = substrings[0];
  const expr = substrings[1];
  return {
    module,
    ...parseExpression(expr),
  };
}

function parseExpression(expr: string) {
  const substrings = expr.split(".");
  let specifier = substrings[0];
  const isIndexedAccessType = expr.includes("[") && expr.includes("]");
  const isIdentifier = substrings.length === 1;
  if (isIndexedAccessType) {
    specifier = expr.split("[")[0];
  }
  return { specifier, expr, isIndexedAccessType, isIdentifier };
}

function updateExpressionSpecifier(expr: string, specifier: string) {
  const substrings = expr.split(".");
  return [specifier, ...substrings.slice(1)].join(".");
}
