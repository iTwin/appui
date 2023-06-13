/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import "./Dialog.scss";
import * as React from "react";
import type { DialogButtonDef } from "@itwin/appui-abstract";
import { DivWithOutsideClick } from "../base/DivWithOutsideClick";
import type { CommonProps } from "../utils/Props";
import type { Omit } from "../utils/typeUtils";
import { Dialog as CoreDialog } from "./Dialog";
import { Dialog } from "@itwin/itwinui-react";

/** Properties of [[SimpleDialog]] component.
 * @internal
 */
export interface SimpleDialogProps
  extends Omit<React.AllHTMLAttributes<HTMLDivElement>, "title">,
    CommonProps {
  /** Indicates whether to show dialog or not */
  opened: boolean;
  /** Indicates whether the focus should be trapped within the dialog. Default: false */
  trapFocus?: boolean;

  /** Whether the hide the header. Default: false */
  hideHeader?: boolean;
  /** Title to show in title bar of dialog */
  title?: string | JSX.Element;
  /** List of DialogButtonDef objects specifying buttons and associated onClick events */
  buttonCluster?: DialogButtonDef[];

  /** onClick event for X button for dialog */
  onClose?: () => void;
  /** 'keyup' event for Esc key */
  onEscape?: () => void;
  /** Triggered when a click is triggered outside of this dialog. */
  onOutsideClick?: (event: MouseEvent) => any;

  /** Whether to show background overlay. Default: true.
   * @note Modeless dialogs require an id and an implementation of onModelessPointerDown.
   */
  modal?: boolean;
  /** An id for a modeless dialog */
  modelessId?: string;
  /** Pointer Down event handler when modeless (modal = false) */
  onModelessPointerDown?: (event: React.PointerEvent, id: string) => void;

  /** Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%" */
  width?: string | number;
  /** Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  height?: string | number;
  /** Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px */
  minWidth?: string | number;
  /** Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100px */
  minHeight?: string | number;
  /** Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  maxWidth?: string | number;
  /** Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. */
  maxHeight?: string | number;

  /** Custom CSS Style for overlay */
  backgroundStyle?: React.CSSProperties;
  /** Custom CSS Style for title */
  titleStyle?: React.CSSProperties;
  /** Custom CSS Style for footer */
  footerStyle?: React.CSSProperties;
  /** Custom CSS class name for the content */
  contentClassName?: string;
  /** Custom CSS Style for the content */
  contentStyle?: React.CSSProperties;
}

/** itwinui-react [[Dialog]] wrapper that excludes buggy features and adds features from core-react [[Dialog]].
 * @internal
 */
export class SimpleDialog extends CoreDialog {
  constructor(props: SimpleDialogProps) {
    super(props);
  }

  public override render(): JSX.Element {
    const {
      opened,
      title,
      buttonCluster,
      onClose,
      onOutsideClick,
      minWidth,
      minHeight,
      width,
      height,
      maxHeight,
      maxWidth,
      backgroundStyle,
      titleStyle,
      footerStyle,
      style,
      contentStyle,
      contentClassName,
      className,
      trapFocus,
      modal,
      hideHeader,
      ...props
    } = this.props;

    const containerStyle: React.CSSProperties = {
      margin: "",
      width,
      height,
    };
    const minMaxStyle: React.CSSProperties = {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    };
    const dialogBaseContainerStyle: React.CSSProperties = {
      ...containerStyle,
      ...minMaxStyle,
    };

    const buttons = this.getFooterButtons(
      buttonCluster,
      "high-visibility",
      true
    );

    return (
      <Dialog
        isOpen={opened}
        onClose={onClose}
        closeOnExternalClick={false}
        closeOnEsc={false}
        style={style}
        className={className}
        isResizable={false}
        isDraggable={false}
        trapFocus={trapFocus && /* istanbul ignore next */ modal}
        preventDocumentScroll={true}
        data-testid="core-dialog-root"
        {...props}
      >
        {modal && <Dialog.Backdrop style={backgroundStyle} />}
        <DivWithOutsideClick onOutsideClick={onOutsideClick}>
          <Dialog.Main
            data-testid="core-dialog-container"
            style={dialogBaseContainerStyle}
            onPointerDown={this._handleContainerPointerDown}
          >
            {!hideHeader && (
              <Dialog.TitleBar titleText={title} style={titleStyle} />
            )}
            <Dialog.Content className={contentClassName} style={contentStyle}>
              {this.props.children}
            </Dialog.Content>
            <Dialog.ButtonBar style={footerStyle}>{buttons}</Dialog.ButtonBar>
          </Dialog.Main>
        </DivWithOutsideClick>
      </Dialog>
    );
  }
}
