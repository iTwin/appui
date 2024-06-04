/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  FrontstageDef,
  getBadgeClassName,
  UiFramework,
  WidgetDef,
  WidgetPanelsTab,
} from "../../appui-react";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore";
import { NineZone } from "../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer";
import { TabPositionContext } from "../../appui-react/layout/widget/Tab";
import { WidgetIdContext } from "../../appui-react/layout/widget/Widget";
import { selectorMatches } from "../TestUtils";
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

  it("should render with badge", () => {
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
      selectorMatches(".uifw-badge-new")
    );
  });
});

describe("getBadgeClassName", () => {
  it("should return class name for BadgeType.New", () => {
    expect(getBadgeClassName(BadgeType.New)).toEqual("uifw-badge-new");
  });

  it("should return class name for BadgeType.TechnicalPreview", () => {
    expect(getBadgeClassName(BadgeType.TechnicalPreview)).toEqual(
      "uifw-badge-tp"
    );
  });
});
