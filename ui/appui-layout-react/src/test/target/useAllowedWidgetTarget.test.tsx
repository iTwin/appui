/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { addFloatingWidget, addTab, createNineZoneState } from "../../appui-layout-react";
import { renderHook } from "@testing-library/react-hooks";
import { useAllowedWidgetTarget } from "../../appui-layout-react/target/useAllowedWidgetTarget";
import { TestNineZoneProvider } from "../Providers";

describe("useAllowedWidgetTarget", () => {
  it("should return `false` for popout widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "ft1");
    state = addFloatingWidget(state, "fw1", ["ft1"]);
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props) => <TestNineZoneProvider {...props} />, // eslint-disable-line react/display-name
    });
    result.current.should.eq(false);
  });
});
