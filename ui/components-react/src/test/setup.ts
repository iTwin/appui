/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as ReactDOM from "react-dom/client";
import TestUtils from "./TestUtils.js";

window.HTMLElement.prototype.scrollIntoView = () => {};

global.ResizeObserver = class ResizeObserver {
  public observe() {}
  public unobserve() {}
  public disconnect() {}
};

// Workaround to unmount roots of `FavoritePropertiesRenderer.renderFavorites`
const roots: ReactDOM.Root[] = [];
vi.mock(import("react-dom/client"), async (importActual) => {
  const actual = await importActual();

  return {
    ...actual,
    createRoot: (container) => {
      const root = actual.createRoot(container);
      roots.push(root);
      return root;
    },
  };
});

beforeEach(async () => {
  vi.stubGlobal("fetch", async () => Promise.resolve(new Response()));

  await TestUtils.initializeUiComponents();
});

afterEach(() => {
  TestUtils.terminateUiComponents();
  vi.useRealTimers();
  roots.forEach((root) => {
    root.unmount();
  });
  roots.splice(0);
});
