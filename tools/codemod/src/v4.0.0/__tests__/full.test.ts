/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { createDefineInlineCssTest, defaultOptions } from "../../utils/TestUtils";
import { cssPlugin } from "../full";

const defineInlineCssTest = createDefineInlineCssTest([cssPlugin]);

describe("full", () => {
  defineTest(__dirname, "./full", defaultOptions, "full", { parser: "tsx" });

  describe("CSS", () => {
    defineInlineCssTest(
      `.btn { transition-duration: $uicore-speed-fast; }`,
      `.btn { transition-duration: var(--iui-duration-1); }`,
      "should replace variable"
    );

    defineInlineCssTest(
      `.btn { transition-duration: calc(2s - #{$uicore-speed-slow + $uicore-speed-fast}); }`,
      `.btn { transition-duration: calc(2s - #{var(--iui-duration-3) + var(--iui-duration-1)}); }`,
      "should replace variables inside interpolation"
    );

    defineInlineCssTest(
      `.btn { @include uicore-font-family; }`,
      `.btn { font-family: var(--iui-font-sans); }`,
      "should replace mixin"
    );

    defineInlineCssTest(
      `
        /* Test. */
        .btn {
          // color: $uicore-xxs;
          padding: 0 $uicore-xxs;
          margin: 12px;
          transition-duration: $uicore-speed-fast;
          height: $uicore-component-height-large;

          @include uicore-font-family;
        }
      `,
      `
        /* Test. */
        .btn {
          // color: $uicore-xxs;
          padding: 0 var(--iui-size-3xs);
          margin: 12px;
          transition-duration: var(--iui-duration-1);
          height: 32px;

          font-family: var(--iui-font-sans);
        }
      `,
      "should update multiple values"
    );
  });
});
