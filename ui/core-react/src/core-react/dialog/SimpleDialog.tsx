/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import "./Dialog.scss";
import * as React from "react";
import { DivWithOutsideClick } from "../base/DivWithOutsideClick";
import type { Omit } from "../utils/typeUtils";
import { Dialog as CoreDialog } from "./Dialog";
import { Dialog } from "@itwin/itwinui-react";
import type { DialogProps } from "./Dialog";

/** Properties of [[SimpleDialog]] component.
 * @internal
 */
export type SimpleDialogProps = Omit<
  DialogProps, // eslint-disable-line deprecation/deprecation
  | "resizable"
  | "movable"
  | "inset"
  | "header"
  | "footer"
  | "alignment"
  | "x"
  | "y"
>;

/** itwinui-react [[Dialog]] wrapper that excludes buggy features and adds features from core-react [[Dialog]].
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
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
