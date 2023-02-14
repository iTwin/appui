/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";

describe("element-to-config", () => {
  defineTest(__dirname, "./element-to-config", null, "element-to-config/Frontstage", { parser: "tsx" });
});
