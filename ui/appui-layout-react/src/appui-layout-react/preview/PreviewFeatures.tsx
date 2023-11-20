/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

interface KnownPreviewFeatures {
  contentAlwaysMaxSize?: boolean;
  enableMaximizedFloatingWidget?: boolean;
}

/**
 * Internal state for preview features that must not be saved to local storage.
 */
interface PreviewFeatureState {
  tested?: boolean;
  maximizedWidget?: string;
}

/**
 * Actions for preview features.
 */
type PreviewActions =
  | {
      type: "TEST_ACTION";
    }
  | {
      type: "SET_MAXIMIZED_WIDGET";
      id: string | undefined;
    };

/**
 * Context containing all configuration for preview features.
 */
const PreviewFeaturesContext = React.createContext<
  KnownPreviewFeatures & {
    previewState: PreviewFeatureState;
    previewDispatch: React.Dispatch<PreviewActions>;
  }
>({ previewState: {}, previewDispatch: () => {} });

/**
 * Properties of `PreviewFeaturesProvider`.
 * @internal
 */
interface PreviewFeaturesProviderProps extends KnownPreviewFeatures {
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * Using reducer to facilitate move between preview and ninezoneReducer.
 */
// istanbul ignore next (preview)
function previewReducer(state: PreviewFeatureState, action: PreviewActions) {
  switch (action.type) {
    // Keep for testing purposes
    case "TEST_ACTION":
      return {
        ...state,
        tested: true,
      };
    case "SET_MAXIMIZED_WIDGET":
      return {
        ...state,
        maximizedWidget: action.id,
      };
    default:
      return state;
  }
}

/**
 * Use to configure preview features
 * @internal
 */
export const PreviewFeaturesProvider = ({
  children,
  ...props
}: PreviewFeaturesProviderProps) => {
  const [previewState, previewDispatch] = React.useReducer(previewReducer, {});
  return (
    <PreviewFeaturesContext.Provider
      value={{ ...props, previewState, previewDispatch }}
    >
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
