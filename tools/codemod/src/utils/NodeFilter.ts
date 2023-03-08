/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
export type NodeFilter<T> =
  | (T extends {}
    ? {
      [K in keyof T]?: NodeFilter<T[K]>;
    }
    : T)
  | ((value: T) => boolean);
