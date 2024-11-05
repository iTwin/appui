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
import { AppUiTestProviders } from "../../AppUiTestProviders.js";
import { OpenCustomDialogTool } from "../../tools/OpenCustomDialogTool.js";
import { SampleModelessDialog } from "../dialogs/SampleModelessDialog.js";
import visibilitySemiTransparentSvg from "../icons/visibility-semi-transparent.svg";
import { SelectedElementDataWidgetComponent } from "../widgets/SelectedElementDataWidget.js";
import {
  SvgActivity,
  SvgFlag,
  SvgWindow,
  SvgWindowAdd,
} from "@itwin/itwinui-icons-react";
import { SampleNonModalDialog } from "../dialogs/SampleNonModalDialog.js";
import { createCustomContentFrontstage } from "../frontstages/CustomContentFrontstage.js";
import { store } from "../../store.js";

export class CustomContentStageUiProvider implements UiItemsProvider {
  public static providerId = "appui-test-providers:custom-content-provider";
  public readonly id = CustomContentStageUiProvider.providerId;

  constructor(localizationNamespace: string) {
    OpenCustomDialogTool.register(localizationNamespace);
  }

  public getToolbarItems(): readonly ToolbarItem[] {
    const layouts = {
      standard: {
        usage: ToolbarUsage.ContentManipulation,
        orientation: ToolbarOrientation.Horizontal,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const customActionButton = ToolbarItemUtilities.createActionItem(
      "custom-action-button",
      -1,
      visibilitySemiTransparentSvg,
      "Custom Action Button",
      () => {
        IModelApp.notifications.outputMessage(
          new NotifyMessageDetails(
            OutputMessagePriority.Info,
            "Custom Action Button activated",
            undefined,
            OutputMessageType.Toast
          )
        );
      },
      {
        layouts,
      }
    );

    /** The following ConditionalBooleanValue is used to determine the display state of the OpenCustomDialog button
     * provided by this UiItemsProvider.
     */
    const customDialogActionHiddenCondition =
      new ConditionalBooleanValue((): boolean => {
        return store.state.hideCustomDialogButton;
      }, [AppUiTestProviders.syncEventIdHideCustomDialogButton]);

    const openCustomDialogActionButton = ToolbarItemUtilities.createForTool(
      OpenCustomDialogTool,
      {
        itemPriority: 1000,
        isHidden: customDialogActionHiddenCondition,
        layouts,
      }
    );

    /** The following test tool toggles the value Redux store and dispatches sync event that triggers tool refresh */
    const toggleHiddenButton = ToolbarItemUtilities.createActionItem({
      id: "custom-dialog-tool-visibility-toggle",
      itemPriority: 1001,
      icon: <SvgActivity />,
      label: "Toggle CustomDialog Button Visibility",
      execute: () => {
        store.setHideCustomDialogButton(!store.state.hideCustomDialogButton);

        // tell the toolbar to reevaluate state of any item with this event Id
        SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
          AppUiTestProviders.syncEventIdHideCustomDialogButton
        );
      },
      layouts,
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
      layouts,
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
        layouts,
      });

    return [
      customActionButton,
      openCustomDialogActionButton,
      toggleHiddenButton,
      sampleModelessToolButton,
      sampleNonModalDialogToolButton,
    ];
  }

  public getWidgets(): readonly Widget[] {
    return [
      {
        id: "appui-test-providers:elementDataListWidget",
        label: "Data",
        icon: "icon-flag-2",
        defaultState: WidgetState.Hidden,
        canFloat: {
          containerId: "ui-item-provider-test:ViewAttributesWidget",
        },
        content: <SelectedElementDataWidgetComponent />,
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start,
          },
        },
      },
    ];
  }

  public getBackstageItems(): readonly BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher({
        stageId: createCustomContentFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 2,
        label: AppUiTestProviders.translate(
          "backstage.CustomContentFrontstage"
        ),
        subtitle: "from provider",
        icon: <SvgFlag />,
      }),
    ];
  }
}
