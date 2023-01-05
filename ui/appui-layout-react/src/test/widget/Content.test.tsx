/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { BeEvent } from "@itwin/core-bentley";
import { act, render } from "@testing-library/react";
import { ScrollableWidgetContent, TabIdContext, TabState } from "../../appui-layout-react";

describe("ScrollableWidgetContent", () => {
  it("should save and restore scroll position", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const onRestoreTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const { container } = render(
      <TabIdContext.Provider value="t1">
        <ScrollableWidgetContent />
      </TabIdContext.Provider>,
    );

    const content = container.getElementsByClassName("nz-widget-content")[0];
    const scrollLeftSpy = sinon.spy(content, "scrollLeft", ["get", "set"]);
    act(() => {
      onSaveTransientState.raiseEvent("t1");
      onRestoreTransientState.raiseEvent("t1");
    });
    scrollLeftSpy.get.callCount.should.eq(1);
    scrollLeftSpy.set.callCount.should.eq(1);
  });
});
