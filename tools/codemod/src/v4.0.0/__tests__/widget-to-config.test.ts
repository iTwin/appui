/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";

describe("widget-to-config", () => {
  defineTest(__dirname, "./widget-to-config", null, "widget-to-config/Widget", { parser: "tsx" });
});
