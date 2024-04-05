/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { ActiveContentChangedEventArgs } from "../../appui-react";
import { UiFramework, useActiveViewport } from "../../appui-react";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useActiveViewport", () => {
  const selectedView = {} as ScreenViewport;

  beforeEach(() => {
    vi.spyOn(IModelApp.viewManager, "selectedView", "get").mockImplementation(
      () => selectedView
    );
  });

  it("should update active viewport", async () => {
    const { result, waitFor } = renderHook(() => useActiveViewport());
    expect(result.current).toEqual(selectedView);

    const updatedView = {} as ScreenViewport;
    vi.spyOn(IModelApp.viewManager, "selectedView", "get").mockImplementation(
      () => updatedView
    );
    act(() => {
      UiFramework.content.onActiveContentChangedEvent.emit(
        {} as ActiveContentChangedEventArgs
      );
    });

    await waitFor(() => {
      expect(result.current).toEqual(updatedView);
    });
  });
});
