/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IModelGrid } from "@itwin/imodel-browser-react";
import { Button } from "@itwin/itwinui-react";
import { config } from "../frontend/config";
import { useAuth } from "../frontend/Auth";
import { PageLayout } from "@itwin/itwinui-layouts-react";

export const Route = createFileRoute("/iTwin/$iTwinId")({
  component: ITwin,
});

const { serverEnvironmentPrefix } = config;
const apiOverrides = {
  serverEnvironmentPrefix,
};

function ITwin() {
  const { accessToken } = useAuth();
  const { iTwinId } = Route.useParams();
  const navigate = useNavigate();
  if (!accessToken) return <Login />;
  return (
    <PageLayout.Content padded={true}>
      <IModelGrid
        onThumbnailClick={(iModel) => {
          void navigate({
            to: "/iTwin/$iTwinId/iModel/$iModelId",
            params: { iTwinId, iModelId: iModel.id },
          });
        }}
        iTwinId={iTwinId}
        accessToken={accessToken}
        apiOverrides={apiOverrides}
        searchText=""
      />
    </PageLayout.Content>
  );
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
