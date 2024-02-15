/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Orientation, SizeProps } from "@itwin/core-react";
import { DivWithOutsideClick, Point, Size } from "@itwin/core-react";
import * as React from "react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup";
import type { PopupPropsBase } from "./PopupManager";
import { PopupManager } from "./PopupManager";
import { PositionPopup } from "./PositionPopup";
import { useEffect, useState } from "react";
import { WrapperContext } from "../configurableui/ConfigurableUiContent";
import type { Placement } from "../utils/Placement";

// Props used for the ComponentPopup.
interface ComponentPopupProps extends Omit<PopupPropsBase, "el"> {
  Component: React.ReactElement;
  placement: Placement;
  orientation: Orientation;
  onCancel: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

/**
 * Displays a React Component inside a popup. The user-facing API is the {@link PopupManager} and should be used instead of this component.
 * @internal
 */
export const ComponentPopup: React.FC<ComponentPopupProps> = ({
  pt,
  Component,
  offset,
  placement,
  id,
  onCancel,
  anchorRef,
}) => {
  const wrapper = React.useContext(WrapperContext);
  const [size, setSize] = useState<Size>(new Size(-1, -1));

  useEffect(() => {
    const newSize = Size.create(size);
    if (!size.equals(newSize)) {
      setSize(newSize);
    }
  }, [size]);

  let point = PopupManager.getPopupPosition(
    anchorRef?.current ?? wrapper,
    pt,
    new Point(),
    size
  );

  const popupRect = CursorPopup.getPopupRect(point, offset, size, placement);
  point = new Point(popupRect.left, popupRect.top);

  const handleSizeKnown = (newSize: SizeProps) => {
    if (!size.equals(newSize)) setSize(Size.create(newSize));
  };

  return (
    <PositionPopup
      key={id}
      className="uifw-no-border"
      point={point}
      onSizeKnown={handleSizeKnown}
    >
      <DivWithOutsideClick onOutsideClick={onCancel}>
        {Component}
      </DivWithOutsideClick>
    </PositionPopup>
  );
};
