/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  createDefineInlineCssTest,
  createDefineInlineTest,
} from "../../utils/TestUtils";
import { cssPlugin } from "../full";
import transformer from "../full";

import input from "../__testfixtures__/full.input?raw";
import output from "../__testfixtures__/full.output?raw";

const defineInlineTest = createDefineInlineTest(transformer);
const defineInlineCssTest = createDefineInlineCssTest([cssPlugin]);

describe("full", () => {
  defineInlineTest(input, output, "transforms correctly");

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
      /* Copyright. */
      @import "@itwin/core-react/lib/cjs/core-react/button/blue";

      .btn { }
      `,
      `
      /* Copyright. */

      .btn { }
      `,
      "should replace import"
    );

    defineInlineCssTest(
      `
      /* Copyright. */
      @import "~@itwin/core-react/lib/cjs/core-react/button/blue";

      .btn { }
      `,
      `
      /* Copyright. */

      .btn { }
      `,
      "should replace tilde import"
    );

    defineInlineCssTest(
      `
        @import "~@itwin/core-react/lib/cjs/core-react/button";
        @import "~@itwin/core-react/lib/cjs/core-react/button/purple";
        @import "@itwin/core-react/lib/esm/core-react/style/speed";

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
        @import "~@itwin/core-react/lib/cjs/core-react/button/purple";

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
