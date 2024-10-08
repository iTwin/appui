/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react/internal";
import { render } from "@testing-library/react";
import * as React from "react";
import { FrontstageDef, UiFramework, WidgetDef } from "../../appui-react.js";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore.js";
import { NineZoneProvider } from "../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers.js";
import { WidgetIdContext } from "../../appui-react/layout/widget/Widget.js";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer.js";
import { WidgetContent } from "../../appui-react/widget-panels/Content.js";

describe("WidgetContent", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "w1");
    state = addPanelWidget(state, "left", "leftStart", ["w1"]);
    const layout = createLayoutStore(state);
    const frontstage = new FrontstageDef();
    const widget = WidgetDef.create({ id: "w1" });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstage);
    vi.spyOn(frontstage, "findWidgetDef").mockReturnValue(widget);
    vi.spyOn(widget, "reactNode", "get").mockImplementation(() => <>Content</>);
    const component = render(
      <NineZoneProvider
        dispatch={vi.fn()}
        layout={layout}
        measure={() => new Rectangle()}
      >
        <WidgetIdContext.Provider value="leftStart">
          <TabIdContext.Provider value="w1">
            <WidgetContent />
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </NineZoneProvider>
    );
    component.getByText("Content");
  });
});
