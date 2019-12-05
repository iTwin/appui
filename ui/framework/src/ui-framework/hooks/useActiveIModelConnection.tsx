/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Hooks */

import { useState, useEffect } from "react";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { UiFramework } from "../UiFramework";
import { SyncUiEventDispatcher, SyncUiEventArgs, SessionStateActionId } from "../../ui-framework";

/** React hook that maintains the active IModelConnection. For this hook to work properly the
 * IModelConnection must be set using UiFramework.setIModelConnection method. This also requires
 * that the host app includes the UiFramework reducer into its Redux store.
 * @beta
 */
export function useActiveIModelConnection(): IModelConnection | undefined {
  const [activeConnection, setActiveConnection] = useState(UiFramework.getIModelConnection());
  useEffect(() => {
    const handleSyncUiEvent = (args: SyncUiEventArgs): void => {
      const eventIds = [SessionStateActionId.SetIModelConnection];
      // istanbul ignore else
      if (eventIds.some((value: string): boolean => args.eventIds.has(value))) {
        setActiveConnection(UiFramework.getIModelConnection());
      }
    };

    SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);
    return () => {
      SyncUiEventDispatcher.onSyncUiEvent.removeListener(handleSyncUiEvent);
    };
  }, [activeConnection]);

  return activeConnection;
}
