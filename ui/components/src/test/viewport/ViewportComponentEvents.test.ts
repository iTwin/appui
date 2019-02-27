/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import { ViewportComponentEvents } from "../../ui-components";
import { Matrix3d } from "@bentley/geometry-core";
import { IModelApp, Viewport, StandardViewId, ViewManager, SelectedViewportChangedArgs } from "@bentley/imodeljs-frontend";
import { BeUiEvent } from "@bentley/bentleyjs-core";
import TestUtils from "../TestUtils";

describe("ViewportComponentEvents", () => {
  const onSelectedViewportChanged = new BeUiEvent();
  it("should quietly fail initialization when IModelApp.viewManager is not defined", () => {
    ViewportComponentEvents.initialize();
  });
  it("should initialize when IModelApp.viewManager is defined", () => {
    IModelApp.viewManager = { onSelectedViewportChanged } as ViewManager;
    ViewportComponentEvents.initialize();
    expect(onSelectedViewportChanged.numberOfListeners).to.equal(1);
  });
  it("should return early in initialization when already initialized", () => {
    ViewportComponentEvents.initialize();
  });
  it("should setCubeMatrix", async () => {
    const cubeListener = sinon.spy();
    ViewportComponentEvents.onCubeRotationChangeEvent.addListener(cubeListener);
    const rotMatrix = Matrix3d.createIdentity();
    ViewportComponentEvents.setCubeMatrix(rotMatrix, undefined);
    await TestUtils.flushAsyncOperations();
    expect(cubeListener.calledOnce).to.be.true;
  });
  it("should setStandardRotation", async () => {
    const standardRotationListener = sinon.spy();
    ViewportComponentEvents.onStandardRotationChangeEvent.addListener(standardRotationListener);
    const standardRotation = StandardViewId.Front;
    ViewportComponentEvents.setStandardRotation(standardRotation);
    await TestUtils.flushAsyncOperations();
    expect(standardRotationListener.calledOnce).to.be.true;
  });
  it("should setViewMatrix", async () => {
    const viewRotationListener = sinon.spy();
    ViewportComponentEvents.onViewRotationChangeEvent.addListener(viewRotationListener);
    const viewport = { rotation: Matrix3d.createIdentity() } as Viewport;
    ViewportComponentEvents.setViewMatrix(viewport, undefined);
    await TestUtils.flushAsyncOperations();
    expect(viewRotationListener.calledOnce).to.be.true;
  });
  it("should setViewMatrix when onSelectedViewportChanged event is emitted", async () => {
    const viewRotationListener = sinon.spy();
    ViewportComponentEvents.onViewRotationChangeEvent.addListener(viewRotationListener);
    const current = { rotation: Matrix3d.createIdentity() } as Viewport;
    onSelectedViewportChanged.emit({ current } as SelectedViewportChangedArgs);
    await TestUtils.flushAsyncOperations();
    expect(viewRotationListener.calledOnce).to.be.true;
  });
  it("should not setViewMatrix when onSelectedViewportChanged event is emitted with unset current", async () => {
    const viewRotationListener = sinon.spy();
    ViewportComponentEvents.onViewRotationChangeEvent.addListener(viewRotationListener);
    onSelectedViewportChanged.emit({} as SelectedViewportChangedArgs);
    await TestUtils.flushAsyncOperations();
    expect(viewRotationListener.calledOnce).to.be.false;
  });
});
