/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  SyncUiEventDispatcher,
  useConditionalValue,
} from "../../appui-react.js";
import { act, renderHook } from "@testing-library/react";

const timeToWaitForUiSyncCallback = 10;

describe("useConditionalValue", () => {
  beforeEach(() => {
    SyncUiEventDispatcher.setTimeoutPeriod(timeToWaitForUiSyncCallback);
  });

  it("should sync case insensitive", async () => {
    vi.useFakeTimers();

    let counter = 0;
    const { result } = renderHook(() =>
      useConditionalValue(() => {
        return counter++;
      }, ["myEvent1"])
    );
    expect(result.current).toEqual(0);

    act(() => {
      SyncUiEventDispatcher.dispatchSyncUiEvent("myEvent1");
      vi.advanceTimersByTime(timeToWaitForUiSyncCallback);
    });
    expect(result.current).toEqual(1);

    act(() => {
      SyncUiEventDispatcher.dispatchSyncUiEvent("myevent1");
      vi.advanceTimersByTime(timeToWaitForUiSyncCallback);
    });
    expect(result.current).toEqual(2);
  });
});
