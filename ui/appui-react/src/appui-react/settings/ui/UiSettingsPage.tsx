/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

// cSpell:ignore configurableui checkmark

import widowSettingsIconSvg from "@bentley/icons-generic/icons/window-settings.svg";
import "./UiSettingsPage.scss";
import * as React from "react";
import type { SettingsTabEntry } from "@itwin/core-react";
import { UiFramework } from "../../UiFramework";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../../syncui/SyncUiEventDispatcher";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select, Slider, ToggleSwitch } from "@itwin/itwinui-react";
import type { UiSyncEventArgs } from "../../syncui/UiSyncEvent";
import { useTranslation } from "../../hooks/useTranslation";
import { ColorTheme, SYSTEM_PREFERRED_COLOR_THEME } from "../../theme/ThemeId";

/** UiSettingsPage displaying the active UI settings. This page lets users set the following settings.
 *
 * - theme - Dark, Light, with or without High contrast, or based on OS preference.
 * - auto hide - Starts a timer and blanks out ui components that overlay content if there is no mouse movement for a period of time.
 * - drag interaction - If set, toolbar group buttons require a press and drag or a long press to open. In this mode a child action
 * item is shown as the group button and is activated when button is clicked. If a different child item is selected, it becomes the
 * active group button item.
 * - use proximity - Changes the opacity of toolbar from transparent to opaque as the mouse moves closer.
 * - snap widget opacity - triggers an abrupt change from transparent to opaque for tool and navigation widgets, instead of a gradual change based on mouse location.
 * - widget opacity - determines how transparent floating widgets become when the mouse in not in them.
 *
 * @beta
 */
