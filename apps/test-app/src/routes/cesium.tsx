/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Terrain, Viewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

function CesiumViewer() {
  const id = React.useId();
  React.useEffect(() => {
    const viewer = new Viewer(id, {
      terrain: Terrain.fromWorldTerrain(),
    });
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div
      id={id}
      style={{
        /** TODO: viewer keeps growing in size */
        overflow: "auto",
      }}
    />
  );
}

export const Route = createFileRoute("/cesium")({
  component: () => <CesiumViewer />,
});
