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
import type { ActiveContentChangedEventArgs } from "../framework/FrameworkContent";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../syncui/SyncUiEventDispatcher";
import { UiFramework } from "../UiFramework";
import type { UiSyncEventArgs } from "../syncui/UiSyncEvent";

/** React hook that maintains the active viewport.
 * @public
 */
export function useActiveViewport(): ScreenViewport | undefined {
  const [activeViewport, setActiveViewport] = useState(
    IModelApp.viewManager.selectedView
  );
  useEffect(() => {
    // eslint-disable-next-line deprecation/deprecation
    const onActiveContentChanged = (_args: ActiveContentChangedEventArgs) => {
      setActiveViewport(IModelApp.viewManager.selectedView);
    };

    // IModelApp.viewManager.onSelectedViewportChanged will often fire before UI components have mounted
    // so use UiFramework.content.onActiveContentChangedEvent which will always trigger once all stage components
    // are loaded and when the IModelApp.viewManager.selectedView changes.
    UiFramework.content.onActiveContentChangedEvent.addListener(
      onActiveContentChanged
    );
    return () => {
      UiFramework.content.onActiveContentChangedEvent.removeListener(
        onActiveContentChanged
      );
    };
  }, []);

  useEffect(() => {
    const syncIdsOfInterest = [
      SyncUiEventId.ActiveContentChanged,
      SyncUiEventId.ContentControlActivated,
      SyncUiEventId.FrontstageReady,
    ];
    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent = (args: UiSyncEventArgs): void => {
      // istanbul ignore else
      if (
        syncIdsOfInterest.some((value: string): boolean =>
          args.eventIds.has(value)
        )
      ) {
        const activeContentControl =
          UiFramework.content.getActiveContentControl();
        setActiveViewport(
          activeContentControl && activeContentControl.viewport
        );
      }
    };

    return SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);
  }, []);

  return activeViewport;
}
