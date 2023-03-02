/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, ImportDeclaration, ImportSpecifier, JSCodeshift, Collection } from "jscodeshift";
import addSpecifiers from "./addSpecifiers";
import retainFirstComment from "./retainFirstComment";
import { isJSXIdentifier } from "./typeGuards";

export type ImportChanges = Map<string, string>;

function splitChangePath(change: string) {
  const substrings = change.split(".");
  if (substrings.length < 2)
    throw new Error(`Import change '${change}' should define both package and declaration, i.e. '@scope/package.Component'.`);
  const pckg = substrings[0];
  const other = substrings.slice(1);
  const name = other.join(".");
  const module = substrings.length > 2 ? substrings[1] : undefined;
  return { pckg, name, module };
}

function findReplacement(key: string, changes: ImportChanges) {
  const replacement = changes.get(key);
  if (replacement === undefined)
    return undefined;
  if (replacement === "")
    return "removal";
  return splitChangePath(replacement);
}

interface MovedSpecifier {
  specifier: ImportSpecifier;
  key: string;
}

export default function changeImports(j: JSCodeshift, root: Collection, changes: ImportChanges) {
  retainFirstComment(j, root, () => {
    const specifiersByDeclaration = new Map<ASTPath<ImportDeclaration>, MovedSpecifier[]>();
    root.find(ImportDeclaration).forEach((path) => {
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
        return;

      specifiersByDeclaration.set(path, movedSpecifiers);
    });

    // Add new specifiers.
    for (const [declaration, movedSpecifiers] of specifiersByDeclaration) {
      const newImports = new Map<string, Set<string>>();
      for (const movedSpecifier of movedSpecifiers) {
        const replacement = findReplacement(movedSpecifier.key, changes);
        if (!replacement || replacement === "removal")
          continue;

        const { pckg, name, module } = replacement;
        let newImport = newImports.get(pckg);
        if (!newImport) {
          newImport = new Set();
          newImports.set(pckg, newImport);
        }
        newImport.add(module ? module : name);
      }

      for (const [pckg, specifierNames] of newImports) {
        const specifiers = Array.from(specifierNames).map((name) => j.importSpecifier(j.identifier(name)));
        const newDeclaration = addSpecifiers(j, root, specifiers, pckg);
        newDeclaration && declaration.insertAfter(newDeclaration);
      }
    }

    // Update JSX elements.
    const specifiers = Array.from(specifiersByDeclaration.values()).reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, []);
    root.findJSXElements().forEach((node) => {
      const identifier = node.value.openingElement.name;
      if (!isJSXIdentifier(j, identifier))
        return;

      const specifier = specifiers.find((s) => s.specifier.local?.name === identifier.name);
      if (!specifier)
        return;

      if (specifier.specifier.local?.name === identifier.name) {
        const replacement = findReplacement(specifier.key, changes);
        if (!replacement || replacement === "removal")
          return;

        identifier.name = replacement.name;
        const closingIdentifier = node.value.closingElement?.name;
        if (closingIdentifier && isJSXIdentifier(j, closingIdentifier)) {
          closingIdentifier.name = replacement.name;
        }
      }
    });

    // Remove specifiers.
    for (const [declaration, movedSpecifiers] of specifiersByDeclaration) {
      const specifiersToRemove: Required<ImportDeclaration>["specifiers"] = movedSpecifiers.map((specifier) => specifier.specifier);
      declaration.value.specifiers = declaration.value.specifiers?.filter((currentSpecifier) => {
        return specifiersToRemove.indexOf(currentSpecifier) === -1;
      });

      // Remove declaration.
      if (declaration.value.specifiers?.length === 0) {
        declaration.replace();
      }
    }
  });
}
