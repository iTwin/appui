/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  AccuDrawKeyboardShortcuts,
  AppNotificationManager,
  AppUiSettings,
  FrameworkAccuDraw,
  FrameworkToolAdmin,
  FrameworkUiAdmin,
  KeyinEntry,
  SYSTEM_PREFERRED_COLOR_THEME,
  UiFramework,
} from "@itwin/appui-react";
import { ProcessDetector, UnexpectedErrors } from "@itwin/core-bentley";
import * as appUiTestProvidersModule from "@itwin/appui-test-providers";
import {
  AppUiTestProviders,
  createUpdatedUiItemsProvider,
  createW1Provider,
  RegisterUiProviderTool,
} from "@itwin/appui-test-providers";
import { BentleyCloudRpcManager, RpcConfiguration } from "@itwin/core-common";
import { IModelApp, IModelAppOptions, ToolAdmin } from "@itwin/core-frontend";
import { ITwinLocalization } from "@itwin/core-i18n";
import { getSupportedRpcs } from "../common/rpcs";
import { config } from "./config";
import { initializeLogger } from "./logger";
import { AppAccuSnap } from "./appui/AppAccuSnap";
import { RealityDataAccessClient } from "@itwin/reality-data-client";
import { EditTools } from "@itwin/editor-frontend";
import { Key } from "ts-key-enum";
import { FrontendDevTools } from "@itwin/frontend-devtools";
import { HyperModeling } from "@itwin/hypermodeling-frontend";
import { AppSettingsTabsProvider } from "./appui/settingsproviders/AppSettingsTabsProvider";
import { createKeyboardShortcuts } from "./appui/KeyboardShortcuts";
import { TestAppLocalization } from "./useTranslation";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";
import { FrontendIModelsAccess } from "@itwin/imodels-access-frontend";
import { IModelsClient } from "@itwin/imodels-client-management";

function createInitializer() {
  let initializing: Promise<void> | undefined;
  async function initializer() {
    initializeLogger();

    // Initialize my application gateway configuration for the frontend
    RpcConfiguration.developmentMode = true;

    const rpcInterfaces = getSupportedRpcs();
    BentleyCloudRpcManager.initializeClient(
      {
        info: { title: "test-app", version: "v1.0" },
        uriPrefix: "http://localhost:3001",
      },
      rpcInterfaces // eslint-disable-line @typescript-eslint/no-deprecated
    );

    const origin = window.location.origin;

    const iModelClient = new IModelsClient({
      api: {
        baseUrl: `https://${config.urlPrefix}api.bentley.com/imodels`,
      },
    });
    const options: IModelAppOptions = {
      accuDraw: new FrameworkAccuDraw(),
      accuSnap: new AppAccuSnap(),
      hubAccess: new FrontendIModelsAccess(iModelClient),
      notifications: new AppNotificationManager(),
      uiAdmin: new FrameworkUiAdmin(),
      realityDataAccess: new RealityDataAccessClient({
        baseUrl: `https://${config.urlPrefix}api.bentley.com/realitydata`,
      }),
      rpcInterfaces: getSupportedRpcs(),
      mapLayerOptions: {
        BingMaps: config.bingMapsKey
          ? {
              key: "key",
              value: config.bingMapsKey,
            }
          : undefined,
        MapboxImagery: config.mapBoxKey
          ? {
              key: "access_token",
              value: config.mapBoxKey,
            }
          : undefined,
      },
      localization: new ITwinLocalization({
        urlTemplate: `${origin}/locales/{{lng}}/{{ns}}.json`,
      }),
      publicPath: `${origin}/`,
      tileAdmin: {
        cesiumIonKey: config.cesiumIonKey,
      },
      toolAdmin: new FrameworkToolAdmin(),
    };
    if (ProcessDetector.isElectronAppFrontend) {
      // TODO: const authClient =new ElectronRendererAuthorization();
      await ElectronApp.startup({
        iModelApp: options,
      });
    } else {
      await IModelApp.startup(options);
    }

    ToolAdmin.exceptionHandler = async (err) =>
      Promise.resolve(UnexpectedErrors.handle(err));
    await IModelApp.localization.registerNamespace(
      AppUiTestProviders.localizationNamespace
    );
    await IModelApp.localization.registerNamespace(
      TestAppLocalization.namespace
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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      new AppUiSettings({
        colorTheme: lastTheme ?? SYSTEM_PREFERRED_COLOR_THEME,
        dragInteraction: false,
        widgetOpacity: 0.8,
        showWidgetIcon: true,
        autoCollapseUnpinnedPanels: false,
        toolbarOpacity: 0.5,
      })
    );

    const urlParams = new URLSearchParams(window.location.search);
    const useDefaultPopoutUrl =
      urlParams.get("useDefaultPopoutUrl") === "0" ? false : true;
    UiFramework.useDefaultPopoutUrl = useDefaultPopoutUrl;
    await UiFramework.initializeStateFromUserSettingsProviders();

    UiFramework.keyboardShortcuts.loadShortcuts(createKeyboardShortcuts());
    UiFramework.keyboardShortcuts.loadShortcuts(
      AccuDrawKeyboardShortcuts.getDefaultShortcuts()
    );

    const keyins = getKeyins();
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === Key.F2.valueOf()) {
        UiFramework.showKeyinPalette(keyins);
      }
    });

    await IModelApp.quantityFormatter.setActiveUnitSystem("metric");

    // TODO: should not be required. Start event loop to open key-in palette.
    IModelApp.startEventLoop();
  }
  const x = {
    initialize: async () => {
      if (initializing) return initializing;

      initializing = (async () => {
        await initializer();
        x.initialized = true;
      })();
      return initializing;
    },
    initialized: false,
  };
  return x;
}

export const appInitializer = createInitializer();

function getKeyins() {
  const toolList = IModelApp.tools.getToolList();
  const toolKeyins: KeyinEntry[] = [];
  for (const tool of toolList) {
    const keyin = tool.keyin;
    toolKeyins.push({ value: keyin });
  }

  return toolKeyins;
}
