/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";

describe("widget", () => {
  defineTest(__dirname, "./widget", null, "widget", { parser: "tsx" });
});
