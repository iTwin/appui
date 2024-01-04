/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import {
  createNineZoneState,
  PanelSideContext,
} from "../../appui-layout-react";
import { PanelTargets } from "../../appui-layout-react/target/PanelTargets";
import type { TestNineZoneProviderProps } from "../Providers";
import { TestNineZoneProvider } from "../Providers";
import { addTabs } from "../Utils";
import {
  addPanelWidget,
  updatePanelState,
} from "../../appui-layout-react/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";

function Wrapper(props: React.PropsWithChildren<TestNineZoneProviderProps>) {
  const { children, ...other } = props;
  return (
    <TestNineZoneProvider {...other}>
      <PanelSideContext.Provider value="left">
        {children}
      </PanelSideContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("PanelTargets", () => {
  it("should render a panel target", () => {
    const { container } = render(<PanelTargets />, {
      wrapper: Wrapper,
    });
    container
      .getElementsByClassName("nz-target-panelTarget")
      .length.should.eq(1);
    container
      .getElementsByClassName("nz-target-sectionTarget")
      .length.should.eq(0);
  });

  it("should render 3 targets in a single section", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.collapsed = true;
    });
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <Wrapper defaultState={state}>
        <PanelTargets />
      </Wrapper>
    );
    container
      .getElementsByClassName("nz-target-mergeTarget")
      .length.should.eq(1);
    container
      .getElementsByClassName("nz-target-sectionTarget")
      .length.should.eq(2);
  });

  it("should render one target in each section (2 sections)", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.collapsed = true;
    });
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    const { container } = render(
      <Wrapper defaultState={state}>
        <PanelTargets />
      </Wrapper>
    );
    container
      .getElementsByClassName("nz-target-mergeTarget")
      .length.should.eq(2);
    container
      .getElementsByClassName("nz-target-sectionTarget")
      .length.should.eq(0);
  });

  it("should render no targets if panel is expanded", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <Wrapper defaultState={state}>
        <PanelTargets />
      </Wrapper>
    );
    container
      .getElementsByClassName("nz-target-panelTarget")
      .length.should.eq(0);
    container
      .getElementsByClassName("nz-target-sectionTarget")
      .length.should.eq(0);
  });
});
