/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { WidgetOverflow } from "../../../appui-react/layout/widget/Overflow.js";
import { WidgetTabsEntryContext } from "../../../appui-react/layout/widget/Tabs.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("WidgetOverflow", () => {
  it("should render", async () => {
    const component = render(
      <TestNineZoneProvider>
        <WidgetTabsEntryContext.Provider
          value={{
            lastNotOverflown: false,
            onResize: () => {},
          }}
        >
          <WidgetOverflow
            items={[<div key="a">A</div>, <div key="b">B</div>]}
          />
        </WidgetTabsEntryContext.Provider>
      </TestNineZoneProvider>
    );
    expect(component.queryAllByText("A")).toHaveLength(0);
    expect(component.queryAllByText("B")).toHaveLength(0);
  });

  it("should open panel", () => {
    const component = render(
      <TestNineZoneProvider>
        <WidgetTabsEntryContext.Provider
          value={{
            lastNotOverflown: false,
            onResize: () => {},
          }}
        >
          <WidgetOverflow
            items={[<div key="w1">Widget 1</div>, <div key="w2">Widget 2</div>]}
          />
        </WidgetTabsEntryContext.Provider>
      </TestNineZoneProvider>
    );
    const button = component.getByRole("button", {
      name: "widget.tooltips.moreWidgets",
    });
    fireEvent.click(button);
    component.getByText("Widget 1");
    component.getByText("Widget 2");
  });

  it("should close panel on outside click", async () => {
    const component = render(
      <TestNineZoneProvider>
        <WidgetTabsEntryContext.Provider
          value={{
            lastNotOverflown: false,
            onResize: () => {},
          }}
        >
          <WidgetOverflow
            items={[<div key="w1">Widget 1</div>, <div key="w2">Widget 2</div>]}
          />
        </WidgetTabsEntryContext.Provider>
      </TestNineZoneProvider>
    );
    const button = component.getByRole("button", {
      name: "widget.tooltips.moreWidgets",
    });
    button.click();
    await component.findByText("Widget 1");

    act(() => {
      fireEvent.pointerDown(document);
      fireEvent.pointerUp(document);
    });

    expect(component.queryByText("Widget 1")).toBeNull();
  });
});
