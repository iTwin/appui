/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StatusBarDialog, ToolbarWithOverflow } from "@itwin/appui-react";

function App() {
  return (
    <>
      <StatusBarDialog />
      <ToolbarWithOverflow />
    </>
  );
}

function RetFrontstage() {
  return {
    id: this.props.id,
  };
}
