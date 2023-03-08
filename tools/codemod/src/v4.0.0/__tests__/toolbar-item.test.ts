/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../toolbar-item";

const transform = tsxModule(createInlineTransform(transformer));

describe("toolbar-item", () => {
  describe("ToolbarItem", () => {
    defineInlineTest(
      transform,
      {},
      `
      const w: ToolbarItem = {
        id: "item1",
        applicationData: {},
        internalData: {},
        isPressed: false,
      };
      `,
      `
      const w: ToolbarItem = {
        id: "item1"
      };
      `,
      "should remove properties"
    );
  });
});
