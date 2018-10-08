/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import Rectangle, { Edge, RectangleProps } from "../../../utilities/Rectangle";
import ResizeHandle from "../../../widget/rectangular/ResizeHandle";
import { HorizontalAnchor } from "../../../widget/Stacked";
import Root from "./Root";

export class Layout {
  public static readonly RECTANGULAR_DEFAULT_MIN_WIDTH = 296;
  public static readonly RECTANGULAR_DEFAULT_MIN_HEIGHT = 220;
  public static readonly FREE_FORM_DEFAULT_MIN_WIDTH = 96;
  public static readonly FREE_FORM_DEFAULT_MIN_HEIGHT = 88;

  private _bounds: Rectangle;

  public constructor(bounds: RectangleProps, public readonly root: Root) {
    this._bounds = Rectangle.create(bounds);
  }

  public get minWidth(): number {
    return Layout.RECTANGULAR_DEFAULT_MIN_WIDTH;
  }

  public get minHeight(): number {
    return Layout.RECTANGULAR_DEFAULT_MIN_HEIGHT;
  }

  public get bounds() {
    return this._bounds;
  }

  protected setBounds(bounds: Rectangle) {
    this._bounds = bounds;
  }

  public get topZone(): Layout | undefined {
    return undefined;
  }

  public get bottomZone(): Layout | undefined {
    return undefined;
  }

  public get leftZone(): Layout | undefined {
    return undefined;
  }

  public get rightZone(): Layout | undefined {
    return undefined;
  }

  public getInitialBounds(): RectangleProps {
    return new Rectangle();
  }

  public get anchor(): HorizontalAnchor {
    return HorizontalAnchor.Right;
  }

  public resize(x: number, y: number, handle: ResizeHandle) {
    switch (handle) {
      case Edge.Top: {
        if (y < 0)
          this.tryGrowTop(-y);
        else if (y > 0)
          this.tryShrinkTop(y);
        break;
      }
      case Edge.Bottom: {
        if (y < 0)
          this.tryShrinkBottom(-y);
        else if (y > 0)
          this.tryGrowBottom(y);
        break;
      }
      case Edge.Left: {
        if (x < 0)
          this.tryGrowLeft(-x);
        else if (x > 0)
          this.tryShrinkLeft(x);
        break;
      }
      case Edge.Right: {
        if (x < 0)
          this.tryShrinkRight(-x);
        else if (x > 0)
          this.tryGrowRight(x);
        break;
      }
    }
  }

  public tryGrowTop(px: number): number {
    if (px < 0)
      throw new RangeError();

    const maxTop = this.topZone ? this.topZone.bounds.bottom : this.root.bounds.top;
    const growSelfBy = Math.max(Math.min(px, this.bounds.top - maxTop), 0);
    const shrinkBy = Math.max(0, px - growSelfBy);
    const shrunkBy = this.topZone ? this.topZone.tryShrinkBottom(shrinkBy) : 0;

    const grown = growSelfBy + shrunkBy;
    this._bounds = this.bounds.inset(0, -grown, 0, 0);

    return grown;
  }

  public tryShrinkTop(px: number): number {
    if (px < 0)
      throw new RangeError();

    const height = this._bounds.getHeight();
    const shrinkSelfBy = Math.max(0, Math.min(px, height - this.minHeight));

    const maxBottom = this.bottomZone ? this.bottomZone.bounds.top : this.root.bounds.bottom;
    const moveBottom = Math.max(0, Math.min(px - shrinkSelfBy, maxBottom - this.bounds.bottom));

    const shrinkBottomBy = Math.max(0, px - shrinkSelfBy - moveBottom);
    const bottomShrunkBy = this.bottomZone ? this.bottomZone.tryShrinkTop(shrinkBottomBy) : 0;

    this._bounds = this.bounds.inset(0, shrinkSelfBy, 0, 0);
    this._bounds = this.bounds.offsetY(moveBottom + bottomShrunkBy);

    return moveBottom + shrinkSelfBy + bottomShrunkBy;
  }

  public tryGrowBottom(px: number): number {
    if (px < 0)
      throw new RangeError();

    const maxBottom = this.bottomZone ? this.bottomZone.bounds.top : this.root.bounds.bottom;
    const growSelfBy = Math.max(0, Math.min(px, maxBottom - this.bounds.bottom));
    const shrinkBottomZoneBy = Math.max(0, px - growSelfBy);

    const bottomZoneShrunkBy = this.bottomZone ? this.bottomZone.tryShrinkTop(shrinkBottomZoneBy) : 0;

    const grown = growSelfBy + bottomZoneShrunkBy;
    this._bounds = this.bounds.inset(0, 0, 0, -grown);

    return grown;
  }

