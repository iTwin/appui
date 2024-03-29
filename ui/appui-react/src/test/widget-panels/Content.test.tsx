/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  FrontstageDef,
  UiFramework,
  WidgetContent,
  WidgetDef,
} from "../../appui-react";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore";
import { NineZoneProvider } from "../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers";
import { WidgetIdContext } from "../../appui-react/layout/widget/Widget";
import TestUtils from "../TestUtils";

describe("WidgetContent", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterEach(() => {
    TestUtils.terminateUiFramework();
  });

  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    const widget = WidgetDef.create({ id: "w1" });
    vi.spyOn(UiFramework.frontstages, "activeFrontstageDef").get(
      () => frontstage
    );
    vi.spyOn(frontstage, "findWidgetDef").mockReturnValue(widget);
    vi.spyOn(widget, "reactNode").get(() => <>Content</>);
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
    container.firstChild!.should.matchSnapshot();
  });

  it("should render w/o frontstage", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    vi.spyOn(UiFramework.frontstages, "activeFrontstageDef").get(
      () => undefined
    );
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
    container.firstChild!.should.matchSnapshot();
  });

  it("should render w/o widgetDef", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    vi.spyOn(UiFramework.frontstages, "activeFrontstageDef").get(
      () => frontstage
    );
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
    container.firstChild!.should.matchSnapshot();
  });
});
