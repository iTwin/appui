/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "../../appui-react";
import type {
  ContentGroupProps,
  ContentProps,
} from "../../appui-react/content/ContentGroup";
import { ContentGroup } from "../../appui-react/content/ContentGroup";
import { InternalContentLayoutManager } from "../../appui-react/content/InternalContentLayoutManager";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import { getUniqueId } from "../../appui-react/layout/base/NineZone";
import { StandardContentLayouts } from "../../appui-react/content/StandardContentLayouts";

describe("ContentLayoutManager", () => {
  beforeEach(async () => {
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
  });

  it("activeLayout should return undefined if no active frontstage", () => {
    expect(InternalContentLayoutManager.activeLayout).toEqual(undefined);
  });

  it("activeContentGroup should return undefined if no active frontstage", () => {
    expect(InternalContentLayoutManager.activeContentGroup).toEqual(undefined);
  });

  it("refreshActive should do nothing if no active frontstage", () => {
    InternalContentLayoutManager.refreshActive();
  });

  it("should getForGroup", () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [
      { id: "myContent", classId: "TestContentControl" },
      { id: "myContent2", classId: "TestContentControl" },
    ];
    const key = InternalContentLayoutManager.getKey({
      contentGroupId: uniqueGroupId,
      layoutId: StandardContentLayouts.twoHorizontalSplit.id,
    });

    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const layoutDef = InternalContentLayoutManager.getForGroup(groupProps);
    const foundLayoutDef = InternalContentLayoutManager.find(key);
    expect(foundLayoutDef?.id).toEqual(layoutDef.id);
  });

  it("should getForGroup with overridden layout", () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [
      { id: "myContent", classId: "TestContentControl" },
      { id: "myContent2", classId: "TestContentControl" },
    ];
    const overrideKey = InternalContentLayoutManager.getKey({
      contentGroupId: uniqueGroupId,
      layoutId: StandardContentLayouts.twoVerticalSplit.id,
    });

    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const layoutDef = InternalContentLayoutManager.getForGroup(
      groupProps,
      StandardContentLayouts.twoVerticalSplit
    );
    const foundLayoutDef = InternalContentLayoutManager.find(overrideKey);
    expect(foundLayoutDef?.id).toEqual(layoutDef.id);
  });

  it("should call  InternalFrontstageManager.setActiveContentGroup", async () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [
      { id: "myContent", classId: "TestContentControl" },
      { id: "myContent2", classId: "TestContentControl" },
    ];
    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const contentGroup = new ContentGroup(groupProps);
    const spy = vi
      .spyOn(InternalFrontstageManager, "setActiveContentGroup")
      .mockResolvedValue(undefined);
    await InternalContentLayoutManager.setActiveContentGroup(contentGroup);
    expect(spy).toHaveBeenCalled();
  });
});
