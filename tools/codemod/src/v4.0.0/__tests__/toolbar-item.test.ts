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

    defineInlineTest(
      transform,
      {},
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, { internalData: {} });
      `,
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {});
      `,
      "should update in `ToolbarItemUtilities.createActionItem`"
    );

    defineInlineTest(
      transform,
      {},
      `
      ToolbarItemUtilities.createGroupItem("item1", 100, "icon", "label", [], { internalData: {} });
      `,
      `
      ToolbarItemUtilities.createGroupItem("item1", 100, "icon", "label", [], {});
      `,
      "should update in `ToolbarItemUtilities.createGroupItem`"
    );

    defineInlineTest(
      transform,
      {},
      `
      ToolbarItemUtilities.createCustomItem("item1", 100, "icon", "label", <Panel />, { internalData: {} });
      `,
      `
      ToolbarItemUtilities.createCustomItem("item1", 100, "icon", "label", <Panel />, {});
      `,
      "should update in `ToolbarItemUtilities.createCustomItem`"
    );
  });
});
