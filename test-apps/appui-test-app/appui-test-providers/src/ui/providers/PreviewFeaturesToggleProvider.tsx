/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  StatusBarItem,
  StatusBarSection,
  UiFramework,
  UiItemsProvider,
} from "@itwin/appui-react";
import { BetaBadge } from "@itwin/core-react";
import { Checkbox, DropdownButton, MenuItem } from "@itwin/itwinui-react";
import * as React from "react";

const featureList = [
  { id: "contentAlwaysMaxSize", label: "Content is always maximum size" },
];
function PreviewFeatureList() {
  const [activeFeatureList, setActiveFeatureList] = React.useState<string[]>(
    Object.keys(UiFramework.previewFeatures)
  );

  React.useEffect(() => {
    UiFramework.setPreviewFeatures({
      contentAlwaysMaxSize: activeFeatureList.includes("contentAlwaysMaxSize"),
    });
  }, [activeFeatureList]);

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
}
