/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
function createConfig() {
  const urlPrefix = import.meta.env.IMJS_URL_PREFIX as string;
  const serverEnvironmentPrefix = toServerEnvironmentPrefix(urlPrefix);
  return {
    cesiumIonKey: import.meta.env.IMJS_CESIUM_ION_KEY as string,
    bimDir: import.meta.env.IMJS_BIM_DIR as string,
    urlPrefix,
    serverEnvironmentPrefix,
    bingMapsKey: import.meta.env.IMJS_BING_MAPS_KEY as string,
    mapBoxKey: import.meta.env.IMJS_MAPBOX_KEY as string,
    redirectUri: import.meta.env.IMJS_OIDC_BROWSER_TEST_REDIRECT_URI as string,
    clientId: import.meta.env.IMJS_OIDC_BROWSER_TEST_CLIENT_ID as string,
    testScopes: import.meta.env.IMJS_OIDC_BROWSER_TEST_SCOPES as string,
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
