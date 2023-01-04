/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { BadgeType } from "@itwin/appui-abstract";
import {
  FrontstageDef, FrontstageManager, getBadgeClassName, WidgetDef, WidgetPanelsTab,
} from "../../appui-react";
import { render, screen } from "@testing-library/react";
import { addPanelWidget, addTab, createLayoutStore, createNineZoneState, NineZone, TabIdContext, TabPositionContext, WidgetIdContext } from "@itwin/appui-layout-react";
import { expect } from "chai";
import { selectorMatches } from "../TestUtils";

describe("WidgetPanelsTab", () => {

  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "Tab1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <NineZone
        dispatch={sinon.spy()}
        layout={createLayoutStore(state)}
      >
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
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const widgetDef = WidgetDef.create({
      id: "w1",
      badgeType: BadgeType.New,
    });
    sinon.stub(frontstageDef, "findWidgetDef").returns(widgetDef);

    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "Tab1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <NineZone
        dispatch={sinon.spy()}
        layout={createLayoutStore(state)}
      >
        <WidgetIdContext.Provider value="w1">
          <TabIdContext.Provider value="t1">
            <TabPositionContext.Provider value={{}}>
              <WidgetPanelsTab />
            </TabPositionContext.Provider>
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </NineZone>
    );
    expect(screen.getByRole("tab")).to.satisfy(selectorMatches(".uifw-badge-new"));
  });
});

describe("getBadgeClassName", () => {
  it("should return class name for BadgeType.New", () => {
    "uifw-badge-new".should.eq(getBadgeClassName(BadgeType.New));
  });

  it("should return class name for BadgeType.TechnicalPreview", () => {
    "uifw-badge-tp".should.eq(getBadgeClassName(BadgeType.TechnicalPreview));
  });
});
