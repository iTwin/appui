/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import type { NineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import type { WidgetState } from "../../../appui-react/layout/state/WidgetState.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers.js";
import { WidgetTarget } from "../../../appui-react/layout/target/WidgetTarget.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import { TestNineZoneProvider } from "../Providers.js";

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
      wrapper: (props: any) => (
        <Wrapper defaultState={state} widgetId="fw1" {...props} />
      ),
    });
    expect(
      container.getElementsByClassName("nz-target-mergeTarget")
    ).toHaveLength(1);
  });
});
