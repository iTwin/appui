/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import type { NineZoneState, WidgetState } from "../../appui-layout-react";
import { createNineZoneState, WidgetIdContext } from "../../appui-layout-react";
import { WidgetTarget } from "../../appui-layout-react/target/WidgetTarget";
import { TestNineZoneProvider } from "../Providers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../appui-layout-react/state/internal/WidgetStateHelpers";

interface WrapperProps {
  defaultState: NineZoneState;
  widgetId: WidgetState["id"];
}

function Wrapper({
  children,
  defaultState,
  widgetId,
}: React.PropsWithChildren<WrapperProps>) {
  return (
    <TestNineZoneProvider defaultState={defaultState}>
      <WidgetIdContext.Provider value={widgetId}>
        {children}
      </WidgetIdContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("WidgetTarget", () => {
  it("should render a merge target", () => {
    let state = createNineZoneState();
    state = addTab(state, "ft1");
    state = addFloatingWidget(state, "fw1", ["ft1"]);
    const { container } = render(<WidgetTarget />, {
      wrapper: (props) => (
        <Wrapper defaultState={state} widgetId="fw1" {...props} />
      ),
    });
    container
      .getElementsByClassName("nz-target-mergeTarget")
      .length.should.eq(1);
  });
});
