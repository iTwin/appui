/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { SvgProgressBackwardCircular } from "@itwin/itwinui-icons-react";
import { CommandItemDef } from "../shared/CommandItemDef.js";
import { UiFramework } from "../UiFramework.js";
import type { NestedFrontstageAppButton } from "./NestedFrontstageAppButton.js";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";
import { useStrataKitIcon } from "../preview/use-stratakit/useStrataKitIcon.js";

/** Nested Frontstage related classes and commands
 * @public
 * @deprecated in 4.15.0. Use {@link NestedFrontstageAppButton} component instead.
 */
export class NestedFrontstage {
  /** Command that returns to the previous Frontstage */
  public static get backToPreviousFrontstageCommand() {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return new CommandItemDef({
      commandId: "backToPreviousFrontstage",
      iconSpec: <BackIcon />,
      labelKey: "UiFramework:commands.backToPreviousFrontstage",
      execute: async () => {
        await UiFramework.frontstages.closeNestedFrontstage();
      },
    });
  }
}

function BackIcon() {
  const svgChevronLeft = useStrataKitIcon("@stratakit/icons/chevron-left.svg");

  return (
    <StrataKitIcon
      href={svgChevronLeft}
      iconNode={<SvgProgressBackwardCircular />}
    />
  );
}
