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
import type { SizeProps } from "@itwin/core-react";
import { DivWithOutsideClick, FocusTrap, Point, Size } from "@itwin/core-react";
import { PositionPopup } from "./PositionPopup";
import { KeyinPalettePanel } from "./KeyinPalettePanel";
import type { KeyinEntry } from "../keyins/Keyins";

/** Props defining KeyinPalettePopup component
 * @public */
export interface KeyinPalettePopupProps {
  id: string;
  /** @deprecated in 4.11.x. Please use the optional `anchorEl` property moving forward. */
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
  // eslint-disable-next-line deprecation/deprecation
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

  const [popupSize, setPopupSize] = React.useState(new Size(-1, -1));

  const onSizeKnown = React.useCallback(
    (newSize: SizeProps) => {
      if (!popupSize.equals(newSize)) setPopupSize(Size.create(newSize));
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
      {/* eslint-disable-next-line deprecation/deprecation */}
      <DivWithOutsideClick onOutsideClick={onCancel} onKeyDown={handleKeyDown}>
        <FocusTrap active={true} returnFocusOnDeactivate={true}>
          <KeyinPalettePanel keyins={keyins} onKeyinExecuted={onItemExecuted} />
        </FocusTrap>
      </DivWithOutsideClick>
    </PositionPopup>
  );
}
