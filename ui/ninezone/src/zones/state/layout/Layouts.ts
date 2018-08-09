/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Zone */

import Rectangle, { RectangleProps } from "../../../utilities/Rectangle";
import { Zone } from "../Zone";

import Layout from "./Layout";
import Root from "./Root";

export class Layout1 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get bottomZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(4).getLayout();
  }

  protected get leftZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get rightZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(2).getLayout();
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0;
    const right = parentBounds.left + parentSize.width * 0.33;
    const top = parentBounds.top + parentSize.height * 0;
    const bottom = parentBounds.top + parentSize.height * 0.33;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout2 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get bottomZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(7).getLayout();
  }

  protected get leftZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(1).getLayout();
  }

  protected get rightZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(3).getLayout();
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0.33;
    const right = parentBounds.left + parentSize.width * 0.66;
    const top = parentBounds.top + parentSize.height * 0;
    const bottom = parentBounds.top + parentSize.height * 0.33;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout3 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get bottomZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(6).getLayout();
  }

  protected get leftZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(2).getLayout();
  }

  protected get rightZone() {
    return this.zone.nineZone.getRoot();
  }

  public get minWidth() {
    return Root.FREE_FORM_DEFAULT_MIN_WIDTH;
  }

  public get minHeight() {
    return Root.FREE_FORM_DEFAULT_MIN_HEIGHT;
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0.66;
    const right = parentBounds.left + parentSize.width * 1;
    const top = parentBounds.top + parentSize.height * 0;
    const bottom = parentBounds.top + parentSize.height * 0.33;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout4 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(3).getLayout();
  }

  protected get bottomZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(7).getLayout();
  }

  protected get leftZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get rightZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(6).getLayout();
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0;
    const right = parentBounds.left + parentSize.width * 0.33;
    const top = parentBounds.top + parentSize.height * 0.33;
    const bottom = parentBounds.top + parentSize.height * 0.66;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout6 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(3).getLayout();
  }

  protected get bottomZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(9).getLayout();
  }

  protected get leftZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(4).getLayout();
  }

  protected get rightZone() {
    return this.zone.nineZone.getRoot();
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0.66;
    const right = parentBounds.left + parentSize.width * 1;
    const top = parentBounds.top + parentSize.height * 0.33;
    const bottom = parentBounds.top + parentSize.height * 0.66;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout7 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(6).getLayout();
  }

  protected get bottomZone() {
    if (this.zone.nineZone.getRoot().isInFooterMode)
      return this.zone.nineZone.getRoot().nineZone.getZone(8).getLayout();
    return this.zone.nineZone.getRoot();
  }

  protected get leftZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get rightZone() {
    if (this.zone.nineZone.getRoot().isInFooterMode)
      return this.zone.nineZone.getRoot().nineZone.getZone(9).getLayout();
    return this.zone.nineZone.getRoot().nineZone.getZone(8).getLayout();
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0;
    const right = parentBounds.left + parentSize.width * 0.33;
    const top = parentBounds.top + parentSize.height * 0.66;
    const bottom = parentBounds.top + parentSize.height * 1;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout8 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(6).getLayout();
  }

  protected get bottomZone() {
    return this.zone.nineZone.getRoot();
  }

  protected get leftZone() {
    if (this.zone.nineZone.getRoot().isInFooterMode)
      return this.zone.nineZone.getRoot();
    return this.zone.nineZone.getRoot().nineZone.getZone(7).getLayout();
  }

  protected get rightZone() {
    if (this.zone.nineZone.getRoot().isInFooterMode)
      return this.zone.nineZone.getRoot();
    return this.zone.nineZone.getRoot().nineZone.getZone(9).getLayout();
  }

  public getInitialBounds(): RectangleProps {
    const parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      return new Rectangle(parentBounds.left, parentBounds.bottom - Root.FOOTER_HEIGHT, parentBounds.right, parentBounds.bottom);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0.33;
    const right = parentBounds.left + parentSize.width * 0.66;
    const top = parentBounds.top + parentSize.height * 0.66;
    const bottom = parentBounds.top + parentSize.height * 1;

    return new Rectangle(left, top, right, bottom);
  }
}

export class Layout9 extends Layout {
  public constructor(public readonly zone: Zone) {
    super();

    this._bounds = Rectangle.create(zone.props.bounds);
  }

  protected get topZone() {
    return this.zone.nineZone.getRoot().nineZone.getZone(6).getLayout();
  }

  protected get bottomZone() {
    if (this.zone.nineZone.getRoot().isInFooterMode)
      return this.zone.nineZone.getRoot().nineZone.getZone(8).getLayout();
    return this.zone.nineZone.getRoot();
  }

  protected get leftZone() {
    if (this.zone.nineZone.getRoot().isInFooterMode)
      return this.zone.nineZone.getRoot().nineZone.getZone(7).getLayout();
    return this.zone.nineZone.getRoot().nineZone.getZone(8).getLayout();
  }

  protected get rightZone() {
    return this.zone.nineZone.getRoot();
  }

  public getInitialBounds(): RectangleProps {
    let parentBounds = this.zone.nineZone.getRoot().bounds;

    if (this.zone.nineZone.getRoot().isInFooterMode)
      parentBounds = this.zone.nineZone.getRoot().bounds.inset(0, 0, 0, Root.FOOTER_HEIGHT);

    const parentSize = parentBounds.getSize();
    const left = parentBounds.left + parentSize.width * 0.66;
    const right = parentBounds.left + parentSize.width * 1;
    const top = parentBounds.top + parentSize.height * 0.66;
    const bottom = parentBounds.top + parentSize.height * 1;

    return new Rectangle(left, top, right, bottom);
  }
}
