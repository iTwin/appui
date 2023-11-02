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
  { id: "panelsAlwaysOverContent", label: "Panels are always over content" },
];
function PreviewFeatureList() {
  const [activeFeatureList, setActiveFeatureList] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    UiFramework.setPreviewFeatures({
      panelsAlwaysOverContent: activeFeatureList.includes(
        "panelsAlwaysOverContent"
      ),
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
        id: "appui-test-providers:PreviewFeaturesToggleProviderStatusBarItem",
        itemPriority: Infinity,
      },
    ];
  }
}
