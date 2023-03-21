/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Dialog, FooterIndicator, FooterSeparator, TitleBar } from "@itwin/appui-layout-react";

function App() {
  return (
    <>
      <Dialog>
        <TitleBar />
      </Dialog>
      <FooterIndicator />
      <FooterSeparator />
    </>
  );
}
