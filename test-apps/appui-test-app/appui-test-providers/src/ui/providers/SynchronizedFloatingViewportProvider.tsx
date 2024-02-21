/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BackstageItem,
  BackstageItemUtilities,
  StageUsage,
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import { OpenSynchronizedViewTool } from "../../tools/OpenSynchronizedViewTool";
import { SynchronizedFloatingViewportStage } from "../frontstages/SynchronizedFloatingViewport";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel";

export class SynchronizedFloatingViewportProvider implements UiItemsProvider {
  public static providerId = "SynchronizedFloatingViewportProvider";
  public readonly id = SynchronizedFloatingViewportProvider.providerId;

  constructor(localizationNamespace: string) {
    OpenSynchronizedViewTool.register(localizationNamespace);
  }

  public static register(localizationNamespace: string) {
    UiItemsManager.register(
      new SynchronizedFloatingViewportProvider(localizationNamespace),
      { stageIds: [SynchronizedFloatingViewportStage.stageId] }
    );
  }

  public static unregister() {
    UiItemsManager.unregister(SynchronizedFloatingViewportProvider.providerId);
  }

  public provideToolbarItems(
    _stageId: string,
    stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ): ToolbarItem[] {
    if (stageUsage !== StageUsage.General.valueOf()) return [];
    if (_stageId !== "appui-test-providers:SynchronizedFloatingViewportExample")
      return [];

    const toolbarItems: ToolbarItem[] = [];
    if (
      toolbarUsage === ToolbarUsage.ContentManipulation &&
      toolbarOrientation === ToolbarOrientation.Horizontal
    ) {
      toolbarItems.push(getCustomViewSelectorPopupItem(20, 3000));
      toolbarItems.push(OpenSynchronizedViewTool.getActionButtonDef(10, 10));
    }
    return toolbarItems;
  }
  /** Add entry to activate this stage in the backstage. */
  public provideBackstageItems(): BackstageItem[] {
    const label = AppUiTestProviders.translate(
      "backstage.SynchronizeFloatingViewFrontstageLabel"
    );
    return [
      BackstageItemUtilities.createStageLauncher(
        SynchronizedFloatingViewportStage.stageId,
        300,
        2,
        label,
        undefined,
        undefined
      ),
    ];
  }
}
