/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { NineZoneDispatchContext } from "../../../appui-react/layout/base/NineZone.js";
import { Dock } from "../../../appui-react/layout/widget/Dock.js";

describe("Dock", () => {
  it("should dispatch TOOL_SETTINGS_DOCK", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    const component = render(
      <NineZoneDispatchContext.Provider value={dispatch}>
        <Dock />
      </NineZoneDispatchContext.Provider>
    );
    const button = component.getByRole("button", {
      name: "widget.tooltips.dockToolSettings",
    });
    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledWith({
      type: "TOOL_SETTINGS_DOCK",
    });
  });
});
