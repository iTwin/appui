/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/testUtils";
import transform from "../backstage-item";

const defineInlineTest = createDefineInlineTest(transform);

describe("backstage-item", () => {
  describe("BackstageItem", () => {
    defineInlineTest(
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
        badge: BadgeType.New,
      };
      `,
      "should update properties"
    );

    defineInlineTest(
      `
      BackstageItemUtilities.createStageLauncher("frontstage1", 100, 10, "label", "subtitle", "icon", {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      BackstageItemUtilities.createStageLauncher("frontstage1", 100, 10, "label", "subtitle", "icon", {
        badge: BadgeType.New,
      });
      `,
      "should update in `BackstageItemUtilities.createStageLauncher`"
    );

    defineInlineTest(
      `
      BackstageItemUtilities.createActionItem("item1", 100, 10, () => {}, "label", "subtitle", "icon", {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      BackstageItemUtilities.createActionItem("item1", 100, 10, () => {}, "label", "subtitle", "icon", {
        badge: BadgeType.New,
      });
      `,
      "should update in `BackstageItemUtilities.createActionItem`"
    );
  });
});
