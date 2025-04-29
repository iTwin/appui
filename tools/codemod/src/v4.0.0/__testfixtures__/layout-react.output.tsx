/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StatusBarDialog, StatusBarIndicator, StatusBarSeparator } from "@itwin/appui-react";

function App() {
  return (
    <>
      <StatusBarDialog>
        <StatusBarDialog.TitleBar />
      </StatusBarDialog>
      <StatusBarIndicator />
      <StatusBarSeparator />
    </>
  );
}
