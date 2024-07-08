/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
import * as React from "react";
import { LocalizationProvider as _LocalizationProvider } from "@itwin/core-react";

/** Provides localization capability to the components.
 * @alpha
 */
export function LocalizationProvider(
  props: React.ComponentProps<typeof _LocalizationProvider>
) {
  return <_LocalizationProvider {...props} />;
}
