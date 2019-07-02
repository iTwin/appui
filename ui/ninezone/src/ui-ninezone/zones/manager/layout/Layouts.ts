/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { Rectangle } from "../../../utilities/Rectangle";
import { WidgetZone } from "../Zone";
import { NineZone } from "../Zones";
import { Layout } from "./Layout";
import { Root } from "./Root";

/** @alpha */
export class NineZoneRoot extends Root {
  public constructor(public readonly nineZone: NineZone) {
    super(Rectangle.createFromSize(Rectangle.create(nineZone.props.bounds).getSize()), nineZone.getStatusZone().props.isInFooterMode);
  }
}

/** @alpha */
export interface WidgetZoneLayoutProps {
  readonly zone: WidgetZone;
  readonly root: NineZoneRoot;
  readonly leftZones?: WidgetZoneLayout.AdjacentZonesGetter;
  readonly topZones?: WidgetZoneLayout.AdjacentZonesGetter;
  readonly rightZones?: WidgetZoneLayout.AdjacentZonesGetter;
  readonly bottomZones?: WidgetZoneLayout.AdjacentZonesGetter;
}

/** @alpha */
export class WidgetZoneLayout extends Layout {
  public readonly zone: WidgetZone;
  public readonly root: NineZoneRoot;
  private readonly _leftZones: WidgetZoneLayout.AdjacentZonesGetter;
  private readonly _topZones: WidgetZoneLayout.AdjacentZonesGetter;
  private readonly _rightZones: WidgetZoneLayout.AdjacentZonesGetter;
  private readonly _bottomZones: WidgetZoneLayout.AdjacentZonesGetter;

  public constructor(props: WidgetZoneLayoutProps) {
    super({
      bounds: props.zone.bounds,
      floatingBounds: props.zone.props.floating && props.zone.props.floating.bounds,
      horizontalAnchor: props.root.nineZone.getWidget(props.zone.id).props.horizontalAnchor,
      root: props.root,
    });

    this.zone = props.zone;
    this.root = props.root;

    this._leftZones = props.leftZones || WidgetZoneLayout.adjacentZones(new WidgetZoneLayout.LeftZones());
    this._topZones = props.topZones || WidgetZoneLayout.adjacentZones(new WidgetZoneLayout.TopZones());
    this._rightZones = props.rightZones || WidgetZoneLayout.adjacentZones(new WidgetZoneLayout.RightZones());
    this._bottomZones = props.bottomZones || WidgetZoneLayout.adjacentZones(new WidgetZoneLayout.BottomZones());
  }

  public get isFloating() {
    return this.zone.isFloating();
  }

  private get _columnStartFraction() {
    return this.zone.cell.col / 3;
  }

  private get _columnEndFraction() {
    return (this.zone.cell.col + 1) / 3;
  }

  private get _rowStartFraction() {
    return this.zone.cell.row / 3;
  }

  private get _rowEndFraction() {
    return (this.zone.cell.row + 1) / 3;
  }

  public getInitialBounds(): Rectangle {
    const parentBounds = this.zone.nineZone.root.bounds;
    const parentSize = parentBounds.getSize();

    const left = parentBounds.left + parentSize.width * this._columnStartFraction;
    const right = parentBounds.left + parentSize.width * this._columnEndFraction;
    const top = parentBounds.top + parentSize.height * this._rowStartFraction;
    const bottom = parentBounds.top + parentSize.height * this._rowEndFraction;
    const zoneBounds = new Rectangle(left, top, right, bottom);

    if (this.zone.hasSingleDefaultWidget)
      return zoneBounds;

    return this.zone.getWidgets().reduce<Rectangle>((prev, current) => {
      const defaultZone = current.defaultZone;
      if (this.zone.equals(defaultZone))
        return prev;

      const layout = defaultZone.getLayout();
      const bounds = layout.getInitialBounds();
      return prev.outerMergeWith(bounds);
    }, zoneBounds);
  }

  public getInitialLeftZone(): WidgetZone | undefined {
    return undefined;
  }

  public getInitialTopZone(): WidgetZone | undefined {
    return undefined;
  }

  public getInitialRightZone(): WidgetZone | undefined {
    return undefined;
  }

  public getInitialBottomZone(): WidgetZone | undefined {
    return undefined;
  }

  public getLeftZones(): WidgetZone[] {
    return this._leftZones(this);
  }

  public getRightZones(): WidgetZone[] {
    return this._rightZones(this);
  }

  public getTopZones(): WidgetZone[] {
    return this._topZones(this);
  }

  public getBottomZones(): WidgetZone[] {
    return this._bottomZones(this);
  }

  public get leftLayouts() {
    return this.getLeftZones().map((z) => z.getLayout());
  }

  public get topLayouts() {
    return this.getTopZones().map((z) => z.getLayout());
  }

  public get rightLayouts() {
    return this.getRightZones().map((z) => z.getLayout());
  }

  public get bottomLayouts() {
    return this.getBottomZones().map((z) => z.getLayout());
  }
}

/** @alpha */
export namespace WidgetZoneLayout {
  /** @alpha */
  export interface AdjacentZonesStrategy {
    getSingleMergedZone(isMergedVertically: boolean): boolean;
    reduceToFirstZone(): boolean;
    getInitialZone(layout: WidgetZoneLayout): WidgetZone | undefined;
  }

  /** @alpha */
  export class LeftZones implements AdjacentZonesStrategy {
    public getSingleMergedZone(isMergedVertically: boolean): boolean {
      return !isMergedVertically;
    }

    public reduceToFirstZone(): boolean {
      return true;
    }

