/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PreviewFeatures, UiFramework } from "@itwin/appui-react";

import { openBlankConnection } from "./appui/BlankConnection";

export function useHandleURLParams() {
  const [frontstageId, setFrontstageId] = React.useState<string | undefined>(
    undefined
  );
  React.useEffect(() => {
    setFrontstageId(getUrlParam("frontstage"));
  }, []);
  React.useEffect(() => {
    if (!frontstageId) return;

    void (async function () {
      const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
        frontstageId
      );
      if (!frontstageDef) return;
      await openBlankConnection();
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
    })();
  }, [frontstageId]);
}

export function usePreviewFeatureURLParams() {
  return React.useMemo(() => {
    const reparentPopoutWidgets = getUrlParam("reparentPopoutWidgets");
    const previewFeatures: PreviewFeatures = {};
    if (reparentPopoutWidgets) {
      previewFeatures.reparentPopoutWidgets = Array.isArray(
        reparentPopoutWidgets
      )
        ? reparentPopoutWidgets
        : reparentPopoutWidgets !== "0";
    }
    return previewFeatures;
  }, []);
}

export function getUrlParam(name: string) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const param = params.get(name);
  return param === null ? undefined : param;
}
