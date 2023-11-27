/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  PreviewFeaturesProvider,
  StatusBarItem,
  StatusBarSection,
  UiItemsProvider,
} from "@itwin/appui-react";
import { BetaBadge } from "@itwin/core-react";
import { Checkbox, DropdownButton, MenuItem } from "@itwin/itwinui-react";
import * as React from "react";

const PreviewFeatureListContext = React.createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>] | undefined
>(undefined);

const featureList = [
  { id: "contentAlwaysMaxSize", label: "Content is always maximum size" },
  {
    id: "enableMaximizedFloatingWidget",
    label: "Enable maximized floating widgets",
  },
];
function PreviewFeatureList() {
  const [activeFeatureList, setActiveFeatureList] =
    React.useContext(PreviewFeatureListContext) ?? [];

  if (!activeFeatureList || !setActiveFeatureList) {
    return null;
  }

  return (
    <DropdownButton
      size="small"
      menuItems={() =>
        featureList.map(({ id: feature, label }) => (
          <MenuItem
            key={feature}
            sublabel={feature}
            badge={
              <Checkbox
                checked={activeFeatureList.includes(feature)}
                readOnly
              />
            }
            onClick={() => {
              setActiveFeatureList((prev) =>
                prev.includes(feature)
                  ? prev.filter((item) => item !== feature)
                  : [...prev, feature]
              );
            }}
          >
            {label}
          </MenuItem>
        ))
      }
    >
      <BetaBadge />
    </DropdownButton>
  );
}

/**
 */
export class PreviewFeaturesToggleProvider implements UiItemsProvider {
  public readonly id = "appui-test-providers:PreviewFeaturesToggleProvider";

  public getStatusBarItems(): readonly StatusBarItem[] {
    return [
      {
        content: <PreviewFeatureList />,
        section: StatusBarSection.Right,
        id: `${this.id}:StatusBarItem`,
        itemPriority: Infinity,
      },
    ];
  }

  public static ReactProvider = (props: { children?: React.ReactNode }) => {
    const activeFeatureList = React.useState<string[]>([]);

    return (
      <PreviewFeatureListContext.Provider value={activeFeatureList}>
        <PreviewFeaturesProvider
          features={{
            contentAlwaysMaxSize: activeFeatureList[0].includes(
              "contentAlwaysMaxSize"
            ),
            enableMaximizedFloatingWidget: activeFeatureList[0].includes(
              "enableMaximizedFloatingWidget"
            ),
          }}
        >
          {props.children}
        </PreviewFeaturesProvider>
      </PreviewFeatureListContext.Provider>
    );
  };
}
