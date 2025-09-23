/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { usePosition } from "../../appui-react/statusfields/usePosition.js";
import { renderHook } from "@testing-library/react";

describe("usePosition", () => {
  it("should return position of referenced element", () => {
    const refElement = { current: { getBoundingClientRect: () => ({ left: 100, bottom: 200 }) } } as React.RefObject<HTMLElement>;
    const { result } = renderHook(() => usePosition(refElement));
    expect(result.current.position.current).toEqual({ left: 100, bottom: 200 });
  });
});
