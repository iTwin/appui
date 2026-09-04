/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { SvgProgressBackwardCircular } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../hooks/useTranslation.js";
import { UiFramework } from "../UiFramework.js";
import { BackstageAppButton } from "../widgets/BackstageAppButton.js";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";
import { useStrataKitIcon } from "../preview/use-stratakit/useStrataKitIcon.js";

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
  const svgChevronLeft = useStrataKitIcon("@stratakit/icons/chevron-left.svg");
  const defaultIcon = (
    <StrataKitIcon
      href={svgChevronLeft}
      iconNode={<SvgProgressBackwardCircular />}
    />
  );

  const { translate } = useTranslation();
  label = label ?? translate("commands.backToPreviousFrontstage");
  icon = icon ?? defaultIcon;
  return (
    <BackstageAppButton
      label={label}
      iconNode={icon}
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
