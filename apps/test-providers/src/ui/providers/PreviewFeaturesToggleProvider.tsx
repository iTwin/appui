/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeatures,
  PreviewFeaturesProvider,
  StatusBarSection,
} from "@itwin/appui-react";
import { Checkbox, DropdownButton, MenuItem } from "@itwin/itwinui-react";
import { SvgTechnicalPreviewBadgeBw } from "@itwin/itwinui-icons-react";

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
  horizontalPanelAlignment: {
    label: "Horizontal panel alignment",
  },
  widgetActionDropdown: {
    label: "Render dropdown menu when widget title bar has more than 2 buttons",
    value: { threshold: 2 },
  },
  reparentPopoutWidgets: {
    label: "Re-parent popout widgets",
  },
  controlWidgetVisibility: {
    label: "Control widget visibility",
  },
  allowLettersInAccuDrawInputFields: {
    label: "Allow letters in AccuDraw input fields",
  },
  enableColorlessAccuDrawInputFields: {
    label: "Enable colorless AccuDraw input fields",
  },
  toolSettingsNewEditors: {
    label: "Enable new tool settings editors",
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
          right: 0,
        }}
      >
        <SvgTechnicalPreviewBadgeBw />
      </div>
    </DropdownButton>
  );
}

export function createPreviewFeaturesProvider() {
  const id = "appui-test-providers:PreviewFeaturesToggleProvider";
  return {
    id,
    getStatusBarItems: () => [
      {
        content: <PreviewFeatureList />,
        section: StatusBarSection.Right,
        id: `${id}:StatusBarItem`,
        itemPriority: Infinity,
      },
    ],
  };
}

interface AppPreviewFeaturesProps {
  children?: React.ReactNode;
  featureOverrides?: React.ComponentProps<
    typeof PreviewFeaturesProvider
  >["features"];
}

/** Uses persisted preview features. */
export function AppPreviewFeatures({
  children,
  featureOverrides,
}: AppPreviewFeaturesProps) {
  const [features, setFeatures] = useSavedFeatures();
  const finalFeatures = React.useMemo(() => {
    return { ...features, ...featureOverrides };
  }, [features, featureOverrides]);
  return (
    <PreviewFeaturesContext.Provider value={[finalFeatures, setFeatures]}>
      <PreviewFeaturesProvider features={finalFeatures}>
        {children}
      </PreviewFeaturesProvider>
    </PreviewFeaturesContext.Provider>
  );
}

function useSavedFeatures() {
  const [features, setFeatures] = React.useState<PreviewFeatures>(() => {
    const item = window.localStorage.getItem("preview-features");
    if (!item) return {};

    return JSON.parse(item);
  });
  React.useEffect(() => {
    window.localStorage.setItem("preview-features", JSON.stringify(features));
  }, [features]);

  return [features, setFeatures] as const;
}
