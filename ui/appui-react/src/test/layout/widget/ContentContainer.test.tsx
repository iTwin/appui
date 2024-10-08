/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BeEvent } from "@itwin/core-bentley";
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import type { TabState } from "../../../appui-react/layout/state/TabState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { WidgetContentContainer } from "../../../appui-react/layout/widget/ContentContainer.js";
import type { WidgetContentManagerContextArgs } from "../../../appui-react/layout/widget/ContentManager.js";
import { WidgetContentManagerContext } from "../../../appui-react/layout/widget/ContentManager.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("WidgetContentContainer ", () => {
  it("should render minimized", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => {},
      onRestoreTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
      onSaveTransientState,
    };
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"], { minimized: true });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetContentManagerContext.Provider value={widgetContentManager}>
          <WidgetIdContext.Provider value="w1">
            <WidgetContentContainer />
          </WidgetIdContext.Provider>
        </WidgetContentManagerContext.Provider>
        ,
      </TestNineZoneProvider>
    );
    expect(container.getElementsByClassName("nz-minimized")).toBeTruthy();
  });
});
