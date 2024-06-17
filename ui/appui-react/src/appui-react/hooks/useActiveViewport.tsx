/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useEffect, useState } from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../syncui/SyncUiEventDispatcher";
import { UiFramework } from "../UiFramework";

/** React hook that maintains the active viewport.
 * @public
 */
export function useActiveViewport(): ScreenViewport | undefined {
  const [activeViewport, setActiveViewport] = useState(
    IModelApp.viewManager.selectedView
  );
  useEffect(() => {
    // IModelApp.viewManager.onSelectedViewportChanged will often fire before UI components have mounted
    // so use UiFramework.content.onActiveContentChangedEvent which will always trigger once all stage components
    // are loaded and when the IModelApp.viewManager.selectedView changes.
    return UiFramework.content.onActiveContentChangedEvent.addListener(() => {
      setActiveViewport(IModelApp.viewManager.selectedView);
    });
  }, []);

  useEffect(() => {
    const syncIdsOfInterest = [
      SyncUiEventId.ActiveContentChanged,
      // eslint-disable-next-line deprecation/deprecation
      SyncUiEventId.ContentControlActivated,
      SyncUiEventId.FrontstageReady,
    ];
    // eslint-disable-next-line deprecation/deprecation
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args): void => {
      if (
        syncIdsOfInterest.some((value: string): boolean =>
          args.eventIds.has(value)
        )
      ) {
        const activeContentControl =
          // eslint-disable-next-line deprecation/deprecation
          UiFramework.content.getActiveContentControl();
        setActiveViewport(
          activeContentControl && activeContentControl.viewport
        );
      }
    });
  }, []);

  return activeViewport;
}
