/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { BeEvent } from "@itwin/core-bentley";
import type {
  TabState,
  WidgetContentManagerContextArgs,
} from "../../appui-layout-react";
import {
  createNineZoneState,
  WidgetContentContainer,
  WidgetContentManagerContext,
  WidgetIdContext,
} from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { addPanelWidget } from "../../appui-layout-react/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";

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
    container.firstChild!.should.matchSnapshot();
  });
});
