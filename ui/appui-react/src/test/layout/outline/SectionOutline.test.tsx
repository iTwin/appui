/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render } from "@testing-library/react";
import * as React from "react";
import type { DragManager } from "../../../appui-react/layout/base/DragManager";
import { SectionOutline } from "../../../appui-react/layout/outline/SectionOutline";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import type { TestNineZoneProviderProps } from "../Providers";
import { createDragInfo, TestNineZoneProvider } from "../Providers";

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

const wrapper = Wrapper;

describe("SectionOutline", () => {
  it("should render", () => {
    const { container } = render(<SectionOutline sectionIndex={0} />, {
      wrapper,
    });
    container
      .getElementsByClassName("nz-outline-sectionOutline")
      .length.should.eq(1);
  });

  it("should render visible", () => {
    const dragManager = React.createRef<DragManager>();
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.size = 200;
      draft.splitterPercent = 40;
    });
    state = addTab(state, "t1");
    const { container } = render(<SectionOutline sectionIndex={0} />, {
      wrapper: (props) => (
        <Wrapper defaultState={state} dragManagerRef={dragManager} {...props} />
      ),
    });

    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      dragManager.current!.handleTargetChanged({
        type: "section",
        sectionIndex: 0,
        newWidgetId: "nw1",
        side: "left",
      });
    });

    const element = container.getElementsByClassName(
      "nz-outline-sectionOutline"
    )[0];
    expect(element).to.not.be.undefined;

    (element as HTMLElement).style.height.should.eq("40%");
  });
});
