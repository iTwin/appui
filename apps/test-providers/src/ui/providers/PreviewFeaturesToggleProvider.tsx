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
import {
  Checkbox,
  DropdownButton,
  MenuItem,
  Tooltip,
} from "@itwin/itwinui-react";
import { SvgTechnicalPreviewBadgeBw } from "@itwin/itwinui-icons-react";

const PreviewFeaturesContext = React.createContext<
  | [PreviewFeatures, React.Dispatch<React.SetStateAction<PreviewFeatures>>]
  | undefined
>(undefined);

type AvailableFeatures = {
  [K in keyof PreviewFeatures]: {
    label: string;
    value?: PreviewFeatures[K];
    extraInfo?: string;
  };
};

const useStratakitLabel = "Enable Stratakit component";

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
    label: "New tool settings editors",
  },
  toolSettingsLockButton: {
    label: "Tool settings lock button",
  },
  toolSettingsKeyPressCommit: {
    label: "Tool settings commit on key press",
  },
  stableContentLayout: {
    label: "Stable content layout",
  },
  useStratakit: {
    label: useStratakitLabel,
    extraInfo: "requires 'themeBridge'",
  },
};

function isThemeBridgeAbsentFromUrl() {
  return (
    new URLSearchParams(window.location.search).get("themeBridge") === null
  );
}

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
        availableFeatureEntries.map(
          ([feature, { label, value, extraInfo }]) => (
            <MenuItem
              key={feature}
              sublabel={feature}
              endIcon={<Checkbox checked={feature in features} readOnly />}
              disabled={
                label.includes(useStratakitLabel) &&
                isThemeBridgeAbsentFromUrl()
              }
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
              <p>{extraInfo && <i>{extraInfo}</i>}</p>
            </MenuItem>
          )
        )
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

  useStratakitPreviewFeature(finalFeatures);

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

/**
 * Ensures the 'useStratakit' preview feature is only enabled when the 'themeBridge'
 * query parameter is present in the URL. If 'useStratakit' is enabled without 'themeBridge',
 * it removes 'useStratakit' from the persisted preview features in localStorage.
 */
function useStratakitPreviewFeature(features: PreviewFeatures) {
  React.useEffect(() => {
    if (
      features.useStratakit &&
      new URLSearchParams(window.location.search).get("themeBridge") === null
    ) {
      window.localStorage.setItem(
        "preview-features",
        JSON.stringify({ ...features, useStratakit: undefined })
      );
    }
  }, [features]);
}
