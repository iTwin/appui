/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Orientation } from "@itwin/components-react";
import { DivWithOutsideClick } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import * as React from "react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup.js";
import type { PopupPropsBase } from "./PopupManager.js";
import { PopupManager } from "./PopupManager.js";
import { PositionPopup } from "./PositionPopup.js";
import { useState } from "react";
import { WrapperContext } from "../configurableui/ConfigurableUiContent.js";
import { type Placement } from "../utils/Placement.js";
import type { SizeProps } from "../utils/SizeProps.js";

// Props used for the ComponentPopup.
interface ComponentPopupProps extends Omit<PopupPropsBase, "el"> {
  children?: React.ReactNode;
  placement: Placement;
  orientation: Orientation;
  onCancel: () => void;
  anchor?: HTMLElement;
}

/**
 * Displays a React Component inside a popup. The user-facing API is the {@link PopupManager} and should be used instead of this component.
 * @internal
 */
export const ComponentPopup: React.FC<ComponentPopupProps> = ({
  pt,
  children,
  offset,
  placement,
  id,
  onCancel,
  anchor,
}) => {
  const wrapper = React.useContext(WrapperContext);
  const [size, setSize] = useState<SizeProps>({ width: -1, height: -1 });

  let point = PopupManager.getPopupPosition(
    anchor ?? wrapper,
    pt,
    new Point(),
    size
  );

  const popupRect = CursorPopup.getPopupRect(point, offset, size, placement);
  point = new Point(popupRect.left, popupRect.top);

  const handleSizeKnown = (newSize: SizeProps) => {
    if (newSize.height === size.height && newSize.width === size.width) return;
    setSize(newSize);
  };

  return (
    <PositionPopup
      key={id}
      className="uifw-no-border"
      point={point}
      onSizeKnown={handleSizeKnown}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <DivWithOutsideClick onOutsideClick={onCancel}>
        {children}
      </DivWithOutsideClick>
    </PositionPopup>
  );
};
