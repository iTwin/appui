/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ASTNode, ASTPath, Collection, JSCodeshift } from "jscodeshift";
import type { ASTNode as ASTNodeType, Type } from "ast-types/lib/types";
import type { NodePath } from "ast-types/lib/node-path";
import {
  toExpression,
  toExpressionName,
  useCallExpression,
} from "./CallExpression";
import {
  ImportDeclarationCollection,
  useImportDeclaration,
} from "./ImportDeclaration";
import { findRootIdentifiers, useImportSpecifier } from "./ImportSpecifier";
import retainFirstComment from "./retainFirstComment";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods<N> {}
}

interface GlobalMethods<N> {
  path(): ASTPath<N>;
  node(): N;
  first(): this;
  nonEmpty(): this | undefined;
  single(): this | undefined;
  navigatePath(...path: (string | number)[]): Collection<any>;
  findInChildren<T extends ASTNodeType>(
    type: Type<T>,
    filter?: RecursiveMatchNode<T>,
    pathName?: string
  ): Collection<T>;
  forEachAsCollection(
    callback: (path: Collection<N>, i: number, paths: ASTPath<N>[]) => void
  ): this;
  filterPath(pathName: string): this;
  filterType<T extends ASTNodeType>(type: Type<T>): Collection<T>;
  removeFromParentPath(): this;
  contains(other: Collection): boolean;
  concat(other: Collection): this;
  rename(source: string, target: string): this;
}

function extensionsPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods<ASTNode> = {
    /** Returns the first path in the collection */
    path(this: Collection) {
      return this.paths()[0];
    },
    /** Returns the first node in this collection */
    node(this: Collection) {
      return this.nodes()[0];
    },
    first(this: Collection) {
      return this.at(0);
    },
    nonEmpty(this: Collection) {
      return this.length > 0 ? this : undefined;
    },
    single(this: Collection) {
      return this.length === 1 ? this : undefined;
    },
    navigatePath(this: Collection, ...path) {
      return j(this.get(...path));
    },
    /** An alternative to find that only traverses paths of the immediate children of each path in the collection */
    findInChildren(this: Collection, type, filter, pathName) {
      const paths: ASTPath[] = [];
      const visitorMethodName = "visit" + type;

      this.forEach((parentPath: ASTPath) => {
        const visitor = {
          [visitorMethodName]: function (path: ASTPath) {
            if (path === parentPath) {
              this.traverse(path);
              return false;
            }

            if (!path.parentPath || path.parentPath.node !== parentPath.node)
              return false;

            if (pathName && !isFromPath(path, pathName)) return false;

            if (!filter || matchNode(path.value, filter)) paths.push(path);

            return false;
          },
        };
        j.types.PathVisitor.visit(parentPath as any, visitor);
      });
      return j(paths);

      // Implementation with jscodeshift api only
      /* return this.map((parentPath) =>
        j(parentPath)
          .find(type, filter)
          .filter((childPath) => {
            if (childPath.parentPath.node !== parentPath.node) return false;
            if (nodePathName) {
              const childNodePathName =
                typeof childPath.name === "number"
                  ? childPath.parentPath.name
                  : childPath.name;
              return nodePathName === childNodePathName;
            }
            return true;
          })
          .paths()
      );*/
    },
    forEachAsCollection(this: Collection, callback) {
      return this.forEach((path, i, paths) => callback(j(path), i, paths));
    },
    filterPath(this: Collection, pathName) {
      return this.filter((path) => isFromPath(path, pathName));
    },
    filterType(this: Collection, type) {
      return this.filter((path) => type.check(path.value));
    },
    removeFromParentPath(this: Collection) {
      return this.forEach((path) => {
        const value = path.parentPath?.value;
        if (Array.isArray(value)) {
          const index = value.indexOf(path.node);
          index >= 0 && value.splice(index, 1);
        }
      });
    },
    contains(this: Collection, other) {
      const paths = this.paths();
      const otherPaths = other.paths();
      for (const path of paths) {
        if (otherPaths.indexOf(path) >= 0) return true;
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

      if (sourceStr === "" || targetStr === "")
        throw new Error(
          `Expected non empty strings in rename("${sourceStr}", "${targetStr}")`
        );

      const source = parseRename(sourceStr);
      const target = parseRename(targetStr);

      const sourceDeclarations = this.findImportDeclarations(source.module);
      const sourceSpecifiers = sourceDeclarations.findSpecifiers(
        source.specifier
      );

      const targetDeclarations = this.findImportDeclarations(target.module);
      const targetSpecifiers = targetDeclarations.findSpecifiers(
        target.specifier
      );
      if (sourceSpecifiers.size() + targetSpecifiers.size() === 0) return this;

      const sourceLocalSpecifierName =
        sourceSpecifiers.getLocalName() || source.specifier;
      const sourceExpr = updateExpressionSpecifier(
        source.expr,
        sourceLocalSpecifierName
      );

      retainFirstComment(j, this, () => {
        let renamed = false;

        const callExpressions = this.findCallExpressions(sourceExpr);
        callExpressions.renameTo(target.expr);
        if (callExpressions.size() > 0) {
          renamed = true;
        }

        this.find(j.MemberExpression)
          .filter((path) => {
            const expression = toExpressionName(path.value);
            return expression === sourceExpr;
          })
          .forEach((path) => {
            const callee = toExpression(j, target.expr);
            path.replace(callee);
            renamed = true;
          });

        if (source.isIdentifier) {
          findRootIdentifiers(j, this, sourceExpr).forEach((path) => {
            const callee = toExpression(j, target.expr);
            path.replace(callee);
            renamed = true;
          });
        }

        this.findJSXElements(sourceExpr).forEach((path) => {
          const identifier = path.value.openingElement.name as ASTNode;
          if (identifier.type !== "JSXIdentifier") {
            return;
          }

          identifier.name = target.expr;
          const closingIdentifier = path.value.closingElement?.name;
          if (closingIdentifier && closingIdentifier.type === "JSXIdentifier") {
            closingIdentifier.name = target.expr;
          }
          renamed = true;
        });

        const targetDeclarations = this.findImportDeclarations(target.module);
        const targetSpecifiers = targetDeclarations.findSpecifiers(
          target.specifier
        );

        // Add new declaration.
        if (targetDeclarations.size() === 0 && renamed) {
          const newDeclaration = j.importDeclaration(
            [j.importSpecifier(j.identifier(target.specifier))],
            j.literal(target.module)
          );
          sourceDeclarations.insertAfter(newDeclaration);
        }

        // Use existing target declaration.
        if (
          targetDeclarations.size() > 0 &&
          targetSpecifiers.size() === 0 &&
          renamed
        ) {
          targetDeclarations
            .first()
            .addSpecifier(j.importSpecifier(j.identifier(target.specifier)))
            .sortSpecifiers();
        }

        if (renamed && sourceLocalSpecifierName === target.specifier) {
          sourceDeclarations.removeSpecifier(source.specifier);
        } else if (!sourceSpecifiers.isUsed()) {
          sourceDeclarations.removeSpecifier(source.specifier);
        }
      });

      return this;
    },
  };
  j.registerMethods(globalMethods);
}

export function useExtensions(j: JSCodeshift) {
  usePlugin(j, extensionsPlugin);
}

type RecursiveMatchNode<T> =
  | (T extends {}
      ? {
          [K in keyof T]?: RecursiveMatchNode<T[K]>;
        }
      : T)
  | ((value: T) => boolean);

const hasOwn = Object.prototype.hasOwnProperty.call.bind(
  Object.prototype.hasOwnProperty
);

function isNode(value: any): boolean {
  return typeof value === "object" && value;
}

function matchNode(haystack: any, needle: any): boolean {
  if (typeof needle === "function") {
    return needle(haystack);
  }
  if (isNode(needle) && isNode(haystack)) {
    return Object.keys(needle).every(
      (property) =>
        hasOwn(haystack, property) &&
        matchNode(haystack[property], needle[property])
    );
  }
  return haystack === needle;
}

function isFromPath(path: ASTPath<any>, pathName: string): boolean {
  if (typeof path.name === "number")
    return path.parentPath ? path.parentPath.name === pathName : false;

  return path.name === pathName;
}

function parseRename(rename: string) {
  let substrings = rename.split(":");
  if (substrings.length === 1) {
    return {
      module: "",
      ...parseExpression(rename),
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
