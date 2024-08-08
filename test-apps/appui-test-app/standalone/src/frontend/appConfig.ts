/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
function createConfig() {
  return {
    snapshotPath: import.meta.env.IMJS_UITESTAPP_SNAPSHOT_FILEPATH,
    cesiumIonKey: import.meta.env.IMJS_CESIUM_ION_KEY,
  };
}

export const appConfig = createConfig();
