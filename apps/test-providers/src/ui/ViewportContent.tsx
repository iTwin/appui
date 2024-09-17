/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { DefaultViewOverlay, UiFramework } from "@itwin/appui-react";
import { IModelApp, ScreenViewport, ViewState } from "@itwin/core-frontend";
import { ViewportComponent } from "@itwin/imodel-components-react";

type ViewportComponentProps = React.ComponentProps<typeof ViewportComponent>;

interface ViewportContentProps extends Partial<ViewportComponentProps> {
  contentId?: string;
  viewState?: ViewState;
  renderViewOverlay?: (viewport: ScreenViewport) => React.ReactNode;
}

export function ViewportContent({
  contentId,
  imodel,
  viewState,
  renderViewOverlay,
}: ViewportContentProps) {
  let [iModel] = React.useState(UiFramework.getIModelConnection());
  const [defaultViewState] = React.useState(UiFramework.getDefaultViewState());
  const [viewport, setViewport] = React.useState<ScreenViewport | undefined>(
    undefined
  );
  const viewportRef = React.useRef<ScreenViewport>();

  React.useEffect(() => {
    // Maintain the selected view if the content is active.
    return IModelApp.viewManager.onSelectedViewportChanged.addListener(
      (selectedViewport) => {
        if (!viewportRef.current) return;
        if (selectedViewport.current === viewportRef.current) return;

        const activeContentId = UiFramework.content.getActiveId();
        if (activeContentId !== contentId) return;

        void IModelApp.viewManager.setSelectedView(viewportRef.current);
      }
    );
  }, [contentId, viewport]);

  iModel = imodel ?? iModel;
  viewState = viewState ?? defaultViewState;
  if (!iModel) return null;

  return (
    <>
      <ViewportComponent
        viewState={viewState}
        imodel={iModel}
        viewportRef={(v) => {
          viewportRef.current = v;
          setViewport(v);
        }}
      />
      <ViewOverlayRenderer
        viewport={viewport}
        renderViewOverlay={renderViewOverlay}
      />
    </>
  );
}

interface ViewOverlayRendererProps
  extends Pick<ViewportContentProps, "renderViewOverlay"> {
  viewport: ScreenViewport | undefined;
}

function ViewOverlayRenderer({
  viewport,
  renderViewOverlay,
}: ViewOverlayRendererProps) {
  if (!viewport) return null;

  if (renderViewOverlay) {
    return renderViewOverlay(viewport);
  }

  return (
    <DefaultViewOverlay
      viewport={viewport}
      analysisTimeline={true}
      solarTimeline={true}
      scheduleAnimation={true}
    />
  );
}
