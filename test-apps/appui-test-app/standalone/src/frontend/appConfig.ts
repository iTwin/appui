/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
function createConfig() {
  return {
    cesiumIonKey: import.meta.env.IMJS_CESIUM_ION_KEY,
    snapshotPath: import.meta.env.IMJS_UITESTAPP_SNAPSHOT_FILEPATH,
    urlPrefix: import.meta.env.IMJS_URL_PREFIX,
    bingMapsKey: import.meta.env.IMJS_BING_MAPS_KEY,
    mapBoxKey: import.meta.env.IMJS_MAPBOX_KEY,
  };
}

export const appConfig = createConfig();
