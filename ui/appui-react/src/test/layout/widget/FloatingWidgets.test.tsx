/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { FloatingWidgets } from "../../../appui-react/layout/widget/FloatingWidgets";
import { TestNineZoneProvider } from "../Providers";

describe("FloatingWidgets", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgets />
      </TestNineZoneProvider>
    );
    const widgets = component.container.getElementsByClassName(
      "nz-widget-floatingWidget"
    );
    expect(Array.from(widgets)).to.have.lengthOf(1);
  });
});
