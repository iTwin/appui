/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Id64String } from "@itwin/core-bentley";
import { IModelApp } from "@itwin/core-frontend";
import {
  ConfigurableCreateInfo, ContentControl, ContentGroup, FrontstageConfig, FrontstageProvider, StageUsage, UiFramework,
} from "@itwin/appui-react";
import { SampleAppIModelApp } from "../../index";
import { IModelIndex } from "../imodelindex/IModelIndex";
import { StandardContentLayouts } from "@itwin/appui-abstract";

class IModelIndexControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    const iModelConnection = UiFramework.getIModelConnection();
    if (iModelConnection && IModelApp.authorizationClient)
      this.reactNode = <IModelIndex iModelConnection={iModelConnection} onOpen={this._onOpen} />;
    else
      this.reactNode = null;
  }

  private _onOpen = async (viewIds: Id64String[]) => {
    const iModelConnection = UiFramework.getIModelConnection();
    if (iModelConnection) {
      const iTwinId = iModelConnection.iTwinId!;
      const iModelId = iModelConnection.iModelId!;
      await SampleAppIModelApp.openIModelAndViews(iTwinId, iModelId, viewIds);
    }
  };
}

export class IModelIndexFrontstage extends FrontstageProvider {
  public static stageId = "ui-test-app:IModelIndex";
  public override get id(): string {
    return IModelIndexFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: "imodelIndexGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "imodelIndexView",
          classId: IModelIndexControl,
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
