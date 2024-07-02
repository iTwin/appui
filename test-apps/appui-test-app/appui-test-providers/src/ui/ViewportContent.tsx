/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { DefaultViewOverlay, UiFramework } from "@itwin/appui-react";
import { ScreenViewport, ViewState } from "@itwin/core-frontend";
import { ViewportComponent } from "@itwin/imodel-components-react";

type ViewportComponentProps = React.ComponentProps<typeof ViewportComponent>;

interface ViewportContentProps extends Partial<ViewportComponentProps> {
  viewState?: ViewState;
  renderViewOverlay?: (viewport: ScreenViewport) => React.ReactNode;
}

export function ViewportContent(props: ViewportContentProps) {
  const [iModel] = React.useState(UiFramework.getIModelConnection());
  let [viewState] = React.useState(UiFramework.getDefaultViewState());
  const [viewport, setViewport] = React.useState<ScreenViewport | undefined>(
    undefined
  );
  viewState = props.viewState ?? viewState;
  if (!iModel) return null;

  return (
    <>
      <ViewportComponent
        viewState={viewState}
        imodel={iModel}
        viewportRef={(v) => setViewport(v)}
      />
      <ViewOverlayRenderer
        viewport={viewport}
        renderViewOverlay={props.renderViewOverlay}
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
