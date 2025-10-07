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

export const Route = createLazyFileRoute("/blank")({
  component: Blank,
});

function Blank() {
  useSyncFrontstageParam();
  const featureOverrides = useFeatureOverrideParams();
  const search = Route.useSearch();
  const menu = search.menu !== 0;

  const app = <App featureOverrides={featureOverrides} />;
  if (!menu) return app;

  return <PageLayout.Content>{app}</PageLayout.Content>;
}
