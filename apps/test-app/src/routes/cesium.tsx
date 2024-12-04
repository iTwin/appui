/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import {
  ConfigurableUiContent,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  UiFramework,
  UiItemsManager,
} from "@itwin/appui-react";
import { Button, Input } from "@itwin/itwinui-react";

interface IModelDataPoint {
  fileName: string;
  longitude: number;
  latitude: number;
  height: number;
}

const iModelDataPoints: IModelDataPoint[] = [
  {
    fileName: "animate-solar.bim",
    longitude: -75.687879,
    latitude: 40.0652628,
    height: 130,
  },
];

let cesiumViewer: Cesium.Viewer | undefined;

function CesiumViewer() {
  const id = React.useId();
  const navigate = useNavigate();
  React.useEffect(() => {
    const viewer = new Cesium.Viewer(id, {
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });
    cesiumViewer = viewer;

    void (async () => {
      // Add Cesium OSM Buildings.
      const buildingsTileset = await Cesium.createOsmBuildingsAsync();
      if (viewer.isDestroyed()) return;

      viewer.scene.primitives.add(buildingsTileset);

      // Add data points.
      const entities = iModelDataPoints.map((dataPoint) => {
        const entity = viewer.entities.add({
          description: dataPoint.fileName,
          position: Cesium.Cartesian3.fromDegrees(
            dataPoint.longitude,
            dataPoint.latitude,
            dataPoint.height
          ),
          point: { pixelSize: 10, color: Cesium.Color.RED },
        });
        return {
          entity,
          iModel: dataPoint,
        };
      });

      const handler = viewer.screenSpaceEventHandler;
      handler.setInputAction(
        (action: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
          const pickedObject = viewer.scene.pick(action.position);
          if (!pickedObject) return;
          if (pickedObject.id instanceof Cesium.Entity) {
            const pickedEntity = pickedObject.id as Cesium.Entity;

            const iModelEntity = entities.find(
              (entity) => entity.entity.id === pickedEntity.id
            );
            if (!iModelEntity) return;
            void navigate({
              to: "/local/$fileName",
              params: { fileName: iModelEntity.iModel.fileName },
            });
          }
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      // Fly the camera to this point.
      await viewer.flyTo(entities[0].entity);
    })();

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
        height: "100%",
      }}
    />
  );
}

function RouteComponent() {
  React.useEffect(() => {
    void UiFramework.frontstages.setActiveFrontstage("cesium");
  }, []);
  return (
    <>
      <ConfigurableUiContent />
    </>
  );
}

export const Route = createFileRoute("/cesium")({
  loader: async () => {
    UiFramework.frontstages.clearFrontstages();
    UiItemsManager.clearAllProviders();

    UiFramework.frontstages.addFrontstage(
      FrontstageUtilities.createStandardFrontstage({
        id: "cesium",
        usage: StageUsage.General,
        contentGroupProps: {
          id: "cesium-content",
          layout: StandardContentLayouts.singleView,
          contents: [
            {
              id: "cesium-viewer",
              classId: "",
              content: <CesiumViewer />,
            },
          ],
        },
        hideToolSettings: true,
        hideStatusBar: true,
      })
    );
    UiItemsManager.register({
      id: "cesium-items",
      getWidgets: () => [
        {
          id: "geocoder",
          label: "Geocoder",
          canPopout: true,
          content: <GeocoderWidget />,
          layouts: {
            standard: {
              location: StagePanelLocation.Right,
              section: StagePanelSection.Start,
            },
          },
        },
      ],
    });
  },
  component: () => <RouteComponent />,
});

function GeocoderWidget() {
  const geocoder = React.useMemo(() => {
    if (!cesiumViewer) return undefined;
    return new Cesium.GeocoderViewModel({
      scene: cesiumViewer.scene,
    });
  }, [cesiumViewer]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div style={{ padding: 12, display: "flex", gap: 8 }}>
      <Input defaultValue="Vilnius" ref={inputRef} />
      <Button
        onClick={async () => {
          if (!inputRef.current) return;
          if (!geocoder) return;
          geocoder.searchText = inputRef.current.value;
          callCommand(geocoder.search);
        }}
        styleType="cta"
      >
        Fly to
      </Button>
    </div>
  );
}

function callCommand(command: Cesium.Command) {
  return (command as unknown as () => void)();
}
