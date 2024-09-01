/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SyncUiEventDispatcher } from "../../appui-react";
import { useConditionalProp } from "../../appui-react/hooks/useConditionalProp";
import { act, renderHook } from "@testing-library/react";
import { ConditionalStringValue } from "../../appui-react/shared/ConditionalValue";

const timeToWaitForUiSyncCallback = 10;

describe("useConditionalProp", () => {
  beforeEach(() => {
    SyncUiEventDispatcher.setTimeoutPeriod(timeToWaitForUiSyncCallback);
  });

  it("should sync with case insensitive event ids", async () => {
    vi.useFakeTimers();

    let counter = 0;
    const label = new ConditionalStringValue(() => {
      counter++;
      return `Counter: ${counter}`;
    }, ["myEvent1"]);
    const { result } = renderHook(() => useConditionalProp(label));
    expect(result.current).toEqual("Counter: 1");

    act(() => {
      SyncUiEventDispatcher.dispatchSyncUiEvent("myEvent1");
      vi.advanceTimersByTime(timeToWaitForUiSyncCallback);
    });
    expect(result.current).toEqual("Counter: 2");

    act(() => {
      SyncUiEventDispatcher.dispatchSyncUiEvent("myevent1");
      vi.advanceTimersByTime(timeToWaitForUiSyncCallback);
    });
    expect(result.current).toEqual("Counter: 3");
  });
});
