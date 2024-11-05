/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as moq from "typemoq";
import type {
  DrawingViewState,
  OrthographicViewState,
  ScreenViewport,
  SheetViewState,
  SpatialViewState,
} from "@itwin/core-frontend";
import type { ViewportContentControl } from "../../appui-react.js";
import { InternalContentViewManager } from "../../appui-react/content/InternalContentViewManager.js";

describe("ContentViewManager", () => {
  const viewportMock = moq.Mock.ofType<ScreenViewport>();
  const contentControlMock = moq.Mock.ofType<ViewportContentControl>();
  contentControlMock
    .setup((control) => control.viewport)
    .returns(() => viewportMock.object);

  it("Content is 2d Sheet View", () => {
    const sheetViewStateMock = moq.Mock.ofType<SheetViewState>();
    sheetViewStateMock.setup((view) => view.is3d()).returns(() => false);
    sheetViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:SheetViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => sheetViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContent3dView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.contentSupportsCamera(
        contentControlMock.object
      )
    ).toEqual(false);
  });

  it("Content is 2d Drawing View", () => {
    const drawingViewStateMock = moq.Mock.ofType<DrawingViewState>();
    drawingViewStateMock.setup((view) => view.is3d()).returns(() => false);
    drawingViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:DrawingViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => drawingViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContent3dView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.contentSupportsCamera(
        contentControlMock.object
      )
    ).toEqual(false);
  });

  it("Content is 3d Spatial View", () => {
    const spatialViewStateMock = moq.Mock.ofType<SpatialViewState>();
    spatialViewStateMock.setup((view) => view.is3d()).returns(() => true);
    spatialViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:SpatialViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => spatialViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContent3dView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.contentSupportsCamera(
        contentControlMock.object
      )
    ).toEqual(true);
  });

  it("Content is 3d Ortho View View", () => {
    const orthographicViewStateMock = moq.Mock.ofType<OrthographicViewState>();
    orthographicViewStateMock.setup((view) => view.is3d()).returns(() => true);
    orthographicViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:OrthographicViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => orthographicViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContent3dView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.contentSupportsCamera(
        contentControlMock.object
      )
    ).toEqual(false);
  });

  it("Viewport is not set in Content", () => {
    const localContentMock = moq.Mock.ofType<ViewportContentControl>();
    localContentMock
      .setup((control) => control.viewport)
      .returns(() => undefined);

    expect(
      InternalContentViewManager.isContentSheetView(localContentMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentDrawingView(localContentMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentSpatialView(localContentMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContentOrthographicView(
        localContentMock.object
      )
    ).toEqual(false);
    expect(
      InternalContentViewManager.isContent3dView(localContentMock.object)
    ).toEqual(false);
    expect(
      InternalContentViewManager.contentSupportsCamera(localContentMock.object)
    ).toEqual(false);
  });
});
