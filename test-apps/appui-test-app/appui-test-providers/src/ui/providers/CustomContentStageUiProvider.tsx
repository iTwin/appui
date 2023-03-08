/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { ConditionalBooleanValue, IconSpecUtilities } from "@itwin/appui-abstract";
import {
  BackstageItem,
  BackstageItemUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StateManager,
  SyncUiEventDispatcher,
  ToolbarItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { IModelApp, NotifyMessageDetails, OutputMessagePriority, OutputMessageType } from "@itwin/core-frontend";
import * as React from "react";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getTestProviderState, setHideCustomDialogButton } from "../../store";
import { OpenCustomDialogTool } from "../../tools/OpenCustomDialogTool";
import { CustomContentFrontstage } from "../frontstages/CustomContent";
import visibilitySemiTransparentSvg from "../icons/visibility-semi-transparent.svg";
import { SelectedElementDataWidgetComponent } from "../widgets/SelectedElementDataWidget";

/**
 * Test UiItemsProvider that provide buttons, and backstage item to stage.
 */
export class CustomContentStageUiProvider implements UiItemsProvider {
  public static providerId = "appui-test-providers:CustomContentStageUiProvider";
  public readonly id = CustomContentStageUiProvider.providerId;

  /** method that updates the value in redux store and dispatches a sync event so items are refreshed. */
  public toggleCustomDialogTool = () => {
    StateManager.store.dispatch(setHideCustomDialogButton(!getTestProviderState().hideCustomDialogButton));

    // tell the toolbar to reevaluate state of any item with this event Id
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
      AppUiTestProviders.syncEventIdHideCustomDialogButton
    );
  };

  constructor(localizationNamespace: string) {
    // register tools that will be returned via this provider
    OpenCustomDialogTool.register(localizationNamespace);
  }

  public provideToolbarItems(
    stageId: string,
    _stageUsage: string, // don't need to check usage since this provider is for specific stage.
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ): ToolbarItem[] {
    if (
      stageId === CustomContentFrontstage.stageId &&
      toolbarUsage === ToolbarUsage.ContentManipulation &&
      toolbarOrientation === ToolbarOrientation.Horizontal
    ) {
      const customActionButton = ToolbarItemUtilities.createActionButton(
        "custom-action-button",
        -1,
        IconSpecUtilities.createWebComponentIconSpec(visibilitySemiTransparentSvg),
        "Custom Action Button",
        (): void => {
          IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "Custom Action Button activated", undefined, OutputMessageType.Toast));
        },
      );

      /** The following ConditionalBooleanValue is used to determine the display state of the OpenCustomDialog button
       * provided by this UiItemsProvider.
       */
      const customDialogActionHiddenCondition =
        new ConditionalBooleanValue(
          (): boolean => {
            return getTestProviderState().hideCustomDialogButton;
          },
          [AppUiTestProviders.syncEventIdHideCustomDialogButton],
          getTestProviderState().hideCustomDialogButton
        );

      const openCustomDialogActionButton = OpenCustomDialogTool.getActionButtonDef(1000, undefined, customDialogActionHiddenCondition);

      /** The following test tool toggles the value Redux store and dispatches sync event that triggers tool refresh */
      const toggleHiddenButton = ToolbarItemUtilities.createActionButton(
        "custom-dialog-tool-visibility-toggle", 1001, "icon-activity", "Toggle CustomDialog Button Visibility",
        (): void => {
          this.toggleCustomDialogTool();
        },
      );

      return [customActionButton, openCustomDialogActionButton, toggleHiddenButton];
    }
    return [];
  }

  public provideWidgets(_stageId: string, stageUsage: string, location: StagePanelLocation,
    section?: StagePanelSection): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (stageUsage === StageUsage.General && location === StagePanelLocation.Right && section === StagePanelSection.Start) {
      const widget: Widget = {
        id: "appui-test-providers:elementDataListWidget",
        label: "Data",
        icon: "icon-flag-2",
        defaultState: WidgetState.Hidden,

        canFloat: {
          containerId: "ui-item-provider-test:ViewAttributesWidget"
        },

        // eslint-disable-next-line react/display-name
        content: <SelectedElementDataWidgetComponent />
      };

      widgets.push(widget);
    }
    return widgets;
  }

  public provideBackstageItems(): BackstageItem[] {
    const label = AppUiTestProviders.translate("backstage.customContentFrontstageLabel");
    return [
      // use 200 to group it with secondary stages in ui-test-app
      BackstageItemUtilities.createStageLauncher(CustomContentFrontstage.stageId, 200, 2, label, "from provider", "icon-flag-2"),
    ];
  }
}
