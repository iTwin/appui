/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { SectionTargets } from "../../../appui-react/layout/target/SectionTargets.js";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel.js";
import type { TestNineZoneProviderProps } from "../Providers.js";
import { TestNineZoneProvider } from "../Providers.js";

function Wrapper({
  children,
  ...other
}: React.PropsWithChildren<TestNineZoneProviderProps>) {
  return (
    <TestNineZoneProvider {...other}>
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
      <Wrapper defaultState={state}>
        <SectionTargets widgetId="w1" />
      </Wrapper>
    );
    expect(
      container.getElementsByClassName("nz-target-mergeTarget")
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName("nz-target-sectionTarget")
    ).toHaveLength(2);
  });
});
