/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState, FloatingWidgets } from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../appui-layout-react/state/internal/WidgetStateHelpers";

describe("FloatingWidgets", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgets />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });
});
