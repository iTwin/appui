/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as classnames from "classnames";
import { CommonProps, Checkbox } from "@bentley/ui-core";
import { CheckListBoxItemProps } from "./CheckListBox";
import "./CheckListBox.scss";

/**
 * Properties for the [[CheckListBoxItem]] component.
 * @internal
 */
export interface CheckListBoxItemProps extends CommonProps {
  /** Label */
  label?: string;
  /** Determine if the item is checked or not */
  checked?: boolean;
  /** Function called when item is clicked. */
  onClick?: () => any;
}

/**
 * Item with a checkbox added to a [[CheckListBox]]
 * @internal
 */
export class CheckListBoxItem extends React.Component<CheckListBoxItemProps> {

  constructor(props: CheckListBoxItemProps, context?: any) {
    super(props, context);
  }

  private _onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  private _onCheckBoxChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    this._onClick();
  }

  public render() {
    const listClassName = classnames("check-box-item", this.props.checked && "selected", this.props.className);
    return (
      <li className={listClassName} onClick={this._onClick.bind(this)}>
        <Checkbox className="check-box-item-checkbox" checked={this.props.checked} label={this.props.label} onChange={this._onCheckBoxChange.bind(this)} />
      </li>
    );
  }
}

/**
 * Properties for the [[CheckListBox]] component.
 * @internal
 */
export interface CheckListBoxProps {
  /** CSS class name */
  className?: string;
}

/** React component showing a list of Checkbox items.
 * @internal
 */
export class CheckListBox extends React.Component<CheckListBoxProps> {
  public render() {
    const className = classnames("check-listbox", this.props.className);
    return (
      <ul className={className}>
        {this.props.children}
      </ul>
    );
  }
}
