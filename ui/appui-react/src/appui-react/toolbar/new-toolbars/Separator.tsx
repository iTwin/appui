/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Separator.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { ToolbarContext } from "./Toolbar.js";

/** @internal */
export function Separator() {
  const context = React.useContext(ToolbarContext);
  assert(!!context);
  const { orientation } = context;
  return (
    <div
      className={classnames(
        "uifw-toolbar-newToolbars-separator",
        `uifw-${orientation}`
      )}
    />
  );
}
