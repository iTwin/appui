/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { create } from "zustand";

/** List of known preview features. */
interface KnownPreviewFeatures {
  /** If true, the panels and tool settings will always be rendered over the content.
   * The content will never change size.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/672
   */
  contentAlwaysMaxSize: boolean;
  /** If true, the floating widget will have a "maximize" button.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/673
   */
  enableMaximizedFloatingWidget: boolean;
  /** If true, a tab, or the active tab of a group of widget will become active when dropped in a container.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/679
   */
  activateDroppedTab: boolean;
  /** If true, the [[Toolbar]] component will display an iTwinUI based button group toolbar. */
  newToolbars: boolean;
}

/** Object used trim to only known features at runtime.
 * @internal
 */
const knownFeaturesObject: Record<keyof KnownPreviewFeatures, undefined> = {
  activateDroppedTab: undefined,
  contentAlwaysMaxSize: undefined,
  enableMaximizedFloatingWidget: undefined,
  newToolbars: undefined,
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
function trimToKnownFeaturesOnly(previewFeatures: PreviewFeatures) {
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
 * Use `usePreviewFeatures` hook to access the preview features set from a react component.
 * Use `usePreviewFeaturesStore.getState().previewFeatures` to access the preview features set from a non-react component.
 * Use `usePreviewFeaturesStore.subscribe()` to subscribe to changes to the preview features set from a non-react component.
 * @internal
 */
const usePreviewFeaturesStore = create<PreviewFeaturesState>((set) => {
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

/** Props for PreviewFeaturesProvider.
 * @beta
 */
export interface PreviewFeaturesProviderProps {
  children?: React.ReactNode;
  features?: PreviewFeatures;
}

/** Set which preview features are enabled. These features are not yet ready for production use nor have
 * a proper API defined yet.
 * The available set of features are defined in the [[PreviewFeatures]] interface.
 *
 * This component should wrap the Provider component.
 *
 * ```tsx
 * <PreviewFeaturesProvider features={{ enableMaximizedFloatingWidget: true }}>
 *   <Provider store={UiFramework.store}>
 *    [...]
 *     <ConfigurableUIContent />
 *    [/...]
 *   </Provider>
 * </PreviewFeaturesProvider>
 * ```
 * @beta
 */
export function PreviewFeaturesProvider({
  children,
  features,
}: PreviewFeaturesProviderProps) {
  const setPreviewFeatures = usePreviewFeaturesStore(
    (state) => state.setPreviewFeatures
  );
  React.useEffect(() => {
    setPreviewFeatures(features ?? {});
  }, [features, setPreviewFeatures]);

  // Clear preview features when unmounting.
  React.useEffect(
    () => () => {
      setPreviewFeatures({});
    },
    [setPreviewFeatures]
  );
  return <>{children}</>;
}
