/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { CommonProps } from "@itwin/core-react";
import { SvgProgressBackwardCircular } from "@itwin/itwinui-icons-react";
import { Text } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import { BackButton } from "../layout/widget/tools/button/Back.js";
import "./ModalFrontstage.scss";

/** Properties for the [[ModalFrontstage]] React component
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ModalFrontstageProps extends CommonProps {
  /** Title displayed at the top of the modal Frontstage */
  title: string;
  /** Indicates whether the modal Frontstage is open */
  isOpen?: boolean;
  /** Callback for navigating back from the modal Frontstage. */
  navigateBack?: () => any;
  /** Callback for closing the modal Frontstage. */
  closeModal: () => any;
  /** An optional React node displayed in the upper right of the modal Frontstage. */
  appBarRight?: React.ReactNode;
  /** If specified overrides the default back button. */
  backButton?: React.ReactNode;
  /** Content */
  children?: React.ReactNode;
}

/** ModalFrontstage React component
 * @public
 */
export class ModalFrontstage extends React.Component<ModalFrontstageProps> {
  constructor(props: ModalFrontstageProps) {
    super(props);
  }

  private _onGoBack = () => {
    if (this.props.navigateBack) this.props.navigateBack();
    this.props.closeModal();
  };

  public override render() {
    const classNames = classnames(
      "uifw-modal-frontstage",
      this.props.isOpen && "uifw-modal-open",
      this.props.className
    );

    return (
      <>
        <div className={classNames} style={this.props.style}>
          <div className="uifw-modal-app-bar">
            {this.props.backButton ? (
              this.props.backButton
            ) : (
              <BackButton
                className="nz-toolbar-button-app"
                onClick={this._onGoBack}
                icon={<SvgProgressBackwardCircular />}
                title={UiFramework.translate("modalFrontstage.backButtonTitle")}
              />
            )}
            <Text variant="headline" className="uifw-headline">
              {this.props.title}
            </Text>
            {this.props.appBarRight && (
              <span className="uifw-modal-app-bar-right">
                {this.props.appBarRight}
              </span>
            )}
          </div>
          <div className="uifw-modal-stage-content">{this.props.children}</div>
        </div>
        <div className="uifw-modal-frontstage-overlay" />
      </>
    );
  }
}
