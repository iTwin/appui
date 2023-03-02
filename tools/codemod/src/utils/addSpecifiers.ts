/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Collection, ImportDeclaration, ImportSpecifier, JSCodeshift } from "jscodeshift";
import { isImportSpecifier } from "./typeGuards";

export default function addSpecifiers(j: JSCodeshift, root: Collection, specifiers: ImportSpecifier[], pckg: string) {
  const existingDeclarations = root.find(ImportDeclaration, (declaration) => {
    return declaration.source.value === pckg;
  });
  if (existingDeclarations.size() === 0) {
    return j.importDeclaration(sortSpecifiers(j, specifiers), j.literal(pckg));
  }

  const declaration = existingDeclarations.nodes()[0];
  const existingSpecifiers = declaration.specifiers || [];
  const newSpecifiers = specifiers.filter((specifier) => !existingSpecifiers.find((existingSpecifier) => {
    if (isImportSpecifier(j, existingSpecifier)) {
      return existingSpecifier.imported.name === specifier.imported.name;
    }
    return false;
  }));
  declaration.specifiers = sortSpecifiers(j, [...declaration.specifiers || [], ...newSpecifiers]);
  return undefined;
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
