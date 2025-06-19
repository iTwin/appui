/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { act, renderHook } from "@testing-library/react";
import {
  SyncUiEventDispatcher,
  UiFramework,
  useActiveIModelConnection,
} from "../../appui-react.js";
import { createBlankConnection } from "../TestUtils.js";

describe("useActiveIModelConnection", () => {
  it("should render", () => {
    const { result } = renderHook(() => useActiveIModelConnection());
    expect(result.current).toBeUndefined();
    expect(UiFramework.getIModelConnection()).toEqual(undefined);
    expect(
      UiFramework.frameworkState?.sessionState.iModelConnection
    ).toBeUndefined();

    const initEventStub = vi.spyOn(
      SyncUiEventDispatcher,
      "initializeConnectionEvents"
    );
    const clearEventStub = vi.spyOn(
      SyncUiEventDispatcher,
      "clearConnectionEvents"
    );

    const newConnection = createBlankConnection({ name: "new" });

    // should trigger dispatch action
    act(() => {
      UiFramework.setIModelConnection(newConnection, true);
    });
    expect(result.current?.name).toEqual("new");
    expect(
      UiFramework.frameworkState?.sessionState.iModelConnection?.name
    ).toEqual("new");
    expect(UiFramework.getIModelConnection()?.name).toEqual("new");
    expect(initEventStub).toHaveBeenCalled();
    expect(clearEventStub).not.toBeCalled();
    initEventStub.mockReset();

    // already set, so should not trigger dispatch action
    act(() => {
      UiFramework.setIModelConnection(newConnection, true);
    });
    expect(initEventStub).not.toBeCalled();
    expect(clearEventStub).not.toBeCalled();

    // should trigger clearing action
    act(() => {
      UiFramework.setIModelConnection(undefined, true);
    });
    expect(result.current).toBeUndefined();
    expect(UiFramework.getIModelConnection()).toEqual(undefined);
    expect(
      UiFramework.frameworkState?.sessionState.iModelConnection
    ).toBeUndefined();
    expect(clearEventStub).toHaveBeenCalled();
    expect(initEventStub).not.toBeCalled();
  });
});
