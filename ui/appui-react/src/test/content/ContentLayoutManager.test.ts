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
import type { ContentGroupProps, ContentProps } from "../../appui-react/content/ContentGroup";
import { ContentGroup } from "../../appui-react/content/ContentGroup";
import { ContentLayoutManager } from "../../appui-react/content/ContentLayoutManager";
import { InternalContentLayoutManager } from "../../appui-react/content/InternalContentLayoutManager";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import { createStaticInternalPassthroughValidators } from "../TestUtils";

describe("ContentLayoutManager", () => {
  before(async () => {
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
  });

  it("activeLayout should return undefined if no active frontstage", () => {
    expect(ContentLayoutManager.activeLayout).to.be.undefined;
  });

  it("activeContentGroup should return undefined if no active frontstage", () => {
    expect(ContentLayoutManager.activeContentGroup).to.be.undefined;
  });

  it("refreshActiveLayout should do nothing if no active frontstage", () => {
    ContentLayoutManager.refreshActiveLayout();
  });

  it("should getLayoutForGroup", () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [{ id: "myContent", classId: "TestContentControl" }, { id: "myContent2", classId: "TestContentControl" }];
    const key = ContentLayoutManager.getLayoutKey({ contentGroupId: uniqueGroupId, layoutId: StandardContentLayouts.twoHorizontalSplit.id });

    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const layoutDef = ContentLayoutManager.getLayoutForGroup(groupProps);
    const foundLayoutDef = ContentLayoutManager.findLayout(key);
    expect(foundLayoutDef?.id).to.be.eq(layoutDef.id);
  });

  it("should getLayoutForGroup with overridden layout", () => {
    const uniqueGroupId = getUniqueId();
    const contentProps: ContentProps[] = [{ id: "myContent", classId: "TestContentControl" }, { id: "myContent2", classId: "TestContentControl" }];
    const overrideKey = ContentLayoutManager.getLayoutKey({ contentGroupId: uniqueGroupId, layoutId: StandardContentLayouts.twoVerticalSplit.id });

    const groupProps: ContentGroupProps = {
      id: uniqueGroupId,
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: contentProps,
    };

    const layoutDef = ContentLayoutManager.getLayoutForGroup(groupProps, StandardContentLayouts.twoVerticalSplit);
    const foundLayoutDef = ContentLayoutManager.findLayout(overrideKey);
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
    await ContentLayoutManager.setActiveContentGroup(contentGroup);
    expect(spy).to.have.been.called;
  });

  it("calls Internal static for everything", async () => {
    const [validateMethod, validateProp] = createStaticInternalPassthroughValidators(ContentLayoutManager, InternalContentLayoutManager);

    validateMethod(["addLayout", "add"], "id", {} as any);
    validateMethod(["findLayout", "find"], "key");
    validateMethod(["getLayoutForGroup", "getForGroup"], {} as any, {} as any);
    validateMethod(["getLayoutKey", "getKey"], {} as any);
    validateMethod(["refreshActiveLayout", "refreshActive"]);
    validateMethod("setActiveContentGroup", {} as any);
    validateMethod(["setActiveLayout", "setActive"], {} as any, {} as any);
    validateProp("activeContentGroup");
    validateProp("activeLayout");
  });

});
