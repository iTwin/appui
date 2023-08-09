/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Collection, JSCodeshift, Program, File, ASTPath } from "jscodeshift";
import { usePlugin } from "./usePlugin";
import { useExtensions } from "./Extensions";
import {
  ImportDeclarationCollection,
  useImportDeclaration,
} from "./ImportDeclaration";
import retainFirstComment from "./retainFirstComment";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {}
}

interface GlobalMethods {}

export type FileCollection = Collection<File> & FileMethods;

interface FileMethods {
  findOrCreateImportDeclaration(
    name: string,
    importKind?: "value" | "type" | "typeof"
  ): ImportDeclarationCollection;
}

function filePlugin(j: JSCodeshift) {
  useExtensions(j);

  const globalMethods: GlobalMethods = {};
  const methods: FileMethods = {
    findOrCreateImportDeclaration(
      this: FileCollection,
      name,
      importKind = "value"
    ) {
      useImportDeclaration(j);

      let importDeclaration = this.findImportDeclarations(name);
      importDeclaration = importKind
        ? (importDeclaration.filter(
            (path) => path.value.importKind === importKind
          ) as ImportDeclarationCollection)
        : importDeclaration;

      if (importDeclaration.length > 0) return importDeclaration;

      const newImportDeclaration = j.importDeclaration(
        [],
        j.literal(name),
        importKind
      );

      const program = this.navigatePath("program").path() as ASTPath<Program>;
      const root = this;
      retainFirstComment(j, root, () =>
        program.value.body.unshift(newImportDeclaration)
      );

      const newImportDeclarationPath = new j.types.NodePath(
        newImportDeclaration,
        program,
        0
      );
      return j(newImportDeclarationPath) as ImportDeclarationCollection;
    },
  };

  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.File);
}

export function useFile(j: JSCodeshift) {
  usePlugin(j, filePlugin);
}
