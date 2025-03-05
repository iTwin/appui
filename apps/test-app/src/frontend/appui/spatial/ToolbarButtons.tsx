/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SpatialToolbarContext } from "./Providers";
import { ViewpointsButton } from "../../spatial/ViewpointsButton";
import { LayersButton } from "../../spatial/LayersButton";

export function ViewpointToolbarButton() {
  const { showViewpointsTree, setShowViewpointsTree } = React.useContext(
    SpatialToolbarContext
  );
  return (
    <ViewpointsButton
      viewerBottomMargin={24}
      showTree={showViewpointsTree}
      setShowTree={setShowViewpointsTree}
      viewpoints={[{}, {}]}
      flyTo={() => {}}
    />
  );
}

export function LayersToolbarButton() {
  const { showLayersTree, setShowLayersTree } = React.useContext(
    SpatialToolbarContext
  );
  return (
    <LayersButton
      viewerBottomMargin={24}
      showTree={showLayersTree}
      setShowTree={setShowLayersTree}
      hide={() => {}}
      show={() => {}}
      layers={[
        { id: "1", label: "Layer 1" },
        { id: "2", label: "Layer 2" },
        { id: "3", label: "Layer 3" },
      ]}
    />
  );
}
