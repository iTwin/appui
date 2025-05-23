/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./InlineEdit.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { CommonProps } from "@itwin/core-react";
import { Input } from "@itwin/itwinui-react";

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface InlineEditProps extends CommonProps {
  defaultValue: string;
  onChange?: (value: string) => void;
}

interface InlineEditState {
  value: string;
  originalValue: string;
}

/** Duration Inline Editor
 * @internal
 */
export class InlineEdit extends React.Component<
  InlineEditProps,
  InlineEditState
> {
  private _inputRef = React.createRef<HTMLInputElement>();

  constructor(props: InlineEditProps) {
    super(props);

    this.state = {
      value: this.props.defaultValue,
      originalValue: this.props.defaultValue,
    };
  }

  public override componentDidUpdate(
    prevProps: InlineEditProps,
    _prevState: InlineEditState
  ) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.setState((_, props) => {
        return { value: props.defaultValue, originalValue: props.defaultValue };
      });
    }
  }

  private _onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    this._sendChange(event.target.value);
  };

  private _onFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.select();
  };

  private _onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case Key.Escape.valueOf():
        this.setState(
          (prevState) => ({ value: prevState.originalValue }),
          () => this._inputRef.current!.select()
        );
        break;
      case Key.Enter.valueOf():
        this._sendChange(this.state.value);
        break;
    }
  };

  private _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  private _sendChange(value: string) {
    if (this.props.onChange) this.props.onChange(value);
  }

  public override render() {
    return (
      <Input
        data-testid="timeline-duration-edit-input"
        className={classnames("inline-edit-input", this.props.className)}
        style={this.props.style}
        ref={this._inputRef}
        type="text"
        value={this.state.value}
        size="small"
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onKeyDown={this._onKeyDown}
        onChange={this._onChange}
      />
    );
  }
}
