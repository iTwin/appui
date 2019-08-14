/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  CoreTools, ContentGroup, ContentControl,
  ConfigurableCreateInfo, FrontstageProvider, FrontstageProps,
  Frontstage, IModelInfo, UiFramework,
} from "@bentley/ui-framework";
import { SampleAppIModelApp } from "../../index";
import { IModelOpen } from "../imodelopen/IModelOpen";

class IModelOpenControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    const accessToken = UiFramework.getAccessToken();
    if (accessToken)
      this.reactElement = <IModelOpen accessToken={accessToken} onIModelSelected={this._onOpenIModel} />;
    else
      this.reactElement = null;
  }

  // called when an imodel has been selected on the IModelOpen
  private _onOpenIModel = async (iModelInfo: IModelInfo) => {
    await SampleAppIModelApp.showIModelIndex(iModelInfo.projectInfo.wsgId, iModelInfo.wsgId);
  }
}

export class IModelOpenFrontstage extends FrontstageProvider {

  public get frontstage(): React.ReactElement<FrontstageProps> {
    const contentGroup: ContentGroup = new ContentGroup({
      contents: [
        {
          classId: IModelOpenControl,
        },
      ],
    });

    return (
      <Frontstage id="IModelOpen"
        defaultTool={CoreTools.selectElementCommand}
        defaultLayout="SingleContent"
        contentGroup={contentGroup}
        isInFooterMode={false}
      />
    );
  }
}
