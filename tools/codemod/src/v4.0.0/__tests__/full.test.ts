/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";

describe("full", () => {
  defineTest(__dirname, "./full", null, "full", { parser: "tsx" });
});
