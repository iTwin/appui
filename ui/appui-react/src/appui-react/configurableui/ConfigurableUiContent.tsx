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
import type { WIDGET_OPACITY_DEFAULT } from "../theme/ThemeId";

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
export interface ConfigurableUiContentProps extends CommonProps {
  /** React node of the Backstage */
  appBackstage?: React.ReactNode;
  /** Controls if the view overlay should be displayed. Uses redux store as a fallback. Defaults to `true`. */
  viewOverlay?: boolean;
  /** Controls if the view overlay should be displayed. Uses redux store as a fallback. Defaults to {@link WIDGET_OPACITY_DEFAULT}. */
  widgetOpacity?: number;
  /** Controls if the widget icons should be displayed. Uses redux store as a fallback. Defaults to `true`. */
  widgetIcon?: boolean;
  /** Controls if the unpinned panels should be collapsed automatically. Uses redux store as a fallback. Defaults to `false`. */
  collapsePanels?: boolean;
  /** Controls if the tool settings should be animated. Uses redux store as a fallback. Defaults to `false`. */
  animateToolSettings?: boolean;
  /** Controls if the tool settings label should be set based on activated tool. Uses redux store as a fallback. Defaults to `false`. */
  toolAsToolSettingsLabel?: boolean;

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
  const [mainElement, setMainElement] = React.useState<HTMLElement | null>(
    null
  );
  const [portalContainer, setPortalContainer] = React.useState<
    HTMLElement | undefined
  >();
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
        ref={setMainElement}
      >
        <WrapperContext.Provider value={mainElement!}>
          <ThemeProvider
            style={{ height: "100%" }}
            portalContainer={portalContainer}
          >
            {props.appBackstage}
            <WidgetPanelsFrontstage />
            <ContentDialogRenderer />
            <ModelessDialogRenderer />
            <ModalDialogRenderer />
            <ElementTooltip />
            <PointerMessage />
            <KeyboardShortcutMenu />
            <InputFieldMessage />
            <CursorPopupMenu />
            <CursorPopupRenderer />
            <PopupRenderer />
            <MessageRenderer />
          </ThemeProvider>
        </WrapperContext.Provider>
        <div
          className="uifw-configurableui-portalContainer"
          ref={(instance) => setPortalContainer(instance ?? undefined)}
        />
      </main>
    </ConfigurableUiContext.Provider>
  );
}
