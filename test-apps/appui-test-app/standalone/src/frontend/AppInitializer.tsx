/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  AppNotificationManager,
  FrameworkAccuDraw,
  FrameworkToolAdmin,
  FrameworkUiAdmin,
  UiFramework,
} from "@itwin/appui-react";
import { BeEvent, UnexpectedErrors } from "@itwin/core-bentley";
import { BentleyCloudRpcManager, RpcConfiguration } from "@itwin/core-common";
import { IModelApp, ToolAdmin } from "@itwin/core-frontend";
import { ITwinLocalization } from "@itwin/core-i18n";
import { getSupportedRpcs } from "../common/rpcs";
import { appConfig } from "./appConfig";
import { initializeLogger } from "./logger";
import { SampleAppAccuSnap } from ".";
import { RealityDataAccessClient } from "@itwin/reality-data-client";

function createInitializer() {
  let ready = false;
  const onReady = new BeEvent();
  let initializing: Promise<void> | undefined;
  async function initialize() {
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

    await UiFramework.initialize();
    UiFramework.visibility.autoHideUi = false;

    ready = true;
    onReady.raiseEvent();
  }
  return {
    ready,
    onReady,
    initialize: async () => {
      if (initializing) return initializing;

      initializing = initialize();
      return initializing;
    },
  };
}

export const appInitializer = createInitializer();
