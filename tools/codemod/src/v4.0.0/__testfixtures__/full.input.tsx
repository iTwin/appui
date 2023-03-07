/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Dialog } from "@itwin/appui-layout-react";
import { UiItemsProvider } from "@itwin/appui-abstract";

function App() {
  return (
    <>
      <Dialog />
    </>
  );
}

function RetFrontstage() {
  return (
    <Frontstage id={this.props.id} />
  );
}
