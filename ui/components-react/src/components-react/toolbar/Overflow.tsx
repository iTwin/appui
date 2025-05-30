/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Overflow.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps, NoChildrenProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";
import { useRefState } from "@itwin/core-react/internal";
import {
  useToolbarPopupAutoHideContext,
  useToolItemEntryContext,
} from "./InternalToolbarComponent.js";
import { useResizeObserverSingleDimension } from "./ItemWrapper.js";
import { Direction } from "./utilities/Direction.js";
import { RelativePosition } from "@itwin/appui-abstract";

/** Properties of [[ToolbarOverflowButton]] component.
 * @internal
 */
export interface ToolbarOverflowButtonProps
  extends CommonProps, // eslint-disable-line @typescript-eslint/no-deprecated
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    NoChildrenProps {
  /** Function called when button is clicked. */
  onClick?: () => void;
  /** Function called when panel is closed. */
  onClose?: () => void;
  /** Describes if the panel is open. */
  open?: boolean;
  /** Panel expand direction. */
  expandsTo: Direction;
  /** Panel element containing the overflown buttons */
  panelNode?: React.ReactNode;
  /** Title for the item. */
  title?: string;
}

/** Button to toggle display of overflown tools.
 * @internal
 */
export function ToolbarOverflowButton(props: ToolbarOverflowButtonProps) {
  const { onResize, useHeight } = useToolItemEntryContext();
  const [targetRef, target] = useRefState<HTMLDivElement>();
  const ref = useResizeObserverSingleDimension<HTMLButtonElement>(
    onResize,
    useHeight
  );
  const isHidden = useToolbarPopupAutoHideContext();
  const popupClassName = classnames(
    "components-toolbar-overflow_popup",
    isHidden && "nz-hidden"
  );

  const className = classnames(
    "components-toolbar-item-container",
    "components-toolbar-overflow-button",
    props.className
  );
  const buttonClassName = classnames(
    "components-toolbar-button-item",
    "components-ellipsis-icon"
  );
  return (
    <div className={className} ref={targetRef}>
      <button
        ref={ref}
        onClick={props.onClick}
        className={buttonClassName}
        style={props.style}
        title={props.title}
      >
        <div className="components-icon">
          <div className="components-ellipsis" />
        </div>
      </button>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Popup
        className={popupClassName}
        offset={0}
        showShadow={false}
        isOpen={props.open}
        onClose={props.onClose}
        position={toToolbarOverflowRelativePosition(props.expandsTo)}
        target={target}
      >
        {props.panelNode}
      </Popup>
    </div>
  );
}

/** @internal */
export function toToolbarOverflowRelativePosition(
  expandsTo: Direction
): RelativePosition {
  switch (expandsTo) {
    case Direction.Bottom:
      return RelativePosition.Bottom;
    case Direction.Left:
      return RelativePosition.Left;
    case Direction.Right:
      return RelativePosition.Right;
    case Direction.Top:
      return RelativePosition.Top;
  }
}
