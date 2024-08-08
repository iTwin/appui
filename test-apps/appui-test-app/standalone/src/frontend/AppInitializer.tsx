/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "@itwin/appui-react";
import { BeEvent } from "@itwin/core-bentley";
import { BentleyCloudRpcManager } from "@itwin/core-common";
import { IModelApp } from "@itwin/core-frontend";
import { ITwinLocalization } from "@itwin/core-i18n";
import { getSupportedRpcs } from "../common/rpcs";
import { appConfig } from "./appConfig";
import { initializeLogger } from "./logger";

function createInitializer() {
  let ready = false;
  const onReady = new BeEvent();
  let initializing: Promise<void> | undefined;
  async function initialize() {
    initializeLogger();

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
      tileAdmin: {
        cesiumIonKey: appConfig.cesiumIonKey,
      },
      localization: new ITwinLocalization({
        urlTemplate: `${origin}/locales/{{lng}}/{{ns}}.json`,
      }),
      publicPath: `${origin}/`,
    });
    await UiFramework.initialize();

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
