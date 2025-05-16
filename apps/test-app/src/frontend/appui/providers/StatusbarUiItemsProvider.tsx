/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  SelectionScopeField,
  SnapModeField,
  StandardStatusbarUiItemsProvider,
  StatusBarItemUtilities,
  StatusBarSection,
  UiItemsProvider,
} from "@itwin/appui-react";
import { useAccuSnapStore } from "../AppAccuSnap";

export function createStatusBarUiItemsProvider() {
  const standardProvider = new StandardStatusbarUiItemsProvider({
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
        ...standardProvider.getStatusBarItems(),
        StatusBarItemUtilities.createCustomItem({
          id: "selection-scope",
          section: StatusBarSection.Right,
          itemPriority: 20,
          content: <AppSelectionScope />,
        }),
        StatusBarItemUtilities.createCustomItem({
          id: "snap-mode",
          section: StatusBarSection.Center,
          itemPriority: 10,
          content: <AppSnapModeField />,
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

function AppSnapModeField() {
  const snapMode = useAccuSnapStore();
  return (
    <SnapModeField
      snapMode={snapMode}
      onChange={(newMode) => {
        useAccuSnapStore.setState(newMode);
      }}
    />
  );
}
