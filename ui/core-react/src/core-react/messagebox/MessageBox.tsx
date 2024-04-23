/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import "./MessageBox.scss";
import classnames from "classnames";
import * as React from "react";
import type { DialogButtonDef } from "@itwin/appui-abstract";
import { MessageSeverity } from "@itwin/appui-abstract";
import type { CommonProps } from "../utils/Props";
import {
  SvgHelpCircular,
  SvgHelpCircularHollow,
  SvgInfoCircular,
  SvgInfoCircularHollow,
  SvgStatusError,
  SvgStatusErrorHollow,
  SvgStatusRejected,
  SvgStatusRejectedHollow,
  SvgStatusSuccess,
  SvgStatusSuccessHollow,
  SvgStatusWarning,
} from "@itwin/itwinui-icons-react";
import type { IconSpec } from "../icons/IconComponent";
import { Icon } from "../icons/IconComponent";
import { Dialog } from "../dialog/Dialog";

/** Properties for the [[MessageBox]] component
 * @public
 */
export interface MessageBoxProps extends CommonProps {
  /** Severity of MessageBox */
  severity: MessageSeverity;
  /** whether to show dialog or not */
  opened: boolean;
  /** List of [[DialogButtonDef]] objects specifying buttons and associated onClick events */
  buttonCluster: DialogButtonDef[];
  /** Title to show in title bar of dialog  */
  title?: string | React.ReactElement;
  /** onClick event for X button for dialog */
  onClose?: () => void;
  /** 'keyup' event for <Esc> key */
  onEscape?: () => void;
  /** minimum width that the dialog may be resized to. Default: 400 */
  minWidth?: number;
  /** minimum height that the dialog may be resized to. Default: 400 */
  minHeight?: number;
  /** initial width of dialog.
   * Displayed in px if value is a number, otherwise displayed in specified CSS unit.
   * Default: "50%"
   */
  width?: string | number;
  /** initial height of dialog.
   * Displayed in px if value is a number, otherwise displayed in specified CSS unit.
   * Default: ""
   */
  height?: string | number;
  /** Whether to show background overlay. Default: true */
  modal?: boolean;
  /** Custom CSS class name for the content */
  contentClassName?: string;
  /** Custom CSS Style for the content */
  contentStyle?: React.CSSProperties;
  /** Message content */
  children?: React.ReactNode;
}

/** Message Box React component.
 * @public
 */
export class MessageBox extends React.PureComponent<MessageBoxProps> {
  public static defaultProps: Partial<MessageBoxProps> = {
    minWidth: 400,
    minHeight: 400,
    width: "512px",
    modal: true,
  };

  public override render(): React.ReactElement {
    return (
      // eslint-disable-next-line deprecation/deprecation
      <Dialog
        title={this.props.title}
        buttonCluster={this.props.buttonCluster}
        opened={this.props.opened}
        onClose={this.props.onClose}
        onEscape={this.props.onEscape}
        modal={this.props.modal}
        className={this.props.className}
        style={this.props.style}
        width={this.props.width}
      >
        <MessageContainer
          severity={this.props.severity}
          className={this.props.contentClassName}
          style={this.props.contentStyle}
        >
          {this.props.children}
        </MessageContainer>
      </Dialog>
    );
  }
}

/** Properties for the [[MessageContainer]] component
 * @public
 */
export interface MessageContainerProps extends CommonProps {
  severity: MessageSeverity;
  /** Message Content */
  children?: React.ReactNode;
}

/** Message Container React component.
 * @public
 */
export class MessageContainer extends React.PureComponent<MessageContainerProps> {
  /** Returns the class name corresponding to the MessageSeverity.
   * @param severity MessageSeverity
   */
  public static getIconClassName(severity: MessageSeverity): string;
  /** Returns the class name associated with the WebFont icon corresponding to the MessageSeverity.
   * @param severity MessageSeverity
   * @param hollow Should the icon be hollow
   * @deprecated in 4.0. Hollow parameter ignored, WebFont is not returned, only the color.
   */
  public static getIconClassName(
    severity: MessageSeverity,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    hollow?: boolean
  ): string;
  /* istanbul ignore next */
  public static getIconClassName(
    severity: MessageSeverity,
    _hollow?: boolean
  ): string {
    let iconClassName = "";

    switch (severity) {
      case MessageSeverity.None:
        iconClassName = "";
        break;
      case MessageSeverity.Success:
        iconClassName = "core-message-box-success";
        break;
      case MessageSeverity.Information:
        iconClassName = "core-message-box-information";
        break;
      case MessageSeverity.Question:
        iconClassName = "core-message-box-question";
        break;
      case MessageSeverity.Warning:
        iconClassName = "core-message-box-warning";
        break;
      case MessageSeverity.Error:
        iconClassName = "core-message-box-error";
        break;
      case MessageSeverity.Fatal:
        iconClassName = "core-message-box-fatal";
        break;
    }

    return iconClassName;
  }

  /** Returns the React icon corresponding to the MessageSeverity.
   * @param severity MessageSeverity
   * @param hollow set to true to return the hollow form of the icon.
   * @returns IconSpec
   */
  /* ignore for unit tests and replace with visual testing */
  /* istanbul ignore next */
  public static getIcon(severity: MessageSeverity, hollow?: boolean): IconSpec {
    let iconSpec: IconSpec = "";
    switch (severity) {
      case MessageSeverity.None:
        iconSpec = "";
        break;
      case MessageSeverity.Success:
        iconSpec = hollow ? <SvgStatusSuccessHollow /> : <SvgStatusSuccess />;
        break;
      case MessageSeverity.Information:
        iconSpec = hollow ? <SvgInfoCircularHollow /> : <SvgInfoCircular />;
        break;
      case MessageSeverity.Question:
        iconSpec = hollow ? <SvgHelpCircularHollow /> : <SvgHelpCircular />;
        break;
      case MessageSeverity.Warning:
        iconSpec = <SvgStatusWarning />; // TODO - need icon-status-warning-hollow icon
        break;
      case MessageSeverity.Error:
        iconSpec = hollow ? <SvgStatusErrorHollow /> : <SvgStatusError />;
        break;
      case MessageSeverity.Fatal:
        iconSpec = hollow ? <SvgStatusRejectedHollow /> : <SvgStatusRejected />;
        break;
    }
    return iconSpec;
  }

  public override render(): React.ReactElement {
    const iconClassName = classnames(
      "icon",
      "core-message-box-icon",
      MessageContainer.getIconClassName(this.props.severity)
    );

    const iconSpec = MessageContainer.getIcon(this.props.severity);

    return (
      <div className="core-message-box-container">
        <div className={iconClassName}>
          <Icon iconSpec={iconSpec} />
        </div>
        <div
          className={classnames(
            "core-message-box-content",
            this.props.className
          )}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
