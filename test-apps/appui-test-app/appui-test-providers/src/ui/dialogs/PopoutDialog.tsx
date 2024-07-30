/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { ViewsTable } from "../components/ViewsTable";
import "./PopoutDialog.scss";

export function PopoutDialog() {
  return (
    <div className="test-popout-dialog">
      <ViewsTable />
    </div>
  );
}
