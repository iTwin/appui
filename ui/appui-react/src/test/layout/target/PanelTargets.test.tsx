/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import {
  addPanelWidget,
  updatePanelState,
} from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { PanelTargets } from "../../../appui-react/layout/target/PanelTargets";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import type { TestNineZoneProviderProps } from "../Providers";
import { TestNineZoneProvider } from "../Providers";
import { addTabs } from "../Utils";

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
    expect(
      container.getElementsByClassName("nz-target-panelTarget")
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName("nz-target-sectionTarget")
    ).toHaveLength(0);
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
    expect(
      container.getElementsByClassName("nz-target-mergeTarget")
    ).toHaveLength(1);
    expect(
      container.getElementsByClassName("nz-target-sectionTarget")
    ).toHaveLength(2);
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
    expect(
      container.getElementsByClassName("nz-target-mergeTarget")
    ).toHaveLength(2);
    expect(
      container.getElementsByClassName("nz-target-sectionTarget")
    ).toHaveLength(0);
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
    expect(
      container.getElementsByClassName("nz-target-panelTarget")
    ).toHaveLength(0);
    expect(
      container.getElementsByClassName("nz-target-sectionTarget")
    ).toHaveLength(0);
  });
});
