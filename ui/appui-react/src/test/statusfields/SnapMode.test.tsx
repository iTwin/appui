/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { SnapMode } from "@itwin/core-frontend";
import type { ListenerType } from "@itwin/core-react";
import {
  SnapModeField,
  SyncUiEventDispatcher,
  UiFramework,
} from "../../appui-react.js";
import TestUtils, { userEvent } from "../TestUtils.js";

describe("SnapModeField", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("Status Bar with SnapModes Field should render", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <SnapModeField />
      </Provider>
    );

    const snapModeButton = screen.getByText("snapModeField.snapMode");
    await theUserTo.click(snapModeButton);

    const iconContainer = container.querySelector(".icon");
    expect(iconContainer).toBeTruthy();

    const snaps = container.parentElement!.querySelectorAll(
      ".nz-footer-snapMode-snap"
    );
    expect(snaps.length).to.eql(7);

    await theUserTo.click(snapModeButton); // Closes popup
  });

  it("Validate multiple snaps mode", () => {
    // force to use multi-snap
    UiFramework.setAccudrawSnapMode(
      SnapMode.Intersection | SnapMode.NearestKeypoint
    );
    const snapMode = UiFramework.getAccudrawSnapMode();
    expect(snapMode).toEqual(SnapMode.Intersection | SnapMode.NearestKeypoint);
    const { container } = render(
      <Provider store={TestUtils.store}>
        <SnapModeField />
      </Provider>
    );
    const iconContainer = container.querySelector(".icon");
    expect(iconContainer).toBeTruthy();
  });

  it("should change snapMode and dispatch SyncEvent on click", async () => {
    const spy =
      vi.fn<
        Parameters<ListenerType<typeof SyncUiEventDispatcher.onSyncUiEvent>>
      >();
    SyncUiEventDispatcher.onSyncUiEvent.addListener(spy);
    render(
      <Provider store={TestUtils.store}>
        <SnapModeField />
      </Provider>
    );
    await theUserTo.click(screen.getByText("snapModeField.snapMode"));
    await theUserTo.click(screen.getByText("snapModeField.bisector"));

    expect(UiFramework.getAccudrawSnapMode()).to.equal(SnapMode.Bisector);
    expect(spy.mock.calls[0][0].eventIds.values()).toContain(
      "configurableui:set_snapmode"
    );
  });

  it("Display only the available SnapMode(s).", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <SnapModeField availableSnapModes={[SnapMode.Center]} />
      </Provider>
    );

    await theUserTo.click(screen.getByText("snapModeField.snapMode"));
    // Bisector snap mode should not be present.
    expect(screen.queryByText("snapModeField.bisector")).toBeFalsy();
    // Center snap mode should be present.
    expect(screen.queryByText("snapModeField.center")).toBeTruthy();

    const snaps = container.parentElement!.querySelectorAll(
      ".nz-footer-snapMode-snap"
    );
    expect(snaps.length).to.eql(1); // Only the center snap mode is displayed.
  });
});
