/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ContentOverlay, UiFramework } from "@itwin/appui-react";
import { ViewportComponent } from "@itwin/imodel-components-react";
import { ViewState } from "@itwin/core-frontend";

interface ViewportWidgetProps {
  active: boolean;
  onActivate?: () => void;
  viewState?: ViewState;
}

export function ViewportWidget({
  active,
  onActivate,
  viewState,
}: ViewportWidgetProps) {
  const [defaultViewState] = React.useState(() => {
    return UiFramework.getDefaultViewState();
  });
  viewState = viewState ?? defaultViewState;

  if (!viewState) return null;
  return (
    <ContentOverlay
      onMouseDown={() => {
        onActivate?.();
      }}
      style={{
        height: "100%",
        flex: "1", // TODO: ChildWindowWidget a flex container. Add an error boundary to ChildWindowWidget as well.
      }}
      role="presentation"
      active={active}
    >
      <ViewportComponent viewState={viewState} imodel={viewState.iModel} />
    </ContentOverlay>
  );
}
