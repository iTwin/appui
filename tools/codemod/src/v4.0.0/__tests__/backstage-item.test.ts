/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../backstage-item";

const transform = tsxModule(createInlineTransform(transformer));

describe("backstage-item", () => {
  describe("BackstageItem", () => {
    defineInlineTest(
      transform,
      {},
      `
      const w: BackstageItem = {
        id: "item1",
        applicationData: {},
        internalData: {},
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: BackstageItem = {
        id: "item1",
        badge: BadgeType.New
      };
      `,
      "should update properties"
    );

    defineInlineTest(
      transform,
      {},
      `
      BackstageItemUtilities.createStageLauncher("frontstage1", 100, 10, "label", "subtitle", "icon", {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      BackstageItemUtilities.createStageLauncher("frontstage1", 100, 10, "label", "subtitle", "icon", {
        badge: BadgeType.New
      });
      `,
      "should update in `BackstageItemUtilities.createStageLauncher`"
    );

    defineInlineTest(
      transform,
      {},
      `
      BackstageItemUtilities.createActionItem("item1", 100, 10, () => {}, "label", "subtitle", "icon", {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      BackstageItemUtilities.createActionItem("item1", 100, 10, () => {}, "label", "subtitle", "icon", {
        badge: BadgeType.New
      });
      `,
      "should update in `BackstageItemUtilities.createActionItem`"
    );
  });
});
