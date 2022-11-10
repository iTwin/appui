/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { addPanelWidget, addTab, createNineZoneState, NineZoneState, PanelSideContext } from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { SectionTargets } from "../../appui-layout-react/target/SectionTargets";

interface WrapperProps {
  state: NineZoneState;
}

function Wrapper({ children, state }: React.PropsWithChildren<WrapperProps>) {
  return (
    <TestNineZoneProvider state={state}>
      <PanelSideContext.Provider value="left">
        {children}
      </PanelSideContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("SectionTargets", () => {
  it("should render 3 targets in a single section", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <Wrapper state={state}>
        <SectionTargets widgetId="w1" />
      </Wrapper>,
    );
    container.getElementsByClassName("nz-target-mergeTarget").length.should.eq(1);
    container.getElementsByClassName("nz-target-sectionTarget").length.should.eq(2);
  });
});
