/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "@itwin/appui-react";
import { Logger } from "@itwin/core-bentley";
import {
  createBlankConnection,
  createBlankViewState,
} from "@itwin/appui-test-providers";
import { SampleAppIModelApp } from "..";

export async function openBlankConnection() {
  // Close the current iModelConnection
  await SampleAppIModelApp.closeCurrentIModel();

  // Open the connection
  Logger.logInfo(
    SampleAppIModelApp.loggerCategory(openBlankConnection),
    `openBlankConnection: Opening blank connection.`
  );
  const connection = createBlankConnection();
  const viewState = createBlankViewState(connection);

  UiFramework.setIModelConnection(connection, true);
  UiFramework.setDefaultViewState(viewState, true);
  SampleAppIModelApp.setIsIModelLocal(true, true);

  UiFramework.frontstages.closeModalFrontstage();
}
