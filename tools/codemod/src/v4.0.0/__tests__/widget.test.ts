/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest, defineTest } from "jscodeshift/src/testUtils";
import transformer from "../widget";

const transform = {
  default: (file, api) => {
    const source = transformer(file, api);
    const j = api.jscodeshift;
    const root = j(source);
    return root.toSource({
      lineTerminator: "\n",
    });
  },
  parser: "tsx" as const,
};

describe("widget", () => {
  defineTest(__dirname, "./widget", null, "widget", { parser: "tsx" });

  defineInlineTest(
    transform,
    {},
    `
    const w: Widget = {
      id: "w1",
      isFloatingStateSupported: false,
    };
    `,
    `
    const w: Widget = {
      id: "w1",
      canFloat: false,
    };
    `,
    "should rename to `canFloat`"
  );

  defineInlineTest(
    transform,
    {},
    `
    const w: Widget = {
      id: "w1",
      isFloatingStateWindowResizable: false,
      floatingContainerId: "123",
      defaultFloatingPosition: { x: 10, y: 20 },
      defaultFloatingSize: { width: 100, height: 200 },
      hideWithUiWhenFloating: true,
    };
    `,
    `
    const w: Widget = {
      id: "w1",

      canFloat: {
        isResizable: false,
        containerId: "123",
        defaultPosition: { x: 10, y: 20 },
        defaultSize: { width: 100, height: 200 },
        hideWithUi: true
      }
    };
    `, // TODO: a redundant \n https://github.com/benjamn/recast/issues/242
    "should use `canFloat` options object"
  );
});
