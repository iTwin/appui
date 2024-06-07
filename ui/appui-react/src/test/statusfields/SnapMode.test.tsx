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
  SyncUiEventDispatcher,
  UiFramework,
} from "../../appui-react";
import type { ListenerType } from "../TestUtils";
import TestUtils, { userEvent } from "../TestUtils";

describe("SnapModeField", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("Status Bar with SnapModes Field should render", () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <SnapModeField />
      </Provider>
    );

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    fireEvent.click(button!);

    const iconContainer = container.querySelector(".icon");
    expect(iconContainer).toBeTruthy();

    const snaps = container.parentElement!.querySelectorAll(
      ".nz-footer-snapMode-snap"
    );
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
    await theUserTo.click(screen.getByRole("button"));
    await theUserTo.click(screen.getByText("snapModeField.bisector"));

    expect(UiFramework.getAccudrawSnapMode()).to.equal(SnapMode.Bisector);
    expect(spy.mock.calls[0][0].eventIds.values()).toContain(
      "configurableui:set_snapmode"
    );
  });
});
