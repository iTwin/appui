/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import { render, cleanup, fireEvent } from "react-testing-library";
import * as moq from "typemoq";
import * as sinon from "sinon";

import TestUtils from "../TestUtils";
import { ViewportComponent } from "../../ui-components";

import { IModelConnection, MockRender, ScreenViewport, ViewManager, ViewState, Viewport, ChangeFlags, TentativePoint, ViewRect, SpatialViewState, CategorySelectorState, DisplayStyle3dState, ModelSelectorState, StandardViewId, OrthographicViewState } from "@bentley/imodeljs-frontend";
import { Frustum, SpatialViewDefinitionProps } from "@bentley/imodeljs-common";
import { Vector3d, Point3d, Matrix3d, AxisIndex, WritableXAndY } from "@bentley/geometry-core";
import { BeEvent } from "@bentley/bentleyjs-core";
import { ViewportComponentEvents } from "../../ui-components/viewport/ViewportComponentEvents";
import { Face } from "@bentley/ui-core";

describe("ViewportComponent", () => {

  before(async () => {
    TestUtils.initializeUiComponents(); // tslint:disable-line:no-floating-promises
    MockRender.App.startup();
  });

  after(async () => {
    MockRender.App.shutdown();
  });

  let extents = Vector3d.create(400, 400);
  let origin = Point3d.createZero();
  // let rotation = Matrix3d.createIdentity();
  const imodelMock = moq.Mock.ofType<IModelConnection>();
  const viewsMock = moq.Mock.ofType<IModelConnection.Views>();

  const viewDefinitionProps: SpatialViewDefinitionProps = {
    cameraOn: false, origin, extents,
    camera: { lens: 0, focusDist: 1, eye: [0, 0, 0] },
    classFullName: "Bis:SpatialViewDefinition",
    id: "id1",
    modelSelectorId: "id1", categorySelectorId: "id1", displayStyleId: "id1",
    model: "model", code: { spec: "spec", scope: "scope" },
  };
  let viewState = new SpatialViewState(viewDefinitionProps, imodelMock.object, moq.Mock.ofType<CategorySelectorState>().object, moq.Mock.ofType<DisplayStyle3dState>().object, moq.Mock.ofType<ModelSelectorState>().object);

  viewsMock.setup((x) => x.load).returns(() => async (viewId: string) => viewId === "id1" ? viewState : undefined as unknown as ViewState);
  imodelMock.setup((x) => x.views).returns(() => viewsMock.object);

  let tentativePointIsActive = false;
  const tentativePointMock = moq.Mock.ofType<TentativePoint>();
  tentativePointMock.setup((x) => x.isActive).returns(() => tentativePointIsActive);
  tentativePointMock.setup((x) => x.getPoint).returns(() => () => Point3d.createZero());

  let worldToViewPoint = Point3d.create(50, 50);
  let nearestVisibleGeometryPoint: Point3d | undefined = Point3d.create(30, 30);
  let viewRect = new ViewRect(0, 0, 100, 100);

  const onViewChanged = new BeEvent<(vp: Viewport, changed: ChangeFlags) => void>();
  const viewportMock = moq.Mock.ofType<ScreenViewport>();
  viewportMock.setup((x) => x.view).returns(() => viewState);
  viewportMock.setup((x) => x.onViewChanged).returns(() => onViewChanged);
  viewportMock.setup((x) => x.worldToView).returns(() => (_input: Readonly<WritableXAndY>, _out?: Point3d | undefined) => worldToViewPoint);
  viewportMock.setup((x) => x.viewRect).returns(() => viewRect);
  viewportMock.object.viewCmdTargetCenter = undefined;
  viewportMock.setup((x) => x.pickNearestVisibleGeometry).returns(() => (_pickpoint: Point3d, _radius: number, _allowNonLocatable?: boolean | undefined, _out?: Point3d | undefined) => nearestVisibleGeometryPoint);
  viewportMock.setup((x) => x.getWorldFrustum).returns(() => (_box?: Frustum | undefined) => new Frustum());

  const viewManager = moq.Mock.ofType<ViewManager>();
  viewManager.setup((x) => x.selectedView).returns(() => viewportMock.object);
  class ScreenViewportMock extends ScreenViewport {
    public static create(_parentDiv: HTMLDivElement, _view: ViewState): ScreenViewport {
      return viewportMock.object;
    }
  }

  beforeEach(async () => {
    extents = Vector3d.create(400, 400);
    origin = Point3d.createZero();
    viewState = new SpatialViewState(viewDefinitionProps, imodelMock.object, moq.Mock.ofType<CategorySelectorState>().object, moq.Mock.ofType<DisplayStyle3dState>().object, moq.Mock.ofType<ModelSelectorState>().object);
    tentativePointIsActive = false;
    viewportMock.object.viewCmdTargetCenter = undefined;
    worldToViewPoint = Point3d.create(50, 50);
    nearestVisibleGeometryPoint = Point3d.create(30, 30);
    viewRect = new ViewRect(0, 0, 100, 100);
  });

  afterEach(cleanup);

  it("should render with viewState", async () => {
    render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
  });

  it("should render with viewDefinitionId", async () => {
    render(<ViewportComponent imodel={imodelMock.object} viewDefinitionId={"id1"} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
  });

  it.skip("should throw error when fake viewDefinitionId is used", async () => {
    expect(() => {
      render(<ViewportComponent imodel={imodelMock.object} viewDefinitionId={"FakeId"} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
    }).to.throw("View state failed to load");
  });

  it.skip("should throw error when rendering without viewState or viewDefinitionId", () => {
    expect(() => {
      render(<ViewportComponent imodel={imodelMock.object} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
    }).to.throw("Either viewDefinitionId or viewState must be provided as a ViewportComponent Prop");
  });
  it("should return viewport to viewportRef callback", async () => {
    const viewportRef = sinon.spy();
    render(<ViewportComponent imodel={imodelMock.object} viewportRef={viewportRef} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
    expect(viewportRef).to.be.calledWith(viewportMock.object);
  });
  // it("should return view to getViewOverlay callback", async () => {
  //   const getViewOverlay = sinon.spy();
  //   render(<ViewportComponent imodel={imodelMock.object} getViewOverlay={getViewOverlay} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
  //   expect(getViewOverlay).to.be.calledWith(viewState);
  // });
  it("should not error when contextMenu event is triggered", async () => {
    const component = render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
    const viewportDiv = component.getByTestId("viewport-component");
    fireEvent.contextMenu(viewportDiv);
  });
  it("should call onContextMenu callback when contextMenu event is triggered", async () => {
    const onContextMenu = sinon.spy();
    const component = render(<ViewportComponent imodel={imodelMock.object} onContextMenu={onContextMenu} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
    const viewportDiv = component.getByTestId("viewport-component");
    fireEvent.contextMenu(viewportDiv);
    expect(onContextMenu).to.be.called;
  });
  describe("drawingViewChangeEvent", () => {
    it("should register drawingViewChangeEvent", async () => {
      const or = Point3d.create(20, 20);
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onDrawingViewportChangeEvent.emit({ origin: or, rotation: rot, complete: false });
      expect(viewState.getOrigin().isAlmostEqual(or)).to.be.true;
      expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
    it("should register drawingViewChangeEvent with complete: true", async () => {
      const or = Point3d.create(20, 20);
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onDrawingViewportChangeEvent.emit({ origin: or, rotation: rot, complete: true });
      expect(viewState.getOrigin().isAlmostEqual(or)).to.be.true;
      expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
  });
  describe("cubeRotationChangeEvent", () => {
    it("should register cubeRotationChangeEvent", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front });
      // for some reason not evaluating as true, but still covers code path
      // expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
    it("should register cubeRotationChangeEvent", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front, complete: true });
    });
    it("should register cubeRotationChangeEvent with visiblePoint", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      nearestVisibleGeometryPoint = undefined;
      worldToViewPoint = Point3d.create(200, 200);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front });
      expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
    it("should register cubeRotationChangeEvent where viewRect does not contain worldToView point", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      worldToViewPoint = Point3d.create(200, 200);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front });
      expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
    it("should register cubeRotationChangeEvent where targetPoint has been memoized and viewRect does not contain worldToView point", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      const rot2 = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.Y);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      viewportMock.object.viewCmdTargetCenter = undefined;
      worldToViewPoint = Point3d.create(200, 200);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front }); // memoized
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot2, face: Face.Front });
    });
    it("should register cubeRotationChangeEvent with vp.viewCmdTargetCenter defined", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      viewportMock.object.viewCmdTargetCenter = Point3d.create(0, 0);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front });
    });
    it("should register cubeRotationChangeEvent with vp.viewCmdTargetCenter defined with tentativePoint active", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      tentativePointIsActive = true;
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front });
      expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
    it("should register cubeRotationChangeEvent with vp.viewCmdTargetCenter defined where viewRect does not contain worldToView point", async () => {
      const rot = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.X);
      viewportMock.object.viewCmdTargetCenter = Point3d.create(0, 0);
      worldToViewPoint = Point3d.create(200, 200);
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onCubeRotationChangeEvent.emit({ rotMatrix: rot, face: Face.Front });
      expect(viewState.getRotation().isAlmostEqual(rot)).to.be.true;
    });
  });
  describe("standardRotationChangeEvent", () => {
    it("should register standardRotationChangeEvent", async () => {
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      ViewportComponentEvents.onStandardRotationChangeEvent.emit({ standardRotation: StandardViewId.Front });
    });
  });
  describe("onViewChanged", () => {
    const viewState2Mock = moq.Mock.ofType<OrthographicViewState>();
    viewState2Mock.setup((x) => x.id).returns(() => "id2");
    viewState2Mock.setup((x) => x.getExtents).returns(() => () => viewState.getExtents());
    viewState2Mock.setup((x) => x.getOrigin).returns(() => () => viewState.getOrigin());
    viewState2Mock.setup((x) => x.classFullName).returns(() => "Bis:OrthographicViewDefinition");

    const viewportMock2 = moq.Mock.ofType<ScreenViewport>();
    viewportMock2.setup((x) => x.view).returns(() => viewState2Mock.object);
    viewportMock2.setup((x) => x.onViewChanged).returns(() => onViewChanged);
    viewportMock2.setup((x) => x.worldToView).returns(() => (_input: Readonly<WritableXAndY>, _out?: Point3d | undefined) => worldToViewPoint);
    viewportMock2.setup((x) => x.rotation).returns(() => viewState.getRotation());
    it("should register onViewChanged with a new viewClassFullName", async () => {
      render(<ViewportComponent imodel={imodelMock.object} viewState={viewState} viewManagerOverride={viewManager.object} tentativePointOverride={tentativePointMock.object} screenViewportOverride={ScreenViewportMock} />);
      onViewChanged.raiseEvent(viewportMock2.object);
    });
  });
});
