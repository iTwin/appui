/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module UiSettings */

/** Interface for getting, saving and deleting settings.
 * @beta
 */
export interface UiSettings {
  getSetting(settingNamespace: string, settingName: string): UiSettingsResult;
  saveSetting(settingNamespace: string, settingName: string, setting: any): UiSettingsResult;
  deleteSetting(settingNamespace: string, settingName: string): UiSettingsResult;
}

/** Enum for [[UiSettings]] status.
 * @beta
 */
export enum UiSettingsStatus {
  Success = 0,
  NotFound = 1,
  UnknownError = 2,
}

/** Interface for [[UiSettings]] result.
 * @beta
 */
export interface UiSettingsResult {
  status: UiSettingsStatus;
  setting?: any;
}
