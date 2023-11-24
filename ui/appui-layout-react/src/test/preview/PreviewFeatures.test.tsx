/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  setPreviewLayoutFeatures,
  usePreviewFeatures,
} from "../../appui-layout-react";
import { expect } from "chai";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

describe("PreviewFeatures", () => {
  it("should set preview features", () => {
    const { result } = renderHook(() => usePreviewFeatures());
    expect(result.current).to.be.empty;
    act(() => {
      setPreviewLayoutFeatures({ enableMaximizedFloatingWidget: true });
    });
    expect(result.current).to.be.deep.equal({
      enableMaximizedFloatingWidget: true,
    });
  });
  afterEach(() => {
    setPreviewLayoutFeatures({});
  });
});
