/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./SynchronizedFloatingViewComponent.scss";
import * as React from "react";
import {
  FloatingViewportContent,
  UiFramework,
  useActiveIModelConnection,
} from "@itwin/appui-react";
import { ScreenViewport, Viewport, ViewState } from "@itwin/core-frontend";
import { ViewportComponentEvents } from "@itwin/imodel-components-react";
import { getViewDefinitions } from "../components/ViewDefinitionSelector.js";

interface SynchronizedViewDefInterfaceLocal {
  id: string;
  class: string;
  label: string;
}

interface SynchronizedFloatingViewProps {
  contentId: string;
  /** Viewport with which this floating view is synced. */
  viewport: Viewport;
}

export function SynchronizedFloatingView({
  contentId,
  viewport,
}: SynchronizedFloatingViewProps) {
  const activeIModelConnection = useActiveIModelConnection();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [floatingViewport, setFloatingViewport] =
    React.useState<ScreenViewport>();

  const [initialViewState, setInitialViewState] = React.useState<
    ViewState | undefined
  >(undefined);
  const [twoDViewDefinitions, setTwoDViewDefinitions] = React.useState<
    SynchronizedViewDefInterfaceLocal[]
  >([]);
  const [threeDViewDefinitions, setThreeDViewDefinitions] = React.useState<
    SynchronizedViewDefInterfaceLocal[]
  >([]);
  const [noViewsMessage, setNoViewsMessage] = React.useState(
    "No 2D views available."
  );

  // Set initial view when floating viewport is launched for first time. It needs to be mirror of main/default viewport of frontstage (2d->3d or 3d->2d)
  React.useEffect(() => {
    if (!activeIModelConnection) return;
    const acceptedSpatialViewClasses = [
      "BisCore:SpatialViewDefinition",
      "BisCore:OrthographicViewDefinition",
    ];

    const acceptedDrawingViewClasses = [
      "BisCore:DrawingViewDefinition",
      "BisCore:SheetViewDefinition",
    ];
    void getViewDefinitions(activeIModelConnection).then((viewDefinitions) => {
      const localThreeTwoDViewDefs = viewDefinitions.filter((def) => {
        return acceptedSpatialViewClasses.indexOf(def.class) > -1;
      });
      const localTwoTwoDViewDefs = viewDefinitions.filter((def) => {
        return acceptedDrawingViewClasses.indexOf(def.class) > -1;
      });
      setTwoDViewDefinitions(localTwoTwoDViewDefs);
      setThreeDViewDefinitions(localThreeTwoDViewDefs);
      const isMainViewport3d = viewport.view.is3d();
      setNoViewsMessage(
        isMainViewport3d ? "No 2d views available." : "No 3d views available."
      );
      let initialViewIdToLoad;

      if (
        isMainViewport3d &&
        localTwoTwoDViewDefs &&
        localTwoTwoDViewDefs.length > 0
      ) {
        initialViewIdToLoad = localTwoTwoDViewDefs[0].id;
      } else if (
        !isMainViewport3d &&
        localThreeTwoDViewDefs &&
        localThreeTwoDViewDefs.length > 0
      ) {
        initialViewIdToLoad = localThreeTwoDViewDefs[0].id;
      }

      if (initialViewIdToLoad) {
        // This block is twisted beyond recognition. We need a better way to fit view from core team here.
        void activeIModelConnection.views
          .load(initialViewIdToLoad)
          .then((viewState) => {
            setInitialViewState(viewState);
          });
      }
    });
  }, [activeIModelConnection, viewport]);

  React.useEffect(() => {
    return ViewportComponentEvents.onViewIdChangedEvent.addListener(
      async (args) => {
        if (args.newId === args.oldId) return;

        const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
        if (!frontstageDef) return;

        const isChangeForCurrentFloatingViewport =
          floatingViewport === args.viewport;

        if (isChangeForCurrentFloatingViewport) {
          const noChangeRequired =
            (args.viewport.view.is2d() && viewport.view.is3d()) ||
            (args.viewport.view.is3d() && viewport.view.is2d());
          if (!noChangeRequired) {
            if (args.viewport.view.is2d() && threeDViewDefinitions.length > 0) {
              await activeIModelConnection?.views
                .load(threeDViewDefinitions[0].id)
                .then((newViewStateForMainVP) => {
                  viewport.changeView(newViewStateForMainVP);
                });
            } else if (
              args.viewport.view.is3d() &&
              twoDViewDefinitions.length > 0
            ) {
              // Main viewport is still 3d while we have loaded 3d in floating viewport, make it opposite (2d)
              await activeIModelConnection?.views
                .load(twoDViewDefinitions[0].id)
                .then((newViewStateForMainVP) => {
                  viewport.changeView(newViewStateForMainVP);
                });
            }
          }
        } else {
          const noChangeRequired =
            (args.viewport.view.is2d() && floatingViewport?.view.is3d()) ||
            (args.viewport.view.is3d() && floatingViewport?.view.is2d());
          if (!noChangeRequired) {
            if (args.viewport.view.is2d() && threeDViewDefinitions.length > 0) {
              await activeIModelConnection?.views
                .load(threeDViewDefinitions[0].id)
                .then((newViewStateForFloatingVP) => {
                  setInitialViewState(newViewStateForFloatingVP);
                });
            } else if (
              args.viewport.view.is3d() &&
              twoDViewDefinitions.length > 0
            ) {
              await activeIModelConnection?.views
                .load(twoDViewDefinitions[0].id)
                .then((newViewStateForFloatingVP) => {
                  setInitialViewState(newViewStateForFloatingVP);
                });
            }
          }
        }
      },
      [
        activeIModelConnection?.views,
        contentId,
        threeDViewDefinitions,
        twoDViewDefinitions,
      ]
    );
  }, [
    activeIModelConnection,
    contentId,
    floatingViewport,
    viewport,
    threeDViewDefinitions,
    twoDViewDefinitions,
  ]);

  if (initialViewState) {
    return (
      <div className="test-syncrhonized-test-view" ref={divRef}>
        <div id="floatingviewportcontainerdiv">
          {initialViewState && (
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            <FloatingViewportContent
              contentId={contentId}
              initialViewState={initialViewState}
              viewportRef={(v) => {
                setFloatingViewport(v ?? undefined);
              }}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="test-popup-test-view" ref={divRef}>
        <div className="no-views-message">{noViewsMessage}</div>
      </div>
    );
  }
}
