/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useAllowedWidgetTarget } from "../../appui-layout-react/target/useAllowedWidgetTarget";
import { TestNineZoneProvider } from "../Providers";

describe("useAllowedWidgetTarget", () => {
  it("should return `false` for popout widget", () => {
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props: Record<string, any>) => <TestNineZoneProvider {...props} />,
    });
    result.current.should.eq(false);
  });
});
