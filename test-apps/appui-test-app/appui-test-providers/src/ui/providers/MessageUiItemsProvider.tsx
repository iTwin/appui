/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BadgeType,
  StageUsage,
  ToolbarItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { BeDuration } from "@itwin/core-bentley";
import {
  ActivityMessageDetails,
  ActivityMessageEndReason,
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";

/** UiItemsProvider that provides tools to test message APIs. */
export class MessageUiItemsProvider implements UiItemsProvider {
  public static providerId = "appui-test-providers:MessageUiItemsProvider";
  public readonly id = MessageUiItemsProvider.providerId;

  public provideToolbarItems(
    _stageId: string,
    stageUsage: string,
    usage: ToolbarUsage,
    orientation: ToolbarOrientation
  ): ToolbarItem[] {
    if (
      stageUsage === StageUsage.General.valueOf() &&
      usage === ToolbarUsage.ContentManipulation &&
      orientation === ToolbarOrientation.Vertical
    ) {
      return [
        ToolbarItemUtilities.createGroupItem(
          `${this.id}:group`,
          10,
          "icon-placeholder",
          "Messages",
          [
            ToolbarItemUtilities.createActionItem(
              `${this.id}:activity`,
              1,
              "icon-placeholder",
              "Activity message",
              async () => {
                let isCancelled = false;
                let progress = 0;

                if (details) return;

                details = new ActivityMessageDetails(true, true, true, true);
                details.onActivityCancelled = () => {
                  isCancelled = true;
                };
                IModelApp.notifications.setupActivityMessage(details);

                while (!isCancelled && progress <= 100) {
                  IModelApp.notifications.outputActivityMessage(
                    "Sample activity message",
                    progress
                  );
                  await BeDuration.wait(100);
                  progress++;
                }

                IModelApp.notifications.endActivityMessage(
                  ActivityMessageEndReason.Completed
                );
                details = undefined;
              }
            ),
            ToolbarItemUtilities.createActionItem(
              `${this.id}:toast`,
              1,
              "icon-placeholder",
              "Toast message",
              () => {
                IModelApp.notifications.outputMessage(
                  new NotifyMessageDetails(
                    OutputMessagePriority.Info,
                    "Toast message",
                    undefined,
                    OutputMessageType.Toast
                  )
                );
              }
            ),
            ToolbarItemUtilities.createActionItem(
              `${this.id}:sticky`,
              1,
              "icon-placeholder",
              "Sticky message",
              () => {
                IModelApp.notifications.outputMessage(
                  new NotifyMessageDetails(
                    OutputMessagePriority.Info,
                    "Sticky message",
                    undefined,
                    OutputMessageType.Sticky
                  )
                );
              }
            ),
            ToolbarItemUtilities.createActionItem(
              `${this.id}:alert`,
              1,
              "icon-placeholder",
              "Alert message",
              () => {
                IModelApp.notifications.outputMessage(
                  new NotifyMessageDetails(
                    OutputMessagePriority.Fatal,
                    "Alert message",
                    undefined,
                    OutputMessageType.Alert
                  )
                );
              },
              { badge: BadgeType.New }
            ),
          ]
        ),
      ];
    }

    return [];
  }
}

let details: ActivityMessageDetails | undefined;
