/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// Defined as an object so we can access the keys for runtime validation.
/**
 * List of known preview features.
 */
const knownFeaturesObject = {
  /**
   * If true, the panels will always be rendered over the content.
   * The content will never change size.
   */
  panelsAlwaysOverContent: true as boolean, // So `typeof` below do not type this `true` but `boolean`
};

/**
 * List of preview features that can be enabled/disabled.
 * This list is expected to change over time, the interface is made
 * so that new features can be added or removed without breaking existing code.
 * A console warning will simply appear if unknown features are passed.
 * @alpha
 */
export interface PreviewFeatures extends Partial<typeof knownFeaturesObject> {
  [featureName: string]: any;
}

/**
 * Trim an object to only contain known feature keys.
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
