/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import TestUtils from "./TestUtils";

window.HTMLElement.prototype.scrollIntoView =
  window.HTMLElement.prototype.scrollIntoView ?? (() => {});

global.DOMMatrix = class DOMMatrix {
  public m41 = 0;
  public m42 = 0;

  constructor() {}
} as unknown as typeof DOMMatrix;

beforeEach(async () => {
  await NoRenderApp.startup();
  await TestUtils.initializeUiFramework();
});

afterEach(async () => {
  vi.useRealTimers();
  TestUtils.terminateUiFramework();
  await IModelApp.shutdown();
});
