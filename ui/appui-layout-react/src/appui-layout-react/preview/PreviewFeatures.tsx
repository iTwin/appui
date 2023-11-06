/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

interface PreviewFeaturesState {
  contentAlwaysMaxSize?: boolean;
}

/**
 * Context containing all configuration for preview features.
 */
const PreviewFeaturesContext = React.createContext<PreviewFeaturesState>({});

/**
 * Properties of `PreviewFeaturesProvider`.
 * @internal
 */
interface PreviewFeaturesProviderProps extends PreviewFeaturesState {
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * Use to configure preview features
 * @internal
 */
export const PreviewFeaturesProvider = ({
  children,
  ...props
}: PreviewFeaturesProviderProps) => {
  return (
    <PreviewFeaturesContext.Provider value={props}>
      {children}
    </PreviewFeaturesContext.Provider>
  );
};

/**
 * Use preview feature context
 * @internal
 */
export const usePreviewFeatures = () => {
  return React.useContext(PreviewFeaturesContext);
};
