/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger, LoggingMetaData, LogLevel } from "@itwin/core-bentley";

export const loggerCategory = "appui-test-app";

export function initializeLogger() {
  // Similar to `Logger.initializeToConsole`, but doesn't stringify meta-data.
  const logConsole =
    (level: string) =>
    (category: string, message: string, metaData: LoggingMetaData) => {
      const metaObj = Logger.getMetaData(metaData);
      console.log(`${level} | ${category} | ${message}`, metaObj); // eslint-disable-line no-console
    };

  Logger.initialize(
    logConsole("Error"),
    logConsole("Warning"),
    logConsole("Info"),
    logConsole("Trace")
  );

  Logger.setLevelDefault(LogLevel.Warning);
  Logger.setLevel(loggerCategory, LogLevel.Info);
}
