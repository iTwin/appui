/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  BackstageComposer,
  ConfigurableUiContent,
  SafeAreaContext,
  SafeAreaInsets,
  ThemeManager,
} from "@itwin/appui-react";
import {
  AppPreviewFeatures,
  WidgetContentProvider,
} from "@itwin/appui-test-providers";
import { ThemeProvider as IUI2_ThemeProvider } from "@itwin/itwinui-react-v2";
import { useEngagementTime } from "./appui/useEngagementTime";
import { AppLocalizationProvider } from "./Localization";
import { KoqEditorSpec } from "@itwin/presentation-components";
import {
  ColorEditorSpec,
  QuantityEditorSpec,
  WeightEditorSpec,
} from "@itwin/imodel-components-react";
import { ButtonGroup, IconButton } from "@itwin/itwinui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import {
  EditorProps,
  EditorSpec,
  EditorsRegistryProvider,
  FormatOverrides,
  NumericEditorSpec,
  useEnumEditorProps,
  withFormatOverrides,
} from "@itwin/components-react";

interface AppProps {
  featureOverrides?: React.ComponentProps<
    typeof AppPreviewFeatures
  >["featureOverrides"];
}

export function App({ featureOverrides }: AppProps) {
  useEngagementTime();
  return (
    <ThemeManager>
      <SafeAreaContext.Provider value={SafeAreaInsets.All}>
        <WidgetContentProvider>
          <AppPreviewFeatures featureOverrides={featureOverrides}>
            <AppLocalizationProvider>
              <EditorsRegistryProvider editors={rootEditors}>
                <EditorsRegistryProvider editors={editors}>
                  <ConfigurableUiContent
                    appBackstage={<BackstageComposer />}
                    childWindow={ChildWindow}
                  />
                </EditorsRegistryProvider>
              </EditorsRegistryProvider>
            </AppLocalizationProvider>
          </AppPreviewFeatures>
        </WidgetContentProvider>
      </SafeAreaContext.Provider>
    </ThemeManager>
  );
}

// Load iTwinUI v2 styles in popout widgets.
function ChildWindow(props: React.PropsWithChildren<object>) {
  return <IUI2_ThemeProvider>{props.children}</IUI2_ThemeProvider>;
}

const formatOverrides: FormatOverrides = {
  ["Units.LENGTH"]: {
    unitSystems: ["metric"],
    format: {
      type: "decimal",
      decimalSeparator: "k",
    },
  },
};

const editors: EditorSpec[] = [
  NumericEditorSpec,
  WeightEditorSpec,
  ColorEditorSpec,
];

const rootEditors: EditorSpec[] = [
  {
    applies: (metadata) =>
      metadata.type === "enum" &&
      metadata.preferredEditor === "enum-buttongroup",
    Editor: CustomEnumEditor,
  },
  {
    ...KoqEditorSpec,
    Editor: withFormatOverrides(KoqEditorSpec.Editor, formatOverrides),
  },
  QuantityEditorSpec,
];

function CustomEnumEditor(props: EditorProps) {
  const { value, onChange, choices, size, onFinish } =
    useEnumEditorProps(props);
  return (
    <ButtonGroup orientation="horizontal" onBlur={onFinish}>
      {choices.map((c) => (
        <IconButton
          key={c.value}
          onClick={() => {
            onChange({ choice: c.value, label: c.label });
            onFinish();
          }}
          isActive={value.choice === c.value}
          size={size}
          label={c.label}
        >
          <SvgPlaceholder />
        </IconButton>
      ))}
    </ButtonGroup>
  );
}
