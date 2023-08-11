/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { createDefineInlineTest, defaultOptions } from "../../utils/TestUtils";
import transformer from "../widget";

const defineInlineTest = createDefineInlineTest(transformer);

describe("widget", () => {
  defineTest(__dirname, "./widget", defaultOptions, "widget", {
    parser: "tsx",
  });

  defineInlineTest(
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
        hideWithUi: true,
      },
    };
    `, // TODO: a redundant \n https://github.com/benjamn/recast/issues/242
    "should use `canFloat` options"
  );

  defineInlineTest(
    `
    const w: Widget = {
      id: "w1",
      isFloatingStateSupported: true,
      isFloatingStateWindowResizable: false,
    };
    `,
    `
    const w: Widget = {
      id: "w1",

      canFloat: {
        isResizable: false,
      },
    };
    `,
    "should use `canFloat` options if `isFloatingStateSupported` is true"
  );

  defineInlineTest(
    `
    const w: Widget = {
      id: "w1",
      isFloatingStateSupported: false,
      isFloatingStateWindowResizable: false,
    };
    `,
    `
    const w: Widget = {
      id: "w1",
      canFloat: false,
    };
    `,
    "should not use `canFloat` options if `isFloatingStateSupported` is false"
  );
});
