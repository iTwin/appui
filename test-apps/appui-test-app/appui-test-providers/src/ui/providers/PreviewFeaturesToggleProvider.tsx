/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StatusBarSection,
  UiItemsProvider,
} from "@itwin/appui-react";
import { Badge, BadgeType } from "@itwin/core-react";
import { Checkbox, DropdownButton, MenuItem } from "@itwin/itwinui-react";

const PreviewFeaturesContext = React.createContext<
  | [PreviewFeatures, React.Dispatch<React.SetStateAction<PreviewFeatures>>]
  | undefined
>(undefined);

type AvailableFeatures = {
  [K in keyof PreviewFeatures]: { label: string; value?: PreviewFeatures[K] };
};

const availableFeatures: AvailableFeatures = {
  contentAlwaysMaxSize: {
    label: "Content is always maximum size",
  },
  enableMaximizedFloatingWidget: {
    label: "Enable maximized floating widgets",
  },
  enableMaximizedPanelWidget: {
    label: "Enable maximized panel widgets",
  },
  activateDroppedTab: {
    label: "Change active tab after drag & drop",
  },
  horizontalPanelAlignment: {
    label: "Horizontal panel alignment",
  },
  widgetActionDropdown: {
    label: "Render dropdown menu when widget title bar has more than 2 buttons",
    value: { threshold: 2 },
  },
  newToolbars: {
    label: "Enable iTwinUI based toolbars",
  },
  reparentPopoutWidgets: {
    label: "Re-parent popout widgets",
    value: ["widget-layout-info", "widget-info-Floating"],
  },
  controlWidgetVisibility: {
    label: "Control widget visibility",
  },
};

function PreviewFeatureList() {
  const context = React.useContext(PreviewFeaturesContext);

  if (!context) {
    return null;
  }

  const [features, setFeatures] = context;
  const availableFeatureEntries = Object.entries(availableFeatures);
  return (
    <DropdownButton
      size="small"
      menuItems={() =>
        availableFeatureEntries.map(([feature, { label, value }]) => (
          <MenuItem
            key={feature}
            sublabel={feature}
            endIcon={<Checkbox checked={feature in features} readOnly />}
            onClick={() => {
              setFeatures((prev) => {
                if (Object.keys(prev).includes(feature)) {
                  const { [feature]: _, ...rest } = prev;
                  return rest;
                }

                return {
                  ...prev,
                  [feature]: value === undefined ? true : value,
                };
              });
            }}
          >
            {label}
          </MenuItem>
        ))
      }
    >
      Preview features
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Badge type={BadgeType.TechnicalPreview} />
      </div>
    </DropdownButton>
  );
}

export const previewFeaturesToggleProvider: UiItemsProvider = {
  id: "appui-test-providers:PreviewFeaturesToggleProvider",
  getStatusBarItems: () => [
    {
      content: <PreviewFeatureList />,
      section: StatusBarSection.Right,
      id: `${previewFeaturesToggleProvider.id}:StatusBarItem`,
      itemPriority: Infinity,
    },
  ],
};

export function AppPreviewFeatures(props: React.PropsWithChildren<{}>) {
  const [features, setFeatures] = useSavedFeatures();
  return (
    <PreviewFeaturesContext.Provider value={[features, setFeatures]}>
      <PreviewFeaturesProvider
        features={{ ...features, reparentPopoutWidgets: true }}
      >
        {props.children}
      </PreviewFeaturesProvider>
    </PreviewFeaturesContext.Provider>
  );
}

function useSavedFeatures() {
  const [features, setFeatures] = React.useState<PreviewFeatures>(() => {
    const item = window.localStorage.getItem("preview-features");
    if (item) {
      return JSON.parse(item);
    }
    return {};
  });
  React.useEffect(() => {
    window.localStorage.setItem("preview-features", JSON.stringify(features));
  }, [features]);
  return [features, setFeatures] as const;
}
