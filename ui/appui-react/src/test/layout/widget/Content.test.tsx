/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BeEvent } from "@itwin/core-bentley";
import { act, render } from "@testing-library/react";
import * as React from "react";
import type { TabState } from "../../../appui-react/layout/state/TabState.js";
import { ScrollableWidgetContent } from "../../../appui-react/layout/widget/Content.js";
import { WidgetContentManagerContext } from "../../../appui-react/layout/widget/ContentManager.js";
import { TabIdContext } from "../../../appui-react/layout/widget/ContentRenderer.js";

describe("ScrollableWidgetContent", () => {
  it("should save and restore scroll position", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const onRestoreTransientState = new BeEvent<
      (tabId: TabState["id"]) => void
    >();
    const { container } = render(
      <WidgetContentManagerContext.Provider
        value={{
          setContainer: () => {},
          onRestoreTransientState,
          onSaveTransientState,
        }}
      >
        <TabIdContext.Provider value="t1">
          <ScrollableWidgetContent />
        </TabIdContext.Provider>
      </WidgetContentManagerContext.Provider>
    );

    const content = container.getElementsByClassName("nz-widget-content")[0];
    const getSpy = vi
      .spyOn(content, "scrollLeft", "get")
      .mockImplementation(() => 0);
    const setSpy = vi.spyOn(content, "scrollLeft", "set");
    act(() => {
      onSaveTransientState.raiseEvent("t1");
      onRestoreTransientState.raiseEvent("t1");
    });
    expect(getSpy).toHaveBeenCalledOnce();
    expect(setSpy).toHaveBeenCalledOnce();
  });
});