export function UiSettingsPage() {
  const { translate } = useTranslation();
  const [theme, setTheme] = React.useState(() => UiFramework.getColorTheme());
  const [useDragInteraction, setUseDragInteraction] = React.useState(
    () => UiFramework.useDragInteraction
  );
  const [showWidgetIcon, setShowWidgetIcon] = React.useState(
    () => UiFramework.showWidgetIcon
  );
  const [autoCollapseUnpinnedPanels, setAutoCollapseUnpinnedPanels] =
    React.useState(() => UiFramework.autoCollapseUnpinnedPanels);
  const [animateToolSettings, setAnimateToolSettings] = React.useState(
    () => UiFramework.animateToolSettings
  );
  const [useToolAsToolSettingsLabel, setUseToolAsToolSettingsLabel] =
    React.useState(() => UiFramework.useToolAsToolSettingsLabel);
  const [widgetOpacity, setWidgetOpacity] = React.useState(() =>
    UiFramework.getWidgetOpacity()
  );
  const [autoHideUi, setAutoHideUi] = React.useState(
    () => UiFramework.visibility.autoHideUi
  );
  const [useProximityOpacity, setUseProximityOpacity] = React.useState(
    // eslint-disable-next-line deprecation/deprecation
    () => UiFramework.visibility.useProximityOpacity
  );
  const [snapWidgetOpacity, setSnapWidgetOpacity] = React.useState(
    () => UiFramework.visibility.snapWidgetOpacity
  );
  const [toolbarOpacity, setToolbarOpacity] = React.useState(() =>
    UiFramework.getToolbarOpacity()
  );

  React.useEffect(() => {
    const syncIdsOfInterest = [
      "configurableui:set_theme",
      "configurableui:set_widget_opacity",
      "configurableui:set-show-widget-icon",
      "configurableui:set-drag-interaction",
      "configurableui:set-auto-collapse-unpinned-panels",
      "configurableui:set-animate-tool-settings",
      "configurableui:set-use-tool-as-tool-settings-label",
      "configurableui:set-toolbar-opacity",
      SyncUiEventId.ShowHideManagerSettingChange,
    ];

    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent = (args: UiSyncEventArgs) => {
      // istanbul ignore else
      if (
        syncIdsOfInterest.some((value: string): boolean =>
          args.eventIds.has(value)
        )
      ) {
        if (UiFramework.getColorTheme() !== theme)
          setTheme(UiFramework.getColorTheme());
        if (UiFramework.visibility.autoHideUi !== autoHideUi)
          setAutoHideUi(UiFramework.visibility.autoHideUi);
        if (UiFramework.useDragInteraction !== useDragInteraction)
          setUseDragInteraction(UiFramework.useDragInteraction);
        if (UiFramework.showWidgetIcon !== showWidgetIcon)
          setShowWidgetIcon(UiFramework.showWidgetIcon);
        if (
          UiFramework.autoCollapseUnpinnedPanels !== autoCollapseUnpinnedPanels
        )
          setAutoCollapseUnpinnedPanels(UiFramework.autoCollapseUnpinnedPanels);
        if (UiFramework.getWidgetOpacity() !== widgetOpacity)
          setWidgetOpacity(UiFramework.getWidgetOpacity());
        if (UiFramework.visibility.autoHideUi !== autoHideUi)
          setAutoHideUi(UiFramework.visibility.autoHideUi);
        // eslint-disable-next-line deprecation/deprecation
        if (UiFramework.visibility.useProximityOpacity !== useProximityOpacity)
          // eslint-disable-next-line deprecation/deprecation
          setUseProximityOpacity(UiFramework.visibility.useProximityOpacity);
        if (UiFramework.visibility.snapWidgetOpacity !== snapWidgetOpacity)
          setSnapWidgetOpacity(UiFramework.visibility.snapWidgetOpacity);
        if (UiFramework.animateToolSettings !== animateToolSettings)
          setAnimateToolSettings(UiFramework.animateToolSettings);
        if (
          UiFramework.useToolAsToolSettingsLabel !== useToolAsToolSettingsLabel
        )
          setUseToolAsToolSettingsLabel(UiFramework.useToolAsToolSettingsLabel);
        if (UiFramework.getToolbarOpacity() !== toolbarOpacity)
          setToolbarOpacity(UiFramework.getToolbarOpacity());
      }
    };
    return SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);
  }, [
    autoCollapseUnpinnedPanels,
    autoHideUi,
    showWidgetIcon,
    snapWidgetOpacity,
    theme,
    useDragInteraction,
    useProximityOpacity,
    widgetOpacity,
    animateToolSettings,
    useToolAsToolSettingsLabel,
    toolbarOpacity,
  ]);

  const defaultThemeOption = {
    label: translate("settings.uiSettingsPage.systemPreferred"),
    value: SYSTEM_PREFERRED_COLOR_THEME,
  };
  const themeOptions: SelectOption<string>[] = [
    defaultThemeOption,
    {
      label: translate("settings.uiSettingsPage.light"),
      value: ColorTheme.Light,
    },
    {
      label: translate("settings.uiSettingsPage.dark"),
      value: ColorTheme.Dark,
    },
    {
      label: translate("settings.uiSettingsPage.lightHighContrast"),
      value: ColorTheme.HighContrastLight,
    },
    {
      label: translate("settings.uiSettingsPage.darkHighContrast"),
      value: ColorTheme.HighContrastDark,
    },
    {
      label: translate("settings.uiSettingsPage.inherit"),
      value: ColorTheme.Inherit,
    },
  ];

  const onThemeChange = React.useCallback((newValue: string) => {
    UiFramework.setColorTheme(newValue);
  }, []);

  const onAutoHideChange = React.useCallback(async () => {
    UiFramework.visibility.autoHideUi = !autoHideUi;
  }, [autoHideUi]);

  const onUseProximityOpacityChange = React.useCallback(async () => {
    // eslint-disable-next-line deprecation/deprecation
    UiFramework.visibility.useProximityOpacity = !useProximityOpacity;
  }, [useProximityOpacity]);

  const onSnapWidgetOpacityChange = React.useCallback(async () => {
    UiFramework.visibility.snapWidgetOpacity = !snapWidgetOpacity;
  }, [snapWidgetOpacity]);

  const onWidgetIconChange = React.useCallback(async () => {
    UiFramework.setShowWidgetIcon(!showWidgetIcon);
  }, [showWidgetIcon]);

  const onAutoCollapseUnpinnedPanelsChange = React.useCallback(async () => {
    UiFramework.setAutoCollapseUnpinnedPanels(!autoCollapseUnpinnedPanels);
  }, [autoCollapseUnpinnedPanels]);

  const onWidgetOpacityChange = React.useCallback(
    async (values: readonly number[]) => {
      // istanbul ignore else
      if (values.length > 0) {
        UiFramework.setWidgetOpacity(values[0]);
      }
    },
    []
  );

  const onToggleDragInteraction = React.useCallback(async () => {
    UiFramework.setUseDragInteraction(!useDragInteraction);
  }, [useDragInteraction]);

  const OnToggleAnimateToolSettings = React.useCallback(async () => {
    UiFramework.setAnimateToolSettings(!animateToolSettings);
  }, [animateToolSettings]);
  const currentTheme = UiFramework.getColorTheme();

  const OnToggleUseToolAsToolSettingsLabel = React.useCallback(async () => {
    UiFramework.setUseToolAsToolSettingsLabel(!useToolAsToolSettingsLabel);
  }, [useToolAsToolSettingsLabel]);

  const onToolbarOpacityChange = React.useCallback(
    async (values: readonly number[]) => {
      // istanbul ignore else
      if (values.length > 0) {
        UiFramework.setToolbarOpacity(values[0]);
      }
    },
    []
  );

  return (
    <div className="uifw-settings">
      <SettingsItem
        title={translate("settings.uiSettingsPage.themeTitle")}
        description={translate("settings.uiSettingsPage.themeDescription")}
        settingUi={
          <div
            data-testid="select-theme-container"
            className="select-theme-container"
          >
            <Select
              value={currentTheme}
              onChange={onThemeChange}
              options={themeOptions}
              data-testid="select-theme"
              size="small"
            />
          </div>
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.autoHideTitle")}
        description={translate("settings.uiSettingsPage.autoHideDescription")}
        settingUi={
          <ToggleSwitch checked={autoHideUi} onChange={onAutoHideChange} />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.dragInteractionTitle")}
        description={translate(
          "settings.uiSettingsPage.dragInteractionDescription"
        )}
        settingUi={
          <ToggleSwitch
            checked={useDragInteraction}
            onChange={onToggleDragInteraction}
          />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.useProximityOpacityTitle")}
        description={translate(
          "settings.uiSettingsPage.useProximityOpacityDescription"
        )}
        settingUi={
          <ToggleSwitch
            checked={useProximityOpacity}
            onChange={onUseProximityOpacityChange}
          />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.snapWidgetOpacityTitle")}
        description={translate(
          "settings.uiSettingsPage.snapWidgetOpacityDescription"
        )}
        settingUi={
          <ToggleSwitch
            checked={snapWidgetOpacity}
            onChange={onSnapWidgetOpacityChange}
          />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.widgetIconTitle")}
        description={translate("settings.uiSettingsPage.widgetIconDescription")}
        settingUi={
          <ToggleSwitch
            checked={showWidgetIcon}
            onChange={onWidgetIconChange}
          />
        }
      />
      <SettingsItem
        title={translate(
          "settings.uiSettingsPage.autoCollapseUnpinnedPanelsTitle"
        )}
        description={translate(
          "settings.uiSettingsPage.autoCollapseUnpinnedPanelsDescription"
        )}
        settingUi={
          <ToggleSwitch
            checked={autoCollapseUnpinnedPanels}
            onChange={onAutoCollapseUnpinnedPanelsChange}
          />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.animateToolSettingsTitle")}
        description={translate(
          "settings.uiSettingsPage.animateToolSettingsDescription"
        )}
        settingUi={
          <ToggleSwitch
            checked={animateToolSettings}
            onChange={OnToggleAnimateToolSettings}
          />
        }
      />
      <SettingsItem
        title={translate(
          "settings.uiSettingsPage.useToolAsToolSettingsLabelTitle"
        )}
        description={translate(
          "settings.uiSettingsPage.useToolAsToolSettingsLabelDescription"
        )}
        settingUi={
          <ToggleSwitch
            checked={useToolAsToolSettingsLabel}
            onChange={OnToggleUseToolAsToolSettingsLabel}
          />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.toolbarOpacityTitle")}
        description={translate(
          "settings.uiSettingsPage.toolbarOpacityDescription"
        )}
        settingUi={
          <Slider
            style={{ flex: "1" }}
            values={[toolbarOpacity]}
            step={0.05}
            onChange={onToolbarOpacityChange}
            min={0.2}
            max={1.0}
            maxLabel="1.0"
            tickLabels={["", "", "", "", ""]}
          />
        }
      />
      <SettingsItem
        title={translate("settings.uiSettingsPage.widgetOpacityTitle")}
        description={translate(
          "settings.uiSettingsPage.widgetOpacityDescription"
        )}
        settingUi={
          <Slider
            style={{ flex: "1" }}
            values={[widgetOpacity]}
            step={0.05}
            onChange={onWidgetOpacityChange}
            min={0.2}
            max={1.0}
            maxLabel="1.0"
            tickLabels={["", "", "", "", ""]}
          />
        }
      />
    </div>
  );
}

interface SettingsItemProps {
  title: string;
  description: string;
  settingUi: React.ReactNode;
}

function SettingsItem(props: SettingsItemProps) {
  const { title, description, settingUi } = props;

  return (
    <div className="uifw-settings-item">
      <div className="panel left-panel">
        <span className="title">{title}</span>
        <span className="description">{description}</span>
      </div>
      <div className="panel right-panel">{settingUi}</div>
    </div>
  );
}

/**
 * Return a SettingsTabEntry that can be used to define the available settings that can be set for an application.
 * @param itemPriority - Used to define the order of the entry in the Settings Stage
 * @beta
 */
export function getUiSettingsManagerEntry(
  itemPriority: number
): SettingsTabEntry {
  return {
    itemPriority,
    tabId: "uifw:UiStateStorage",
    label: UiFramework.translate("settings.uiSettingsPage.label"),
    icon: widowSettingsIconSvg,
    page: <UiSettingsPage />,
    isDisabled: false,
    tooltip: UiFramework.translate("settings.uiSettingsPage.tooltip"),
  };
}
