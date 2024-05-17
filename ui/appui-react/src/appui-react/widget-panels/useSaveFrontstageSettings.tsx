/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import type { FrontstageDef } from "../frontstage/FrontstageDef";
import type { LayoutStore } from "../layout/base/LayoutStore";
import type { NineZoneState } from "../layout/state/NineZoneState";
import { useUiStateStorageHandler } from "../uistate/useUiStateStorage";
import type { WidgetPanelsFrontstageState } from "./Frontstage";
import {
  FRONTSTAGE_SETTINGS_NAMESPACE,
  getFrontstageStateSettingName,
  packNineZoneState,
  stateVersion,
} from "./Frontstage";

/** @internal */
export function useSaveFrontstageSettings(
  frontstageDef: FrontstageDef,
  store: LayoutStore
) {
  const uiSettingsStorage = useUiStateStorageHandler();
  const pendingSave = React.useRef(() => {});
  const saveSetting = React.useMemo(() => {
    const debounced = debounce(
      async (frontstage: FrontstageDef, state: NineZoneState) => {
        const id = frontstage.id;
        const setting: WidgetPanelsFrontstageState = {
          id,
          version: frontstage.version,
          stateVersion,
          nineZone: packNineZoneState(state),
        };
        await uiSettingsStorage.saveSetting(
          FRONTSTAGE_SETTINGS_NAMESPACE,
          getFrontstageStateSettingName(id),
          setting
        );
      },
      1000
    );

    const save = (frontstage: FrontstageDef, state: NineZoneState) => {
      if (state.draggedTab) return;
      debounced(frontstage, state);
    };
    save.cancel = debounced.cancel;
    pendingSave.current = debounced.immediate;
    return save;
  }, [uiSettingsStorage]);
  React.useEffect(() => {
    return () => {
      pendingSave.current();
    };
  }, [frontstageDef]);
  React.useEffect(() => {
    return () => {
      saveSetting.cancel();
    };
  }, [saveSetting]);

  React.useEffect(() => {
    saveSetting(frontstageDef, store.getState());
  }, [saveSetting, frontstageDef, store]);
  React.useEffect(() => {
    return store.subscribe(() => {
      saveSetting(frontstageDef, store.getState());
    });
  }, [saveSetting, frontstageDef, store]);
}

// istanbul ignore next
function debounce<T extends (...args: any[]) => any>(
  func: T,
  duration: number
) {
  let timeout: number | undefined;
  let handler: () => any;
  const debounced = (...args: Parameters<T>) => {
    handler = () => {
      timeout = undefined;
      return func(...args);
    };
    window.clearTimeout(timeout);
    timeout = window.setTimeout(handler, duration);
  };
  /**
   * Will cancel the timeout without running the function.
   */
  debounced.cancel = () => {
    window.clearTimeout(timeout);
    timeout = undefined;
  };
  /**
   * If not already ran, will run the function immediately and remove the timeout.
   */
  debounced.immediate = () => {
    if (timeout === undefined) return;
    debounced.cancel();
    handler?.();
  };
  return debounced;
}
