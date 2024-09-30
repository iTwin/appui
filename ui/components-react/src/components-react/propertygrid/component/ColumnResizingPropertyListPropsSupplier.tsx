/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { UiGeometry } from "@itwin/core-react";
import type { PropertyListProps } from "./PropertyList.js";
import { Orientation } from "../../common/Orientation.js";

const BORDER_WIDTH = 10;
const PROPERTY_PADDING = 16;
const VALUE_MIN_WIDTH = 10;

/** @internal */
export type ColumnResizeRelatedPropertyListProps = Required<
  Pick<
    PropertyListProps,
    | "onColumnChanged"
    | "columnRatio"
    | "isResizeHandleHovered"
    | "onResizeHandleHoverChanged"
    | "isResizeHandleBeingDragged"
    | "onResizeHandleDragChanged"
    | "columnInfo"
    | "orientation"
    | "width"
  >
>;

/** @internal */
export interface ColumnResizingPropertyListPropsSupplierProps {
  /** Orientation of the properties */
  orientation: Orientation;
  /** Width of the property list */
  width: number;
  /** Minimum allowed label column width, after which resizing stops */
  minLabelWidth?: number;
  /** Minimum allowed value column width, after which resizing stops */
  minValueWidth?: number;
  /** Fixed action button column width */
  actionButtonWidth?: number;
  /** Maximum depth of the properties shown */
  maxPropertyDepth?: number;
  /** A callback that receives the required column-resize-related props for the [[PropertyList]] component  */
  children: (props: ColumnResizeRelatedPropertyListProps) => React.ReactNode;
}

/** @internal */
export interface ColumnResizingPropertyListPropsSupplierState {
  columnRatio: number;
  isResizeHandleHovered: boolean;
  isResizeHandleBeingDragged: boolean;
}

/**
 * Wrapped PropertyCategoryBlock React component with list of properties and render optimization
 * @internal
 */
export class ColumnResizingPropertyListPropsSupplier extends React.Component<
  ColumnResizingPropertyListPropsSupplierProps,
  ColumnResizingPropertyListPropsSupplierState
> {
  private readonly _initialRatio = 0.25;
  private readonly _defaultMinRatio = 0.15;
  private readonly _defaultMaxRatio = 0.6;
  private _minRatio = this._defaultMinRatio;
  private _maxRatio = this._defaultMaxRatio;

  public override state: ColumnResizingPropertyListPropsSupplierState = {
    columnRatio: this._initialRatio,
    isResizeHandleHovered: false,
    isResizeHandleBeingDragged: false,
  };

  public static defaultProps: Partial<ColumnResizingPropertyListPropsSupplierProps> =
    {
      minLabelWidth: 100,
      minValueWidth: 100,
    };

  private _onColumnRatioChanged = (ratio: number) => {
    ratio = UiGeometry.clamp(ratio, this._minRatio, this._maxRatio);
    if (this.state.columnRatio === ratio) return { ratio };

    this.setState({ columnRatio: ratio });
    return { ratio };
  };

  private _onResizeHandleHoverChanged = (isHovered: boolean) => {
    this.setState({ isResizeHandleHovered: isHovered });
  };

  private _onResizeHandleDragChanged = (isDragStarted: boolean) => {
    this.setState({ isResizeHandleBeingDragged: isDragStarted });
  };

  private isMinimumColumnSizeEnabled() {
    if (this.props.orientation !== Orientation.Horizontal) return false;

    // calculated how much width all the borders of nested properties takes up.
    const bordersWidth = this.props.maxPropertyDepth
      ? this.props.maxPropertyDepth * BORDER_WIDTH
      : 0;
    const actionButtonWidth = this.props.actionButtonWidth ?? 0;

    // minimum with required to render property. This consists of:
    // * minimum label width
    // * 1px resizer
    // * minimum value width
    // * actions buttons width
    // * all nested borders width
    // * padding
    const propertyWidth =
      this.props.minLabelWidth! +
      1 +
      this.props.minValueWidth! +
      actionButtonWidth +
      bordersWidth +
      PROPERTY_PADDING;
    // default behavior for screens that are too small to have minimum column widths
    if (this.props.width < propertyWidth) {
      this._minRatio = this._defaultMinRatio;
      // if there are action buttons calculate maximum ratio for label. Otherwise use default.
      this._maxRatio = this.props.actionButtonWidth
        ? (this.props.width -
            this.props.actionButtonWidth -
            bordersWidth -
            PROPERTY_PADDING -
            VALUE_MIN_WIDTH) /
          this.props.width
        : this._defaultMaxRatio;
      return false;
    }

    this._minRatio = this.props.minLabelWidth! / this.props.width;
    this._maxRatio =
      (this.props.width - actionButtonWidth - this.props.minValueWidth!) /
      this.props.width;
    return true;
  }

  private getValidColumnRatio(): number {
    return UiGeometry.clamp(
      this.state.columnRatio,
      this._minRatio,
      this._maxRatio
    );
  }

  public override render() {
    const listProps: ColumnResizeRelatedPropertyListProps = {
      orientation: this.props.orientation,
      width: this.props.width,
      onColumnChanged: this._onColumnRatioChanged,
      columnRatio: this.getValidColumnRatio(),
      isResizeHandleHovered: this.state.isResizeHandleHovered,
      onResizeHandleHoverChanged: this._onResizeHandleHoverChanged,
      isResizeHandleBeingDragged: this.state.isResizeHandleBeingDragged,
      onResizeHandleDragChanged: this._onResizeHandleDragChanged,
      columnInfo: {
        minLabelWidth: this.props.minLabelWidth!,
        minValueWidth: this.props.minValueWidth!,
        actionButtonWidth: this.props.actionButtonWidth!,
        isMinimumColumnSizeEnabled: this.isMinimumColumnSizeEnabled(),
      },
    };
    return this.props.children(listProps);
  }
}
