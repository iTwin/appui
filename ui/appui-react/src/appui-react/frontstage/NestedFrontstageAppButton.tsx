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
  /** If specified overrides the default icon. */
  icon?: React.ReactNode;
  /** If specified overrides the default label. */
  label?: string;
  /** If specified overrides the default action that closes the nested frontstage. */
  onClick?: () => void;
}

/** App button used in a nested frontstage. By default closes the top-most nested frontstage.
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
