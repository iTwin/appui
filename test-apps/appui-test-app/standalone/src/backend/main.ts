/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as fs from "fs";
import * as path from "path";
import { Logger, ProcessDetector } from "@itwin/core-bentley";
import { getSupportedRpcs } from "../common/rpcs";
import { loggerCategory } from "../common/TestAppConfiguration";
import { initializeElectron } from "./electron/ElectronMain";
import { initializeLogging } from "./logging";
import { initializeWeb } from "./web/BackendServer";
import { RpcManager } from "@itwin/core-common";
import { ECSchemaRpcInterface } from "@itwin/ecschema-rpcinterface-common";
import { ECSchemaRpcImpl } from "@itwin/ecschema-rpcinterface-impl";

void (async () => {
  try {
    // Load .env file first
    if (fs.existsSync(path.join(process.cwd(), ".env"))) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("dotenv-expand")(
        require("dotenv").config() // eslint-disable-line @typescript-eslint/no-var-requires
      );
    }

    initializeLogging();

    // ECSchemaRpcInterface allows schema retrieval for the UnitProvider implementation.
    RpcManager.registerImpl(ECSchemaRpcInterface, ECSchemaRpcImpl);

    // invoke platform-specific initialization
    if (ProcessDetector.isElectronAppBackend) {
      await initializeElectron();
    } else {
      await initializeWeb();
    }
  } catch (error: any) {
    Logger.logError(loggerCategory, error);
    process.exitCode = 1;
  }
})();
