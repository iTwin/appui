/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItem,
  BackstageItemUtilities,
  ContentGroupProps,
  FrontstageUtilities,
  StageUsage,
  StandardFrontstageProps,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SampleAppIModelApp } from "../../index";
import { IModelOpen } from "../imodelopen/IModelOpen";
import { TestAppLocalization } from "../../useTranslation";

function IModelOpenContent() {
  let envUrlPrefix: "dev" | "qa" | "" | undefined;
  switch (import.meta.env.IMJS_URL_PREFIX) {
    case "qa-":
      envUrlPrefix = "qa";
      break;
    case "dev-":
      envUrlPrefix = "dev";
      break;
    case "":
      envUrlPrefix = "";
      break;
  }
  if (!IModelApp.authorizationClient) return null;
  return (
    <IModelOpen
      onIModelSelected={async (arg: { iTwinId: string; id: string }) => {
        await SampleAppIModelApp.openIModelAndViews(arg.iTwinId, arg.id);
      }}
      urlPrefix={envUrlPrefix}
    />
  );
}

export class IModelOpenFrontstage {
  public static stageId = "appui-test-app:IModelOpen";

  public static register() {
    // if frontstage has not yet been registered register it now
    if (!UiFramework.frontstages.hasFrontstage(IModelOpenFrontstage.stageId)) {
      UiFramework.frontstages.addFrontstage(
        FrontstageUtilities.createStandardFrontstage({
          id: IModelOpenFrontstage.stageId,
          usage: StageUsage.Private,
          contentGroupProps: {
            id: "appui-test-app:IModelOpenGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "imodel-open",
                classId: "",
                content: <IModelOpenContent />,
              },
            ],
          },
          cornerButton: <BackstageAppButton />,
          hideToolSettings: true,
          hideStatusBar: true,
        })
      );
      UiItemsManager.register(new BackstageItemsProvider());
    }
  }

  public static async open() {
    IModelOpenFrontstage.register();
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      IModelOpenFrontstage.stageId
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
  }
}

class BackstageItemsProvider implements UiItemsProvider {
  public readonly id = "local-file-open-stage-backstageItemProvider";

  public provideBackstageItems(): BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher(
        IModelOpenFrontstage.stageId,
        300,
        10,
        TestAppLocalization.translate("backstage.imodelopen"),
        undefined,
        "icon-folder-opened"
      ),
    ];
  }
}
