/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as moq from "typemoq";
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { ActiveContentChangedEventArgs } from "../../appui-react";
import { UiFramework, useActiveViewport } from "../../appui-react";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";

describe("useActiveViewport", () => {
  // const viewManagerMock = moq.Mock.ofType<ViewManager>();
  const selectedViewMock = moq.Mock.ofType<ScreenViewport>();
  const selectedViewMock2 = moq.Mock.ofType<ScreenViewport>();

  beforeEach(() => {
    selectedViewMock.reset();
    selectedViewMock2.reset();

    // hacks to avoid instantiating the whole core..
    (IModelApp as any)._viewManager = {
      selectedView: () => {
        return selectedViewMock.object;
      },
    };
  });

  afterEach(() => {
    (IModelApp as any)._viewManager = undefined;
  });

  it("should update active viewport", async () => {
    const { result } = renderHook(() => useActiveViewport());

    expect(result.current).to.eq(selectedViewMock.object);

    // update to return a different object so re-render occurs
    (IModelApp as any)._viewManager = {
      selectedView: () => {
        return selectedViewMock2.object;
      },
    };

    UiFramework.content.onActiveContentChangedEvent.emit(
      {} as ActiveContentChangedEventArgs
    );
    await waitFor(() => {
      expect(result.current).to.eq(selectedViewMock2.object);
    });
  });
});
