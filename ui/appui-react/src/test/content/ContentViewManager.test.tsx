/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// cSpell:ignore typemoq

import { expect } from "chai";
import * as moq from "typemoq";
import type {
  DrawingViewState,
  OrthographicViewState,
  ScreenViewport,
  SheetViewState,
  SpatialViewState,
} from "@itwin/core-frontend";
import type { ViewportContentControl } from "../../appui-react";
import TestUtils from "../TestUtils";
import { InternalContentViewManager } from "../../appui-react/content/InternalContentViewManager";

describe("ContentViewManager", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  const viewportMock = moq.Mock.ofType<ScreenViewport>();
  const contentControlMock = moq.Mock.ofType<ViewportContentControl>();
  contentControlMock
    .setup((control) => control.viewport)
    .returns(() => viewportMock.object);

  it("Content is 2d Sheet View", () => {
    const sheetViewStateMock = moq.Mock.ofType<SheetViewState>();
    sheetViewStateMock
      .setup((view) => view.is3d())
      .mockReturnValue(() => false);
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
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).to.be.false;
    expect(
      InternalContentViewManager.isContent3dView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.contentSupportsCamera(
        contentControlMock.object
      )
    ).to.be.false;
  });

  it("Content is 2d Drawing View", () => {
    const drawingViewStateMock = moq.Mock.ofType<DrawingViewState>();
    drawingViewStateMock
      .setup((view) => view.is3d())
      .mockReturnValue(() => false);
    drawingViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:DrawingViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => drawingViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).to.be.false;
    expect(
      InternalContentViewManager.isContent3dView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.contentSupportsCamera(
        contentControlMock.object
      )
    ).to.be.false;
  });

  it("Content is 3d Spatial View", () => {
    const spatialViewStateMock = moq.Mock.ofType<SpatialViewState>();
    spatialViewStateMock
      .setup((view) => view.is3d())
      .mockReturnValue(() => true);
    spatialViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:SpatialViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => spatialViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentSpatialView(contentControlMock.object)
    ).toEqual(true);
    expect(
      InternalContentViewManager.isContentOrthographicView(
        contentControlMock.object
      )
    ).to.be.false;
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
    orthographicViewStateMock
      .setup((view) => view.is3d())
      .mockReturnValue(() => true);
    orthographicViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "BisCore:OrthographicViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => orthographicViewStateMock.object);

    expect(
      InternalContentViewManager.isContentSheetView(contentControlMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentDrawingView(contentControlMock.object)
    ).to.be.false;
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
    ).to.be.false;
  });

  it("Viewport is not set in Content", () => {
    const localContentMock = moq.Mock.ofType<ViewportContentControl>();
    localContentMock
      .setup((control) => control.viewport)
      .returns(() => undefined);

    expect(
      InternalContentViewManager.isContentSheetView(localContentMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentDrawingView(localContentMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentSpatialView(localContentMock.object)
    ).to.be.false;
    expect(
      InternalContentViewManager.isContentOrthographicView(
        localContentMock.object
      )
    ).to.be.false;
    expect(InternalContentViewManager.isContent3dView(localContentMock.object))
      .to.be.false;
    expect(
      InternalContentViewManager.contentSupportsCamera(localContentMock.object)
    ).to.be.false;
  });
});
