/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import * as React from "react";
import * as sinon from "sinon";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { IModelApp, NoRenderApp, SnapMode } from "@itwin/core-frontend";
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
  beforeAll(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  afterAll(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
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
    expect(button).not.to.be.null;
    fireEvent.click(button!);

    const iconContainer = wrapper.container.querySelector(".uifw-icon");
    expect(iconContainer).not.to.be.null;

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
    expect(snapMode).to.be.equal(
      SnapMode.Intersection | SnapMode.NearestKeypoint
    );
    const wrapper = render(
      <Provider store={TestUtils.store}>
        <StatusBar>
          <SnapModeField />
        </StatusBar>
      </Provider>
    );
    const iconContainer = wrapper.container.querySelector(".uifw-icon");
    expect(iconContainer).not.to.be.null;
  });

  it("should change snapMode and dispatch SyncEvent on click", async () => {
    const spy = vi.fn();
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
    expect(spy).toHaveBeenCalledWith({
      eventIds: sinon.match.set.contains(
        new Set(["configurableui:set_snapmode"])
      ),
    });
  });
});
