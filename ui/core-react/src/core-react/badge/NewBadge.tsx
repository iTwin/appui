/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import "./NewBadge.scss";
import * as React from "react";
import { Icon } from "@itwin/itwinui-react";

/** New badge component.
 * @internal
 */
export function NewBadge() {
  return (
    <Icon className="core-badge-newBadge">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        enableBackground="new 0 0 16 16"
      >
        <path d="m15 0h-14c-.4 0-.8.2-.9.6s-.1.8.2 1.1l14 14c.2.2.4.3.7.3.1 0 .3 0 .4-.1.4-.2.6-.5.6-.9v-14c0-.6-.4-1-1-1m-4 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" />
      </svg>
    </Icon>
  );
}
