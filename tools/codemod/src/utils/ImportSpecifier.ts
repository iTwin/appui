/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { Collection, ImportDeclaration, ImportSpecifier, JSCodeshift } from "jscodeshift";
import { isImportSpecifier } from "./typeGuards";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  findSpecifiers(importedName?: string): ImportSpecifierCollection;
}

type ImportSpecifierCollection = Collection<ImportSpecifier> & ImportSpecifierMethods;

interface ImportSpecifierMethods {
  getLocalName(): string;
  isUsed(): boolean;
}

function importSpecifierPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    findSpecifiers(this: Collection, name) {
      const filter = name ? { imported: { name } } : undefined;
      return this.find(j.ImportSpecifier, filter) as ImportSpecifierCollection;
    },
  };
  const methods: ImportSpecifierMethods = {
    getLocalName(this: ImportSpecifierCollection) {
      const node = this.nodes()[0];
      if (!node)
        return "";
      return node.local?.name || "";
    },
    isUsed(this: ImportSpecifierCollection) {
      const root = this.closest(j.Program);
      const name = this.getLocalName();
      const identifiers = findRootIdentifiers(j, root, name);
      return identifiers.size() > 0;
    }
  };
  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.ImportSpecifier);
}

export function useImportSpecifier(j: JSCodeshift) {
  usePlugin(j, importSpecifierPlugin);
}

export function findRootIdentifiers(j: JSCodeshift, collection: Collection, name: string) {
  return collection.find(j.Identifier)
    .filter((path) => {
      return path.value.name === name;
    })
    .filter((path) => {
      return path.name !== "property"
        && path.name !== "local"
        && path.name !== "imported";
    });
}

export function sortSpecifiers(j: JSCodeshift, specifiers: Required<ImportDeclaration>["specifiers"]) {
  return specifiers.sort((a, b) => {
    if (a.type !== b.type) {
      if (a.type === "ImportDefaultSpecifier")
        return 1;
      if (b.type === "ImportDefaultSpecifier")
        return -1;
    }
    if (isImportSpecifier(j, a) && isImportSpecifier(j, b)) {
      return a.imported.name.localeCompare(b.imported.name);
    }
    return 0;
  });
}
