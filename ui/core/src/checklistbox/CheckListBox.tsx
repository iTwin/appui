/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module CheckBoxList */

import * as React from "react";
import * as classnames from "classnames";
import { Checkbox } from "@bentley/bwc/lib/inputs/Checkbox";
import { CommonProps } from "../Props";
import "./CheckListBox.scss";

/** Properties for the [[CheckListBoxItem]] component */
export interface CheckListBoxItemProps extends CommonProps {
  /** Label */
  label: string;
  /** Determine if the item is checked or not */
  checked?: boolean;
  /** Determine if the item is disabled or not */
  disabled?: boolean;
  /** Function called when item is clicked. */
  onClick?: () => any;
}

/** Item with a checkbox added to a [[CheckListBox]]. */
export class CheckListBoxItem extends React.Component<CheckListBoxItemProps> {

  constructor(props: CheckListBoxItemProps, context?: any) {
    super(props, context);
  }

  private _onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  public render() {
    const className = classnames("chk-listboxitem-checkbox");
    return (
      <li>
        <Checkbox checked={this.props.checked} disabled={this.props.disabled} className={className} label={this.props.label} onClick={this._onClick} />
      </li>
    );
  }
}

/** Separator added to a [[CheckListBox]]. */
// tslint:disable-next-line:variable-name
export const CheckListBoxSeparator: React.StatelessComponent = () => {
  return (
    <div className="chk-listboxseparator" />
  );
};

/** Properties for the [[CheckListBox]] component */
export interface CheckListBoxProps {
  /** CSS class name */
  className?: string;
}

/** React component showing a list of Checkbox items. */
export class CheckListBox extends React.Component<CheckListBoxProps> {
  public render() {
    const className = classnames("chk-listbox", this.props.className);
    return (
      <ul className={className}>
        {this.props.children}
      </ul>
    );
  }
}
