/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  IModelReadRpcInterface,
  IModelTileRpcInterface,
  RpcInterfaceDefinition,
  SnapshotIModelRpcInterface,
} from "@itwin/core-common";
import { ECSchemaRpcInterface } from "@itwin/ecschema-rpcinterface-common";

/**
 * Returns a list of RPCs supported by this application
 */
export function getSupportedRpcs(): RpcInterfaceDefinition[] {
  return [
    IModelReadRpcInterface,
    IModelTileRpcInterface,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    SnapshotIModelRpcInterface,
    ECSchemaRpcInterface,
  ];
}
