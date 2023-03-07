/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";

describe("frontstage-to-config", () => {
  defineTest(__dirname, "./frontstage-to-config", null, "frontstage-to-config/Frontstage", { parser: "tsx" });
});
