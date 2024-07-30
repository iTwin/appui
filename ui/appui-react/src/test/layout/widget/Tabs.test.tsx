/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { ShowWidgetIconContext } from "../../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import { WidgetTabs } from "../../../appui-react/layout/widget/Tabs";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget";
import { TestNineZoneProvider } from "../Providers";
import { addTabs } from "../Utils";

describe("WidgetTabs", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetTabs />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    expect(container.getElementsByClassName("nz-widget-tab")).toHaveLength(1);
  });

  it("should render overflow panel", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2", "t3"]);
    state = addPanelWidget(state, "left", "w1", ["t1", "t2", "t3"]);
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 100 })
    );
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetTabs />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    component.getByRole(
      "button" /* TODO: needs a label , { name: "Other widgets" } */
    );
  });

  it("should render tabs with icons", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addTabs(state, ["t2", "t3"]);
    state = addPanelWidget(state, "left", "w1", ["t1", "t2", "t3"]);
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 300 })
    );

    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <ShowWidgetIconContext.Provider value={true}>
          <PanelSideContext.Provider value="left">
            <WidgetIdContext.Provider value="w1">
              <WidgetTabs />
            </WidgetIdContext.Provider>
          </PanelSideContext.Provider>
        </ShowWidgetIconContext.Provider>
      </TestNineZoneProvider>
    );
    component.getByText("t1 icon");
  });
});
