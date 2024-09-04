/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  SelectionScopeField,
  StandardStatusbarUiItemsProvider,
  StatusBarItemUtilities,
  StatusBarSection,
  UiItemsProvider,
} from "@itwin/appui-react";

export function createStatusBarUiItemsProvider() {
  const standardProvider = new StandardStatusbarUiItemsProvider({
    accuSnapModePicker: true,
    activityCenter: true,
    messageCenter: true,
    postToolAssistanceSeparator: true,
    preToolAssistanceSeparator: true,
    selectionInfo: true,
    tileLoadIndicator: true,
    toolAssistance: true,
  });

  return {
    id: "statusbar",
    getStatusBarItems: () => {
      return [
        // eslint-disable-next-line deprecation/deprecation
        ...standardProvider.provideStatusBarItems("", ""),
        StatusBarItemUtilities.createCustomItem({
          id: "selection-scope",
          section: StatusBarSection.Right,
          itemPriority: 20,
          content: <AppSelectionScope />,
        }),
      ];
    },
  } satisfies UiItemsProvider;
}

function AppSelectionScope() {
  const [scope, setScope] = React.useState("element");
  return (
    <SelectionScopeField
      selectionScopes={[
        { id: "element", label: "Element" },
        { id: "assembly", label: "Assembly" },
        { id: "top-assembly", label: "Top Assembly" },
      ]}
      activeScope={scope}
      onChange={setScope}
    />
  );
}
