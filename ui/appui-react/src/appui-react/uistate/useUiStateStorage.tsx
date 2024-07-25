/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiStateStorage
 */

import * as React from "react";
import type { UiStateStorage } from "@itwin/core-react";
import { LocalStateStorage } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../syncui/SyncUiEventDispatcher";

/** @public */
export function useUiStateStorageHandler(): UiStateStorage {
  return React.useContext(UiStateStorageContext);
}

/** @internal */
export const UiStateStorageContext = React.createContext<UiStateStorage>(
  new LocalStateStorage()
);
UiStateStorageContext.displayName = "uifw:UiStateStorageContext";

/** Properties for the [[UiStateStorageHandler]] component.
 * @public
 */
export interface UiSettingsProviderProps {
  children?: React.ReactNode;
}

/** Allows to provide a custom [[UiStateStorage]] implementation to persist UI settings
 * through [[UiFramework.setUiStateStorage]].
 *
 * This component should wrap the [[ConfigurableUiContent]].
 *
 * ```tsx
 *  <UiStateStorageHandler>
 *    <ConfigurableUiContent />
 *  </UiStateStorageHandler>
 * ```
 * @public
 */
export function UiStateStorageHandler(props: UiSettingsProviderProps) {
  const [stateStorage, setStateStorage] = React.useState(
    UiFramework.getUiStateStorage()
  );

  React.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (
        SyncUiEventDispatcher.hasEventOfInterest(args.eventIds, [
          SyncUiEventId.UiStateStorageChanged,
        ])
      )
        setStateStorage(UiFramework.getUiStateStorage());
    });
  });

  return (
    <UiStateStorageContext.Provider
      children={props.children} // eslint-disable-line react/no-children-prop
      value={stateStorage}
    />
  );
}
