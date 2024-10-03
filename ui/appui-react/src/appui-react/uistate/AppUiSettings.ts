/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import type { UiStateStorage } from "@itwin/core-react";
import { UiStateEntry } from "@itwin/core-react";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher.js";
import type { UserSettingsProvider } from "../UiFramework.js";
import { UiFramework } from "../UiFramework.js";
import type { UiSyncEventArgs } from "../syncui/UiSyncEvent.js";
import type { ThemeId } from "../theme/ThemeId.js";
import { ConfigurableUiActionId } from "../redux/ConfigurableUiState.js";

/* eslint-disable deprecation/deprecation */

/** Default values that may be specified for [[AppUiSettings]].
 * @public
 * @deprecated in 4.15.0. Interface used in a deprecated class {@link AppUiSettings}.
 */
export interface InitialAppUiSettings {
  colorTheme: ThemeId;
  dragInteraction: boolean;
  widgetOpacity: number;
  showWidgetIcon?: boolean;
  /** @alpha */
  autoCollapseUnpinnedPanels?: boolean;
  animateToolSettings?: boolean;
  useToolAsToolSettingsLabel?: boolean;
  toolbarOpacity: number;
}

/** These are the UI settings that are stored in the Redux store. They control the color theme,
 * how toolbar group buttons work, and the opacity of floating widget when the cursor
 * is not inside them. It is expect that an IModelApp using App UI components will create and register AppUiSettings with
 * defaults specific to their application. This would be done by calling the following.
 *
 * ```ts
 * UiFramework.registerUserSettingsProvider(new AppUiSettings(defaults));
 * ```
 * @public
 * @deprecated in 4.15.0. Use {@link @itwin/core-react#UiStateStorage} to persist UI settings.
 */
export class AppUiSettings implements UserSettingsProvider {
  public readonly providerId = "AppUiSettingsProvider";

  private static _settingNamespace = "AppUiSettings";
  private _settings: Array<UiStateEntry<any>> = [];
  private _applyingLocalSettings = false;

  public colorTheme: UiStateEntry<ThemeId>;
  public dragInteraction: UiStateEntry<boolean>;
  public widgetOpacity: UiStateEntry<number>;
  public showWidgetIcon: UiStateEntry<boolean>;
  public autoCollapseUnpinnedPanels: UiStateEntry<boolean>;
  public animateToolSettings: UiStateEntry<boolean>;
  public useToolAsToolSettingsLabel: UiStateEntry<boolean>;
  public toolbarOpacity: UiStateEntry<number>;

  private setColorTheme = (theme: ThemeId) => {
    UiFramework.setColorTheme(theme);
    // always store to local storage to avoid flicker during startup if user is not yet logged-in
    window.localStorage.setItem("uifw:defaultTheme", theme);
  };

