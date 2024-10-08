/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render } from "@testing-library/react";
import * as React from "react";
import type { DragManager } from "../../../appui-react/layout/base/DragManager.js";
import { SectionOutline } from "../../../appui-react/layout/outline/SectionOutline.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel.js";
import type { TestNineZoneProviderProps } from "../Providers.js";
import { createDragInfo, TestNineZoneProvider } from "../Providers.js";

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
    expect(
      container.getElementsByClassName("nz-outline-sectionOutline")
    ).toHaveLength(1);
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
      wrapper: (props: any) => (
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
    expect(element).toBeTruthy();

    expect((element as HTMLElement).style.height).toEqual("40%");
  });
});
