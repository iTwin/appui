/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { act, render, renderHook } from "@testing-library/react";
import type { ActiveContentChangedEventArgs } from "../../appui-react";
import { UiFramework, useActiveViewport } from "../../appui-react";

describe("useActiveViewport", () => {
  const selectedView = {} as ScreenViewport;

  beforeEach(() => {
    vi.spyOn(IModelApp.viewManager, "selectedView", "get").mockImplementation(
      () => selectedView
    );
  });

  it("should update active viewport", async () => {
    const { result } = renderHook(() => useActiveViewport());
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

    await vi.waitFor(() => {
      expect(result.current).toEqual(updatedView);
    });
  });

  it("should sync active viewport correctly", () => {
    vi.spyOn(IModelApp.viewManager, "selectedView", "get").mockReturnValue(
      {} as ScreenViewport
    );

    function Component1() {
      React.useEffect(() => {
        vi.spyOn(IModelApp.viewManager, "selectedView", "get").mockReturnValue(
          undefined
        );
        IModelApp.viewManager.onSelectedViewportChanged.emit({
          current: undefined,
          previous: undefined,
        });
      }, []);
      return null;
    }
    function Component2() {
      const activeViewport = useActiveViewport();
      return <div>{activeViewport ? "Active" : "Inactive"}</div>;
    }
    const { getByText } = render(
      <>
        <Component1 />
        <Component2 />
      </>
    );
    getByText("Inactive");
  });
});
