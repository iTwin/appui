/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useAppStore } from "./useAppStore";

const disableCesiumUI = {
  animation: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  sceneModePicker: false,
  selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
} satisfies Viewer.ConstructorOptions;

interface CesiumViewerProps {
  viewerRef?: (viewer: Viewer | null) => void;
}

export function CesiumViewer({ viewerRef }: CesiumViewerProps) {
  React.useEffect(() => {
    const viewer = new Viewer("cesiumContainer", {
      terrain: Terrain.fromWorldTerrain(),
      ...disableCesiumUI,
    });
    useAppStore.setState({ viewer: viewer ?? undefined });
    void appSpecificInitializer(viewer);

    return () => {
      viewer.destroy();
      viewerRef?.(null);
    };
  }, []);
  return <div style={{ height: "100%" }} id="cesiumContainer" />;
}

async function appSpecificInitializer(viewer: Viewer) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    },
  });

  const buildingTileset = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);
}
