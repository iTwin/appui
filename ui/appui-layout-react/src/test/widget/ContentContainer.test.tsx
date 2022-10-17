/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import {
  TabState, WidgetContentContainer, WidgetContentManagerContext, WidgetContentManagerContextArgs, WidgetStateContext,
} from "../../appui-layout-react";
import { createWidgetState } from "../../appui-layout-react/state/internal/WidgetStateHelpers";
import { BeEvent } from "@itwin/core-bentley";

describe("WidgetContentContainer ", () => {
  it("should render minimized", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => { },
      onRestoreTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
      onSaveTransientState,
    };
    const { container } = render(
      <WidgetContentManagerContext.Provider value={widgetContentManager}>
        <WidgetStateContext.Provider value={createWidgetState("w1", ["t1"], { minimized: true })}>
          <WidgetContentContainer />
        </WidgetStateContext.Provider>
      </WidgetContentManagerContext.Provider>,
    );
    container.firstChild!.should.matchSnapshot();
  });
});
