/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo,
  ContentControl,
  ContentGroup,
  FrontstageConfig,
  FrontstageProvider,
  StageUsage,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { ElectronRendererAuthorization } from "@itwin/electron-authorization/lib/cjs/ElectronRenderer";
import { SignIn } from "../oidc/SignIn";
import { Flex } from "@itwin/itwinui-react";

class SignInControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    const client = IModelApp.authorizationClient;
    if ((client as BrowserAuthorizationClient).signIn !== undefined) {
      this.reactNode = (
        <SignIn onSignIn={this._onSignIn} onRegister={this._onRegister} />
      );
    } else {
      this.reactNode = (
        <Flex justifyContent="center">
          {"No authorization client available"}
        </Flex>
      );
    }
  }

  private _onSignIn = () => {
    if (
      IModelApp.authorizationClient instanceof BrowserAuthorizationClient ||
      IModelApp.authorizationClient instanceof ElectronRendererAuthorization
    ) {
      void IModelApp.authorizationClient.signIn();
    }
  };

  private _onRegister = () => {
    window.open(
      "https://ims.bentley.com/as/4bBVJ/resume/as/authorization.ping",
      "_blank"
    );
  };
}

export class SignInFrontstage extends FrontstageProvider {
  public static stageId = "ui-test-app:SignIn";
  public get id(): string {
    return SignInFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: "sign-in-stage",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "sign-in",
          classId: SignInControl,
        },
      ],
    });

    return {
      id: this.id,
      version: 1,
      contentGroup,
      usage: StageUsage.Private,
    };
  }
}
