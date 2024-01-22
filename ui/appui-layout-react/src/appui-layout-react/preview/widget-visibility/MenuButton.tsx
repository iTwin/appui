/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { IconButton } from "@itwin/itwinui-react";

/** @internal */
export function MenuButton() {
  return (
    <IconButton size="small" styleType="borderless">
      <SvgMoreVertical />
    </IconButton>
  );
}
