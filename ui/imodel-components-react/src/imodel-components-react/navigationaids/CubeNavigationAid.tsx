/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import "./CubeNavigationAid.scss";
import classnames from "classnames";
import * as React from "react";
import type { XYAndZ } from "@itwin/core-geometry";
import {
  Angle,
  AxisIndex,
  AxisOrder,
  Geometry,
  Matrix3d,
  Point2d,
  Vector2d,
  Vector3d,
} from "@itwin/core-geometry";
import type { IModelConnection, Viewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import type { ListenerType } from "@itwin/core-react/internal";
import { Icon } from "@itwin/core-react";
import { UiIModelComponents } from "../UiIModelComponents.js";
import { ViewportComponentEvents } from "../viewport/ViewportComponentEvents.js";
import { Cube, Face } from "./Cube.js";
import {
  SvgCaretDown,
  SvgCaretLeft,
  SvgCaretRight,
  SvgCaretUp,
} from "@itwin/itwinui-icons-react";

/** @public */
export enum CubeNavigationHitBoxX {
  None = 0,
  Right = 1,
  Left = -1,
}

/** @public */
export enum CubeNavigationHitBoxY {
  None = 0,
  Back = 1,
  Front = -1,
}

/** @public */
export enum CubeNavigationHitBoxZ {
  None = 0,
  Top = 1,
  Bottom = -1,
}

interface CubeNavigationRotationMap {
  up: Face;
  down: Face;
  left: Face;
  right: Face;
}

const cubeNavigationFaceLocs: { [key: string]: Vector3d } = {
  [Face.Left]: Vector3d.create(
    CubeNavigationHitBoxX.Left,
    CubeNavigationHitBoxY.None,
    CubeNavigationHitBoxZ.None
  ),
  [Face.Right]: Vector3d.create(
    CubeNavigationHitBoxX.Right,
    CubeNavigationHitBoxY.None,
    CubeNavigationHitBoxZ.None
  ),
  [Face.Back]: Vector3d.create(
    CubeNavigationHitBoxX.None,
    CubeNavigationHitBoxY.Back,
    CubeNavigationHitBoxZ.None
  ),
  [Face.Front]: Vector3d.create(
    CubeNavigationHitBoxX.None,
    CubeNavigationHitBoxY.Front,
    CubeNavigationHitBoxZ.None
  ),
  [Face.Bottom]: Vector3d.create(
    CubeNavigationHitBoxX.None,
    CubeNavigationHitBoxY.None,
    CubeNavigationHitBoxZ.Bottom
  ),
  [Face.Top]: Vector3d.create(
    CubeNavigationHitBoxX.None,
    CubeNavigationHitBoxY.None,
    CubeNavigationHitBoxZ.Top
  ),
};

const cubeNavigationFaceRotations: { [key: string]: Matrix3d } = {
  [Face.Left]: Matrix3d.createRowValues(0, -1, 0, 0, 0, 1, -1, 0, 0),
  [Face.Right]: Matrix3d.createRowValues(0, 1, 0, 0, 0, 1, 1, 0, 0),
  [Face.Back]: Matrix3d.createRowValues(-1, 0, 0, 0, 0, 1, 0, 1, 0),
  [Face.Front]: Matrix3d.createRowValues(1, 0, 0, 0, 0, 1, 0, -1, 0),
  [Face.Bottom]: Matrix3d.createRowValues(1, 0, 0, 0, -1, 0, 0, 0, -1),
  [Face.Top]: Matrix3d.createRowValues(1, 0, 0, 0, 1, 0, 0, 0, 1),
};

// data relating Up/Down/Left/Right directions relative to every surface
const cubeNavigationRoutes: { [key: string]: CubeNavigationRotationMap } = {
  [Face.Front]: {
    up: Face.Top,
    down: Face.Bottom,
    left: Face.Left,
    right: Face.Right,
  },
  [Face.Back]: {
    up: Face.Top,
    down: Face.Bottom,
    left: Face.Right,
    right: Face.Left,
  },
  [Face.Top]: {
    up: Face.Back,
    down: Face.Front,
    left: Face.Left,
    right: Face.Right,
  },
  [Face.Bottom]: {
    up: Face.Front,
    down: Face.Back,
    left: Face.Left,
    right: Face.Right,
  },
  [Face.Right]: {
    up: Face.Top,
    down: Face.Bottom,
    left: Face.Front,
    right: Face.Back,
  },
  [Face.Left]: {
    up: Face.Top,
    down: Face.Bottom,
    left: Face.Back,
    right: Face.Front,
  },
};

/** The default tolerance (1.0e-6) is appropriate if very dirty viewing operations are expected. */
const DEFAULT_TOLERANCE = 1.0e-6;

/** @internal */
export enum CubeHover {
  None = 0,
  Hover,
  Active,
}

/** Properties for the [[CubeNavigationAid]] component
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface CubeNavigationAidProps extends CommonProps {
  iModelConnection: IModelConnection;
  viewport?: Viewport;

  // used only in testing

  /** @internal */
  onAnimationEnd?: () => void;
  /** @internal */
  animationTime?: number;
  favorHeadsUpRotation?: boolean;
}

