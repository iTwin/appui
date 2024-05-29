/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  StatusBarItemUtilities,
  StatusBarSection,
  ToolAssistanceField,
} from "@itwin/appui-react";
import { AppUiStory } from "../../AppUiStory";
import { createFrontstageProvider } from "../../Utils";
import { IModelApp } from "@itwin/core-frontend";

/** [outputPrompt](https://www.itwinjs.org/reference/appui-react/notification/appnotificationmanager/outputprompt/) displays a prompt message in the status bar. */
export function NotificationsStory() {
  return (
    <AppUiStory
      layout="fullscreen"
      frontstageProviders={[
        createFrontstageProvider({
          hideStatusBar: false,
        }),
      ]}
      itemProviders={[
        {
          id: "provider-1",
          getStatusBarItems: () => [
            StatusBarItemUtilities.createCustomItem(
              "uifw.ToolAssistance",
              StatusBarSection.Left,
              0,
              <>
                <ToolAssistanceField />
                <Prompt />
              </>
            ),
          ],
        },
      ]}
    />
  );
}

// TODO: should be possible to output prompt before the tool assistance field is mounted.
function Prompt() {
  React.useEffect(() => {
    IModelApp.notifications.outputPrompt("Prompt message");
  }, []);
  return null;
}
