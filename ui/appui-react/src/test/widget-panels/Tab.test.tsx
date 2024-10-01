/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  FrontstageDef,
  UiFramework,
  WidgetDef,
  WidgetPanelsTab,
} from "../../appui-react.js";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore.js";
import { NineZone } from "../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers.js";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer.js";
import { TabPositionContext } from "../../appui-react/layout/widget/Tab.js";
import { WidgetIdContext } from "../../appui-react/layout/widget/Widget.js";
import { childStructure } from "../TestUtils.js";
import { BadgeType } from "@itwin/core-react";

describe("WidgetPanelsTab", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "Tab1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <NineZone dispatch={vi.fn()} layout={createLayoutStore(state)}>
        <WidgetIdContext.Provider value="w1">
          <TabIdContext.Provider value="t1">
            <TabPositionContext.Provider value={{}}>
              <WidgetPanelsTab />
            </TabPositionContext.Provider>
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </NineZone>
    );
    expect(screen.getByText("Tab1")).to.exist;
  });

  it("should render with old badge", () => {
    const frontstageDef = new FrontstageDef();
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const widgetDef = WidgetDef.create({
      id: "t1",
      badge: BadgeType.New,
    });
    vi.spyOn(frontstageDef, "findWidgetDef").mockReturnValue(widgetDef);

    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "Tab1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <NineZone dispatch={vi.fn()} layout={createLayoutStore(state)}>
        <WidgetIdContext.Provider value="w1">
          <TabIdContext.Provider value="t1">
            <TabPositionContext.Provider value={{}}>
              <WidgetPanelsTab />
            </TabPositionContext.Provider>
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </NineZone>
    );
    expect(screen.getByRole("tab")).to.satisfy(
      childStructure(".nz-badge .core-badge-newBadge")
    );
  });

  it("should render with new badge", () => {
    const frontstageDef = new FrontstageDef();
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const widgetDef = WidgetDef.create({
      id: "t1",
      badgeKind: "deprecated",
    });
    vi.spyOn(frontstageDef, "findWidgetDef").mockReturnValue(widgetDef);

    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "Tab1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <NineZone dispatch={vi.fn()} layout={createLayoutStore(state)}>
        <WidgetIdContext.Provider value="w1">
          <TabIdContext.Provider value="t1">
            <TabPositionContext.Provider value={{}}>
              <WidgetPanelsTab />
            </TabPositionContext.Provider>
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </NineZone>
    );
    expect(screen.getByRole("tab")).to.satisfy(
      childStructure(".nz-badge .core-badge-deprecatedBadge")
    );
  });
});
