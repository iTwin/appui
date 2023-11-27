/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { create } from "zustand";

/** List of known preview features. */
interface KnownPreviewFeatures {
  /** If true, the panels and tool settings will always be rendered over the content.
   * The content will never change size.
   */
  contentAlwaysMaxSize: boolean;
  /** If true, the floating widget will have a "maximize" button. */
  enableMaximizedFloatingWidget: boolean;
}

/** Object used trim to only known features at runtime.
 * @internal
 */
const knownFeaturesObject: Record<keyof KnownPreviewFeatures, undefined> = {
  contentAlwaysMaxSize: undefined,
  enableMaximizedFloatingWidget: undefined,
  ...{ newToolbars: undefined }, // Hidden feature used in storybook only (to avoid trimming).
};

/** List of preview features that can be enabled/disabled.
 * This list is expected to change over time, the interface is made
 * so that new features can be added or removed without breaking existing code.
 * A console warning will simply appear if unknown features are passed.
 * @beta
 */
export interface PreviewFeatures extends Partial<KnownPreviewFeatures> {
  [featureName: string]: any;
}

/** Trim an object to only contain known feature keys.
 * @param previewFeatures object potentially containing unknown features
 * @returns object containing only known features
 * @internal
 */
export function trimToKnownFeaturesOnly(previewFeatures: PreviewFeatures) {
  const knownFeatureKeys = Object.keys(knownFeaturesObject);
  const [knownFeatures, unknownFeatures] = Object.entries(
    previewFeatures
  ).reduce(
    ([known, unknown], [key, value]) => {
      if (knownFeatureKeys.includes(key)) {
        known[key] = value;
      } else {
        unknown.push(key);
      }
      return [known, unknown];
    },
    [{}, []] as [PreviewFeatures, string[]]
  );
  if (
    Object.keys(unknownFeatures).length > 0 &&
    process.env.NODE_ENV === "development"
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      `The following features used in "setPreviewFeatures" are unknown or no longer in preview: [${unknownFeatures.toString()}]
      Here is the list of currently known features: [${knownFeatureKeys.toString()}]`
    );
  }
  return knownFeatures;
}

interface PreviewFeaturesState {
  previewFeatures: PreviewFeatures;
  setPreviewFeatures: (previewFeatures: PreviewFeatures) => void;
}

/** Preview features store used by `UiFramework.previewFeatures` and `UiFramework.setPreviewFeatures()` APIs to manage the preview features.
 * Use `usePreviewFeatures` hook to access the preview features set.
 * @internal
 */
export const usePreviewFeaturesStore = create<PreviewFeaturesState>((set) => {
  return {
    previewFeatures: {},
    setPreviewFeatures: (newPreviewFeatures: PreviewFeatures) => {
      const previewFeatures = trimToKnownFeaturesOnly(newPreviewFeatures);
      set({ previewFeatures });
    },
  };
});

/** Hook to access the preview features set.
 * @internal
 */
export function usePreviewFeatures() {
  return usePreviewFeaturesStore((state) => state.previewFeatures);
}
