/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import TestUtils from "./TestUtils.js";
import { useActiveSendBackWidgetIdStore } from "../appui-react/layout/widget/SendBack.js";
import { useContainersStore } from "../appui-react/layout/widget/ContentManager.js";
import { useAccuDrawStore } from "../appui-react/accudraw/AccuDrawStore.js";

window.HTMLElement.prototype.scrollIntoView = () => {};
window.HTMLElement.prototype.scrollTo = () => {};

global.DOMMatrix = class DOMMatrix {
  public m41 = 0;
  public m42 = 0;

  constructor() {}
} as unknown as typeof DOMMatrix;

global.ResizeObserver = class ResizeObserver {
  public observe() {}
  public unobserve() {}
  public disconnect() {}
};

document.elementFromPoint = () => null;

beforeEach(async () => {
  vi.stubGlobal("fetch", async () => Promise.resolve(new Response()));

  await NoRenderApp.startup();
  await TestUtils.initializeUiFramework();
});

afterEach(async () => {
  vi.useRealTimers();
  TestUtils.terminateUiFramework();
  await IModelApp.shutdown();

  useActiveSendBackWidgetIdStore.setState(
    useActiveSendBackWidgetIdStore.getInitialState(),
    true
  );
  useContainersStore.setState(useContainersStore.getInitialState(), true);
  useAccuDrawStore.setState(useAccuDrawStore.getInitialState(), true);
});