/** @public */
interface CubeNavigationAidState {
  dragging: boolean;
  startRotMatrix: Matrix3d;
  endRotMatrix: Matrix3d;
  animation: number;
  hoverMap: { [key: string]: CubeHover };
  face: Face;
}

/** Cube Navigation Aid Component
 * @public
 */
export class CubeNavigationAid extends React.Component<
  CubeNavigationAidProps,
  CubeNavigationAidState
> {
  private _start: Vector2d = Vector2d.createZero();
  public override readonly state: Readonly<CubeNavigationAidState> = {
    dragging: false,
    startRotMatrix: Matrix3d.createIdentity(),
    endRotMatrix: Matrix3d.createIdentity(),
    animation: 1,
    hoverMap: {},
    face: Face.Top,
  };

  private _lastTime: number | undefined;
  private _animationFrame: any;
  private _mounted: boolean = false;
  private _labels: { [key: string]: string } = {
    [Face.Right]: UiIModelComponents.translate("cube.right"),
    [Face.Left]: UiIModelComponents.translate("cube.left"),
    [Face.Back]: UiIModelComponents.translate("cube.back"),
    [Face.Front]: UiIModelComponents.translate("cube.front"),
    [Face.Top]: UiIModelComponents.translate("cube.top"),
    [Face.Bottom]: UiIModelComponents.translate("cube.bottom"),
  };

  public override componentDidMount() {
    this._mounted = true;
    ViewportComponentEvents.onViewRotationChangeEvent.addListener(
      this._handleViewRotationChangeEvent
    );

    // set initial rotation
    if (this.props.viewport) {
      const newMatrix = this.props.viewport.view.getRotation().clone();
      this.setState({
        startRotMatrix: newMatrix,
        endRotMatrix: newMatrix,
        animation: 1,
      });
    }
  }

  public override componentWillUnmount() {
    ViewportComponentEvents.onViewRotationChangeEvent.removeListener(
      this._handleViewRotationChangeEvent
    );
    clearTimeout(this._animationFrame);
    this._mounted = false;
  }

  // Synchronize with rotation coming from the Viewport
  private _handleViewRotationChangeEvent: ListenerType<
    typeof ViewportComponentEvents.onViewRotationChangeEvent
  > = (args) => {
    const { animation, dragging, endRotMatrix } = this.state;
    if (this.props.viewport === args.viewport && animation >= 1 && !dragging) {
      const newMatrix = this.props.viewport.view.getRotation().clone();
      if (!endRotMatrix.isAlmostEqual(newMatrix)) {
        this.setState({
          startRotMatrix: newMatrix,
          endRotMatrix: newMatrix,
          animation: 1,
          face: Face.None,
        });
      }
    }
  };

  private _animation = () => {
    const t = Date.now();
    const delta = this._lastTime ? t - this._lastTime : 16;
    this._lastTime = t;
    if (this.state.animation !== 1) {
      const animation = Math.min(
        1,
        this.state.animation +
          delta / (1000 * (this.props.animationTime || 0.4))
      );

      if (this._mounted) {
        this.setState({ animation }, () => {
          this._animationFrame = setTimeout(this._animation, 16.667);
        });
      }
    } else {
      this._lastTime = undefined;
      this._animationEnd();
    }
  };

  private _animationEnd = () => {
    ViewportComponentEvents.setCubeMatrix(
      this.state.endRotMatrix,
      this.state.face,
      true
    );
    const startRotMatrix = this.state.endRotMatrix.clone();
    if (this._mounted) {
      this.setState({ startRotMatrix }, () => {
        if (this.props.onAnimationEnd) this.props.onAnimationEnd();
      });
    }
  };

  private static _animationFn = (t: number) =>
    t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t;

  private static _isMatrixFace = (matrix: Matrix3d): boolean => {
    let sum = 0;
    for (const coff of matrix.coffs) {
      if (Geometry.isAlmostEqualNumber(Math.abs(coff), 1)) sum++;
    }
    // Assuming matrix is a proper rotation matrix:
    // if matrix viewing a face, there will be a total of 3 values either almost -1, or almost 1.
    return sum === 3;
  };

  public override render(): React.ReactNode {
    const { animation, startRotMatrix, endRotMatrix } = this.state;
    const visible =
      CubeNavigationAid._isMatrixFace(endRotMatrix) && animation === 1.0;
    const rotMatrix = CubeNavigationAid._interpolateRotMatrix(
      startRotMatrix,
      animation,
      endRotMatrix
    );
    if (rotMatrix !== startRotMatrix && rotMatrix !== endRotMatrix)
      ViewportComponentEvents.setCubeMatrix(rotMatrix, Face.None);

    const faces: { [key: string]: React.ReactNode } = {};
    for (const key in this._labels) {
      if (this._labels.hasOwnProperty(key)) {
        const f = key as Face;
        const label = this._labels[f];
        faces[f] = (
          <NavCubeFace
            face={f}
            label={label}
            hoverMap={this.state.hoverMap}
            onFaceCellClick={this._handleFaceCellClick}
            onFaceCellHoverChange={this._handleCellHoverChange}
          />
        );
      }
    }

    const cubeClassNames = classnames(
      "nav-cube",
      this.state.dragging && "cube-dragging"
    );

    const upTitle = this.getArrowTitle(Pointer.Up);
    const downTitle = this.getArrowTitle(Pointer.Down);
    const leftTitle = this.getArrowTitle(Pointer.Left);
    const rightTitle = this.getArrowTitle(Pointer.Right);

    return (
      <div
        className={classnames(
          "components-cube-container",
          this.props.className
        )}
        style={this.props.style}
        data-testid="components-cube-navigation-aid"
        onMouseDown={this._handleBoxMouseDown}
        onTouchStart={this._handleBoxTouchStart}
        role="presentation"
      >
        <div className={"cube-element-container"}>
          <Cube
            className={cubeClassNames}
            rotMatrix={rotMatrix}
            faces={faces}
          />
        </div>
        <PointerButton
          data-testid="cube-pointer-button-up"
          visible={visible}
          pointerType={Pointer.Up}
          onArrowClick={this._onArrowClick}
          title={upTitle}
        />
        <PointerButton
          data-testid="cube-pointer-button-down"
          visible={visible}
          pointerType={Pointer.Down}
          onArrowClick={this._onArrowClick}
          title={downTitle}
        />
        <PointerButton
          data-testid="cube-pointer-button-left"
          visible={visible}
          pointerType={Pointer.Left}
          onArrowClick={this._onArrowClick}
          title={leftTitle}
        />
        <PointerButton
          data-testid="cube-pointer-button-right"
          visible={visible}
          pointerType={Pointer.Right}
          onArrowClick={this._onArrowClick}
          title={rightTitle}
        />
      </div>
    );
  }

  private _handleCellHoverChange = (vect: Vector3d, state: CubeHover) => {
    if (this._isInteractionLocked()) {
      this.props.onAnimationEnd?.();
      return;
    }
    const hoverMap = this.state.hoverMap;
    hoverMap[`${vect.x}-${vect.y}-${vect.z}`] = state;
    this.setState({ hoverMap });
  };

  private _isInteractionLocked = () => {
    // Locked by markup
    if (
      undefined !== this.props.viewport &&
      this.props.viewport === IModelApp.toolAdmin.markupView
    ) {
      return true;
    }
    return false;
  };

  private static _getMatrixFace = (rotMatrix: Matrix3d): Face => {
    if (!CubeNavigationAid._isMatrixFace(rotMatrix)) {
      return Face.None;
    }

    if (
      rotMatrix.coffs[6] === cubeNavigationFaceRotations[Face.Top].coffs[6] &&
      rotMatrix.coffs[7] === cubeNavigationFaceRotations[Face.Top].coffs[7] &&
      rotMatrix.coffs[8] === cubeNavigationFaceRotations[Face.Top].coffs[8]
    )
      return Face.Top;

    if (
      rotMatrix.coffs[6] ===
        cubeNavigationFaceRotations[Face.Bottom].coffs[6] &&
      rotMatrix.coffs[7] ===
        cubeNavigationFaceRotations[Face.Bottom].coffs[7] &&
      rotMatrix.coffs[8] === cubeNavigationFaceRotations[Face.Bottom].coffs[8]
    )
      return Face.Bottom;

    if (
      rotMatrix.coffs[6] === cubeNavigationFaceRotations[Face.Left].coffs[6] &&
      rotMatrix.coffs[7] === cubeNavigationFaceRotations[Face.Left].coffs[7] &&
      rotMatrix.coffs[8] === cubeNavigationFaceRotations[Face.Left].coffs[8]
    )
      return Face.Left;

    if (
      rotMatrix.coffs[6] === cubeNavigationFaceRotations[Face.Right].coffs[6] &&
      rotMatrix.coffs[7] === cubeNavigationFaceRotations[Face.Right].coffs[7] &&
      rotMatrix.coffs[8] === cubeNavigationFaceRotations[Face.Right].coffs[8]
    )
      return Face.Right;

    if (
      rotMatrix.coffs[6] === cubeNavigationFaceRotations[Face.Back].coffs[6] &&
      rotMatrix.coffs[7] === cubeNavigationFaceRotations[Face.Back].coffs[7] &&
      rotMatrix.coffs[8] === cubeNavigationFaceRotations[Face.Back].coffs[8]
    )
      return Face.Back;

    if (
      rotMatrix.coffs[6] === cubeNavigationFaceRotations[Face.Front].coffs[6] &&
      rotMatrix.coffs[7] === cubeNavigationFaceRotations[Face.Front].coffs[7] &&
      rotMatrix.coffs[8] === cubeNavigationFaceRotations[Face.Front].coffs[8]
    )
      return Face.Front;

    return Face.None;
  };

  private static _interpolateRotMatrix = (
    start: Matrix3d,
    anim: number,
    end: Matrix3d
  ): Matrix3d => {
    if (anim === 0) return start;
    if (anim === 1 || start.isAlmostEqual(end)) return end;
    const startInverse = start.transpose();
    const diff = end.multiplyMatrixMatrix(startInverse);
    const angleAxis = diff.getAxisAndAngleOfRotation();
    if (angleAxis.ok) {
      const angle = Angle.createRadians(
        angleAxis.angle.radians * CubeNavigationAid._animationFn(anim)
      );
      const newDiff = Matrix3d.createRotationAroundVector(
        angleAxis.axis,
        angle
      );
      if (newDiff) {
        const newMatrix = newDiff.multiplyMatrixMatrix(start);
        return newMatrix;
      }
    }
    return end;
  };

  private static correctSmallNumber(value: number, tolerance: number): number {
    return Math.abs(value) < tolerance ? 0 : value;
  }

  /**
   * Snap coordinates of a vector to zero and to each other so that the vector prefers to be
   * * perpendicular to a face of the unit cube.
   * * or pass through a nearby vertex or edge of the unit cube.
   * @param zVector existing z vector.
   * @param tolerance tolerance to determine if a z vector component is close to zero or 1.
   */
  private static snapVectorToCubeFeatures(
    zVector: XYAndZ,
    tolerance: number
  ): Vector3d {
    const x = CubeNavigationAid.correctSmallNumber(zVector.x, tolerance);
    let y = CubeNavigationAid.correctSmallNumber(zVector.y, tolerance);
    let z = CubeNavigationAid.correctSmallNumber(zVector.z, tolerance);

    const xx = x === -0 ? Math.abs(x) : x;
    const yy = y === -0 ? Math.abs(y) : y;
    const zz = z === -0 ? Math.abs(z) : z;

    // adjust any adjacent pair of near equal values to the first.
    if (Geometry.isSameCoordinate(xx, yy, tolerance)) {
      y = Geometry.split3WaySign(y, -xx, xx, xx);
    }
    if (Geometry.isSameCoordinate(yy, zz, tolerance)) {
      z = Geometry.split3WaySign(z, -yy, yy, yy);
    }
    if (Geometry.isSameCoordinate(xx, zz, tolerance)) {
      z = Geometry.split3WaySign(z, -xx, xx, xx);
    }
    return Vector3d.create(x, y, z);
  }

  /**
   * Adjust a worldToView matrix to favor both
   * * direct view at faces, edges, and corners of a view cube.
   * * heads up
   * @param worldToView candidate matrix
   * @param tolerance tolerance for cleaning up fuzz.  The default (1.0e-6) is appropriate if very dirty viewing operations are expected.
   * @param result optional result.
   */
  private static snapWorldToViewMatrixToCubeFeatures(
    worldToView: Matrix3d,
    tolerance: number,
    result?: Matrix3d,
    favorHeadsUpRotation?: boolean
  ): Matrix3d {
    const oldZ = worldToView.rowZ();
    const newZ = CubeNavigationAid.snapVectorToCubeFeatures(oldZ, tolerance);
    const headsUp = !!favorHeadsUpRotation;
    // If newZ is true up or down, it will have true 0 for x and y.
    // special case this to take x direction from the input.
    // This methodology results in always "righting" the face when rotation from an upside-down cube.
    // The behavior was made opt-in in response to https://github.com/iTwin/appui/issues/259
    if (!headsUp || (newZ.x === 0.0 && newZ.y === 0)) {
      const perpVector = worldToView.rowX();
      result = Matrix3d.createRigidFromColumns(
        newZ,
        perpVector,
        AxisOrder.ZXY,
        result
      )!;
    } else {
      result = Matrix3d.createRigidViewAxesZTowardsEye(
        newZ.x,
        newZ.y,
        newZ.z,
        result
      );
    }
    if (result) result.transposeInPlace();
    return result;
  }

  private getArrowRotationAndFace(arrow: Pointer): {
    newRotation: Matrix3d;
    face: Face;
  } {
    const localRotationAxis = Vector3d.create(0, 0, 0);
    switch (arrow) {
      case Pointer.Up:
        localRotationAxis.x = -1.0;
        break;
      case Pointer.Down:
        localRotationAxis.x = 1.0;
        break;
      case Pointer.Left:
        localRotationAxis.y = -1.0;
        break;
      default:
        localRotationAxis.y = 1.0;
        break;
    }
    const localRotation = Matrix3d.createRotationAroundVector(
      localRotationAxis,
      Angle.createDegrees(-90)
    )!;
    const newRotation = localRotation.multiplyMatrixMatrix(
      this.state.endRotMatrix
    );
    CubeNavigationAid.snapWorldToViewMatrixToCubeFeatures(
      newRotation,
      DEFAULT_TOLERANCE,
      newRotation,
      this.props.favorHeadsUpRotation
    );
    const face = CubeNavigationAid._getMatrixFace(newRotation);
    return { newRotation, face };
  }

  private _onArrowClick = (arrow: Pointer) => {
    if (this._isInteractionLocked()) {
      this.props.onAnimationEnd?.();
      return;
    }
    const { newRotation, face } = this.getArrowRotationAndFace(arrow);
    this._animateRotation(newRotation, face);
  };

  private getArrowTitle(arrow: Pointer) {
    const { face } = this.getArrowRotationAndFace(arrow);
    return this._labels[face];
  }

  private _lastClientXY: Vector2d = Vector2d.createZero();
  private _processDrag(mousePos: Vector2d) {
    if (!this._start.isAlmostEqual(mousePos)) {
      const movement = mousePos.minus(this._lastClientXY);
      const diff = movement.scale(0.05);

      const yaw = Angle.createRadians(diff.x);
      const pitch = Angle.createRadians(diff.y);

      const matX = Matrix3d.createRotationAroundAxisIndex(AxisIndex.X, pitch);
      const matZ = Matrix3d.createRotationAroundAxisIndex(AxisIndex.Z, yaw);

      const mat = matX
        .multiplyMatrixMatrix(this.state.startRotMatrix)
        .multiplyMatrixMatrix(matZ);
      this._setRotation(mat, CubeNavigationAid._getMatrixFace(mat));
      if (!this.state.dragging) this.setState({ dragging: true });
    }
    this._lastClientXY = mousePos;
  }

  private _handleBoxMouseDown = (event: any) => {
    if (this._isInteractionLocked()) {
      this.props.onAnimationEnd?.();
      return;
    }
    event.preventDefault();
    // only start listening after drag is confirmed. Ie. the 3D box is clicked.
    window.addEventListener("mousemove", this._onMouseMove, false);
    window.addEventListener("mouseup", this._onMouseUp, false);
    this._lastClientXY = Vector2d.create(event.clientX, event.clientY);
    this._start = this._lastClientXY;
  };

  private _onMouseMove = (event: MouseEvent) => {
    const mousePos = Vector2d.create(event.clientX, event.clientY);
    this._processDrag(mousePos);
  };

  private _onMouseUp = () => {
    if (this.state.dragging) {
      this.setState({ dragging: false });
      ViewportComponentEvents.setCubeMatrix(
        this.state.endRotMatrix,
        CubeNavigationAid._getMatrixFace(this.state.endRotMatrix),
        true
      );
    }

    // remove so event only triggers after this.onMouseStartDrag
    window.removeEventListener("mousemove", this._onMouseMove);
    window.removeEventListener("mouseup", this._onMouseUp);
  };

  private _handleBoxTouchStart = (event: any) => {
    if (this._isInteractionLocked()) {
      this.props.onAnimationEnd?.();
      return;
    }
    if (1 !== event.targetTouches.length) return;
    window.addEventListener("touchmove", this._onTouchMove, false);
    window.addEventListener("touchend", this._onTouchEnd, false);
    this._lastClientXY = Vector2d.create(
      event.targetTouches[0].clientX,
      event.targetTouches[0].clientY
    );
    this._start = this._lastClientXY;
  };

  private _onTouchMove = (event: TouchEvent) => {
    if (1 !== event.targetTouches.length) return;
    const mousePos = Vector2d.create(
      event.targetTouches[0].clientX,
      event.targetTouches[0].clientY
    );
    this._processDrag(mousePos);
  };

  private _onTouchEnd = (event: TouchEvent) => {
    if (0 !== event.targetTouches.length) return;

    if (this.state.dragging) {
      this.setState({ dragging: false });
      ViewportComponentEvents.setCubeMatrix(
        this.state.endRotMatrix,
        CubeNavigationAid._getMatrixFace(this.state.endRotMatrix),
        true
      );
    }

    window.removeEventListener("touchmove", this._onTouchMove);
    window.removeEventListener("touchend", this._onTouchEnd);
  };

  private _handleFaceCellClick = (pos: Vector3d, face: Face) => {
    if (this._isInteractionLocked()) {
      this.props.onAnimationEnd?.();
      return;
    }
    const { endRotMatrix } = this.state;
    let rotMatrix = Matrix3d.createRigidViewAxesZTowardsEye(
      pos.x,
      pos.y,
      pos.z
    ).inverse();
    if (rotMatrix) {
      // if isMatrixFace and user is clicking on top/bottom, the current matrix face must be top or bottom
      if (
        !CubeNavigationAid._isMatrixFace(endRotMatrix) &&
        (face === Face.Top || face === Face.Bottom)
      ) {
        const angleAxis = endRotMatrix.getAxisAndAngleOfRotation();
        if (angleAxis.ok) {
          const xAx = endRotMatrix.columnX();
          const a = Math.atan2(xAx.y, xAx.x);
          const r = (Math.round((a * 2) / Math.PI) * Math.PI) / 2; // round to quarter turn intervals
          const rot = Matrix3d.createRotationAroundAxisIndex(
            AxisIndex.Z,
            Angle.createRadians(r)
          );
          rotMatrix = rot.multiplyMatrixMatrix(rotMatrix);
        }
      }
      this._animateRotation(rotMatrix, face);
    }
    window.removeEventListener("mousemove", this._onMouseMove);
  };

  private _animateRotation = (endRotMatrix: Matrix3d, face: Face) => {
    if (this.state.endRotMatrix.isAlmostEqual(endRotMatrix)) return;
    // set animation variables, let css transitions animate it.
    this._animationFrame = setTimeout(this._animation, 16.667);
    this.setState((prevState) => ({
      startRotMatrix: prevState.endRotMatrix,
      endRotMatrix,
      animation: 0,
      face,
    }));
  };

  private _setRotation = (endRotMatrix: Matrix3d, face: Face) => {
    ViewportComponentEvents.setCubeMatrix(endRotMatrix, face);
    // set variables, with animTime at 0 to prevent animation.
    this.setState({
      startRotMatrix: endRotMatrix,
      endRotMatrix,
      animation: 1,
      face,
    });
  };
}

