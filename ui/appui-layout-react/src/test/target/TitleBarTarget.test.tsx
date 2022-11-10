/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { addPanelWidget, addTab, createNineZoneState, NineZoneState, WidgetIdContext, WidgetState } from "../../appui-layout-react";
import { TitleBarTarget } from "../../appui-layout-react/target/TitleBarTarget";
import { TestNineZoneProvider } from "../Providers";

interface WrapperProps {
  state: NineZoneState;
  widgetId: WidgetState["id"];
}

function Wrapper({ children, state, widgetId }: React.PropsWithChildren<WrapperProps>) {
  return (
    <TestNineZoneProvider state={state}>
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
      <Wrapper state={state} widgetId="w1">
        <TitleBarTarget />
      </Wrapper>,
    );
    container.getElementsByClassName("nz-target-titleBarTarget").length.should.eq(1);
  });
});
