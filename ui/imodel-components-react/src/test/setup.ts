/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
window.HTMLElement.prototype.scrollIntoView = () => {};

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

afterEach(() => {
  vi.useRealTimers();
});
