/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BriefcaseConnection,
  IModelConnection,
  SnapshotConnection,
} from "@itwin/core-frontend";
import { SampleAppIModelApp } from "../index";
import { Logger, OpenMode } from "@itwin/core-bentley";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";

// cSpell:ignore TESTAPP FILEPATH

export class LocalFileSupport {
  public static localFilesSupported = (): boolean => {
    if (ElectronApp.isValid) return true;

    if (
      !SampleAppIModelApp.testAppConfiguration?.snapshotPath &&
      !SampleAppIModelApp.testAppConfiguration?.fullSnapshotPath
    ) {
      alert(
        "IMJS_UITESTAPP_SNAPSHOT_FILEPATH must be set on the backend and point to a folder containing local snapshot files."
      );
      return false;
    }

    return true;
  };

  public static getLocalFileSpecification = (): string | undefined => {
    return SampleAppIModelApp.testAppConfiguration?.fullSnapshotPath;
  };

  public static openLocalFile = async (
    fileSpec: string,
    definesFullPath = false
  ): Promise<IModelConnection | undefined> => {
    // Close the current iModelConnection
    await SampleAppIModelApp.closeCurrentIModel();

    let iModelConnection: IModelConnection | undefined;
    let filePath = "";

    // Open the iModel
    if (ElectronApp.isValid) {
      filePath = fileSpec;
      Logger.logInfo(
        SampleAppIModelApp.loggerCategory(LocalFileSupport),
        `openLocalFile: Opening standalone. path=${filePath}`
      );
      try {
        iModelConnection = await BriefcaseConnection.openStandalone(
          filePath,
          SampleAppIModelApp.testAppConfiguration?.readWrite
            ? OpenMode.ReadWrite
            : OpenMode.Readonly,
          { key: filePath }
        );
      } catch (err: any) {
        Logger.logError(
          SampleAppIModelApp.loggerCategory(LocalFileSupport),
          `openLocalFile: BriefcaseConnection.openStandalone failed.`
        );
        alert(err.message);
        iModelConnection = undefined;
      }
    } else {
      if (
        SampleAppIModelApp.testAppConfiguration?.fullSnapshotPath &&
        definesFullPath
      )
        filePath = fileSpec;
      else
        filePath = `${SampleAppIModelApp.testAppConfiguration?.snapshotPath}/${fileSpec}`;
      Logger.logInfo(
        SampleAppIModelApp.loggerCategory(LocalFileSupport),
        `openLocalFile: Opening snapshot. path=${filePath}`
      );
      try {
        iModelConnection = await SnapshotConnection.openFile(filePath);
      } catch (err: any) {
        alert(err.message);
        iModelConnection = undefined;
      }
    }

    return iModelConnection;
  };
}