  public tryShrinkBottom(px: number): number {
    if (px < 0)
      throw new RangeError();

    const height = this.bounds.getHeight();
    const shrinkSelfBy = Math.max(0, Math.min(px, height - this.minHeight));

    const maxTop = this.topZone ? this.topZone.bounds.bottom : this.root.bounds.top;
    const moveTop = Math.max(0, Math.min(px - shrinkSelfBy, this.bounds.top - maxTop));
    const shrinkTopBy = Math.max(0, px - shrinkSelfBy - moveTop);
    const topShrunkBy = this.topZone ? this.topZone.tryShrinkBottom(shrinkTopBy) : 0;

    this._bounds = this.bounds.inset(0, 0, 0, shrinkSelfBy);
    this._bounds = this.bounds.offsetY(-(topShrunkBy + moveTop));

    return moveTop + shrinkSelfBy + topShrunkBy;
  }

  public tryGrowLeft(px: number): number {
    if (px < 0)
      throw new RangeError();

    const initialBounds = this.getInitialBounds();
    const newLeft = this.bounds.left - px;
    if (this.anchor === HorizontalAnchor.Right && newLeft < initialBounds.left)
      px = Math.max(Math.min(px, px - initialBounds.left + newLeft), 0);

    const minLeft = this.leftZone ? this.leftZone.bounds.right : this.root.bounds.left;
    const growSelfBy = Math.max(Math.min(px, this.bounds.left - minLeft), 0);
    const shrinkBy = Math.max(0, px - growSelfBy);
    const shrunkBy = this.leftZone ? this.leftZone.tryShrinkRight(shrinkBy) : 0;

    const grown = growSelfBy + shrunkBy;
    this._bounds = this.bounds.inset(-grown, 0, 0, 0);
    return grown;
  }

  public tryShrinkLeft(px: number): number {
    if (px < 0)
      throw new RangeError();

    const width = this.bounds.getWidth();
    const shrinkSelfBy = Math.max(0, Math.min(px, width - this.minWidth));

    const maxRight = this.rightZone ? this.rightZone.bounds.left : this.root.bounds.right;
    const moveRight = Math.max(0, Math.min(px - shrinkSelfBy, maxRight - this.bounds.right));

    const shrinkRightBy = Math.max(0, px - shrinkSelfBy - moveRight);
    const rightShrunkBy = this.rightZone ? this.rightZone.tryShrinkLeft(shrinkRightBy) : 0;

    this._bounds = this.bounds.inset(shrinkSelfBy, 0, 0, 0);
    this._bounds = this.bounds.offsetX(rightShrunkBy + moveRight);

    return shrinkSelfBy + rightShrunkBy + moveRight;
  }

  public tryGrowRight(px: number): number {
    if (px < 0)
      throw new RangeError();

    const initialBounds = this.getInitialBounds();
    const newRight = this.bounds.right + px;
    if (this.anchor === HorizontalAnchor.Left && newRight > initialBounds.right)
      px = Math.max(Math.min(px, px - newRight + initialBounds.right), 0);

    const maxRight = this.rightZone ? this.rightZone.bounds.left : this.root.bounds.right;
    const growSelfBy = Math.max(Math.min(px, maxRight - this.bounds.right), 0);
    const shrinkBy = Math.max(0, px - growSelfBy);
    const shrunkBy = this.rightZone ? this.rightZone.tryShrinkLeft(shrinkBy) : 0;

    const grown = growSelfBy + shrunkBy;
    this._bounds = this.bounds.inset(0, 0, -grown, 0);
    return grown;
  }

  public tryShrinkRight(px: number): number {
    if (px < 0)
      throw new RangeError();

    const width = this.bounds.getWidth();
    const shrinkSelfBy = Math.max(0, Math.min(px, width - this.minWidth));

    const minLeft = this.leftZone ? this.leftZone.bounds.right : this.root.bounds.left;
    const moveLeft = Math.max(0, Math.min(px - shrinkSelfBy, this.bounds.left - minLeft));

    const shrinkLeftBy = Math.max(0, px - shrinkSelfBy - moveLeft);
    const leftShrunkBy = this.leftZone ? this.leftZone.tryShrinkRight(shrinkLeftBy) : 0;

    this._bounds = this.bounds.inset(0, 0, shrinkSelfBy, 0);
    this._bounds = this.bounds.offsetX(-(leftShrunkBy + moveLeft));

    return shrinkSelfBy + leftShrunkBy + moveLeft;
  }
}

export default Layout;
