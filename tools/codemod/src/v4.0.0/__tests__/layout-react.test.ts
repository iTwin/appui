/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { defaultOptions } from "../../utils/TestUtils";

describe("layout-react", () => {
  defineTest(__dirname, "./layout-react", defaultOptions, "layout-react", {
    parser: "tsx",
  });
});
