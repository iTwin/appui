/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import {
  addPanelWidget,
  addTab,
  createLayoutStore,
  createNineZoneState,
  NineZoneProvider,
  WidgetIdContext,
} from "@itwin/appui-layout-react";
import { Rectangle } from "@itwin/core-react";
import {
  FrontstageDef,
  UiFramework,
  WidgetContent,
  WidgetDef,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("WidgetContent", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    const widget = WidgetDef.create({ id: "w1" });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstage);
    vi.spyOn(frontstage, "findWidgetDef").mockReturnValue(widget);
    vi.spyOn(widget, "reactNode", "get").mockImplementation(() => <>Content</>);
    const { container } = render(
      <NineZoneProvider
        dispatch={vi.fn()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <WidgetContent />
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    expect(container.firstChild!).to.matchSnapshot();
  });

  it("should render w/o frontstage", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { container } = render(
      <NineZoneProvider
        dispatch={vi.fn()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <WidgetContent />
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    expect(container.firstChild!).to.matchSnapshot();
  });

  it("should render w/o widgetDef", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstage);
    vi.spyOn(frontstage, "findWidgetDef").mockReturnValue(undefined);
    const { container } = render(
      <NineZoneProvider
        dispatch={vi.fn()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <WidgetContent />
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    expect(container.firstChild!).to.matchSnapshot();
  });
});
