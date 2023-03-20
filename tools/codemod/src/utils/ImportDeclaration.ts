/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { Collection, ImportDeclaration, ImportSpecifier, JSCodeshift } from "jscodeshift";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  findImportDeclarations(name?: string): ImportDeclarationCollection;
}

type ImportDeclarationCollection = Collection<ImportDeclaration> & ImportDeclarationMethods;

interface ImportDeclarationMethods {
}

function importDeclarationPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    findImportDeclarations(this: Collection, name) {
      const filter = name ? { source: { value: name } } : undefined;
      return this.find(j.ImportDeclaration, filter) as ImportDeclarationCollection;
    },
  };
  const methods: ImportDeclarationMethods = {
  };
  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.ImportDeclaration);
}

export function useImportDeclaration(j: JSCodeshift) {
  usePlugin(j, importDeclarationPlugin);
}
