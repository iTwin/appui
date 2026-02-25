/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Cartographic, ColorDef } from "@itwin/core-common";
import {
  BlankConnection,
  IModelApp,
  IModelConnection,
  SpatialViewState,
  ViewState,
} from "@itwin/core-frontend";
import { Range3d } from "@itwin/core-geometry";

export function createBlankConnection() {
  return BlankConnection.create({
    name: "Exton PA",
    location: Cartographic.fromDegrees({
      longitude: -75.686694,
      latitude: 40.065757,
      height: 0,
    }),
    extents: new Range3d(-1000, -1000, -100, 1000, 1000, 100),
  });
}

export function createBlankViewState(iModel: IModelConnection) {
  const ext = iModel.projectExtents;
  const viewState = SpatialViewState.createBlank(
    iModel,
    ext.low,
    ext.high.minus(ext.low)
  );

  viewState.setAllow3dManipulations(true);

  viewState.displayStyle.backgroundColor = ColorDef.white;
  updateViewFlags(viewState);

  IModelApp.viewManager.onViewOpen.addOnce((vp) => {
    if (vp.view.hasSameCoordinates(viewState)) {
      vp.applyViewState(viewState);
    }
  });

  return viewState;
}

export function updateViewFlags(viewState: ViewState): ViewState {
  viewState.viewFlags = viewState.viewFlags.copy({
    acsTriad: true,
    grid: true,
  });
  return viewState;
}
