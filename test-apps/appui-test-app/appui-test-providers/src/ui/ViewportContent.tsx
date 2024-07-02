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
  supplyViewOverlay?: (viewport: ScreenViewport) => React.ReactNode;
}

export function ViewportContent(props: ViewportContentProps) {
  const [iModel] = React.useState(UiFramework.getIModelConnection());
  let [viewState] = React.useState(UiFramework.getDefaultViewState());
  const [viewport, setViewport] = React.useState<ScreenViewport | undefined>(
    undefined
  );
  viewState = props.viewState ?? viewState;
  if (!iModel) return null;

  let viewOverlay: React.ReactNode;
  if (viewport) {
    viewOverlay = props.supplyViewOverlay ? (
      props.supplyViewOverlay?.(viewport)
    ) : (
      <DefaultViewOverlay
        viewport={viewport}
        analysisTimeline={true}
        solarTimeline={true}
        scheduleAnimation={true}
      />
    );
  }
  return (
    <>
      <ViewportComponent
        viewState={viewState}
        imodel={iModel}
        viewportRef={(v) => setViewport(v)}
      />
      {viewOverlay}
    </>
  );
}
