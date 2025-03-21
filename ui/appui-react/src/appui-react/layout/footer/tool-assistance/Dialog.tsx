/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Footer
 */

import "./Dialog.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Dialog } from "../dialog/Dialog.js";
import { TitleBar } from "../dialog/TitleBar.js";

/** Properties of [[ToolAssistanceDialog]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolAssistanceDialogProps extends CommonProps {
  /** Items and separators of tool assistance. I.e. [[ToolAssistanceItem]], [[ToolAssistanceSeparator]] */
  children?: React.ReactNode;
  /** Dialog title. */
  title?: string;
  /** Title bar buttons. I.e. [[TitleBarButton]] */
  buttons?: React.ReactNode;
}

/** Tool assistance dialog used with [[ToolAssistance]] component.
 * @note This is a presentational component and should be aligned with [[ToolAssistance]] component.
 * I.e. use [[FooterPopup]] to handle alignment.
 * @internal
 */
export class ToolAssistanceDialog extends React.PureComponent<ToolAssistanceDialogProps> {
  public override render() {
    const className = classnames(
      "nz-footer-toolAssistance-dialog",
      this.props.className
    );

    return (
      <Dialog
        className={className}
        style={this.props.style}
        titleBar={
          <TitleBar title={this.props.title}>{this.props.buttons}</TitleBar>
        }
      >
        <div className="nz-content">{this.props.children}</div>
      </Dialog>
    );
  }
}
