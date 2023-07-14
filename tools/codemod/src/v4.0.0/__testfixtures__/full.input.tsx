/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Frontstage } from "@itwin/appui-react";
import { Dialog } from "@itwin/appui-layout-react";
import { ToolbarWithOverflow } from "@itwin/components-react";

function App() {
  return (
    <>
      <Dialog />
      <ToolbarWithOverflow />
    </>
  );
}

function RetFrontstage() {
  return (
    <Frontstage id={this.props.id} />
  );
}
