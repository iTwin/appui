/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import {
  DragManager,
  DragManagerContext,
} from "../../../appui-react/layout/base/DragManager.js";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { NineZoneDispatchContext } from "../../../appui-react/layout/base/NineZone.js";
import { DockedToolSettingsHandle } from "../../../appui-react/layout/tool-settings/Handle.js";

describe("DockedToolSettingsHandle", () => {
  it("should dispatch TOOL_SETTINGS_DRAG_START", () => {
    const dragManager = new DragManager();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    const { container } = render(
      <NineZoneDispatchContext.Provider value={dispatch}>
        <DragManagerContext.Provider value={dragManager}>
          <DockedToolSettingsHandle />
        </DragManagerContext.Provider>
      </NineZoneDispatchContext.Provider>
    );
    const handle = container.getElementsByClassName(
      "nz-toolSettings-handle"
    )[0];
    fireEvent.mouseDown(handle);
    fireEvent.mouseMove(document);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "TOOL_SETTINGS_DRAG_START",
      })
    );
  });
});
