/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Id64String, Logger } from "@itwin/core-bentley";
import {
  ITwin,
  ITwinsAccessClient,
  ITwinsAPIResponse,
} from "@itwin/itwins-client";
import { IModelsClient } from "@itwin/imodels-client-management";
import { AccessTokenAdapter } from "@itwin/imodels-access-frontend";
import {
  CheckpointConnection,
  IModelApp,
  IModelConnection,
} from "@itwin/core-frontend";
import { SampleAppIModelApp } from "../";

export interface BasicIModelInfo {
  id: string;
  iTwinId: string;
  name: string;
}
export interface IModelInfo extends BasicIModelInfo {
  createdDate: Date;
}

/** Opens External iModel */
export class ExternalIModel {
  public viewId?: Id64String;
  public iModelConnection?: IModelConnection;
  public iModelId: string;
  public iTwinId: string;
  public iTwinName?: string;
  public iModelName?: string;

  private constructor(arg: {
    iTwinName?: string;
    iModelName?: string;
    iModelId?: string;
    iTwinId?: string;
  }) {
    this.iTwinId = arg.iTwinId!; // Should never be undefined, ensured by the create method
    this.iTwinName = arg.iTwinName;
    this.iModelId = arg.iModelId!; // Should never be undefined, ensured by the create method
    this.iModelName = arg.iModelName;
  }

  public static async create(args: {
    iTwinName?: string;
    iModelName?: string;
    iModelId?: string;
    iTwinId?: string;
  }): Promise<ExternalIModel> {
    const accessToken = await IModelApp.getAccessToken();

    // Set of vars to be passed to the constructor. By the time the constructor is called, all 4 members should be defined.
    const createArgs = {
      ...args,
    };

    if (!args.iTwinId && !args.iTwinName) {
      throw new Error(
        "An iTwin name or id is required to construct an External iModel"
      );
    } else if (args.iTwinId) {
      const iTwinClient = new ITwinsAccessClient();
      const iTwinsResponse: ITwinsAPIResponse<ITwin> =
        await iTwinClient.getAsync(accessToken, args.iTwinId);

      const actualiTwin = iTwinsResponse.data!;
      if (!actualiTwin)
        throw new Error(`ITwin ${args.iTwinId} was not found for the user.`);

      // note: iTwinName is set in createArgs
      createArgs.iTwinId = actualiTwin.id;
    }

    if (!args.iModelId && !args.iModelName) {
      throw new Error(
        "An iModel name or id is required to construct an External iModel"
      );
    } else if (!args.iModelId && args.iModelName) {
      const hubClient = new IModelsClient({
        api: {
          baseUrl: `https://${
            process.env.IMJS_URL_PREFIX ?? ""
          }api.bentley.com/imodels`,
        },
      });
      for await (const iModel of hubClient.iModels.getMinimalList({
        urlParams: {
          name: args.iModelName,
          iTwinId: createArgs.iTwinId!,
        },
        authorization: AccessTokenAdapter.toAuthorizationCallback(accessToken),
      })) {
        createArgs.iModelId = iModel.id;
        break;
      }
    }

    return new ExternalIModel(createArgs);
  }

  /** Open IModelConnection and get ViewId */
  public async openIModel(): Promise<void> {
    if (this.iTwinId && this.iModelId) {
      try {
        this.iModelConnection = await CheckpointConnection.openRemote(
          this.iTwinId,
          this.iModelId
        );
        this.viewId = await this.onIModelSelected(this.iModelConnection);

        Logger.logInfo(
          SampleAppIModelApp.loggerCategory(this),
          `openIModel (external): iTwinId=${this.iTwinId}&iModelId=${
            this.iModelId
          } mode=${"Readonly"}`
        );
      } catch (err: any) {
        Logger.logInfo(
          SampleAppIModelApp.loggerCategory(this),
          `openIModel (external): Error ${err.message}`
        );
      }
    }
  }

  /** Handle iModel open event */
  private async onIModelSelected(
    imodel: IModelConnection | undefined
  ): Promise<Id64String | undefined> {
    let viewDefinitionId: Id64String | undefined;

    try {
      // attempt to get a view definition
      viewDefinitionId = imodel
        ? await this.getFirstViewDefinitionId(imodel)
        : undefined;
    } catch (e) {
      if (imodel) await imodel.close();
    }

    return viewDefinitionId;
  }

  /** Pick the first available spatial view definition in the imodel */
  private async getFirstViewDefinitionId(
    imodel: IModelConnection
  ): Promise<Id64String> {
    const defaultViewId = await imodel.views.queryDefaultViewId();
    if (defaultViewId) return defaultViewId;

    const viewSpecs = await imodel.views.queryProps({});
    const acceptedViewClasses = [
      "BisCore:SpatialViewDefinition",
      "BisCore:OrthographicViewDefinition",
      "BisCore:DrawingViewDefinition",
    ];
    const acceptedViewSpecs = viewSpecs.filter(
      (spec) => -1 !== acceptedViewClasses.indexOf(spec.classFullName)
    );
    if (0 === acceptedViewSpecs.length) {
      throw new Error("No valid view definitions in imodel");
    }

    // Prefer spatial view over drawing.
    const spatialViews = acceptedViewSpecs.filter((v) => {
      return v.classFullName === "BisCore:SpatialViewDefinition";
    });

    if (spatialViews.length > 0) return spatialViews[0].id!;

    const orthoViews = acceptedViewSpecs.filter((v) => {
      return v.classFullName === "BisCore:OrthographicViewDefinition";
    });

    if (orthoViews.length > 0) return orthoViews[0].id!;

    return acceptedViewSpecs[0].id!;
  }
}
