/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ConfigurableUi
 */

import "./ConfigurableUiContent.scss";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Point } from "@itwin/core-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { CursorInformation } from "../cursor/CursorInformation";
import { CursorPopupMenu } from "../cursor/cursormenu/CursorMenu";
import { CursorPopupRenderer } from "../cursor/cursorpopup/CursorPopupManager";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager";
import { ElementTooltip } from "../feedback/ElementTooltip";
import { KeyboardShortcutMenu } from "../keyboardshortcut/KeyboardShortcutMenu";
import { InputFieldMessage } from "../messages/InputField";
import { PointerMessage } from "../messages/Pointer";
import { PopupRenderer } from "../popup/PopupManager";
import { WidgetPanelsFrontstage } from "../widget-panels/Frontstage";
import { ContentDialogRenderer } from "../dialog/ContentDialogManager";
import { UiFramework } from "../UiFramework";
import { InternalConfigurableUiManager } from "./InternalConfigurableUiManager";
import { MessageRenderer } from "../messages/MessageRenderer";
import {
  TOOLBAR_OPACITY_DEFAULT,
  WIDGET_OPACITY_DEFAULT,
} from "../theme/ThemeId";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState";
import type { ContentProps } from "../content/ContentGroup";

/** @internal */
export const ConfigurableUiContext = React.createContext<
  Pick<
    ConfigurableUiContentProps,
    | "viewOverlay"
    | "widgetOpacity"
    | "widgetIcon"
    | "collapsePanels"
    | "animateToolSettings"
    | "toolAsToolSettingsLabel"
  >
>({});

/** Properties for [[ConfigurableUiContent]]
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface ConfigurableUiContentProps extends CommonProps {
  /** React node of the Backstage */
  appBackstage?: React.ReactNode;
  /** Controls if the view overlay should be displayed. Uses redux store as a fallback. Defaults to `true`.
   * @note Only used by configurable control APIs. See {@link ContentProps.classId}.
   * @deprecated in 4.16.0. View overlay visibility should be controlled by the components used in {@link ContentProps.content}.
   */
  viewOverlay?: boolean;
  /** Describes the opacity of widgets. Uses redux store as a fallback. Defaults to {@link WIDGET_OPACITY_DEFAULT}. */
  widgetOpacity?: number;
  /** Controls if the widget icons should be displayed. Uses redux store as a fallback. Defaults to `true`. */
  widgetIcon?: boolean;
  /** Controls if the unpinned panels should be collapsed automatically. Uses redux store as a fallback. Defaults to `false`. */
  collapsePanels?: boolean;
  /** Controls if the tool settings should be animated. Uses redux store as a fallback. Defaults to `false`. */
  animateToolSettings?: boolean;
  /** Controls if the tool settings label should be set based on activated tool. Uses redux store as a fallback. Defaults to `false`. */
  toolAsToolSettingsLabel?: boolean;
  /** Describes the opacity of toolbars. Uses redux store as a fallback. Defaults to {@link TOOLBAR_OPACITY_DEFAULT}. */
  toolbarOpacity?: number;

  /** @internal */
  idleTimeout?: number;
  /** @internal */
  intervalTimeout?: number;
}

/**
 * Allows children to get the bounds or other properties of the wrapper element.
 * @internal
 */
export const WrapperContext = React.createContext<HTMLElement>(document.body);

/** The ConfigurableUiContent component is the component the pages specified using ConfigurableUi
 * @public
 */
export function ConfigurableUiContent(props: ConfigurableUiContentProps) {
  useWidgetOpacity(props.widgetOpacity);
  useToolbarOpacity(props.toolbarOpacity);
  const [mainElement, setMainElement] = React.useState<HTMLElement>();
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement>();
  React.useEffect(() => {
    UiFramework.keyboardShortcuts.setFocusToHome();
  }, []);

  React.useEffect(() => {
    InternalConfigurableUiManager.activityTracker.initialize({
      idleTimeout: props.idleTimeout,
      intervalTimeout: props.intervalTimeout,
    });
    return () => {
      InternalConfigurableUiManager.activityTracker.terminate();
    };
  }, [props.idleTimeout, props.intervalTimeout]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    const point = new Point(e.pageX, e.pageY);
    CursorInformation.handleMouseMove(point);
  }, []);

  return (
    <ConfigurableUiContext.Provider
      value={{
        // eslint-disable-next-line deprecation/deprecation
        viewOverlay: props.viewOverlay,
        widgetOpacity: props.widgetOpacity,
        widgetIcon: props.widgetIcon,
        collapsePanels: props.collapsePanels,
        animateToolSettings: props.animateToolSettings,
        toolAsToolSettingsLabel: props.toolAsToolSettingsLabel,
      }}
    >
      <main
        role="main"
        id="uifw-configurableui-wrapper"
        className={props.className}
        style={props.style}
        onMouseMove={handleMouseMove}
        ref={(el) => setMainElement(el ?? undefined)}
      >
        <WrapperContext.Provider value={mainElement ?? document.body}>
          <ThemeProvider
            style={{ height: "100%" }}
            portalContainer={portalContainer}
          >
            {props.appBackstage}
            <WidgetPanelsFrontstage />

            <ElementTooltip />
            <PointerMessage />
            {/* eslint-disable-next-line deprecation/deprecation */}
            <KeyboardShortcutMenu />
            <InputFieldMessage />
            <CursorPopupMenu />
            <CursorPopupRenderer />
            <PopupRenderer />
            <MessageRenderer />
            <div
              className="uifw-configurableui-portalContainer"
              ref={(instance) => setPortalContainer(instance ?? undefined)}
            >
              <ContentDialogRenderer />
              <ModelessDialogRenderer />
              <ModalDialogRenderer />
            </div>
          </ThemeProvider>
        </WrapperContext.Provider>
      </main>
    </ConfigurableUiContext.Provider>
  );
}

function useWidgetOpacity(
  widgetOpacity: ConfigurableUiContentProps["widgetOpacity"]
) {
  const reduxWidgetOpacity = useReduxFrameworkState((state) => {
    // eslint-disable-next-line deprecation/deprecation
    return state?.configurableUiState.widgetOpacity;
  });
  const opacity = widgetOpacity ?? reduxWidgetOpacity ?? WIDGET_OPACITY_DEFAULT;

  React.useEffect(() => {
    const currentWidgetOpacity =
      document.documentElement.style.getPropertyValue("--buic-widget-opacity");
    if (currentWidgetOpacity === opacity.toString()) return;
    document.documentElement.style.setProperty(
      "--buic-widget-opacity",
      opacity.toString()
    );
    return () => {
      document.documentElement.style.removeProperty("--buic-widget-opacity");
    };
  }, [opacity]);
}

function useToolbarOpacity(
  toolbarOpacity: ConfigurableUiContentProps["toolbarOpacity"]
) {
  const reduxToolbarOpacity = useReduxFrameworkState((state) => {
    // eslint-disable-next-line deprecation/deprecation
    return state?.configurableUiState.toolbarOpacity;
  });

  const opacity =
    toolbarOpacity ?? reduxToolbarOpacity ?? TOOLBAR_OPACITY_DEFAULT;

  React.useEffect(() => {
    const currentToolbarOpacity =
      document.documentElement.style.getPropertyValue("--buic-toolbar-opacity");
    if (currentToolbarOpacity === opacity.toString()) return;
    document.documentElement.style.setProperty(
      "--buic-toolbar-opacity",
      opacity.toString()
    );
    return () => {
      document.documentElement.style.removeProperty("--buic-toolbar-opacity");
    };
  }, [opacity]);
}
