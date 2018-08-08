/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import CommonProps from "../../../../utilities/Props";
import "./Item.scss";

/** Properties of [[HistoryItem]] component. */
export interface HistoryItemProps extends CommonProps {
  /** Item content. */
  children?: React.ReactNode;
  /** Describes if the item is active. */
  isActive?: boolean;
  /** Function called when the */
  onClick?: () => void;
}

/**
 * Basic history item used in [[Tray]] component.
 * @note See [[Icon]] for item with icon.
 */
export default class HistoryItem extends React.Component<HistoryItemProps> {
  public render() {
    const className = classnames(
      "nz-toolbar-item-expandable-history-item",
      this.props.isActive && "nz-is-active",
      this.props.className);

    return (
      <div
        onClick={this.props.onClick}
        className={className}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
