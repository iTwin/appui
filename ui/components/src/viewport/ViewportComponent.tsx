/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Viewport */

import * as React from "react";
import { Id64Props } from "@bentley/bentleyjs-core";
import {
  IModelApp,
  IModelConnection,
  Viewport,
  ViewState,
} from "@bentley/imodeljs-frontend";

import { BeDuration } from "@bentley/bentleyjs-core";

import {
  ViewportManager,
  CubeRotationChangeEventArgs,
  StandardRotationChangeEventArgs,
} from "./ViewportManager";

import {
  RotMatrix,
  Transform,
} from "@bentley/geometry-core";

/**
 * Props for [[Viewport]] control.
 */
// tslint:disable-next-line:no-empty-interface
export interface ViewportProps {
  /** IModel to display */
  imodel: IModelConnection;

  /** ID of a default view definition to load as a starting point */
  viewDefinitionId: Id64Props;
}

/**
 * A viewport component that displays imodel on a canvas.
 */
export class ViewportComponent extends React.Component<ViewportProps> {

  private _canvas: React.RefObject<HTMLCanvasElement>;
  private _vp?: Viewport;

  public constructor(props: ViewportProps, context?: any) {
    super(props, context);
    this._canvas = React.createRef<HTMLCanvasElement>();
  }

  public async componentDidMount() {
    if (!this._canvas.current)
      throw new Error("Canvas failed to load");

    const viewState = await this.props.imodel.views.load(this.props.viewDefinitionId);
    if (!viewState)
      throw new Error("View state failed to load");

    this._vp = new Viewport(this._canvas.current, viewState);
    IModelApp.viewManager.addViewport(this._vp);

    ViewportManager.CubeRotationChangeEvent.addListener(this.handleCubeRotationChangeEvent);
    ViewportManager.StandardRotationChangeEvent.addListener(this.handleStandardRotationChangeEvent);
    if (this._vp) {
      this._vp.onViewChanged.addListener(this.handleViewChanged);
      ViewportManager.setActiveViewport(this._vp);
    }
  }

  public componentWillUnmount() {
    if (this._vp) {
      if (this._vp === ViewportManager.getActiveViewport())
        ViewportManager.setActiveViewport(undefined);

      IModelApp.viewManager.dropViewport(this._vp);
      this._vp.onViewChanged.removeListener(this.handleViewChanged);
    }

    ViewportManager.CubeRotationChangeEvent.removeListener(this.handleCubeRotationChangeEvent);
    ViewportManager.StandardRotationChangeEvent.removeListener(this.handleStandardRotationChangeEvent);
  }

  private onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    ViewportManager.setActiveViewport(this._vp);
  }

  private handleCubeRotationChangeEvent = (args: CubeRotationChangeEventArgs) => {
    if (this._vp && ViewportManager.getActiveViewport() === this._vp) {
      if (args.animationTime && args.animationTime < 0) {
        this._vp.synchWithView(true);
      }
      const rotMatrix = args.rotMatrix;
      if (this._vp.rotMatrix !== rotMatrix) {
        const center = this._vp.view.getTargetPoint(); // Don't try to locate geometry using depth buffer...
        const inverse = rotMatrix.clone().inverse(); // rotation is from current nav cube state...
        if (undefined === inverse)
          return;
        const targetMatrix = inverse.multiplyMatrixMatrix(this._vp.view.getRotation());
        const worldTransform = Transform.createFixedPointAndMatrix(center, targetMatrix);
        const frustum = this._vp.getWorldFrustum();
        frustum.multiply(worldTransform);
        if (args.animationTime && args.animationTime > 0) {
          this._vp.animateFrustumChange(this._vp.getWorldFrustum(), frustum, BeDuration.fromMilliseconds(args.animationTime));
        } else {
          this._vp.view.setupFromFrustum(frustum);
          this._vp.synchWithView(false);
        }
      }
    }
  }

  private handleStandardRotationChangeEvent = (args: StandardRotationChangeEventArgs) => {
    if (this._vp && ViewportManager.getActiveViewport() === this._vp) {
      // this._vp.view.setStandardRotation(args.standardRotation);
      this._vp.view.setRotationAboutPoint(ViewState.getStandardViewMatrix(args.standardRotation));
      this._vp.synchWithView(true);
    }
  }

  private handleViewChanged = (vp: Viewport) => {
    const rotMatrix = ViewportComponent.getViewportRotMatrix(vp);
    if (rotMatrix)
      ViewportManager.setViewRotMatrix(vp, rotMatrix);
  }

  public static getViewportRotMatrix(vp: Viewport): RotMatrix | undefined {
    console.log(vp, vp.rotMatrix);
    return vp.rotMatrix;
  }

  public render() {
    return (
      <canvas ref={this._canvas} style={{ height: "100%", width: "100%" }}
        onMouseDown={this.onMouseDown}
        onContextMenu={(e) => { e.preventDefault(); return false; }}
      />
    );
  }
}
