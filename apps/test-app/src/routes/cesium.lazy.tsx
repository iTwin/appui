/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { App } from "../frontend/App";
import {
  useFeatureOverrideParams,
  useSyncFrontstageParam,
} from "../frontend/SearchParams";
import { createCesiumFrontstage } from "../frontend/appui/frontstages/CesiumFrontstage";

export const Route = createLazyFileRoute("/cesium")({
  component: Blank,
});

function Blank() {
  useSyncFrontstageParam({
    defaultFrontstageId: createCesiumFrontstage.stageId,
  });
  const featureOverrides = useFeatureOverrideParams();
  return (
    <PageLayout.Content>
      <App featureOverrides={featureOverrides} />
    </PageLayout.Content>
  );
}
