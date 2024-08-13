/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ContentOverlay, UiFramework } from "@itwin/appui-react";
import { ViewportComponent } from "@itwin/imodel-components-react";

interface ViewportWidgetProps {
  active: boolean;
  onActivate?: () => void;
}

export function ViewportWidget({ active, onActivate }: ViewportWidgetProps) {
  const [viewState] = React.useState(() => {
    return UiFramework.getDefaultViewState();
  });
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
