/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { getUniqueId } from "@itwin/appui-layout-react";
import { expect } from "chai";
import * as sinon from "sinon";
import { UiFramework } from "../../appui-react";
import { ContentGroup, ContentGroupProps, ContentProps } from "../../appui-react/content/ContentGroup";
import { InternalContentLayoutManager } from "../../appui-react/content/InternalContentLayoutManager";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";

describe("ContentLayoutManager", () => {
  before(async () => {
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
  });

  it("activeLayout should return undefined if no active frontstage", () => {
    expect(InternalContentLayoutManager.activeLayout).to.be.undefined;
  });

  it("activeContentGroup should return undefined if no active frontstage", () => {
    expect(InternalContentLayoutManager.activeContentGroup).to.be.undefined;
  });

  it("refreshActive should do nothing if no active frontstage", () => {
    InternalContentLayoutManager.refreshActive();
  });

  it("should getForGroup", () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [{ id: "myContent", classId: "TestContentControl" }, { id: "myContent2", classId: "TestContentControl" }];
    const key = InternalContentLayoutManager.getKey({ contentGroupId: uniqueGroupId, layoutId: StandardContentLayouts.twoHorizontalSplit.id });

    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const layoutDef = InternalContentLayoutManager.getForGroup(groupProps);
    const foundLayoutDef = InternalContentLayoutManager.find(key);
    expect(foundLayoutDef?.id).to.be.eq(layoutDef.id);
  });

  it("should getForGroup with overridden layout", () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [{ id: "myContent", classId: "TestContentControl" }, { id: "myContent2", classId: "TestContentControl" }];
    const overrideKey = InternalContentLayoutManager.getKey({ contentGroupId: uniqueGroupId, layoutId: StandardContentLayouts.twoVerticalSplit.id });

    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const layoutDef = InternalContentLayoutManager.getForGroup(groupProps, StandardContentLayouts.twoVerticalSplit);
    const foundLayoutDef = InternalContentLayoutManager.find(overrideKey);
    expect(foundLayoutDef?.id).to.be.eq(layoutDef.id);
  });

  it("should call  InternalFrontstageManager.setActiveContentGroup", async () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [{ id: "myContent", classId: "TestContentControl" }, { id: "myContent2", classId: "TestContentControl" }];
    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const contentGroup = new ContentGroup(groupProps);
    const spy = sinon.stub(InternalFrontstageManager, "setActiveContentGroup").returns(Promise.resolve());
    await InternalContentLayoutManager.setActiveContentGroup(contentGroup);
    expect(spy).to.have.been.called;
  });

});
