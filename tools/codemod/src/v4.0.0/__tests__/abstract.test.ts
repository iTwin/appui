/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { defaultOptions } from "../../utils/TestUtils";

describe("abstract", () => {
  defineTest(__dirname, "./abstract", defaultOptions, "abstract", {
    parser: "tsx",
  });
});
