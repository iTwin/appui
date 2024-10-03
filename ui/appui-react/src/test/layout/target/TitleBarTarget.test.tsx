/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import type { WidgetState } from "../../../appui-react/layout/state/WidgetState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { TitleBarTarget } from "../../../appui-react/layout/target/TitleBarTarget.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import type { TestNineZoneProviderProps } from "../Providers.js";
import { TestNineZoneProvider } from "../Providers.js";

interface WrapperProps extends TestNineZoneProviderProps {
  widgetId: WidgetState["id"];
}

function Wrapper({
  children,
  widgetId,
  ...other
}: React.PropsWithChildren<WrapperProps>) {
  return (
    <TestNineZoneProvider {...other}>
      <WidgetIdContext.Provider value={widgetId}>
        {children}
      </WidgetIdContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("TitleBarTarget", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <Wrapper defaultState={state} widgetId="w1">
        <TitleBarTarget />
      </Wrapper>
    );
    expect(
      container.getElementsByClassName("nz-target-titleBarTarget")
    ).toHaveLength(1);
  });
});
