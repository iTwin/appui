/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnapMode } from "@itwin/core-frontend";
import {
  SnapModeField,
  StatusBar,
  SyncUiEventDispatcher,
  UiFramework,
} from "../../appui-react";
import TestUtils, { userEvent } from "../TestUtils";

describe("SnapModeField", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("Status Bar with SnapModes Field should render", () => {
    const wrapper = render(
      <Provider store={TestUtils.store}>
        <StatusBar>
          <SnapModeField />
        </StatusBar>
      </Provider>
    );

    const button = wrapper.container.querySelector(".uifw-statusbar-field");
    expect(button).toBeTruthy();
    fireEvent.click(button!);

    const iconContainer = wrapper.container.querySelector(".uifw-icon");
    expect(iconContainer).toBeTruthy();

    const popup = wrapper.getByTestId("core-popup");
    const snaps = popup.querySelectorAll(".nz-footer-snapMode-snap");
    expect(snaps.length).to.eql(7);

    fireEvent.click(button!); // Closes popup
  });

  it("Validate multiple snaps mode", () => {
    // force to use multi-snap
    UiFramework.setAccudrawSnapMode(
      SnapMode.Intersection | SnapMode.NearestKeypoint
    );
    const snapMode = UiFramework.getAccudrawSnapMode();
    expect(snapMode).toEqual(SnapMode.Intersection | SnapMode.NearestKeypoint);
    const wrapper = render(
      <Provider store={TestUtils.store}>
        <StatusBar>
          <SnapModeField />
        </StatusBar>
      </Provider>
    );
    const iconContainer = wrapper.container.querySelector(".uifw-icon");
    expect(iconContainer).toBeTruthy();
  });

  it("should change snapMode and dispatch SyncEvent on click", async () => {
    const spy =
      vi.fn<
        Parameters<
          Parameters<typeof SyncUiEventDispatcher.onSyncUiEvent.addListener>[0]
        >
      >();
    SyncUiEventDispatcher.onSyncUiEvent.addListener(spy);
    render(
      <Provider store={TestUtils.store}>
        <StatusBar>
          <SnapModeField />
        </StatusBar>
      </Provider>
    );
    await theUserTo.click(screen.getByRole("button"));
    await theUserTo.click(screen.getByText("snapModeField.bisector"));

    expect(UiFramework.getAccudrawSnapMode()).to.equal(SnapMode.Bisector);
    expect(spy.mock.calls[0][0].eventIds.values()).toContain(
      "configurableui:set_snapmode"
    );
  });
});
