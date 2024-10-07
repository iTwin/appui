/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { renderHook } from "@testing-library/react";
import { CursorTypeContext } from "../../../appui-react/layout/base/NineZone.js";
import { useCursor } from "../../../appui-react/layout/widget-panels/CursorOverlay.js";

describe("useCursor", () => {
  const wrapper = (props: {}) => (
    <CursorTypeContext.Provider value="grabbing" {...props} />
  );

  it("should add class name to body", () => {
    renderHook(() => useCursor(), { wrapper });
    expect(document.body.classList.contains("nz-grabbing")).toEqual(true);
  });

  it("should remove class name to body", () => {
    const { unmount } = renderHook(() => useCursor(), { wrapper });
    unmount();
    expect(document.body.classList.contains("nz-grabbing")).toEqual(false);
  });
});
