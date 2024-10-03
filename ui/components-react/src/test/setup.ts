/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import TestUtils from "./TestUtils.js";

window.HTMLElement.prototype.scrollIntoView = () => {};

global.ResizeObserver = class ResizeObserver {
  public observe() {}
  public unobserve() {}
  public disconnect() {}
};

beforeEach(async () => {
  vi.stubGlobal("fetch", async () => Promise.resolve(new Response()));

  await TestUtils.initializeUiComponents();
});

afterEach(() => {
  TestUtils.terminateUiComponents();
  vi.useRealTimers();
});