    public getInitialZone(layout: WidgetZoneLayout): WidgetZone | undefined {
      return layout.getInitialLeftZone();
    }
  }

  /** @alpha */
  export class TopZones implements AdjacentZonesStrategy {
    public getSingleMergedZone(isMergedVertically: boolean): boolean {
      return isMergedVertically;
    }

    public reduceToFirstZone(): boolean {
      return true;
    }

    public getInitialZone(layout: WidgetZoneLayout): WidgetZone | undefined {
      return layout.getInitialTopZone();
    }
  }

  /** @alpha */
  export class BottomZones implements AdjacentZonesStrategy {
    public getSingleMergedZone(isMergedVertically: boolean): boolean {
      return isMergedVertically;
    }

    public reduceToFirstZone(): boolean {
      return false;
    }

    public getInitialZone(layout: WidgetZoneLayout): WidgetZone | undefined {
      return layout.getInitialBottomZone();
    }
  }

  /** @alpha */
  export class RightZones implements AdjacentZonesStrategy {
    public getSingleMergedZone(isMergedVertically: boolean): boolean {
      return !isMergedVertically;
    }

    public reduceToFirstZone(): boolean {
      return false;
    }

    public getInitialZone(layout: WidgetZoneLayout): WidgetZone | undefined {
      return layout.getInitialRightZone();
    }
  }

  /** @alpha */
  export type AdjacentZonesGetter = (layout: WidgetZoneLayout) => WidgetZone[];

  /** @alpha */
  export const adjacentZones = (strategy: AdjacentZonesStrategy): AdjacentZonesGetter => (layout: WidgetZoneLayout) => {
    const zone = layout.zone;
    const widgets = zone.getWidgets();
    if (widgets.length > 1) {
      const zones = widgets.map((w) => w.defaultZone);

      const isMergedVertically = widgets[0].defaultZone.cell.isColumnAlignedWith(widgets[1].defaultZone.cell);
      if (strategy.getSingleMergedZone(isMergedVertically)) {
        const reducedZone = strategy.reduceToFirstZone() ? zones.reduce((prev, current) => prev.id < current.id ? prev : current, zones[0]) : zones.reduce((prev, current) => prev.id > current.id ? prev : current, zones[0]);
        const bottomZone = strategy.getInitialZone(reducedZone.getLayout());
        return bottomZone ? [bottomZone] : [];
      }
      const bottomZones = zones.reduce<WidgetZone[]>((prev, current) => {
        const initial = strategy.getInitialZone(current.getLayout());
        if (initial)
          prev.push(initial);
        return prev;
      }, []);
      return bottomZones;
    }

    const initialZone = strategy.getInitialZone(layout);
    if (!initialZone)
      return [];

    if (zone.hasSingleDefaultWidget && initialZone.isEmpty && initialZone.defaultWidget.zone) {
      return [initialZone.defaultWidget.zone];
    }

    return [initialZone];
  };
}

/** @alpha */
export class Layout1 extends WidgetZoneLayout {
  public getInitialBottomZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(4);
  }

  public getInitialRightZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(2);
  }

  public get isResizable() {
    return false;
  }
}

/** @alpha */
export class Layout2 extends WidgetZoneLayout {
  public getInitialBottomZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(7);
  }

  public getInitialLeftZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(1);
  }

  public getInitialRightZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(3);
  }

  public get isResizable() {
    return false;
  }
}

/** @alpha */
export class Layout3 extends WidgetZoneLayout {
  public getInitialBottomZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(6);
  }

  public getInitialLeftZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(2);
  }

  public get minWidth() {
    return Layout.FREE_FORM_DEFAULT_MIN_WIDTH;
  }

  public get minHeight() {
    return Layout.FREE_FORM_DEFAULT_MIN_HEIGHT;
  }

  public get isResizable() {
    return false;
  }
}

/** @alpha */
export class Layout4 extends WidgetZoneLayout {
  public getInitialBottomZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(7);
  }

  public getInitialTopZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(3);
  }
}

/** @alpha */
export class Layout6 extends WidgetZoneLayout {
  public getInitialBottomZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(9);
  }

  public getInitialTopZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(3);
  }
}

/** @alpha */
export class Layout7 extends WidgetZoneLayout {
  public getInitialTopZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(4);
  }

  public getInitialRightZone() {
    if (this.zone.nineZone.root.isInFooterMode)
      return undefined;
    return this.zone.nineZone.root.nineZone.getWidgetZone(8);
  }
}

/** @alpha */
export class Layout8 extends WidgetZoneLayout {
  public getInitialLeftZone() {
    if (this.zone.nineZone.root.isInFooterMode)
      return undefined;
    return this.zone.nineZone.root.nineZone.getWidgetZone(7);
  }

  public getInitialRightZone() {
    if (this.zone.nineZone.root.isInFooterMode)
      return undefined;
    return this.zone.nineZone.root.nineZone.getWidgetZone(9);
  }

  public getInitialBounds() {
    const parentBounds = this.zone.nineZone.root.bounds;
    if (this.zone.nineZone.root.isInFooterMode)
      return new Rectangle(parentBounds.left, parentBounds.bottom - Root.FOOTER_HEIGHT, parentBounds.right, parentBounds.bottom);

    return super.getInitialBounds();
  }
}

/** @alpha */
export class Layout9 extends WidgetZoneLayout {
  public getInitialTopZone() {
    return this.zone.nineZone.root.nineZone.getWidgetZone(6);
  }

  public getInitialLeftZone() {
    if (this.zone.nineZone.root.isInFooterMode)
      return undefined;
    return this.zone.nineZone.root.nineZone.getWidgetZone(8);
  }
}
