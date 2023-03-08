/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest, defineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../full";

const transform = tsxModule(createInlineTransform(transformer));

describe("full", () => {
  defineTest(__dirname, "./full", null, "full", { parser: "tsx" });
});
