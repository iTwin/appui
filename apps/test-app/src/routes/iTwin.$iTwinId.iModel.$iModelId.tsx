/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@itwin/itwinui-react";
import { useAuth } from "../frontend/Auth";
import { appInitializer } from "../frontend/AppInitializer";
import { App } from "../frontend/App";
import { CheckpointConnection, IModelApp } from "@itwin/core-frontend";
import { createViewState } from "../frontend/createViewState";
import { registerFrontstages } from "../frontend/registerFrontstages";
import { UiFramework } from "@itwin/appui-react";
import {
  AppParams,
  useFeatureOverrideParams,
  useSyncFrontstageParam,
} from "../frontend/SearchParams";

export const Route = createFileRoute("/iTwin/$iTwinId/iModel/$iModelId")({
  loader: async (ctx) => {
    const accessToken = ctx.context.auth.accessToken;
    if (!accessToken) return { accessToken };
    await appInitializer.initialize();
    IModelApp.authorizationClient = ctx.context.auth.authClient;
    const { iTwinId, iModelId } = ctx.params;
    const iModelConnection = await CheckpointConnection.openRemote(
      iTwinId,
      iModelId
    );
    const viewState = await createViewState(iModelConnection);
    registerFrontstages({ iModelConnection, viewState });
    UiFramework.setIModelConnection(iModelConnection);
    UiFramework.setDefaultViewState(viewState);
    return {
      iModelConnection,
      viewState,
      accessToken,
    };
  },
  component: IModel,
  validateSearch: (search: AppParams) => {
    return search;
  },
  shouldReload: (ctx) => {
    return ctx.cause === "enter" || !appInitializer.initialized;
  },
  gcTime: 0,
});

function IModel() {
  const { accessToken } = Route.useLoaderData();
  if (!accessToken) return <Login />;
  return <InitializedApp />;
}

function InitializedApp() {
  useSyncFrontstageParam();
  const featureOverrides = useFeatureOverrideParams();
  return <App featureOverrides={featureOverrides} />;
}

function Login() {
  const { signIn } = useAuth();
  return (
    <div>
      <Button
        onClick={() => {
          void signIn();
        }}
      >
        SignIn
      </Button>
    </div>
  );
}