/** @internal */
export interface NavCubeFaceProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  face: Face;
  label: string;
  hoverMap: { [key: string]: CubeHover };
  onFaceCellClick: (vector: Vector3d, face: Face) => void;
  onFaceCellHoverChange: (vector: Vector3d, state: CubeHover) => void;
}

/** @internal */
export class NavCubeFace extends React.Component<NavCubeFaceProps> {
  private includeCell(vector: Vector3d): boolean {
    const { x, y, z } = vector;
    const omittedCell =
      (y === 0 && x !== 0 && z !== 0) ||
      (y !== 0 && x === 0 && z !== 0) ||
      (y !== 0 && x !== 0 && z === 0);
    return !omittedCell;
  }
  public override render(): React.ReactNode {
    const { face, hoverMap, onFaceCellClick, onFaceCellHoverChange, label } =
      this.props;
    return (
      <div className="nav-cube-face" data-testid="nav-cube-face">
        {[-1, 0, 1].map((y: number) => {
          return (
            <FaceRow key={y} center={y === 0}>
              {[-1, 0, 1].map((x: number) => {
                const vector = NavCubeFace.faceCellToPos(face, x, y);
                if (this.includeCell(vector)) {
                  // return a fully functional cell
                  return (
                    <FaceCell
                      key={x}
                      onFaceCellHoverChange={onFaceCellHoverChange}
                      onFaceCellClick={onFaceCellClick}
                      hoverMap={hoverMap}
                      vector={vector}
                      face={face}
                      center={x === 0}
                    >
                      {x === 0 && y === 0 && label}
                    </FaceCell>
                  );
                } else {
                  // return a placeholder cell
                  return (
                    <FaceCell
                      key={x}
                      vector={vector}
                      face={face}
                      center={x === 0}
                    />
                  );
                }
              })}
            </FaceRow>
          );
        })}
      </div>
    );
  }
  public static faceCellToPos = (face: Face, x: number, y: number) => {
    const faceVect = cubeNavigationFaceLocs[face];
    const route = cubeNavigationRoutes[face];

    const faceX = x < 0 ? route.left : x > 0 ? route.right : Face.None;
    const xVect =
      faceX !== Face.None
        ? cubeNavigationFaceLocs[faceX]
        : Vector3d.createZero();

    const faceY = y < 0 ? route.up : y > 0 ? route.down : Face.None;
    const yVect =
      faceY !== Face.None
        ? cubeNavigationFaceLocs[faceY]
        : Vector3d.createZero();

    return faceVect.plus(xVect).plus(yVect);
  };
}

