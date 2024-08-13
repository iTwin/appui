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
              <ConfigurableUiContent appBackstage={<BackstageComposer />} />
            </AppLocalizationProvider>
          </AppPreviewFeatures>
        </WidgetContentProvider>
      </SafeAreaContext.Provider>
    </ThemeManager>
  );
}
