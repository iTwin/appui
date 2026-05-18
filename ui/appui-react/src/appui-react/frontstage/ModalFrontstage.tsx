/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import "./ModalFrontstage.scss";
import * as React from "react";
import classnames from "classnames";
import type { CommonProps } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";
import { ModalFrontstageButton } from "./ModalFrontstageButton.js";
import type { ModalFrontstageInfo } from "../framework/FrameworkFrontstages.js";

/** Properties for the [[ModalFrontstage]] React component
 * @public
 * @deprecated in 5.31.0. Use `React.ComponentProps<typeof ModalFrontstage>` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ModalFrontstageProps extends CommonProps {
  /** Title displayed at the top of the modal Frontstage */
  title: string;
  /** Indicates whether the modal Frontstage is open */
  isOpen?: boolean;
  /** Callback for navigating back from the modal Frontstage. */
  navigateBack?: () => void;
  /** Callback for closing the modal Frontstage. */
  closeModal: () => void;
  /** An optional React node displayed in the upper right of the modal Frontstage. */
  appBarRight?: React.ReactNode;
  /** If specified overrides the default {@link ModalFrontstageButton}. */
  backButton?: React.ReactNode;
  /** Content of the modal frontstage. */
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface Props extends Omit<ModalFrontstageProps, "closeModal"> {
  /**
   * Callback for closing the modal Frontstage.
   * @deprecated in 5.31.0. Use {@link navigateBack} instead.
   */
  closeModal?: () => void;
}

/**
 * The default layout used for modal frontstages.
 * Use {@link ModalFrontstageInfo.layout} to override the modal frontstage layout.
 * @public
 */
export function ModalFrontstage(props: Props) {
  const {
    isOpen,
    navigateBack,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    closeModal,
    backButton,
    title,
    appBarRight,
    ...rest
  } = props;

  const handleBack = () => {
    navigateBack?.();
    closeModal?.();
  };

  return (
    <>
      <div
        {...rest}
        className={classnames(
          "uifw-modal-frontstage",
          isOpen && "uifw-modal-open",
          props.className
        )}
      >
        <div className="uifw-modal-app-bar">
          {backButton ? (
            backButton
          ) : (
            <ModalFrontstageButton onClick={handleBack} />
          )}
          <Text variant="headline" className="uifw-headline">
            {title}
          </Text>
          {appBarRight && (
            <span className="uifw-modal-app-bar-right">{appBarRight}</span>
          )}
        </div>
        <div className="uifw-modal-stage-content">{props.children}</div>
      </div>
      <div className="uifw-modal-frontstage-overlay" />
    </>
  );
}
