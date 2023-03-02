/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Dialog } from "@itwin/appui-layout-react";

function App() {
  return (
    <>
      <Dialog />
      <Frontstage widget={<Widget id="w1" />} />
    </>
  );
}
