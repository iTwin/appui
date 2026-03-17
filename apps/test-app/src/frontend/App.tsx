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
import { Root } from "@stratakit/foundations";

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

/**
 * Loads iTwinUI v2 styles in popout widgets.
 * Renders <Root> component to set-up StrataKit.
 */
function ChildWindow(props: React.PropsWithChildren<object>) {
  const [rootNode, setRootNode] = React.useState<Document | undefined>(
    undefined
  );
  return (
    <IUI2_ThemeProvider style={{ height: "100%" }}>
      <Root
        colorScheme="light"
        density="dense"
        synchronizeColorScheme
        rootNode={rootNode}
        ref={(el) => {
          setRootNode(el?.ownerDocument);
        }}
      >
        {props.children}
      </Root>
    </IUI2_ThemeProvider>
  );
}
