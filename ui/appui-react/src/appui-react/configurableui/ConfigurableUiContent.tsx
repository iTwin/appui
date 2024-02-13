/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ConfigurableUi
 */

import "./configurableui.scss";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Point } from "@itwin/core-react";
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
import { ActivityMessageRenderer } from "../messages/ActivityMessage";

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
 * @public
 */
export const WrapperContext = React.createContext<HTMLElement>(document.body);

/** The ConfigurableUiContent component is the component the pages specified using ConfigurableUi
 * @public
 */
export function ConfigurableUiContent(props: ConfigurableUiContentProps) {
  const [mainElement, setMainElement] = React.useState<HTMLElement | null>(
    null
  );

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
      <WrapperContext.Provider value={mainElement!}>
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
        <ActivityMessageRenderer />
      </WrapperContext.Provider>
    </main>
  );
}
