/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ITwinGrid } from "@itwin/imodel-browser-react";
import { Button } from "@itwin/itwinui-react";
import { config } from "../frontend/config";
import { useAuth } from "../frontend/Auth";
import { PageLayout } from "@itwin/itwinui-layouts-react";

export const Route = createFileRoute("/iTwins")({
  component: ITwins,
});

const { serverEnvironmentPrefix } = config;
const apiOverrides = {
  serverEnvironmentPrefix,
};

function ITwins() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  if (!accessToken) return <Login />;
  return (
    <PageLayout.Content padded={true}>
      <ITwinGrid
        onThumbnailClick={(iTwin) => {
          void navigate({
            to: "/iTwin/$iTwinId",
            params: { iTwinId: iTwin.id },
            // TODO: react signal is aborted without reason in `@itwin/imodel-browser-react#IModelGrid` when in `StrictMode`
            search: {
              strict: 0,
            },
          });
        }}
        accessToken={accessToken}
        apiOverrides={apiOverrides}
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
