/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BeUiEvent } from "@itwin/core-bentley";
import { Matrix3d, Point3d } from "@itwin/core-geometry";
import type {
  SelectedViewportChangedArgs,
  Viewport,
} from "@itwin/core-frontend";
import { IModelApp, NoRenderApp, StandardViewId } from "@itwin/core-frontend";
import { ViewportComponentEvents } from "../../imodel-components-react/viewport/ViewportComponentEvents";
import { TestUtils } from "../TestUtils";

describe("ViewportComponentEvents", () => {
  const onSelectedViewportChanged =
    new BeUiEvent<SelectedViewportChangedArgs>();

  beforeEach(async () => {
    await NoRenderApp.startup();

    vi.spyOn(
      IModelApp.viewManager,
      "onSelectedViewportChanged",
      "get"
    ).mockReturnValue(onSelectedViewportChanged);
    ViewportComponentEvents.initialize();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    ViewportComponentEvents.terminate();
  });

  it("should initialize when IModelApp.viewManager is defined", () => {
    expect(onSelectedViewportChanged.numberOfListeners).to.equal(1);
  });

  it("should setCubeMatrix", async () => {
    const cubeListener = vi.fn();
    const remove =
      ViewportComponentEvents.onCubeRotationChangeEvent.addListener(
        cubeListener
      );
    const rotMatrix = Matrix3d.createIdentity();
    ViewportComponentEvents.setCubeMatrix(rotMatrix, undefined);
    await TestUtils.flushAsyncOperations();
    expect(cubeListener).toHaveBeenCalledOnce();
    remove();
  });

  it("should setStandardRotation", async () => {
    const standardRotationListener = vi.fn();
    const remove =
      ViewportComponentEvents.onStandardRotationChangeEvent.addListener(
        standardRotationListener
      );
    const standardRotation = StandardViewId.Front;
    ViewportComponentEvents.setStandardRotation(standardRotation);
    await TestUtils.flushAsyncOperations();
    expect(standardRotationListener).toHaveBeenCalledOnce();
    remove();
  });

  it("should setViewMatrix", async () => {
    const viewRotationListener = vi.fn();
    const remove =
      ViewportComponentEvents.onViewRotationChangeEvent.addListener(
        viewRotationListener
      );
    const viewport = { rotation: Matrix3d.createIdentity() } as Viewport;
    ViewportComponentEvents.setViewMatrix(viewport, undefined);
    await TestUtils.flushAsyncOperations();
    expect(viewRotationListener).toHaveBeenCalledOnce();
    remove();
  });

  it("should setViewMatrix when onSelectedViewportChanged event is emitted", async () => {
    vi.useFakeTimers();
    const viewRotationListener = vi.fn();
    const remove =
      ViewportComponentEvents.onViewRotationChangeEvent.addListener(
        viewRotationListener
      );
    const current = { rotation: Matrix3d.createIdentity() } as Viewport;
    onSelectedViewportChanged.emit({ current } as SelectedViewportChangedArgs);
    vi.advanceTimersByTime(1);
    expect(viewRotationListener).toHaveBeenCalledOnce();
    remove();
  });

  it("should not setViewMatrix when onSelectedViewportChanged event is emitted with unset current", async () => {
    vi.useFakeTimers();
    const viewRotationListener = vi.fn();
    const remove =
      ViewportComponentEvents.onViewRotationChangeEvent.addListener(
        viewRotationListener
      );
    onSelectedViewportChanged.emit({} as SelectedViewportChangedArgs);
    vi.advanceTimersByTime(1);
    expect(viewRotationListener).not.toBeCalled();
    remove();
  });

  it("should setDrawingViewportState", async () => {
    const drawingViewportStateListener = vi.fn();
    const remove =
      ViewportComponentEvents.onDrawingViewportChangeEvent.addListener(
        drawingViewportStateListener
      );
    const origin = Point3d.createZero();
    const rotation = Matrix3d.createIdentity();
    ViewportComponentEvents.setDrawingViewportState(origin, rotation);
    await TestUtils.flushAsyncOperations();
    expect(drawingViewportStateListener).toHaveBeenCalledOnce();
    remove();
  });
});
