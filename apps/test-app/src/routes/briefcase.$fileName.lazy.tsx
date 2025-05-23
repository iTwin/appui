/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { App } from "../frontend/App";
import {
  useFeatureOverrideParams,
  useSyncFrontstageParam,
} from "../frontend/SearchParams";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEditorToolSettings } from "../frontend/appui/useEditorToolSettings";

export const Route = createLazyFileRoute("/briefcase/$fileName")({
  component: Briefcase,
});

function Briefcase() {
  const { iModelConnection } = Route.useLoaderData();
  useSyncFrontstageParam();
  useEditorToolSettings();
  const featureOverrides = useFeatureOverrideParams();
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      void iModelConnection.close();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [iModelConnection]);
  return (
    <PageLayout.Content>
      <App featureOverrides={featureOverrides} />
    </PageLayout.Content>
  );
}
