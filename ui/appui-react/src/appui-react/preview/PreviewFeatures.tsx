/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { create } from "zustand";
import { Logger } from "@itwin/core-bentley";
import { UiFramework } from "../UiFramework";
import type { useTransientState } from "../widget-panels/useTransientState";
import type { WidgetDef } from "../widgets/WidgetDef";

/** List of known preview features. */
interface KnownPreviewFeatures {
  /** If `true`, the panels and tool settings will always be rendered over the content.
   * The content will never change size.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/672
   */
  contentAlwaysMaxSize: boolean;
  /** If `true`, the floating widget will have a "maximize" button. Use `enableMaximizedPanelWidget` to enable the feature for panel widgets.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/673
   */
  enableMaximizedFloatingWidget: boolean;
  /** If `true`, the panel widget will have a "maximize" button. Use `enableMaximizedFloatingWidget` to enable the feature for floating widgets.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/673
   */
  enableMaximizedPanelWidget: boolean;
  /** If `true`, the active tab of a dragged widget will become active when dropped in a container.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/679
   */
  activateDroppedTab: boolean;
  /** If `true`, the horizontal panels will have an additional "Align" button.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/706
   */
  horizontalPanelAlignment: boolean;
  /** If enabled, a dropdown menu will be rendered for widgets that exceed the specified threshold of title bar buttons.
   *
   * Discuss or upvote this feature: https://github.com/iTwin/appui/discussions/723
   */
  widgetActionDropdown: { threshold: number };
  /** If `true`, the [[Toolbar]] component will be replaced by a new iTwinUI based toolbar. */
  newToolbars: boolean;
  /** If `true`, popout widgets will not be rendered in a separate element tree, instead widget content will be re-parented to a popout content container.
   * Alternatively, an array of widget ids can be provided to only re-parent specific widgets.
   * @note Use {@link useTransientState} to save and restore DOM transient state when re-parenting widgets.
   * @note There is a known limitation where iTwinUI v2 popover elements will be rendered in the main window. Prefer using iTwinUI v3 when using this feature.
   */
  reparentPopoutWidgets: boolean | WidgetDef["id"][];
  /** If `true`, additional UI elements are rendered to allow the end user of the layout to control widget visibility. */
  controlWidgetVisibility: boolean;
}

/** Object used trim to only known features at runtime.
 * @internal
 */
const knownFeaturesObject: Record<keyof KnownPreviewFeatures, undefined> = {
  activateDroppedTab: undefined,
  contentAlwaysMaxSize: undefined,
  enableMaximizedFloatingWidget: undefined,
  enableMaximizedPanelWidget: undefined,
  horizontalPanelAlignment: undefined,
  widgetActionDropdown: undefined,
  newToolbars: undefined,
  reparentPopoutWidgets: undefined,
  controlWidgetVisibility: undefined,
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
  if (Object.keys(unknownFeatures).length > 0) {
    Logger.logWarning(
      UiFramework.loggerCategory(trimToKnownFeaturesOnly),
      `Features used in "setPreviewFeatures" are unknown or no longer in preview`,
      {
        unknownFeatures,
      }
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
