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
    return root.toSource({
      lineTerminator: "\n",
    });
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

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.A", "@itwin/to.B"],
    ])),
    {},
    `
    import { A } from "@itwin/from";
    <A value="x" />
    `,
    `
    import { B } from "@itwin/to";
    <B value="x" />
    `,
    "should update component name in JSX"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.A", "@itwin/to.B"],
      ["@itwin/from.C", "@itwin/to.D"],
    ])),
    {},
    `
    import { A, C } from "@itwin/from";
    function App() {
      return (<>
        <A value="x" />
        <C isOpen={true} />
      </>);
    }
    `,
    `
    import { B, D } from "@itwin/to";
    function App() {
      return (<>
        <B value="x" />
        <D isOpen={true} />
      </>);
    }
    `,
    "should update component names in JSX"
  );
});
