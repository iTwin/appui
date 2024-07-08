/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { ContentGroup, Frontstage, StageUsage } from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { ElectronRendererAuthorization } from "@itwin/electron-authorization/lib/cjs/ElectronRenderer";
import { SignIn } from "../oidc/SignIn";
import { Flex } from "@itwin/itwinui-react";

function SignInContent() {
  const client = IModelApp.authorizationClient as BrowserAuthorizationClient;
  if (client === undefined) {
    return (
      <Flex justifyContent="center">No authorization client available</Flex>
    );
  }

  return (
    <SignIn
      onSignIn={() => {
        if (
          IModelApp.authorizationClient instanceof BrowserAuthorizationClient ||
          IModelApp.authorizationClient instanceof ElectronRendererAuthorization
        ) {
          void IModelApp.authorizationClient.signIn();
        }
      }}
      onRegister={() => {
        window.open(
          "https://ims.bentley.com/as/4bBVJ/resume/as/authorization.ping",
          "_blank"
        );
      }}
    />
  );
}

export const signInFrontstage: Frontstage = {
  id: "ui-test-app:SignIn",
  version: 1,
  contentGroup: new ContentGroup({
    id: "sign-in-stage",
    layout: StandardContentLayouts.singleView,
    contents: [
      {
        id: "sign-in",
        classId: "",
        content: <SignInContent />,
      },
    ],
  }),
  usage: StageUsage.Private,
};
