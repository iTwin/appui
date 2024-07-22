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

// cSpell:ignore cursormenu cursorpopup

/** Properties for [[ConfigurableUiContent]]
 * @public
 */
export interface ConfigurableUiContentProps extends CommonProps {
  /** React node of the Backstage */
  appBackstage?: React.ReactNode;

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
<<<<<<< HEAD
  const [mainElement, setMainElement] = React.useState<HTMLElement | null>(
    null
  );
  const [portalContainer, setPortalContainer] = React.useState<
    HTMLElement | undefined
  >();
=======
  useWidgetOpacity(props.widgetOpacity);
  useToolbarOpacity(props.toolbarOpacity);
  const [mainElement, setMainElement] = React.useState<HTMLElement>();
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement>();
>>>>>>> a6c9cce62 (Fix element stacking (#917))
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
    <main
      role="main"
      id="uifw-configurableui-wrapper"
      className={props.className}
      style={props.style}
      onMouseMove={handleMouseMove}
      ref={setMainElement}
    >
<<<<<<< HEAD
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
=======
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
>>>>>>> a6c9cce62 (Fix element stacking (#917))
  );
}
