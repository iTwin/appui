/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/// <reference types="vite/client" />

declare global {
  interface Window {
    __BIM_FILES__: string[];
  }
}

export {};
