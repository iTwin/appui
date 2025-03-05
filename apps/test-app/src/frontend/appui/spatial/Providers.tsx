/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

export const SpatialToolbarContext = React.createContext<{
  showViewpointsTree: boolean;
  setShowViewpointsTree: (show: boolean) => void;
  showLayersTree: boolean;
  setShowLayersTree: (show: boolean) => void;
}>({
  showViewpointsTree: false,
  setShowViewpointsTree: () => {},
  showLayersTree: false,
  setShowLayersTree: () => {},
});

// Additional app specific providers for the spatial frontstage.
export function SpatialAppProviders({ children }: React.PropsWithChildren) {
  const [showViewpointsTree, setShowViewpointsTree] = React.useState(false);
  const [showLayersTree, setShowLayersTree] = React.useState(false);

  return (
    <SpatialToolbarContext.Provider
      value={React.useMemo(
        () => ({
          showViewpointsTree,
          setShowViewpointsTree: (show) => {
            // I.e. keep single tree open at a time
            setShowViewpointsTree(show);
            if (!show) return;
            setShowLayersTree(false);
          },
          showLayersTree,
          setShowLayersTree: (show) => {
            // I.e. keep single tree open at a time
            setShowLayersTree(show);
            if (!show) return;
            setShowViewpointsTree(false);
          },
        }),
        [showLayersTree, showViewpointsTree]
      )}
    >
      {children}
    </SpatialToolbarContext.Provider>
  );
}
