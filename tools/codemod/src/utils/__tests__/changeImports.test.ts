/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { API, FileInfo } from "jscodeshift";
import { defineInlineTest } from "jscodeshift/src/testUtils";
import changeImports, { ImportChanges } from "../changeImports";

function createTransform(changes: ImportChanges) {
  return (file: FileInfo, api: API) => {
    const j = api.jscodeshift;
    const root = j(file.source);
    changeImports(j, root, changes);
    return root.toSource();
  };
}

describe("changeImports", () => {
  defineInlineTest(createTransform(new Map([
    ["@itwin/from.x", "@itwin/to.x"],
  ])), {}, `
    import { x } from "@itwin/from";
  `, `
    import { x } from "@itwin/to";
  `, "should change a single specifier");

  defineInlineTest(createTransform(new Map([
    ["@itwin/from.x", "@itwin/to.x"],
    ["@itwin/from.y", "@itwin/to.y"],
  ])), {}, `
    import { x, y } from "@itwin/from";
  `, `
    import { x, y } from "@itwin/to";
  `, "should change multiple specifiers");
});
