/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import {
  NineZoneDispatchContext,
  NineZoneLabelsContext,
} from "../../../appui-react/layout/base/NineZone";
import { Dock } from "../../../appui-react/layout/widget/Dock";

describe("Dock", () => {
  it("should dispatch TOOL_SETTINGS_DOCK", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const component = render(
      <NineZoneDispatchContext.Provider value={dispatch}>
        <NineZoneLabelsContext.Provider
          value={{ dockToolSettingsTitle: "Dock" }}
        >
          <Dock />
        </NineZoneLabelsContext.Provider>
      </NineZoneDispatchContext.Provider>
    );
    const button = component.getByTitle("Dock");
    fireEvent.click(button);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "TOOL_SETTINGS_DOCK",
    });
  });
});
