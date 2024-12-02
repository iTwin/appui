/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ConditionalStringValue,
  StagePanelLocation,
  StagePanelSection,
  StatusBarItemUtilities,
  SyncUiEventDispatcher,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  useConditionalValue,
} from "@itwin/appui-react";
import { Button, Input } from "@itwin/itwinui-react";
import { useAppStore } from "./useAppStore";
import { Command, Fullscreen, GeocoderViewModel, Viewer } from "cesium";
import {
  SvgHome,
  SvgWindowCollapse,
  SvgWindowFullScreen,
} from "@itwin/itwinui-icons-react";

export function createCesiumUIItemsProvider() {
  return {
    id: "cesium-provider",
    getToolbarItems: () => [
      ToolbarItemUtilities.createActionItem({
        id: "home",
        label: "Home",
        icon: <SvgHome />,
        execute: () => {
          const viewer = useAppStore.getState().viewer;
          if (!viewer) return;

          viewer.scene.camera.flyHome();
        },
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
    ],
    getWidgets: () => {
      return [
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
      ];
    },
    getStatusBarItems: () => [
      StatusBarItemUtilities.createActionItem({
        id: "fullscreen",
        tooltip: new ConditionalStringValue(() => {
          if (Fullscreen.fullscreen) return "Exit fullscreen";
          return "Enter fullscreen";
        }, ["test-app:fullscreen"]),
        icon: <FullScreenIcon />,
        execute: () => {
          if (Fullscreen.fullscreen) {
            Fullscreen.exitFullscreen();
            return;
          }
          Fullscreen.requestFullscreen(document.body);
        },
      }),
    ],
  } satisfies UiItemsProvider;
}

function FullScreenIcon() {
  const fullScreen = useConditionalValue(
    () => Fullscreen.fullscreen,
    ["test-app:fullscreen"]
  );
  React.useEffect(() => {
    const listener = () => {
      // Needed to update the label.
      SyncUiEventDispatcher.dispatchSyncUiEvent("test-app:fullscreen");
    };
    document.addEventListener(Fullscreen.changeEventName, listener);
    return () => {
      document.removeEventListener(Fullscreen.changeEventName, listener);
    };
  }, []);
  if (fullScreen) return <SvgWindowCollapse />;
  return <SvgWindowFullScreen />;
}

function GeocoderWidget() {
  const viewer = useAppStore((state) => state.viewer);
  const geocoder = React.useMemo(() => {
    if (!viewer) return undefined;
    return new GeocoderViewModel({
      scene: viewer.scene,
    });
  }, [viewer]);
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

function callCommand(command: Command) {
  return (command as unknown as Function)();
}
