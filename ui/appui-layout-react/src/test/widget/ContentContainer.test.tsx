/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import {
  addPanelWidget,
  addTab,
  createNineZoneState,
  TabState, WidgetContentContainer, WidgetContentManagerContext, WidgetContentManagerContextArgs, WidgetIdContext,
} from "../../appui-layout-react";
import { BeEvent } from "@itwin/core-bentley";
import { TestNineZoneProvider } from "../Providers";

describe("WidgetContentContainer ", () => {
  it("should render minimized", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => { },
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
        </WidgetContentManagerContext.Provider>,
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });
});
