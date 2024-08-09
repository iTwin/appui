/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger, LogLevel } from "@itwin/core-bentley";
import {
  BackendLoggerCategory,
  NativeLoggerCategory,
} from "@itwin/core-backend";

export const loggerCategory = "appui-test-app:backend";

/** Initializes logging based on the configuration json file */
export function initializeLogging() {
  Logger.initializeToConsole();
  Logger.setLevelDefault(LogLevel.Error);

  Logger.setLevel(BackendLoggerCategory.IModelDb, LogLevel.Trace);
  Logger.setLevel(BackendLoggerCategory.IModelHost, LogLevel.Trace);
  Logger.setLevel(NativeLoggerCategory.ECObjectsNative, LogLevel.Warning);
  Logger.setLevel(NativeLoggerCategory.UnitsNative, LogLevel.Warning);
  Logger.setLevel(NativeLoggerCategory.BeSQLite, LogLevel.Warning);
  Logger.setLevel(NativeLoggerCategory.DgnCore, LogLevel.Warning);
}
