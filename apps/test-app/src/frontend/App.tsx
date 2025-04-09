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
              <ConfigurableUiContent
                appBackstage={<BackstageComposer />}
                childWindow={ChildWindow}
              />
            </AppLocalizationProvider>
          </AppPreviewFeatures>
        </WidgetContentProvider>
      </SafeAreaContext.Provider>
    </ThemeManager>
  );
}

// Load iTwinUI v2 styles in popout widgets.
function ChildWindow(props: React.PropsWithChildren<object>) {
  return (
    <IUI2_ThemeProvider style={{ height: "100%" }}>
      {props.children}
    </IUI2_ThemeProvider>
  );
}
