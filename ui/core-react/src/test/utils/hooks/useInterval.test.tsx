/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook } from "@testing-library/react-hooks";
import { useInterval } from "../../../core-react";

describe("useInterval", () => {
  it("should call interval's callback when timeout is reached", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const delay = 100;
    renderHook(() => useInterval(spy, delay));

    // Advance clock by to the same number of tick as the internal delay.
    vi.advanceTimersByTime(delay);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should NOT call interval's callback when timeout has not been reached yet", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    renderHook(() => useInterval(spy, 100));

    // Advance clock by only 50 clicks, so interval should not have reached time out
    vi.advanceTimersByTime(50);

    expect(spy).not.toBeCalled();
  });
});
