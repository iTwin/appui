/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { JSCodeshift, Plugin } from "jscodeshift";

export function usePlugin(j: JSCodeshift, plugin: (j: JSCodeshift) => void) {
  j.use(plugin as Plugin);
}
