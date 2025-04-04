/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiStateStorage
 */

import type { UiStateStorage, UiStateStorageResult } from "./UiStateStorage.js";
import { UiStateStorageStatus } from "./UiStateStorage.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Implementation of [[UiStateStorage]] using Window.localStorage.
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/appui-react#LocalStateStorage} instead.
 */
export class LocalStateStorage implements UiStateStorage {
  constructor(public w: Window = window) {}

  public async getSetting(
    settingNamespace: string,
    settingName: string
  ): Promise<UiStateStorageResult> {
    const setting = this.w.localStorage.getItem(
      `${settingNamespace}.${settingName}`
    );
    if (setting !== null)
      return {
        status: UiStateStorageStatus.Success,
        setting: JSON.parse(setting),
      };
    else return { status: UiStateStorageStatus.NotFound };
  }

  public async saveSetting(
    settingNamespace: string,
    settingName: string,
    setting: any
  ): Promise<UiStateStorageResult> {
    this.w.localStorage.setItem(
      `${settingNamespace}.${settingName}`,
      JSON.stringify(setting)
    );
    return { status: UiStateStorageStatus.Success };
  }

  public async hasSetting(
    settingNamespace: string,
    settingName: string
  ): Promise<boolean> {
    const name = `${settingNamespace}.${settingName}`;
    const setting = this.w.localStorage.getItem(name);
    if (setting === null) return false;
    return true;
  }

  public async deleteSetting(
    settingNamespace: string,
    settingName: string
  ): Promise<UiStateStorageResult> {
    const name = `${settingNamespace}.${settingName}`;
    const setting = this.w.localStorage.getItem(name);
    if (setting === null) return { status: UiStateStorageStatus.NotFound };
    this.w.localStorage.removeItem(name);
    return { status: UiStateStorageStatus.Success };
  }
}
