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
  `, "should move a single specifier");

  defineInlineTest(createTransform(new Map([
    ["@itwin/from.x", "@itwin/to.x"],
    ["@itwin/from.y", "@itwin/to.y"],
  ])), {}, `
    import { x, y } from "@itwin/from";
  `, `
    import { x, y } from "@itwin/to";
  `, "should move multiple specifiers");

  defineInlineTest(createTransform(new Map([
    ["@itwin/from.x", "@itwin/to.y"],
  ])), {}, `
    import { x } from "@itwin/from";
  `, `
    import { y } from "@itwin/to";
  `, "should change a specifier");

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
    "should change component name in JSX"
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
    "should change component names in JSX"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.x", "@itwin/to.x"],
    ])),
    {},
    `
    import { x } from "@itwin/from";
    import { a } from "@itwin/to";
    `,
    `
    import { a, x } from "@itwin/to";
    `,
    "should merge declarations"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.aa", "@itwin/to.bc"],
      ["@itwin/from.ab", "@itwin/to.ba"],
      ["@itwin/from.ac", "@itwin/to.bb"],
    ])),
    {},
    `
    import { aa, ab, ac } from "@itwin/from";
    `,
    `
    import { ba, bb, bc } from "@itwin/to";
    `,
    "should sort moved specifiers"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.a", "@itwin/to.b"],
    ])),
    {},
    `
    import { a } from "@itwin/from";
    import { d } from "@itwin/to";
    `,
    `
    import { b, d } from "@itwin/to";
    `,
    "should sort merged specifiers"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.A", "@itwin/to.B.C"],
    ])),
    {},
    `
    import { A } from "@itwin/from";
    <A />
    `,
    `
    import { B } from "@itwin/to";
    <B.C />
    `,
    "should change to property access in JSX"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.a", "@itwin/to.b"],
    ])),
    {},
    `
    import { a } from "@itwin/from";
    import { b } from "@itwin/to";
    `,
    `
    import { b } from "@itwin/to";
    `,
    "should not add duplicate specifiers to existing declaration"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.a", "@itwin/to.c"],
      ["@itwin/from.b", "@itwin/to.c.d"],
    ])),
    {},
    `
    import { a, b } from "@itwin/from";
    `,
    `
    import { c } from "@itwin/to";
    `,
    "should not add duplicate specifiers"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.a", "@itwin/to.a"],
    ])),
    {},
    `
    import { a, c } from "@itwin/from";
    `,
    `
    import { c } from "@itwin/from";
    import { a } from "@itwin/to";
    `,
    "should remove changed specifier"
  );

  defineInlineTest(
    createTransform(new Map([
      ["@itwin/from.a", ""],
    ])),
    {},
    `
    import { a, b } from "@itwin/from";
    `,
    `
    import { b } from "@itwin/from";
    `,
    "should remove specifier"
  );
});
