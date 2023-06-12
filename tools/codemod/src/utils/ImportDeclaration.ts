/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Collection, ImportDeclaration, JSCodeshift } from "jscodeshift";
import { useImportSpecifier } from "./ImportSpecifier";
import retainFirstComment from "./retainFirstComment";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {}
}

interface GlobalMethods {
  findImportDeclarations(name?: string): ImportDeclarationCollection;
}

type ImportDeclarationCollection = Collection<ImportDeclaration> &
  ImportDeclarationMethods;

interface ImportDeclarationMethods {
  removeSpecifier(specifier: string): this;
}

function importDeclarationPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    findImportDeclarations(this: Collection, name) {
      const filter = name ? { source: { value: name } } : undefined;
      return this.find(
        j.ImportDeclaration,
        filter
      ) as ImportDeclarationCollection;
    },
  };
  const methods: ImportDeclarationMethods = {
    removeSpecifier(this: ImportDeclarationCollection, specifier) {
      useImportSpecifier(j);

      this.findSpecifiers(specifier).remove();

      const root = this.closest(j.File);
      let collection = this;
      retainFirstComment(j, root, () => {
        collection = this.map((path) => {
          const specifiers = path.value.specifiers || [];
          if (specifiers.length === 0) {
            path.replace();
            return undefined;
          }

          return path;
        }, j.ImportDeclaration) as ImportDeclarationCollection;
      });
      return collection;
    },
  };
  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.ImportDeclaration);
}

export function useImportDeclaration(j: JSCodeshift) {
  usePlugin(j, importDeclarationPlugin);
}
