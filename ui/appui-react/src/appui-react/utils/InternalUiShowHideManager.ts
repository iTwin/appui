/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import type { UiStateStorage } from "@itwin/core-react";
import { UiStateStorageStatus } from "@itwin/core-react";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../syncui/SyncUiEventDispatcher";
import type { UserSettingsProvider } from "../UiFramework";
import { UiFramework } from "../UiFramework";

/** Class that maintain UiShowHide user settings between sessions
 * @internal
 */
export class UiShowHideSettingsProvider implements UserSettingsProvider {
  private static _settingsNamespace = "AppUiSettings";
  private static _autoHideUiKey = "AutoHideUi";
  private static _useProximityOpacityKey = "UseProximityOpacity";
  private static _snapWidgetOpacityKey = "SnapWidgetOpacity";
  public readonly providerId = "UiShowHideSettingsProvider";

  public static initialize() {
    UiFramework.registerUserSettingsProvider(new UiShowHideSettingsProvider());
  }

  public async loadUserSettings(storage: UiStateStorage): Promise<void> {
    let result = await storage.getSetting(
      UiShowHideSettingsProvider._settingsNamespace,
      UiShowHideSettingsProvider._autoHideUiKey
    );
    if (result.status === UiStateStorageStatus.Success)
      InternalUiShowHideManager.setAutoHideUi(result.setting);

    result = await storage.getSetting(
      UiShowHideSettingsProvider._settingsNamespace,
      UiShowHideSettingsProvider._useProximityOpacityKey
    );
    if (result.status === UiStateStorageStatus.Success)
      InternalUiShowHideManager.setUseProximityOpacity(result.setting);

    result = await storage.getSetting(
      UiShowHideSettingsProvider._settingsNamespace,
      UiShowHideSettingsProvider._snapWidgetOpacityKey
    );
    if (result.status === UiStateStorageStatus.Success)
      InternalUiShowHideManager.setSnapWidgetOpacity(result.setting);
  }

  public static async storeAutoHideUi(v: boolean, storage?: UiStateStorage) {
    void (storage ?? UiFramework.getUiStateStorage()).saveSetting(
      this._settingsNamespace,
      this._autoHideUiKey,
      v
    );
  }

  public static async storeUseProximityOpacity(
    v: boolean,
    storage?: UiStateStorage
  ) {
    void (storage ?? UiFramework.getUiStateStorage()).saveSetting(
      this._settingsNamespace,
      this._useProximityOpacityKey,
      v
    );
  }

  public static async storeSnapWidgetOpacity(
    v: boolean,
    storage?: UiStateStorage
  ) {
    void (storage ?? UiFramework.getUiStateStorage()).saveSetting(
      this._settingsNamespace,
      this._snapWidgetOpacityKey,
      v
    );
  }
}

/** The default inactivity time.
 * @internal
 */
export const INACTIVITY_TIME_DEFAULT = 3500; /** Wait 3.5 seconds */

/** Maintains Ui Show/Hide state. The `Ui` includes widgets, panels and the status bar.
 * @internal
 */
export class InternalUiShowHideManager {
  private static _isUiVisible: boolean = true;
  private static _autoHideUi: boolean = false;
  private static _showHidePanels: boolean = false;
  private static _showHideFooter: boolean = false;
  private static _inactivityTime: number = INACTIVITY_TIME_DEFAULT;
  private static _timeout: number;
  private static _useProximityOpacity: boolean = false;
  private static _snapWidgetOpacity: boolean = false;

  /** Determines if the Ui is visible */
  public static get isUiVisible() {
    return InternalUiShowHideManager._isUiVisible;
  }
  public static set isUiVisible(visible: boolean) {
    if (this._isUiVisible === visible) return;
    InternalUiShowHideManager._isUiVisible = visible;
    UiFramework.onUiVisibilityChanged.emit({ visible });
  }

  public static setAutoHideUi(value: boolean) {
    InternalUiShowHideManager._autoHideUi = value;
  }

  public static setUseProximityOpacity(value: boolean) {
    InternalUiShowHideManager._useProximityOpacity = value;
  }

