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

  SampleAppIModelApp.setIsIModelLocal(true, true);
  const viewState = createBlankViewState(connection);
  UiFramework.setDefaultViewState(viewState, true);

  UiFramework.frontstages.closeModalFrontstage();
  await SampleAppIModelApp.setViewIdAndOpenMainStage(connection, [
    viewState.id,
  ]);
}
