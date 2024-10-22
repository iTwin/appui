/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** Properties for [[WidgetOpacityContext]]
 * @internal
 */
export interface WidgetOpacityContextProps {
  readonly proximityScale: number;
  readonly addRef: (ref: React.RefObject<Element>) => void;
  readonly removeRef: (ref: React.RefObject<Element>) => void;
}

/**
 * Context used by Widgets and child components to process opacity changes based on mouse proximity.
 * @internal
 */
export const WidgetOpacityContext =
  React.createContext<WidgetOpacityContextProps>({
    proximityScale: 1.0,
    addRef: () => {},
    removeRef: () => {},
  });

/** Hook for using [[WidgetOpacityContext]]
 * @internal
 */
export function useWidgetOpacityContext<T extends Element>() {
  const ref = React.useRef<T>(null);
  const context = React.useContext(WidgetOpacityContext);
  const { addRef, removeRef } = context;
  React.useEffect(() => {
    addRef(ref);
    return () => {
      removeRef(ref);
    };
  }, [addRef, removeRef]);
  return { ref, ...context };
}