interface FaceRowProps extends React.AllHTMLAttributes<HTMLDivElement> {
  center?: boolean;
}

class FaceRow extends React.Component<FaceRowProps> {
  public override render(): React.ReactNode {
    const { center, children, ...props } = this.props;
    const classNames = classnames("face-row", center && "cube-center");
    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
}

/** @internal */
export interface FaceCellProps extends React.AllHTMLAttributes<HTMLDivElement> {
  center?: boolean;
  onFaceCellClick?: (vector: Vector3d, face: Face) => void;
  onFaceCellHoverChange?: (vector: Vector3d, state: CubeHover) => void;
  hoverMap?: { [key: string]: CubeHover };
  vector: Vector3d;
  face: Face;
}

/** @internal */
export class FaceCell extends React.Component<FaceCellProps> {
  private _startMouse: Point2d | undefined;
  public override render(): React.ReactNode {
    const {
      center,
      children,
      onFaceCellClick,
      onFaceCellHoverChange,
      hoverMap,
      face,
      vector,
      ...props
    } = this.props;
    const { x, y, z } = vector;
    const n = `${x}-${y}-${z}`;
    const hover = hoverMap && hoverMap[n] === CubeHover.Hover;
    const active = hoverMap && hoverMap[n] === CubeHover.Active;
    const classNames = classnames(
      "face-cell",
      center && "cube-center",
      hover && "cube-hover",
      active && "cube-active"
    );

    return (
      <div
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver={this._handleMouseOver}
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOut={this._handleMouseOut}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
        data-testid={`nav-cube-face-cell-${face}-${n}`}
        className={classNames}
        role="presentation"
        {...props}
      >
        {children}
      </div>
    );
  }
  private _handleMouseOver = () => {
    const { vector } = this.props;
    this.props.onFaceCellHoverChange &&
      this.props.onFaceCellHoverChange(vector, CubeHover.Hover);
  };
  private _handleMouseOut = () => {
    const { vector } = this.props;
    this.props.onFaceCellHoverChange &&
      this.props.onFaceCellHoverChange(vector, CubeHover.None);
  };
  private _handleMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    this.handlePointerDown(clientX, clientY);
  };
  private _handleMouseUp = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    this.handlePointerUp(clientX, clientY);
  };

  private _handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.targetTouches.length === 1 &&
      this.handlePointerDown(
        event.targetTouches[0].clientX,
        event.targetTouches[0].clientY
      );
  };

  private _handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.changedTouches.length === 1 &&
      this.handlePointerUp(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
  };

  private handlePointerDown(x: number, y: number) {
    const { vector } = this.props;
    this._startMouse = Point2d.create(x, y);
    this.props.onFaceCellHoverChange &&
      this.props.onFaceCellHoverChange(vector, CubeHover.Active);
  }

  private handlePointerUp(x: number, y: number) {
    const { vector, face } = this.props;
    this.props.onFaceCellHoverChange &&
      this.props.onFaceCellHoverChange(vector, CubeHover.None);
    const mouse = Point2d.create(x, y);
    if (this._startMouse && this._startMouse.isAlmostEqual(mouse)) {
      const isFace =
        Math.abs(vector.x) + Math.abs(vector.y) + Math.abs(vector.z) === 1;
      this.props.onFaceCellClick &&
        this.props.onFaceCellClick(vector, isFace ? face : Face.None);
    }
  }
}

