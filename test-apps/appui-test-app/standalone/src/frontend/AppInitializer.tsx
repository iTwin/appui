/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  AppNotificationManager,
  AppUiSettings,
  FrameworkAccuDraw,
  FrameworkToolAdmin,
  FrameworkUiAdmin,
  getKeyinsFromToolList,
  SYSTEM_PREFERRED_COLOR_THEME,
  UiFramework,
} from "@itwin/appui-react";
import {
  BeEvent,
  ProcessDetector,
  UnexpectedErrors,
} from "@itwin/core-bentley";
import * as appUiTestProvidersModule from "@itwin/appui-test-providers";
import {
  AppUiTestProviders,
  createUpdatedUiItemsProvider,
  createW1Provider,
  RegisterUiProviderTool,
} from "@itwin/appui-test-providers";
import { BentleyCloudRpcManager, RpcConfiguration } from "@itwin/core-common";
import { IModelApp, ToolAdmin } from "@itwin/core-frontend";
import { ITwinLocalization } from "@itwin/core-i18n";
import { getSupportedRpcs } from "../common/rpcs";
import { appConfig } from "./appConfig";
import { initializeLogger } from "./logger";
import { SampleAppAccuSnap } from ".";
import { RealityDataAccessClient } from "@itwin/reality-data-client";
import { EditTools } from "@itwin/editor-frontend";
import { Key } from "ts-key-enum";
import { FrontendDevTools } from "@itwin/frontend-devtools";
import { HyperModeling } from "@itwin/hypermodeling-frontend";
import { AppSettingsTabsProvider } from "./appui/settingsproviders/AppSettingsTabsProvider";

function createInitializer() {
  let ready = false;
  const onReady = new BeEvent();
  let initializing: Promise<void> | undefined;
  async function initializer() {
    initializeLogger();

    // Initialize my application gateway configuration for the frontend
    RpcConfiguration.developmentMode = true;

    const rpcInterfaces = getSupportedRpcs();
    BentleyCloudRpcManager.initializeClient(
      {
        info: { title: "appui-test-app", version: "v1.0" },
        uriPrefix: "http://localhost:3001",
      },
      rpcInterfaces // eslint-disable-line deprecation/deprecation
    );

    const origin = window.location.origin;
    await IModelApp.startup({
      accuSnap: new SampleAppAccuSnap(),
      notifications: new AppNotificationManager(),
      uiAdmin: new FrameworkUiAdmin(),
      accuDraw: new FrameworkAccuDraw(),
      realityDataAccess: new RealityDataAccessClient({
        baseUrl: `https://${appConfig.urlPrefix}api.bentley.com/realitydata`,
      }),
      rpcInterfaces: getSupportedRpcs(),
      mapLayerOptions: {
        BingMaps: appConfig.bingMapsKey
          ? {
              key: "key",
              value: appConfig.bingMapsKey,
            }
          : undefined,
        MapboxImagery: appConfig.mapBoxKey
          ? {
              key: "access_token",
              value: appConfig.mapBoxKey,
            }
          : undefined,
      },
      localization: new ITwinLocalization({
        urlTemplate: `${origin}/locales/{{lng}}/{{ns}}.json`,
      }),
      publicPath: `${origin}/`,
      tileAdmin: {
        cesiumIonKey: appConfig.cesiumIonKey,
      },
      toolAdmin: new FrameworkToolAdmin(),
    });
    ToolAdmin.exceptionHandler = async (err) =>
      Promise.resolve(UnexpectedErrors.handle(err));
    await IModelApp.localization.registerNamespace(
      AppUiTestProviders.localizationNamespace
    );

    await UiFramework.initialize();
    UiFramework.visibility.autoHideUi = false;

    IModelApp.tools.registerModule(
      appUiTestProvidersModule,
      AppUiTestProviders.localizationNamespace
    );
    RegisterUiProviderTool.providers.push(createW1Provider());
    RegisterUiProviderTool.providers.push(createUpdatedUiItemsProvider());

    if (ProcessDetector.isElectronAppFrontend) {
      await EditTools.initialize();
    }

    await FrontendDevTools.initialize();
    await HyperModeling.initialize();

    UiFramework.settingsManager.addSettingsProvider(
      new AppSettingsTabsProvider()
    );
    const lastTheme =
      (window.localStorage &&
        window.localStorage.getItem("uifw:defaultTheme")) ??
      SYSTEM_PREFERRED_COLOR_THEME;
    UiFramework.registerUserSettingsProvider(
      // eslint-disable-next-line deprecation/deprecation
      new AppUiSettings({
        colorTheme: lastTheme ?? SYSTEM_PREFERRED_COLOR_THEME,
        dragInteraction: false,
        widgetOpacity: 0.8,
        showWidgetIcon: true,
        autoCollapseUnpinnedPanels: false,
        toolbarOpacity: 0.5,
      })
    );
    UiFramework.useDefaultPopoutUrl = true;
    await UiFramework.initializeStateFromUserSettingsProviders();

    const keyins = getKeyinsFromToolList(IModelApp.tools.getToolList());
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === Key.F2.valueOf()) {
        UiFramework.showKeyinPalette(keyins);
      }
    });

    // TODO: should not be required. Start event loop to open key-in palette.
    IModelApp.startEventLoop();
  }
  return {
    ready,
    onReady,
    initialize: async () => {
      if (initializing) return initializing;

      initializing = (async () => {
        await initializer();
        ready = true;
        onReady.raiseEvent();
      })();
      return initializing;
    },
  };
}

export const appInitializer = createInitializer();