  public static setSnapWidgetOpacity(value: boolean) {
    InternalUiShowHideManager._snapWidgetOpacity = value;
  }

  public static get autoHideUi(): boolean {
    return InternalUiShowHideManager._autoHideUi;
  }

  public static set autoHideUi(autoHide: boolean) {
    if (this._autoHideUi === autoHide) return;

    void UiShowHideSettingsProvider.storeAutoHideUi(autoHide);
    if (!autoHide) {
      this.isUiVisible = true;
    }
    this._autoHideUi = autoHide;
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      SyncUiEventId.ShowHideManagerSettingChange
    );
  }
  /** Determines whether the widget panels are shown and hidden. Defaults to false. */
  public static get showHidePanels(): boolean {
    return InternalUiShowHideManager._showHidePanels;
  }
  public static set showHidePanels(showHide: boolean) {
    InternalUiShowHideManager._showHidePanels = showHide;
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible,
    });
  }

  /** Determines whether the status bar is shown and hidden. Defaults to false. */
  public static get showHideFooter(): boolean {
    return InternalUiShowHideManager._showHideFooter;
  }
  public static set showHideFooter(showHide: boolean) {
    InternalUiShowHideManager._showHideFooter = showHide;
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible,
    });
  }

  /** Determines the amount of inactivity time before the Ui is hidden. Defaults to 3.5 seconds. */
  public static get inactivityTime(): number {
    return InternalUiShowHideManager._inactivityTime;
  }
  public static set inactivityTime(time: number) {
    InternalUiShowHideManager._inactivityTime = time;
  }

  /** Determines whether the proximity of the mouse should alter the opacity of a toolbar. Defaults to true. */
  public static get useProximityOpacity(): boolean {
    return InternalUiShowHideManager._useProximityOpacity;
  }
  public static set useProximityOpacity(value: boolean) {
    InternalUiShowHideManager._useProximityOpacity = value;
    void UiShowHideSettingsProvider.storeUseProximityOpacity(value);
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      SyncUiEventId.ShowHideManagerSettingChange
    );
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible,
    });
  }

  /** Determines whether the opacity of a toolbar should snap. Defaults to false. */
  public static get snapWidgetOpacity(): boolean {
    return InternalUiShowHideManager._snapWidgetOpacity;
  }
  public static set snapWidgetOpacity(value: boolean) {
    InternalUiShowHideManager._snapWidgetOpacity = value;
    void UiShowHideSettingsProvider.storeSnapWidgetOpacity(value);
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      SyncUiEventId.ShowHideManagerSettingChange
    );
    UiFramework.onUiVisibilityChanged.emit({
      visible: this.isUiVisible,
    });
  }

  /** Handler for when a Frontstage is ready */
  public static handleFrontstageReady() {
    InternalUiShowHideManager.showUiAndResetTimer();
  }

  /** Handler for when the mouse moves over the content area */
  public static handleContentMouseMove(
    _event?: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    InternalUiShowHideManager.showUiAndResetTimer();
  }

  /** Handler for when the mouse enters a widget */
  public static handleWidgetMouseEnter(
    _event?: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    InternalUiShowHideManager.showUiAndCancelTimer();
  }

  /** Shows the Ui and resets the inactivity timer */
  public static showUiAndResetTimer() {
    this.isUiVisible = true;

    window.clearTimeout(this._timeout);
    if (!this._autoHideUi) return;
    this._timeout = window.setTimeout(() => {
      this.isUiVisible = false;
    }, this._inactivityTime);
  }

  /** Shows the Ui and cancels the inactivity timer */
  public static showUiAndCancelTimer() {
    this.isUiVisible = true;
    window.clearTimeout(this._timeout);
  }

  public static terminate() {
    window.clearTimeout(this._timeout);
    this._isUiVisible = true;
    this._autoHideUi = true;
    this._showHidePanels = false;
    this._showHideFooter = false;
    this._inactivityTime = INACTIVITY_TIME_DEFAULT;
    this._useProximityOpacity = false;
    this._snapWidgetOpacity = false;
  }
}
