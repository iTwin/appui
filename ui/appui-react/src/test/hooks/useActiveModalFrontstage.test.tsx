/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, renderHook } from "@testing-library/react";
import * as React from "react";
import { UiFramework } from "../../appui-react.js";
import { useActiveModalFrontstage } from "../../appui-react/hooks/useActiveModalFrontstage.js";

describe("useActiveModalFrontstage", () => {
  it("should add tool activated event listener", () => {
    const addListenerSpy = vi.spyOn(
      UiFramework.frontstages.onModalFrontstageChangedEvent,
      "addListener"
    );
    const removeListenerSpy = vi.spyOn(
      UiFramework.frontstages.onModalFrontstageChangedEvent,
      "removeListener"
    );
    const sut = renderHook(() => useActiveModalFrontstage());
    sut.unmount();
    expect(addListenerSpy).toHaveBeenCalledOnce();
    expect(removeListenerSpy).toHaveBeenCalledOnce();
  });

  it("should update active modal info", () => {
    const modalStageInfo = {
      title: "TestModalStage",
      content: <div>Hello World!</div>,
    };

    vi.spyOn(
      UiFramework.frontstages,
      "activeModalFrontstage",
      "get"
    ).mockImplementation(() => undefined);
    renderHook(() => useActiveModalFrontstage());
    act(() => {
      vi.spyOn(
        UiFramework.frontstages,
        "activeModalFrontstage",
        "get"
      ).mockImplementation(() => undefined);
      UiFramework.frontstages.onModalFrontstageChangedEvent.emit({
        modalFrontstageCount: 0,
      });

      vi.spyOn(
        UiFramework.frontstages,
        "activeModalFrontstage",
        "get"
      ).mockImplementation(() => modalStageInfo);
      UiFramework.frontstages.onModalFrontstageChangedEvent.emit({
        modalFrontstageCount: 1,
      });
    });
  });
});
