/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  FloatingViewportContent,
  UiFramework,
  useActiveIModelConnection,
  useSpecificWidgetDef,
  WidgetState,
} from "@itwin/appui-react";
import { Id64 } from "@itwin/core-bentley";
import { useRefState } from "@itwin/core-react";

export function ViewportWidgetComponent() {
  const activeIModelConnection = useActiveIModelConnection();
  const [viewState, setViewState] = React.useState(
    UiFramework.getDefaultViewState()
  );
  const [divRef] = useRefState<HTMLDivElement>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [contentId, _setContentId] = React.useState(
    "appui-test-provider:viewport-widget-content"
  );

  const widgetDef = useSpecificWidgetDef("appui-test-providers:ViewportWidget");
  React.useEffect(() => {
    // using setTimeout to give time for frontstage to load before calling setWidgetState
    setTimeout(() => widgetDef?.setWidgetState(WidgetState.Floating));
  }, [widgetDef]);

  React.useEffect(() => {
    async function setupView() {
      if (undefined === viewState && activeIModelConnection) {
        const defaultViewId =
          await activeIModelConnection?.views?.queryDefaultViewId();
        if (defaultViewId && Id64.isValidId64(defaultViewId)) {
          const newViewState = await activeIModelConnection?.views.load(
            defaultViewId
          );
          newViewState && setViewState(newViewState.clone());
        }
      }
    }
    void setupView();
  }, [activeIModelConnection, viewState]);

  React.useEffect(() => {
    const vs = viewState;
    if (!vs || typeof vs === "function") {
      setIsLoaded(true);
      return;
    }

    void (async () => {
      await vs.load();
      setIsLoaded(true);
    })();
  }, [viewState]);

  if (!activeIModelConnection || !isLoaded || !viewState)
    return <div> Empty View </div>;

  return (
    <div
      ref={divRef}
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100%",
        position: "relative",
        minWidth: "400px",
        minHeight: "300px",
      }}
    >
      <div>
        <FloatingViewportContent
          contentId={contentId}
          initialViewState={viewState}
        />
      </div>
    </div>
  );
}
