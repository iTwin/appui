/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { UiFramework } from "@itwin/appui-react";
import { ViewportComponent } from "@itwin/imodel-components-react";

export function ViewportContent() {
  const [viewState] = React.useState(UiFramework.getDefaultViewState());
  const [iModel] = React.useState(UiFramework.getIModelConnection());
  if (!iModel) return null;
  return <ViewportComponent viewState={viewState} imodel={iModel} />;
}
