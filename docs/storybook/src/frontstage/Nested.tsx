/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  NestedFrontstageAppButton,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
} from "@itwin/appui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";

function createNestedFrontstage() {
  return createFrontstage({
    id: createNestedFrontstage.id,
    content: (
      <h1
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Nested Content
      </h1>
    ),
    cornerButton: <NestedFrontstageAppButton />,
  });
}
createNestedFrontstage.id = "nested-frontstage";

/** [openNestedFrontstage](https://www.itwinjs.org/reference/appui-react/frontstage/frameworkfrontstages/#opennestedfrontstage) can be used to open a nested frontstage. */
export function NestedFrontstageStory() {
  return (
    <AppUiStory
      layout="fullscreen"
      frontstages={() => [createFrontstage(), createNestedFrontstage()]}
      itemProviders={[
        {
          id: "toolbar",
          getToolbarItems: () => [
            ToolbarItemUtilities.createActionItem(
              "open",
              10,
              <SvgPlaceholder />,
              "Open nested frontstage",
              async () => {
                const frontstageDef =
                  await UiFramework.frontstages.getFrontstageDef(
                    createNestedFrontstage.id
                  );
                if (!frontstageDef) return;
                UiFramework.frontstages.openNestedFrontstage(frontstageDef);
              },
              {
                layouts: {
                  standard: {
                    orientation: ToolbarOrientation.Horizontal,
                    usage: ToolbarUsage.ContentManipulation,
                  },
                },
              }
            ),
          ],
        },
      ]}
    />
  );
}
