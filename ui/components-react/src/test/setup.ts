/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import TestUtils from "./TestUtils";

window.HTMLElement.prototype.scrollIntoView = () => {};

beforeEach(async () => {
  vi.stubGlobal("fetch", async () => Promise.resolve(new Response()));

  await TestUtils.initializeUiComponents();
});

afterEach(() => {
  TestUtils.terminateUiComponents();
  vi.useRealTimers();
});
