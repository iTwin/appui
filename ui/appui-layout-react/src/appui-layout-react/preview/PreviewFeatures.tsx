/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { create } from "zustand";

/** Preview features known to layout package.
 * @internal
 */
export interface KnownPreviewLayoutFeatures {
  /** If true, the panels and tool settings will always be rendered over the content.
   * The content will never change size.
   */
  contentAlwaysMaxSize: boolean;
  /** If true, the floating widget will have a "maximize" button. */
  enableMaximizedFloatingWidget: boolean;
}

/**
 * Preview feature store
 * @internal
 */
const usePreviewLayoutFeaturesStore = create<{
  features: Partial<KnownPreviewLayoutFeatures>;
}>(() => ({
  features: {},
}));

/** Used to set preview features in layout package.
 * @internal
 */
export function setPreviewLayoutFeatures(
  features: Partial<KnownPreviewLayoutFeatures>
) {
  usePreviewLayoutFeaturesStore.setState({ features });
}

/**
 * Hook to retrieve active preview features within layout package.
 * @internal
 */
export const usePreviewFeatures = () => {
  return usePreviewLayoutFeaturesStore((state) => state.features);
};
