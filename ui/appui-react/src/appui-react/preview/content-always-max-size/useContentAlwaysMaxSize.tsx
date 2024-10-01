/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./useContentAlwaysMaxSize.scss";
import { usePreviewFeatures } from "../PreviewFeatures.js";

/** @internal */
export function useContentAlwaysMaxSize() {
  const { contentAlwaysMaxSize } = usePreviewFeatures();
  return {
    "uifw-preview-contentAlwaysMaxSize": contentAlwaysMaxSize,
  };
}
