/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import {
  CommonToolbarItem,
  StageUsage,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-abstract";
import { BeDuration } from "@itwin/core-bentley";
import { ActivityMessageDetails, ActivityMessageEndReason, IModelApp, NotifyMessageDetails, OutputMessagePriority, OutputMessageType } from "@itwin/core-frontend";

/** UiItemsProvider that provides tools to test message APIs. */
export class MessageUiItemsProvider implements UiItemsProvider {
  public static providerId = "appui-test-providers:MessageUiItemsProvider";
  public readonly id = MessageUiItemsProvider.providerId;

  public provideToolbarButtonItems(_stageId: string, stageUsage: string, usage: ToolbarUsage, orientatipn: ToolbarOrientation): CommonToolbarItem[] {
    if (stageUsage === StageUsage.General && usage === ToolbarUsage.ContentManipulation && orientatipn === ToolbarOrientation.Vertical) {
      return [
        ToolbarItemUtilities.createGroupButton(`${this.id}:group`, 10, "icon-placeholder", "Messages", [
          ToolbarItemUtilities.createActionButton(`${this.id}:activity`, 1, "icon-placeholder", "Activity message", async () => {
            let isCancelled = false;
            let progress = 0;

            if (details)
              return;

            details = new ActivityMessageDetails(true, true, true, true);
            details.onActivityCancelled = () => {
              isCancelled = true;
            };
            IModelApp.notifications.setupActivityMessage(details);

            while (!isCancelled && progress <= 100) {
              IModelApp.notifications.outputActivityMessage("Sample activity message", progress);
              await BeDuration.wait(100);
              progress++;
            }

            IModelApp.notifications.endActivityMessage(ActivityMessageEndReason.Completed);
            details = undefined;
          }),
          ToolbarItemUtilities.createActionButton(`${this.id}:toast`, 1, "icon-placeholder", "Toast message", () => {
            IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "Toast message", undefined, OutputMessageType.Toast));
          }),
          ToolbarItemUtilities.createActionButton(`${this.id}:sticky`, 1, "icon-placeholder", "Sticky message", () => {
            IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "Toast message", undefined, OutputMessageType.Sticky));
          }),
          ToolbarItemUtilities.createActionButton(`${this.id}:alert`, 1, "icon-placeholder", "Alert message", () => {
            IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "Alert message", undefined, OutputMessageType.Alert));
          }),
        ]),
      ];
    }

    return [];
  }
}

let details: ActivityMessageDetails | undefined = undefined;
