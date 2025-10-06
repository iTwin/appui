/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./PopupButton.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import { RelativePosition } from "@itwin/appui-abstract";
import type { CommonDivProps, CommonProps } from "@itwin/core-react";
import { Div, Icon, Popup } from "@itwin/core-react";
import { Button } from "@itwin/itwinui-react";
import {
  SvgCheckmark,
  SvgChevronDown,
  SvgRemove,
} from "@itwin/itwinui-icons-react";
import { useTranslation } from "../l10n/useTranslation.js";

/** Properties for [[PopupButton]] component
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface PopupButtonProps extends CommonProps {
  /** Label to display in click area. */
  label?: string | React.ReactNode;
  /* Placeholder text used when there is no label yet */
  placeholder?: string;
  /** Contents of the popup */
  children: React.ReactNode;
  /** Title to display as tooltip. */
  title?: string;

  /** Set focus to popup - default is to set focus */
  moveFocus?: boolean;
  /** Element to receive focus, specified by React.RefObject or CSS selector string. If undefined and moveFocus is true then focus is moved to first focusable element. */
  focusTarget?: React.RefObject<HTMLElement | null> | string;

  /** Show or hide the box shadow (defaults to false) */
  showShadow?: boolean;
  /** Show or hide the arrow (defaults to false) */
  showArrow?: boolean;
  /** Indicates whether to set focus to the input element */
  setFocus?: boolean;
  /** Indicates whether to close the popup when Enter is pressed (defaults to true) */
  closeOnEnter?: boolean;
  /** Disabled or not */
  disabled?: boolean;
  /** Readonly or not */
  readonly?: boolean;

  /** Listens for click events on button area */
  onClick?: (event: React.MouseEvent) => void;
  /** Listens for popup close events */
  onClose?: () => void;
  /** Listens for Enter key in popup */
  onEnter?: () => void;
}

/** @internal */
interface PopupButtonState {
  showPopup: boolean;
}

/** PopupButton React component that is a button and property editor popup host
 * @alpha
 */
export class PopupButton extends React.PureComponent<
  PopupButtonProps,
  PopupButtonState
> {
  private _buttonRef = React.createRef<HTMLDivElement>();

  public override readonly state: Readonly<PopupButtonState> = {
    showPopup: false,
  };

  public override componentDidMount() {
    if (this.props.setFocus && this._buttonRef.current)
      this._buttonRef.current.focus();
  }

  private _togglePopup = (event: React.MouseEvent) => {
    if (this.props.readonly || this.props.disabled) return;

    this.setState(
      (prevState) => ({ showPopup: !prevState.showPopup }),
      () => this.props.onClick && this.props.onClick(event)
    );
  };

  public closePopup() {
    this._closePopup();
  }

  private _closePopup = () => {
    this.setState({ showPopup: false }, () => {
      this.props.onClose && this.props.onClose();

      if (this._buttonRef.current) this._buttonRef.current.focus();
    });
  };

  private _handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.key === Key.ArrowDown.valueOf() ||
        event.key === " " ||
        event.key === Key.Enter.valueOf()) &&
      !this.state.showPopup
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ showPopup: true });
    }
  };

  public override render(): React.ReactNode {
    const showArrow = this.props.showArrow ?? false;
    const showShadow = this.props.showShadow ?? false;
    const moveFocus = this.props.moveFocus ?? true;
    const showPlaceholder =
      this.props.label === undefined && this.props.placeholder !== undefined;

    const classNames = classnames(
      "components-popup-button",
      this.state.showPopup && "components-popup-expanded",
      this.props.readonly && "components-readonly",
      this.props.disabled && "components-disabled"
    );

    const valueClassNames = classnames(
      "components-popup-button-value",
      showPlaceholder && "components-popup-button-placeholder"
    );

    return (
      <div className={this.props.className}>
        <div
          className={classNames}
          onClick={this._togglePopup}
          onKeyDown={this._handleKeyDown}
          data-testid="components-popup-button"
          tabIndex={0}
          ref={this._buttonRef}
          title={this.props.title}
          aria-disabled={this.props.disabled}
          role="button"
        >
          <div className={valueClassNames}>
            {this.props.label || this.props.placeholder}
          </div>
          <div className={"components-popup-button-arrow"}>
            <div
              className={classnames(
                "components-popup-button-arrow-icon",
                "icon"
              )}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Icon iconSpec={<SvgChevronDown />} />
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Popup
          className="components-popup-button-popup"
          isOpen={this.state.showPopup}
          position={RelativePosition.Bottom}
          onClose={this._closePopup}
          onEnter={this.props.onEnter}
          closeOnEnter={this.props.closeOnEnter}
          target={this._buttonRef.current}
          showArrow={showArrow}
          showShadow={showShadow}
          moveFocus={moveFocus}
          focusTarget={this.props.focusTarget}
          portalTarget={
            this._buttonRef.current?.ownerDocument.querySelector(
              ".uifw-configurableui-portalContainer"
            ) ?? undefined
          }
        >
          {this.props.children}
        </Popup>
      </div>
    );
  }
}

/** Popup content with padding
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function PopupContent(props: CommonDivProps) {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <Div {...props} mainClassName="components-editor-popup-content" />;
}

/** Properties for [[PopupOkCancelButtons]] component
 * @alpha
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof PopupOkCancelButtons>`
 */
export interface OkCancelProps {
  onOk: (event: React.MouseEvent) => void;
  onCancel: (event: React.MouseEvent) => void;
}

/** OK/Cancel Buttons
 * @alpha
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function PopupOkCancelButtons(props: OkCancelProps) {
  const { translate } = useTranslation();
  return (
    <div className="components-popup-bottom-buttons">
      <Button
        className={classnames(
          "components-popup-large-button",
          "components-popup-ok-button"
        )}
        data-testid="components-popup-ok-button"
        styleType="cta"
        title={translate("dialog.ok")}
        onClick={props.onOk}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Icon iconSpec={<SvgCheckmark />} />
      </Button>
      <Button
        className={classnames(
          "components-popup-large-button",
          "components-popup-cancel-button"
        )}
        data-testid="components-popup-cancel-button"
        title={translate("dialog.cancel")}
        onClick={props.onCancel}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Icon iconSpec={<SvgRemove />} />
      </Button>
    </div>
  );
}
