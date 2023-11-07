/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import type { OnCancelFunc, OnItemExecutedFunc } from "@itwin/appui-abstract";
import type { SizeProps } from "@itwin/core-react";
import { DivWithOutsideClick, FocusTrap, Point, Size } from "@itwin/core-react";
import { PositionPopup } from "./PositionPopup";
import { KeyinPalettePanel } from "./KeyinPalettePanel";
import type { KeyinEntry } from "../uiadmin/FrameworkUiAdmin";
import { SpecialKey } from "@itwin/core-react";

/** Props defining KeyinPalettePopup component
 * @public */
export interface KeyinPalettePopupProps {
  id: string;
  el: HTMLElement;
  keyins: KeyinEntry[];
  onCancel?: OnCancelFunc;
  onItemExecuted?: OnItemExecutedFunc;
}

/** Keyin Palette Popup Component
 * @public
 */
export function KeyinPalettePopup({
  el,
  id,
  keyins,
  onCancel,
  onItemExecuted,
}: KeyinPalettePopupProps) {
  const [popupSize, setPopupSize] = React.useState(new Size(-1, -1));

  const onSizeKnown = React.useCallback(
    (newSize: SizeProps) => {
      // istanbul ignore else
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
        case SpecialKey.Escape:
          cancel();
          event.preventDefault();
          break;
      }
    },
    [cancel]
  );

  const xMid =
    el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2;
  let point = new Point(xMid, el.getBoundingClientRect().top);
  // istanbul ignore next
  if (popupSize.width > 0) point = point.offsetX(popupSize.width / -2);

  return (
    <PositionPopup
      key={id}
      className="uifw-command-palette-popup-container"
      point={point}
      onSizeKnown={onSizeKnown}
    >
      <DivWithOutsideClick onOutsideClick={onCancel} onKeyDown={handleKeyDown}>
        <FocusTrap active={true} returnFocusOnDeactivate={true}>
          <KeyinPalettePanel keyins={keyins} onKeyinExecuted={onItemExecuted} />
        </FocusTrap>
      </DivWithOutsideClick>
    </PositionPopup>
  );
}
