/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ITwinLocalization } from "@itwin/core-i18n";
import { UiCore } from "../core-react/UiCore";

/** @internal */
export class TestUtils {
  private static _i18n?: ITwinLocalization;
  private static _uiCoreInitialized = false;

  public static get i18n(): ITwinLocalization {
    return TestUtils._i18n!;
  }

  public static async initializeUiCore() {
    if (!TestUtils._uiCoreInitialized) {
      TestUtils._i18n = new ITwinLocalization();

      await TestUtils._i18n.initialize(["IModelJs"]);
      await UiCore.initialize(TestUtils.i18n);
      TestUtils._uiCoreInitialized = true;
    }
  }

  public static terminateUiCore() {
    UiCore.terminate();
    TestUtils._uiCoreInitialized = false;
  }

  /** Waits until all async operations finish */
  public static async flushAsyncOperations() {
    return new Promise((resolve) => setTimeout(resolve));
  }
}

/** @internal */
export const storageMock = () => {
  const storage: { [key: string]: any } = {};
  return {
    setItem: (key: string, value: string) => {
      storage[key] = value || "";
    },
    getItem: (key: string) => {
      return key in storage ? storage[key] : null;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i: number) => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
};

/**
 * Extracts e.classList.values() and return as an array for expect.
 * @param e Element to get class list
 * @returns Array of classes for the element
 */
export function classesFromElement(e: Element | null | undefined) {
  // ! below is intended, we want this to throw if there is no element, so the test returns a comprehensive error.
  return Array.from(e!.classList.values());
}

export default TestUtils;
