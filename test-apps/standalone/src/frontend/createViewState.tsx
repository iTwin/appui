/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Id64String } from "@itwin/core-bentley";
import { IModelReadRpcInterface, ViewQueryParams } from "@itwin/core-common";
import {
  IModelConnection,
  SpatialViewState,
  ViewCreator3d,
} from "@itwin/core-frontend";

async function getDefaultViewId(
  iModelConnection: IModelConnection
): Promise<Id64String | undefined> {
  const requestedViewId = import.meta.env.IMJS_UITESTAPP_IMODEL_VIEWID;
  // try specified viewId first
  if (requestedViewId) {
    const queryParams: ViewQueryParams = {};
    queryParams.from = SpatialViewState.classFullName;
    queryParams.where = `ECInstanceId=${requestedViewId}`;
    const vwProps = await IModelReadRpcInterface.getClient().queryElementProps(
      iModelConnection.getRpcProps(),
      queryParams
    );
    if (vwProps.length !== 0) {
      return requestedViewId;
    }
  }

  // eslint-disable-next-line deprecation/deprecation
  const viewId = await iModelConnection.views.queryDefaultViewId();
  const params: ViewQueryParams = {};
  params.from = SpatialViewState.classFullName;
  params.where = `ECInstanceId=${viewId}`;

  // Check validity of default view
  const viewProps = await IModelReadRpcInterface.getClient().queryElementProps(
    iModelConnection.getRpcProps(),
    params
  );
  if (viewProps.length === 0) {
    // Return the first view we can find
    const viewList = await iModelConnection.views.getViewList({
      wantPrivate: false,
    });
    if (viewList.length === 0) return undefined;

    const spatialViewList = viewList.filter(
      (value: IModelConnection.ViewSpec) =>
        value.class.indexOf("Spatial") !== -1
    );
    if (spatialViewList.length === 0) return undefined;

    return spatialViewList[0].id;
  }

  return viewId;
}

export async function createViewState(iModelConnection: IModelConnection) {
  const viewId = await getDefaultViewId(iModelConnection);
  if (viewId) {
    return iModelConnection.views.load(viewId);
  }

  const viewCreator = new ViewCreator3d(iModelConnection);
  return viewCreator.createDefaultView();
}