  constructor(defaults: Partial<InitialAppUiSettings>) {
    this._settings = [];

    this.colorTheme = new UiStateEntry<ThemeId>(
      AppUiSettings._settingNamespace,
      "ColorTheme",
      UiFramework.getColorTheme,
      this.setColorTheme,
      defaults.colorTheme
    );
    this._settings.push(this.colorTheme);

    this.dragInteraction = new UiStateEntry<boolean>(
      AppUiSettings._settingNamespace,
      "DragInteraction",
      () => UiFramework.useDragInteraction,
      (value: boolean) => UiFramework.setUseDragInteraction(value),
      defaults.dragInteraction
    );
    this._settings.push(this.dragInteraction);

    this.showWidgetIcon = new UiStateEntry<boolean>(
      AppUiSettings._settingNamespace,
      "ShowWidgetIcon",
      () => UiFramework.showWidgetIcon,
      (value: boolean) => UiFramework.setShowWidgetIcon(value),
      defaults.showWidgetIcon
    );
    this._settings.push(this.showWidgetIcon);

    this.autoCollapseUnpinnedPanels = new UiStateEntry<boolean>(
      AppUiSettings._settingNamespace,
      "AutoCollapseUnpinnedPanels",
      () => UiFramework.autoCollapseUnpinnedPanels,
      (value: boolean) => UiFramework.setAutoCollapseUnpinnedPanels(value),
      defaults.autoCollapseUnpinnedPanels
    );
    this._settings.push(this.autoCollapseUnpinnedPanels);

    this.widgetOpacity = new UiStateEntry<number>(
      AppUiSettings._settingNamespace,
      "WidgetOpacity",
      () => UiFramework.getWidgetOpacity(),
      (value: number) => UiFramework.setWidgetOpacity(value),
      defaults.widgetOpacity
    );
    this._settings.push(this.widgetOpacity);

    this.animateToolSettings = new UiStateEntry<boolean>(
      AppUiSettings._settingNamespace,
      "AnimateToolSettings",
      () => UiFramework.animateToolSettings,
      (value: boolean) => UiFramework.setAnimateToolSettings(value),
      defaults.animateToolSettings
    );
    this._settings.push(this.animateToolSettings);

    this.useToolAsToolSettingsLabel = new UiStateEntry<boolean>(
      AppUiSettings._settingNamespace,
      "UseToolAsToolSettingsLabel",
      () => UiFramework.useToolAsToolSettingsLabel,
      (value: boolean) => UiFramework.setUseToolAsToolSettingsLabel(value),
      defaults.useToolAsToolSettingsLabel
    );
    this._settings.push(this.useToolAsToolSettingsLabel);

    this.toolbarOpacity = new UiStateEntry<number>(
      AppUiSettings._settingNamespace,
      "ToolOpacity",
      () => UiFramework.getToolbarOpacity(),
      (value: number) => UiFramework.setToolbarOpacity(value),
      defaults.toolbarOpacity
    );
    this._settings.push(this.toolbarOpacity);

    SyncUiEventDispatcher.onSyncUiEvent.addListener(this.handleSyncUiEvent);
  }

  // eslint-disable-next-line deprecation/deprecation
  private handleSyncUiEvent = async (args: UiSyncEventArgs) => {
    if (this._applyingLocalSettings) return;

    if (args.eventIds.has(ConfigurableUiActionId.SetTheme)) {
      await this.colorTheme.saveSetting(UiFramework.getUiStateStorage());
      // always store as default theme in local storage to avoid flicker during startup if user is not yet logged-in
      window.localStorage.setItem(
        "uifw:defaultTheme",
        UiFramework.getColorTheme()
      );
    }

    if (args.eventIds.has(ConfigurableUiActionId.SetDragInteraction))
      await this.dragInteraction.saveSetting(UiFramework.getUiStateStorage());

    if (args.eventIds.has(ConfigurableUiActionId.SetShowWidgetIcon))
      await this.showWidgetIcon.saveSetting(UiFramework.getUiStateStorage());

    if (args.eventIds.has(ConfigurableUiActionId.AutoCollapseUnpinnedPanels))
      await this.autoCollapseUnpinnedPanels.saveSetting(
        UiFramework.getUiStateStorage()
      );

    if (args.eventIds.has(ConfigurableUiActionId.SetWidgetOpacity))
      await this.widgetOpacity.saveSetting(UiFramework.getUiStateStorage());

    if (args.eventIds.has(ConfigurableUiActionId.AnimateToolSettings))
      await this.animateToolSettings.saveSetting(
        UiFramework.getUiStateStorage()
      );

    if (args.eventIds.has(ConfigurableUiActionId.UseToolAsToolSettingsLabel))
      await this.useToolAsToolSettingsLabel.saveSetting(
        UiFramework.getUiStateStorage()
      );

    if (args.eventIds.has(ConfigurableUiActionId.SetToolbarOpacity))
      await this.toolbarOpacity.saveSetting(UiFramework.getUiStateStorage());
  };

  public async apply(storage: UiStateStorage): Promise<void> {
    this._applyingLocalSettings = true;
    for await (const setting of this._settings) {
      await setting.getSettingAndApplyValue(storage);
    }
    this._applyingLocalSettings = false;
  }

  public async loadUserSettings(storage: UiStateStorage): Promise<void> {
    await this.apply(storage);
  }
}
