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
import { createLayoutStore, createNineZoneState, DragManager, DragManagerContext, NineZoneProvider, TabPositionContext } from "@itwin/appui-layout-react";
import { expect } from "chai";
import { selectorMatches } from "../TestUtils";
import { Rectangle } from "@itwin/core-react";

describe("WidgetPanelsTab", () => {
  it("should render", () => {
    const layout = createLayoutStore();
    const dispatch = () => sinon.stub();
    const measure = () => new Rectangle();
    /*
    <WidgetStateContext.Provider value={{ id: "my-widget", tabs: ["tab1"], activeTabId: "tab1", minimized: false }}>
      <TabStateContext.Provider value={{ id: "tab1", label: "Tab1" }}>
      </TabStateContext.Provider>
    </WidgetStateContext.Provider>
    */
    render(
      <DragManagerContext.Provider value={new DragManager()}>
        <NineZoneProvider
          layout={layout}
          measure={measure}
          dispatch={dispatch}
        >
          <TabPositionContext.Provider value={{}}>
            <WidgetPanelsTab />
          </TabPositionContext.Provider>
        </NineZoneProvider>

      </DragManagerContext.Provider>);
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
    /*
    <NineZoneContext.Provider value={createNineZoneState()}>
          <WidgetStateContext.Provider value={{ id: "my-widget", tabs: ["tab1"], activeTabId: "tab1", minimized: false }}>
            <TabStateContext.Provider value={{ id: "tab1", label: "Tab1" }}>
              <TabPositionContext.Provider value={{}}>
                <WidgetPanelsTab />
              </TabPositionContext.Provider>
            </TabStateContext.Provider>
          </WidgetStateContext.Provider>
        </NineZoneContext.Provider>
        */
    render(
      <DragManagerContext.Provider value={new DragManager()}>

      </DragManagerContext.Provider>);
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
