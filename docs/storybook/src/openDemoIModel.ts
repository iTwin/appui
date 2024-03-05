/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "@itwin/appui-react";
import {
  createBlankConnection,
  createBlankViewState,
} from "@itwin/appui-test-providers";
import { CheckpointConnection, ViewCreator3d } from "@itwin/core-frontend";
import { DemoIModel } from "../.storybook/addons/DemoIModel";

export async function openDemoIModel(demoIModel: DemoIModel) {
  let iModelConnection;
  let viewState;
  if (demoIModel === "blank") {
    iModelConnection = createBlankConnection();
    viewState = createBlankViewState(iModelConnection);
  } else {
    iModelConnection = await CheckpointConnection.openRemote(
      demoIModel.iTwinId,
      demoIModel.iModelId
    );
    const viewCreator = new ViewCreator3d(iModelConnection);
    viewState = await viewCreator.createDefaultView();
  }
  UiFramework.setIModelConnection(iModelConnection, true);
  UiFramework.setDefaultViewState(viewState, true);
}
