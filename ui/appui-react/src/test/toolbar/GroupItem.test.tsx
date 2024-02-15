/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { BadgeType, CommandItemDef, GroupItemDef } from "../../appui-react";
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
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
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
