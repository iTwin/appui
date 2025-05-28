/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal */
export function useToolSettingsKeyPressCommit() {
  const { toolSettingsKeyPressCommit } = usePreviewFeatures();
  const isToolSettings = React.useContext(ToolSettingsContext);
  return !!toolSettingsKeyPressCommit && isToolSettings;
}

/** @internal */
export const ToolSettingsContext = React.createContext(false);
