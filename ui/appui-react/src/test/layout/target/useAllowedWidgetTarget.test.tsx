/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { renderHook } from "@testing-library/react";
import { useAllowedWidgetTarget } from "../../../appui-react/layout/target/useAllowedWidgetTarget";
import { TestNineZoneProvider } from "../Providers";

describe("useAllowedWidgetTarget", () => {
  it("should return `false` for popout widget", () => {
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props: any) => <TestNineZoneProvider {...props} />,
    });
    expect(result.current).toEqual(false);
  });
});
