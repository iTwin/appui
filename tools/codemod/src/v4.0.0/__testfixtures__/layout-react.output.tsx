/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import {
  SafeAreaInsets,
  StatusBarDialog,
  StatusBarDialogProps,
  StatusBarIndicator,
  StatusBarIndicatorProps,
  StatusBarSeparator,
} from "@itwin/appui-react";

function App() {
  return (<>
    <StatusBarDialog />
    <StatusBarIndicator />
    <StatusBarSeparator />
  </>);
}
