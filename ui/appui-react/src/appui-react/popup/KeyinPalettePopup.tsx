/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import type { OnCancelFunc, OnItemExecutedFunc } from "@itwin/appui-abstract";
import { DivWithOutsideClick } from "@itwin/core-react";
import { FocusTrap, Point } from "@itwin/core-react/internal";
import { PositionPopup } from "./PositionPopup.js";
import { KeyinPalettePanel } from "./KeyinPalettePanel.js";
import type { KeyinEntry } from "../keyins/Keyins.js";
import type { SizeProps } from "../utils/SizeProps.js";

/** Props defining KeyinPalettePopup component
 * @public
 */
export interface KeyinPalettePopupProps {
  id: string;
  /** @deprecated in 4.11.0. Please use the optional `anchorEl` property moving forward. */
  el: HTMLElement;
  keyins: KeyinEntry[];
  anchorEl?: HTMLElement;
  onCancel?: OnCancelFunc;
  onItemExecuted?: OnItemExecutedFunc;
}

/** Keyin Palette Popup Component
 * @public
 */
export function KeyinPalettePopup({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  el,
  id,
  keyins,
  onCancel,
  onItemExecuted,
  anchorEl,
}: KeyinPalettePopupProps) {
  // due to deprecation policy, the context won't be used as fallback
  // until we replace `el` with the optional `anchorEl` property.
  // const wrapper = React.useContext(WrapperContext);

  const _el = anchorEl ?? el;

  const [popupSize, setPopupSize] = React.useState({ width: -1, height: -1 });

  const onSizeKnown = React.useCallback(
    (newSize: SizeProps) => {
      if (
        newSize.height === popupSize.height &&
        newSize.width === popupSize.width
      )
        return;
      setPopupSize(newSize);
    },
    [popupSize]
  );

  const cancel = React.useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      switch (event.key) {
        case Key.Escape.valueOf():
          cancel();
          event.preventDefault();
          break;
      }
    },
    [cancel]
  );

  const xMid =
    _el.getBoundingClientRect().left + _el.getBoundingClientRect().width / 2;
  let point = new Point(xMid, _el.getBoundingClientRect().top);
  if (popupSize.width > 0) point = point.offsetX(popupSize.width / -2);

  return (
    <PositionPopup
      key={id}
      className="uifw-command-palette-popup-container"
      point={point}
      onSizeKnown={onSizeKnown}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <DivWithOutsideClick onOutsideClick={onCancel} onKeyDown={handleKeyDown}>
        <FocusTrap active={true} returnFocusOnDeactivate={true}>
          <KeyinPalettePanel keyins={keyins} onKeyinExecuted={onItemExecuted} />
        </FocusTrap>
      </DivWithOutsideClick>
    </PositionPopup>
  );
}
