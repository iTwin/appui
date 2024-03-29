/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BackstageItem,
  BackstageItemUtilities,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import stageIconSvg from "../imodeljs.svg";
import { registerViewportFrontstage } from "./ViewportFrontstage";

class ExampleStagesBackstageItemsProvider implements UiItemsProvider {
  public readonly id = "example-stage-backstageItemProvider";

  public provideBackstageItems(): BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher(
        "example:ViewportFrontstage",
        100,
        20,
        "Simple viewport",
        undefined,
        stageIconSvg
      ),
    ];
  }
}

export function registerExampleFrontstages(): void {
  registerViewportFrontstage();
}

export function addExampleFrontstagesToBackstage(): void {
  UiItemsManager.register(new ExampleStagesBackstageItemsProvider());
}
