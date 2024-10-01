/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render } from "@testing-library/react";
import * as React from "react";
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
          <WidgetOverflow>
            <div>A</div>
            <div>B</div>
          </WidgetOverflow>
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
          <WidgetOverflow>
            <div>A</div>
            <div>B</div>
          </WidgetOverflow>
        </WidgetTabsEntryContext.Provider>
      </TestNineZoneProvider>
    );
    const button = component.container.getElementsByClassName("nz-button")[0];
    act(() => {
      fireEvent.click(button);
    });
    component.getByText("A");
    component.getByText("B");
  });

  it("should close panel on outside click", () => {
    const { container } = render(
      <TestNineZoneProvider>
        <WidgetTabsEntryContext.Provider
          value={{
            lastNotOverflown: false,
            onResize: () => {},
          }}
        >
          <WidgetOverflow>
            <div>A</div>
            <div>B</div>
          </WidgetOverflow>
        </WidgetTabsEntryContext.Provider>
      </TestNineZoneProvider>
    );
    const button = container.getElementsByClassName("nz-button")[0];
    act(() => {
      fireEvent.click(button);
    });
    expect(document.getElementsByClassName("nz-widget-menu")).toHaveLength(1);

    act(() => {
      fireEvent.pointerDown(document);
      fireEvent.pointerUp(document);
    });

    expect(document.getElementsByClassName("nz-widget-menu")).toHaveLength(0);
  });
});
