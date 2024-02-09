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

/** The ConfigurableUiContent component is the component the pages specified using ConfigurableUi
 * @public
 */
export function ConfigurableUiContent(props: ConfigurableUiContentProps) {
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
    <main
      role="main"
      id="uifw-configurableui-wrapper"
      className={props.className}
      style={props.style}
      onMouseMove={handleMouseMove}
    >
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
      <div
        className="uifw-configurableui-portalContainer"
        ref={(instance) => setPortalContainer(instance ?? undefined)}
      />
    </main>
  );
}
