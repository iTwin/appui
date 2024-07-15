/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
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
  UiFramework,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getTestProviderState, setHideCustomDialogButton } from "../../store";
import { OpenCustomDialogTool } from "../../tools/OpenCustomDialogTool";
import { SampleModelessDialog } from "../dialogs/SampleModelessDialog";
import { CustomContentFrontstage } from "../frontstages/CustomContent";
import visibilitySemiTransparentSvg from "../icons/visibility-semi-transparent.svg";
import { SelectedElementDataWidgetComponent } from "../widgets/SelectedElementDataWidget";
import {
  SvgActivity,
  SvgFlag,
  SvgWindow,
  SvgWindowAdd,
} from "@itwin/itwinui-icons-react";
import { SampleNonModalDialog } from "../dialogs/SampleNonModalDialog";

/**
 * Test UiItemsProvider that provide buttons, and backstage item to stage.
 */
export class CustomContentStageUiProvider implements UiItemsProvider {
  public static providerId =
    "appui-test-providers:CustomContentStageUiProvider";
  public readonly id = CustomContentStageUiProvider.providerId;

  /** method that updates the value in redux store and dispatches a sync event so items are refreshed. */
  public toggleCustomDialogTool = () => {
    // eslint-disable-next-line deprecation/deprecation
    StateManager.store.dispatch(
      setHideCustomDialogButton(!getTestProviderState().hideCustomDialogButton)
    );

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
      // eslint-disable-next-line deprecation/deprecation
      const customActionButton = ToolbarItemUtilities.createActionItem(
        "custom-action-button",
        -1,
        visibilitySemiTransparentSvg,
        "Custom Action Button",
        (): void => {
          IModelApp.notifications.outputMessage(
            new NotifyMessageDetails(
              OutputMessagePriority.Info,
              "Custom Action Button activated",
              undefined,
              OutputMessageType.Toast
            )
          );
        }
      );

      /** The following ConditionalBooleanValue is used to determine the display state of the OpenCustomDialog button
       * provided by this UiItemsProvider.
       */
      const customDialogActionHiddenCondition = new ConditionalBooleanValue(
        (): boolean => {
          return getTestProviderState().hideCustomDialogButton;
        },
        [AppUiTestProviders.syncEventIdHideCustomDialogButton],
        getTestProviderState().hideCustomDialogButton
      );

      const openCustomDialogActionButton =
        OpenCustomDialogTool.getActionButtonDef(
          1000,
          undefined,
          customDialogActionHiddenCondition
        );

      /** The following test tool toggles the value Redux store and dispatches sync event that triggers tool refresh */
      const toggleHiddenButton = ToolbarItemUtilities.createActionItem({
        id: "custom-dialog-tool-visibility-toggle",
        itemPriority: 1001,
        icon: <SvgActivity />,
        label: "Toggle CustomDialog Button Visibility",
        execute: () => {
          this.toggleCustomDialogTool();
        },
      });

      const sampleModelessToolButton = ToolbarItemUtilities.createActionItem({
        id: "sample-modeless-dialog",
        itemPriority: 17,
        icon: <SvgWindowAdd />,
        label: IModelApp.localization.getLocalizedString(
          "SampleApp:buttons.sampleModelessDialog"
        ),
        execute: () => {
          const dialogId = "sampleModeless";
          UiFramework.dialogs.modeless.open(
            <SampleModelessDialog opened={true} dialogId={dialogId} />,
            dialogId
          );
        },
        badgeKind: "deprecated",
      });

      const sampleNonModalDialogToolButton =
        ToolbarItemUtilities.createActionItem({
          id: "sample-non-modal-dialog",
          itemPriority: 18,
          icon: <SvgWindow />,
          label: IModelApp.localization.getLocalizedString(
            "SampleApp:buttons.sampleNonModalDialog"
          ),
          execute: () => {
            const dialogId = "sampleNonModal";
            UiFramework.dialogs.modeless.open(
              <SampleNonModalDialog dialogId={dialogId} />,
              dialogId
            );
          },
          badgeKind: "new",
        });

      return [
        customActionButton,
        openCustomDialogActionButton,
        toggleHiddenButton,
        sampleModelessToolButton,
        sampleNonModalDialogToolButton,
      ];
    }
    return [];
  }

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (
      stageUsage === StageUsage.General.valueOf() &&
      location === StagePanelLocation.Right &&
      section === StagePanelSection.Start
    ) {
      widgets.push({
        id: "appui-test-providers:elementDataListWidget",
        label: "Data",
        icon: "icon-flag-2",
        defaultState: WidgetState.Hidden,
        canFloat: {
          containerId: "ui-item-provider-test:ViewAttributesWidget",
        },
        content: <SelectedElementDataWidgetComponent />,
      });
    }
    return widgets;
  }

  public provideBackstageItems(): BackstageItem[] {
    return [
      // use 200 to group it with secondary stages in ui-test-app
      BackstageItemUtilities.createStageLauncher({
        stageId: CustomContentFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 2,
        label: AppUiTestProviders.translate(
          "backstage.customContentFrontstageLabel"
        ),
        subtitle: "from provider",
        icon: <SvgFlag />,
      }),
    ];
  }
}