enum Pointer {
  None = 0,
  Up,
  Down,
  Left,
  Right,
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
const pointerIconSpec: { [key: number]: IconSpec } = {
  [Pointer.Up]: <SvgCaretDown />,
  [Pointer.Down]: <SvgCaretUp />,
  [Pointer.Left]: <SvgCaretRight />,
  [Pointer.Right]: <SvgCaretLeft />,
};

const pointerClass: { [key: number]: string } = {
  [Pointer.Up]: "cube-up",
  [Pointer.Down]: "cube-down",
  [Pointer.Left]: "cube-left",
  [Pointer.Right]: "cube-right",
};

interface PointerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  visible: boolean;
  pointerType: Pointer;
  onArrowClick(pointer: Pointer): void;
  title: string;
  ["data-testid"]?: string;
}

class PointerButton extends React.Component<PointerProps> {
  public override render(): React.ReactNode {
    const { visible, pointerType, onArrowClick, title, ...props } = this.props;
    const classes = classnames(
      "cube-pointer",
      "icon",
      pointerClass[pointerType],
      visible && "cube-visible"
    );

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={classes}
        role="button"
        tabIndex={-1}
        title={title}
        {...props}
        onClick={this._handleClick}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Icon iconSpec={pointerIconSpec[pointerType]} />
      </div>
    );
  }
  private _handleClick = (event: React.MouseEvent) => {
    const { pointerType } = this.props;
    event.preventDefault();
    this.props.onArrowClick(pointerType);
  };
}
