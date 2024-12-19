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
import { EditorSpec, EditorsRegistryProvider } from "@itwin/components-react";
import {
  ColorEditorSpec,
  WeightEditorSpec,
} from "@itwin/imodel-components-react";

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
                <ConfigurableUiContent
                  appBackstage={<BackstageComposer />}
                  childWindow={ChildWindow}
                />
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

// add custom editors from `@itwin/imodel-components-react` to the registry
const rootEditors: EditorSpec[] = [WeightEditorSpec, ColorEditorSpec];
