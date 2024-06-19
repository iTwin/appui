/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { UiFramework } from "@itwin/appui-react";
import { ViewState } from "@itwin/core-frontend";
import { ViewportComponent } from "@itwin/imodel-components-react";

interface ViewportContentProps {
  viewState?: ViewState;
}

export function ViewportContent(props: ViewportContentProps) {
  let [viewState] = React.useState(UiFramework.getDefaultViewState());
  const [iModel] = React.useState(UiFramework.getIModelConnection());
  viewState = props.viewState ?? viewState;
  if (!iModel) return null;
  return <ViewportComponent viewState={viewState} imodel={iModel} />;
}
