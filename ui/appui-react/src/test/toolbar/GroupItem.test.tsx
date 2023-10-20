/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { BadgeType } from "@itwin/appui-abstract";
import { CommandItemDef, GroupItemDef } from "../../appui-react";
import TestUtils from "../TestUtils";

const tool1 = new CommandItemDef({
  commandId: "tool1",
  label: "Tool 1",
  iconSpec: "icon-placeholder",
  badgeType: BadgeType.New,
});

const tool2 = new CommandItemDef({
  commandId: "tool2",
  label: "Tool 2",
  iconSpec: "icon-placeholder",
  applicationData: { key: "value" },
});

describe("GroupItem", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  describe("GroupItemDef", () => {
    it("setPanelLabel sets panel label correctly", () => {
      const panelLabel = "panel-label";
      const groupItemDef = new GroupItemDef({
        groupId: "my-group1",
        panelLabel,
        iconSpec: "icon-placeholder",
        items: [tool1, tool2],
      });

      expect(groupItemDef.panelLabel).to.eq(panelLabel);

      const newPanelLabel = "New Panel Label";
      groupItemDef.setPanelLabel(newPanelLabel);
      expect(groupItemDef.panelLabel).to.eq(newPanelLabel);
    });

    it("should generate id correctly", () => {
      const groupItemDef = new GroupItemDef({
        iconSpec: "icon-placeholder",
        items: [tool1, tool2],
      });

      expect(
        groupItemDef.id.substring(0, GroupItemDef.groupIdPrefix.length)
      ).to.eq(GroupItemDef.groupIdPrefix);
    });
  });
});
