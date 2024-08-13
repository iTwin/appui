/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { UiFramework } from "@itwin/appui-react";
import { Logger } from "@itwin/core-bentley";
import { loggerCategory } from "../logger";

export function useEngagementTime() {
  React.useEffect(() => {
    UiFramework.frontstages.onFrontstageDeactivatedEvent.addListener((args) => {
      Logger.logInfo(
        loggerCategory,
        `Frontstage exit: id=${args.deactivatedFrontstageDef.id} totalTime=${args.totalTime} engagementTime=${args.engagementTime} idleTime=${args.idleTime}`
      );
    });
  }, []);
  React.useEffect(() => {
    UiFramework.frontstages.onModalFrontstageClosedEvent.addListener((args) => {
      Logger.logInfo(
        loggerCategory,
        `Modal Frontstage close: title=${args.modalFrontstage.title} totalTime=${args.totalTime} engagementTime=${args.engagementTime} idleTime=${args.idleTime}`
      );
    });
  }, []);
}
