/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** Parameters for starting appui-test-app with a specified initial configuration */
export interface TestAppConfiguration {
  snapshotPath?: string; // Used when run in the browser - a common base path for all snapshot imodels
  fullSnapshotPath?: string; // Used when run in the browser - a common base path for all snapshot imodels
  bingMapsKey?: string;
  mapBoxKey?: string;
  cesiumIonKey?: string;
  readWrite?: boolean;
}

export const loggerCategory = "appui-test-app";
