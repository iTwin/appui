/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, ImportDeclaration, ImportSpecifier, JSCodeshift, Collection } from "jscodeshift";
import retainFirstComment from "./retainFirstComment";
import { isJSXIdentifier } from "./typeGuards";

export type ImportChanges = Map<string, string>;

function splitChangePath(change: string): [string, string] {
  const substrings = change.split(".");
  if (substrings.length !== 2)
    throw new Error(`Import change '${change}' should define both package and declaration, i.e. '@scope/package.Component'.`)
  return [substrings[0], substrings[1]];
}

function findReplacement(key: string, changes: ImportChanges) {
  const replacement = changes.get(key);
  if (!replacement)
    return undefined;

  const [pckg, name] = splitChangePath(replacement);
  return { pckg, name };
}

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
        const replacement = findReplacement(specifier.key, changes);
        if (!replacement)
          continue;

        const { pckg, name } = replacement;
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

    const specifiers = Array.from(specifiersByDeclaration.values()).reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, [])
    root.findJSXElements().forEach((node) => {
      const identifier = node.value.openingElement.name;
      if (!isJSXIdentifier(j, identifier))
        return;

      const specifier = specifiers.find((s) => s.specifier.local?.name === identifier.name);
      if (!specifier)
        return;

      if (specifier.specifier.local?.name === identifier.name) {
        const replacement = findReplacement(specifier.key, changes);
        if (!replacement)
          return;

        identifier.name = replacement.name;
      }
    });

    // Remove old declarations.
    importDeclarations.forEach((path) => {
      path.replace();
    });
  });
}
