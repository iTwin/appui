/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as fs from "fs";
import * as path from "path";
import { Logger, ProcessDetector } from "@itwin/core-bentley";
import { initializeElectron } from "./electron/ElectronMain";
import { initializeLogging, loggerCategory } from "./logging";
import { initializeWeb } from "./web/BackendServer";
import { RpcManager } from "@itwin/core-common";
import { ECSchemaRpcInterface } from "@itwin/ecschema-rpcinterface-common";
import { ECSchemaRpcImpl } from "@itwin/ecschema-rpcinterface-impl";
import { BackendIModelsAccess } from "@itwin/imodels-access-backend";
import { IModelsClient } from "@itwin/imodels-client-authoring";

void (async () => {
  try {
    // Load .env file first
    if (fs.existsSync(path.join(process.cwd(), ".env"))) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      require("dotenv-expand")(
        require("dotenv").config() // eslint-disable-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      );
    }

    initializeLogging();

    // ECSchemaRpcInterface allows schema retrieval for the UnitProvider implementation.
    RpcManager.registerImpl(ECSchemaRpcInterface, ECSchemaRpcImpl);

    const iModelClient = new IModelsClient({
      api: {
        baseUrl: `https://${
          process.env.IMJS_URL_PREFIX ?? ""
        }api.bentley.com/imodels`,
      },
    });
    const opts = { hubAccess: new BackendIModelsAccess(iModelClient) };

    // invoke platform-specific initialization
    if (ProcessDetector.isElectronAppBackend) {
      await initializeElectron(opts);
    } else {
      await initializeWeb(opts);
    }
  } catch (error: any) {
    Logger.logError(loggerCategory, error);
    process.exitCode = 1;
  }
})();
