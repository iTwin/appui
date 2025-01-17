/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import type { FrontstageDef } from "../frontstage/FrontstageDef.js";
import type { LayoutStore } from "../layout/base/LayoutStore.js";
import type { NineZoneState } from "../layout/state/NineZoneState.js";
import { useUiStateStorageHandler } from "../uistate/useUiStateStorage.js";
import type { WidgetPanelsFrontstageState } from "./Frontstage.js";
import {
  FRONTSTAGE_SETTINGS_NAMESPACE,
  getFrontstageStateSettingName,
  packNineZoneState,
  stateVersion,
} from "./Frontstage.js";
import debounce from "lodash/debounce.js";

type SaveSettingFn = (
  frontstage: FrontstageDef,
  state: NineZoneState
) => Promise<void>;

/** @internal */
export function useSaveFrontstageSettings(
  frontstageDef: FrontstageDef,
  store: LayoutStore
) {
  const uiSettingsStorage = useUiStateStorageHandler();
  const saveSettingRef = React.useRef<
    ReturnType<typeof debounce<SaveSettingFn>> | undefined
  >(undefined);
  const save = React.useCallback<SaveSettingFn>(async (frontstage, state) => {
    if (!saveSettingRef.current) return;
    if (state.draggedTab) return;
    return saveSettingRef.current(frontstage, state);
  }, []);
  React.useEffect(() => {
    const saveSetting = (saveSettingRef.current = debounce(
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
    ));
    return () => {
      saveSettingRef.current = undefined;
      saveSetting.cancel();
    };
  }, [uiSettingsStorage]);
  React.useEffect(() => {
    return () => {
      // Save pending frontstage changes when changing frontstage.
      void saveSettingRef.current?.flush();
    };
  }, [frontstageDef]);
  React.useEffect(() => {
    return store.subscribe(() => {
      void save(frontstageDef, store.getState());
    });
  }, [save, frontstageDef, store]);
}
