/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { SvgProgressBackwardCircular } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../hooks/useTranslation";
import { UiFramework } from "../UiFramework";
import { BackstageAppButton } from "../widgets/BackstageAppButton";

/** Properties of {@link NestedFrontstageAppButton} component. */
interface NestedFrontstageAppButtonProps {
  /** Icon override. */
  icon?: React.ReactNode;
  /** Label override. */
  label?: string;
  /** If specified overrides the default action that displays the backstage. */
  onClick?: () => void;
}

/** BackstageAppButton used to toggle display of Backstage and is shown in the corner of the ToolWidget.
 * @public
 */
export function NestedFrontstageAppButton({
  icon,
  label,
  onClick,
}: NestedFrontstageAppButtonProps) {
  const { translate } = useTranslation();
  label = label ?? translate("commands.backToPreviousFrontstage");
  icon = icon ?? <SvgProgressBackwardCircular />;

  return (
    <BackstageAppButton
      label={label}
      icon={icon}
      execute={() => {
        if (onClick) {
          onClick();
          return;
        }

        void UiFramework.frontstages.closeNestedFrontstage();
      }}
    />
  );
}
