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
} from "../../appui-react";
import TestUtils, { userEvent } from "../TestUtils";

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

    await theUserTo.click(snapModeButton);
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
    const previousMode = UiFramework.getAccudrawSnapMode();
    await theUserTo.click(screen.getByText("snapModeField.snapMode"));
    await theUserTo.click(screen.getByText("snapModeField.bisector"));

    expect(UiFramework.getAccudrawSnapMode()).to.equal(
      previousMode | SnapMode.Bisector
    );
    expect(spy.mock.calls[0][0].eventIds.values()).toContain(
      "configurableui:set_snapmode"
    );
  });

  it("should not be able to disable all snapMode. at least one should be active at all time", async () => {
    render(
      <Provider store={TestUtils.store}>
        <SnapModeField />
      </Provider>
    );
    const previousMode = UiFramework.getAccudrawSnapMode();
    expect(previousMode).toEqual(SnapMode.NearestKeypoint); // Make sure that only one mode is active.
    await theUserTo.click(screen.getByText("snapModeField.snapMode"));
    await theUserTo.click(screen.getByText("snapModeField.keypoint")); // Click to deactivate the mode.
    expect(UiFramework.getAccudrawSnapMode()).to.equal(
      SnapMode.NearestKeypoint
    ); // Expect it to be still active.
  });

  it("Status Bar only display the chosen SnapModes.", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <SnapModeField
          availableSnapModes={
            // Filter out the Bisector snap mode.
            Object.values(SnapMode).filter(
              (snapMode) => typeof snapMode === "number" && snapMode !== SnapMode.Bisector
            ) as SnapMode[]
          }
        />
      </Provider>
    );

    await theUserTo.click(screen.getByText("snapModeField.snapMode"));
    // Bisector snap mode should not be present.
    expect(screen.queryByText("snapModeField.bisector")).toBeFalsy();

    const snaps = container.parentElement!.querySelectorAll(
      ".nz-footer-snapMode-snap"
    );
    expect(snaps.length).to.eql(6); // 7 modes total, minus Bisector = 6 modes
  });
});
