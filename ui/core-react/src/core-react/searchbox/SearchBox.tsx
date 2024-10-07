/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SearchBox
 */

import "./SearchBox.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { CommonProps } from "../utils/Props.js";
import { Input } from "@itwin/itwinui-react";
import type { IconSpec } from "../icons/IconComponent.js";
import { Icon } from "../icons/IconComponent.js";
import { SvgClose, SvgSearch } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../l10n/useTranslation.js";

/* eslint-disable deprecation/deprecation */

/** Properties for [[SearchBox]] component
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link SearchBox}.
 */
export interface SearchBoxProps extends CommonProps {
  /** Value to set SearchBox to initially */
  initialValue?: string;
  /** Placeholder value to show in gray before anything is entered in */
  placeholder?: string;
  /** Triggered when the content of SearchBox is changed */
  onValueChanged: (value: string) => void;
  /** Frequency to poll for changes in value, in milliseconds */
  valueChangedDelay?: number;
  /** Listens for <Enter> keypress */
  onEnterPressed?: () => void;
  /** Listens for <Esc> keypress */
  onEscPressed?: () => void;
  /** Listens for onClick event for Clear (x) icon */
  onClear?: () => void;
}

interface SearchBoxState {
  value: string;
}

/** Input box for entering text to search for.
 * The SearchBox has an icon right-justified and bounded by the box and shows a Search or Clear icon.
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/searchbox iTwinUI SearchBox} instead.
 */
export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  private _inputElement: HTMLInputElement | null = null;
  private _timeoutId: number = 0;

  public override readonly state: Readonly<SearchBoxState> = {
    value: this.props.initialValue || "",
  };

  constructor(props: SearchBoxProps) {
    super(props);
  }

  public override render(): React.ReactNode {
    const searchClassName = classnames("core-searchbox", this.props.className);
    const emptyString = this.state.value === "";
    const iconClassName = classnames("core-searchbox-icon", "icon");
    const iconSpec: IconSpec = emptyString ? <SvgSearch /> : <SvgClose />;
    return (
      <div
        className={searchClassName}
        style={this.props.style}
        data-testid="core-searchbox-instance"
      >
        <SearchBoxInput
          defaultValue={this.props.initialValue}
          ref={(el) => {
            this._inputElement = el;
          }}
          onChange={this._trackChange}
          onKeyDown={this._handleKeyDown}
          onPaste={this._trackChange}
          onCut={this._trackChange}
          placeholder={this.props.placeholder}
          role="searchbox"
          data-testid="core-searchbox-input"
        />
        <SearchBoxButton
          className="core-searchbox-button"
          onClick={this._handleIconClick}
          role="button"
          tabIndex={-1}
          emptyString={emptyString}
        >
          <span className={iconClassName}>
            <Icon iconSpec={iconSpec} />
          </span>
        </SearchBoxButton>
      </div>
    );
  }

  /** Wrapper for onValueChanged to make sure we don't call search unless the new value is different from the previous value */
  private _onValueChanged = (value: string, previousValue: string) => {
    if (value === previousValue) return;

    this.setState(
      (_prevState) => {
        return {
          value,
        };
      },
      () => {
        this.props.onValueChanged(this.state.value);
      }
    );
  };
  private _trackChange = (_event?: any): void => {
    let value = "";
    const previousValue = this.state.value;

    if (this._inputElement) value = this._inputElement.value;

    if (this.props.valueChangedDelay) {
      this._unsetTimeout();
      this._timeoutId = window.setTimeout(() => {
        this._onValueChanged(value, previousValue);
      }, this.props.valueChangedDelay);
    } else {
      this._onValueChanged(value, previousValue);
    }
  };

  private _handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Key.Escape.valueOf():
        if (this.props.onEscPressed) this.props.onEscPressed();
        break;
      case Key.Enter.valueOf():
        if (this.props.onEnterPressed) this.props.onEnterPressed();
        break;
    }
  };

  private _handleIconClick = (_event: React.MouseEvent<HTMLElement>): void => {
    if (this._inputElement) {
      const clear = this.state.value !== "";
      this._inputElement.value = "";
      if (clear && this.props.onClear) this.props.onClear();
      this._inputElement.focus();
    }
    this._trackChange();
  };

  private _unsetTimeout = (): void => {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
  };

  public override componentWillUnmount() {
    this._unsetTimeout();
  }

  public focus() {
    if (this._inputElement) this._inputElement.focus();
  }
}

const SearchBoxInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(function SearchBoxInput({ placeholder, ...props }, ref) {
  const { translate } = useTranslation();
  return (
    <Input
      ref={ref}
      placeholder={placeholder || translate("general.search")}
      {...props}
    />
  );
});

function SearchBoxButton({
  emptyString,
  ...props
}: React.ComponentProps<"div"> & { emptyString: boolean }) {
  const { translate } = useTranslation();
  const buttonTitle = translate(
    emptyString ? "general.search" : "general.clear"
  );
  return <div title={buttonTitle} {...props} />;
}
