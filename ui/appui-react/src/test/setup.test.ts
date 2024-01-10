/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import TestUtils from "./TestUtils";

afterEach(() => {
  // Undo DOM manipulations made by iTwinUI-React components
  document.body.innerHTML = "";
  document.body.removeAttribute("class");
});

beforeEach(async () => {
  await NoRenderApp.startup();
  await TestUtils.initializeUiFramework();
});

afterEach(async () => {
  TestUtils.terminateUiFramework();
  await IModelApp.shutdown();
});
