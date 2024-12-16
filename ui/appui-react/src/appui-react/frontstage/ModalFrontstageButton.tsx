/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import "./ModalFrontstageButton.scss";
import * as React from "react";
import { SvgProgressBackwardCircular } from "@itwin/itwinui-icons-react";
import { UiFramework } from "../UiFramework.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { IconButton } from "@itwin/itwinui-react";

type IconButtonProps = React.ComponentProps<typeof IconButton>;

interface ModalFrontstageButtonProps extends Pick<IconButtonProps, "onClick"> {
  children?: never;
  /** If specified overrides the default icon. */
  icon?: React.ReactNode;
  /** If specified overrides the default label. */
  label?: string;
  /** If specified overrides the default behavior of closing the modal frontstage. */
  onClick?: IconButtonProps["onClick"];
}

/** Button usually shown in the top-left corner of the modal frontstage. By default closes the modal frontstage.
 * @public
 */
export function ModalFrontstageButton(props: ModalFrontstageButtonProps) {
  const { translate } = useTranslation();
  const { label, icon, onClick } = props;
  const defaultLabel = translate("modalFrontstage.backButtonTitle");
  const defaultIcon = <SvgProgressBackwardCircular />;

  const defaultOnClick = React.useCallback(() => {
    UiFramework.frontstages.closeModalFrontstage();
  }, []);

  return (
    <IconButton
      className="uifw-frontstage-modalFrontstageButton"
      onClick={onClick ?? defaultOnClick}
      label={label ?? defaultLabel}
      iconProps={{
        className: "uifw-frontstage-modalFrontstageButton_icon",
      }}
    >
      {icon ?? defaultIcon}
    </IconButton>
  );
}
