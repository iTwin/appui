/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
function createConfig() {
  const urlPrefix = import.meta.env.IMJS_URL_PREFIX ?? "";
  const serverEnvironmentPrefix = toServerEnvironmentPrefix(urlPrefix);
  return {
    appClientId: import.meta.env.IMJS_APP_CLIENT_ID as string,
    appRedirectUri: import.meta.env.IMJS_APP_REDIRECT_URI as string,
    appScope: import.meta.env.IMJS_APP_SCOPE as string,
    bimDir: import.meta.env.IMJS_BIM_DIR as string,
    bingMapsKey: import.meta.env.IMJS_BING_MAPS_KEY as string,
    cesiumIonKey: import.meta.env.IMJS_CESIUM_ION_KEY as string,
    mapBoxKey: import.meta.env.IMJS_MAPBOX_KEY as string,
    tests: Boolean(import.meta.env.IMJS_TESTS as string),
    serverEnvironmentPrefix,
    urlPrefix,
  } as const;
}

export const config = createConfig();

function toServerEnvironmentPrefix(urlPrefix: string) {
  switch (urlPrefix) {
    case "qa-":
      return "qa";
    case "dev-":
      return "dev";
  }
  return undefined;
}
