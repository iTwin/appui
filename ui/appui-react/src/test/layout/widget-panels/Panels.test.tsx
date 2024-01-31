/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addWidgetToolSettings } from "../../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import { WidgetPanels } from "../../../appui-react/layout/widget-panels/Panels";
import { TestNineZoneProvider } from "../Providers";

describe("WidgetPanels", () => {
  it("should render", () => {
    const { container } = render(
      <TestNineZoneProvider>
        <WidgetPanels />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render widget content", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { findByText } = render(
      <TestNineZoneProvider
        defaultState={state}
        widgetContent={<div>Hello Widget!</div>}
      >
        <WidgetPanels />
      </TestNineZoneProvider>
    );
    await findByText("Hello Widget!");
  });

  it("should render tool settings content", async () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addPanelWidget(state, "left", "w1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    const { findByText } = render(
      <TestNineZoneProvider
        defaultState={state}
        toolSettingsContent={<div>Hello ToolSettings!</div>}
      >
        <WidgetPanels />
      </TestNineZoneProvider>
    );
    await findByText("Hello ToolSettings!");
  });
});
