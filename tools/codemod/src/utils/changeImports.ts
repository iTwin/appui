/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, ImportDeclaration, ImportSpecifier, JSCodeshift, Collection } from "jscodeshift";
import retainFirstComment from "./retainFirstComment";

export type ImportChanges = Map<string, string>;

interface MovedSpecifier {
  specifier: ImportSpecifier;
  key: string;
}

export default function changeImports(j: JSCodeshift, root: Collection, changes: ImportChanges) {
  retainFirstComment(j, root, () => {
    const specifiersByDeclaration = new Map<ASTPath<ImportDeclaration>, MovedSpecifier[]>();
    const importDeclarations = root
      .find(ImportDeclaration)
      .filter((path) => {
        let api: string;
        const declaration = path.value;
        const from = declaration.source.value;

        let movedSpecifiers: MovedSpecifier[] = [];
        const specifiers = path.value.specifiers || [];
        for (const specifier of specifiers) {
          if (specifier.type === "ImportSpecifier") {
            api = specifier.imported.name;
            const key = `${from}.${api}`;
            if (!changes.has(key))
              continue;

            movedSpecifiers.push({
              specifier,
              key,
            });
          }
        }

        if (movedSpecifiers.length === 0)
          return false;

        specifiersByDeclaration.set(path, movedSpecifiers);
        return true;
      });

    for (const [declaration, declarationSpecifiers] of specifiersByDeclaration) {
      // Figure out new imports.
      const newImports = new Map<string, Array<string>>();
      for (const specifier of declarationSpecifiers) {
        const replacement = changes.get(specifier.key);
        if (!replacement)
          continue;

        const [pckg, name] = replacement.split(".");
        let newImport = newImports.get(pckg);
        if (!newImport) {
          newImport = [];
          newImports.set(pckg, newImport);
        }
        newImport.push(name);
      }

      // Add new import declarations.
      for (const [pckg, specifierNames] of newImports) {
        const specifiers = specifierNames.map((name) => j.importSpecifier(j.identifier(name)));
        const importDeclaration = j.importDeclaration(specifiers, j.literal(pckg));
        declaration.insertAfter(importDeclaration);
      }
    }

    importDeclarations.forEach((path) => {
      path.replace();
    });
  });
}
