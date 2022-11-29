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
import { createNineZoneState, DragManager, DragManagerContext, NineZoneContext, TabPositionContext, TabStateContext, WidgetStateContext } from "@itwin/appui-layout-react";
import { expect } from "chai";
import { selectorMatches } from "../TestUtils";

describe("WidgetPanelsTab", () => {

  it("should render", () => {
    render(
      <DragManagerContext.Provider value={new DragManager()}>
        <NineZoneContext.Provider value={createNineZoneState()}>
          <WidgetStateContext.Provider value={{id: "my-widget", tabs: ["tab1"], activeTabId: "tab1", minimized: false}}>
            <TabStateContext.Provider value={{id: "tab1", label: "Tab1"}}>
              <TabPositionContext.Provider value={{}}>
                <WidgetPanelsTab />
              </TabPositionContext.Provider>
            </TabStateContext.Provider>
          </WidgetStateContext.Provider>
        </NineZoneContext.Provider>
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
    render(
      <DragManagerContext.Provider value={new DragManager()}>
        <NineZoneContext.Provider value={createNineZoneState()}>
          <WidgetStateContext.Provider value={{id: "my-widget", tabs: ["tab1"], activeTabId: "tab1", minimized: false}}>
            <TabStateContext.Provider value={{id: "tab1", label: "Tab1"}}>
              <TabPositionContext.Provider value={{}}>
                <WidgetPanelsTab />
              </TabPositionContext.Provider>
            </TabStateContext.Provider>
          </WidgetStateContext.Provider>
        </NineZoneContext.Provider>
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
