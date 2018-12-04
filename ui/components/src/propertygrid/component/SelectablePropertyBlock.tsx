/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import _ from "lodash";
import { Omit } from "@bentley/ui-core/lib/utils";
import { PropertyCategoryBlock, PropertyCategoryBlockProps } from "./PropertyCategoryBlock";
import { PropertyList, PropertyListProps, getPropertyKey } from "./PropertyList";
import { PropertyCategory } from "../PropertyDataProvider";

type ReducedPropertyListProps = Omit<Omit<PropertyListProps, "onColumnChanged">, "columnRatio">;

/** @hidden */
export interface SelectablePropertyBlockProps extends PropertyCategoryBlockProps, ReducedPropertyListProps {
  category: PropertyCategory;
}

/** @hidden */
export interface SelectablePropertyBlockState {
  keyMatched: boolean;
  columnRatio: number;
}

/**
 * Wrapped PropertyCategoryBlock React component with list of properties and render optimization
 * @hidden
 */
export class SelectablePropertyBlock extends React.Component<SelectablePropertyBlockProps, SelectablePropertyBlockState> {
  private readonly _initialRatio = 0.25;
  private readonly _minRatio = 0.15;
  private readonly _maxRatio = 0.6;

  public state: SelectablePropertyBlockState = { keyMatched: false, columnRatio: this._initialRatio };

  private _onRatioChanged = (ratio: number) => {
    if (ratio < this._minRatio)
      ratio = this._minRatio;
    if (ratio > this._maxRatio)
      ratio = this._maxRatio;
    this.setState({ columnRatio: ratio });
  }

  public shouldComponentUpdate(nextProps: SelectablePropertyBlockProps, nextState: SelectablePropertyBlockState): boolean {
    if (this.props.category !== nextProps.category
      || this.props.properties !== nextProps.properties
      || this.props.orientation !== nextProps.orientation
      || this.props.onExpansionToggled !== nextProps.onExpansionToggled
      || this.props.onPropertyClicked !== nextProps.onPropertyClicked
      || this.state.columnRatio !== nextState.columnRatio
      || this.props.editingPropertyKey !== nextProps.editingPropertyKey
    )
      return true;

    // If keys are not the same it means component might need an update, but that's not enough.
    // Keys must EITHER both match now and before (when a different property is selected in the same category)
    // OR match now, but not before/don't match now, but match before (when a property in a different category is selected)
    return this.props.selectedPropertyKey !== nextProps.selectedPropertyKey
      && ((nextState.keyMatched !== this.state.keyMatched) || (!!nextState.keyMatched && !!this.state.keyMatched));
  }

  public static doesKeyMatchAnyProperty(props: SelectablePropertyBlockProps, key?: string) {
    if (!key)
      return false;
    for (const propertyRecord of props.properties) {
      if (getPropertyKey(props.category, propertyRecord) === key)
        return true;
    }
    return false;
  }

  public static getDerivedStateFromProps(props: SelectablePropertyBlockProps) {
    return { keyMatched: SelectablePropertyBlock.doesKeyMatchAnyProperty(props, props.selectedPropertyKey) };
  }

  public render() {
    const listProps = {
      ...(_.omit(this.props, ["onExpansionToggled"])),
      onColumnChanged: this._onRatioChanged,
      columnRatio: this.state.columnRatio,
    };
    return (
      <PropertyCategoryBlock category={this.props.category} onExpansionToggled={this.props.onExpansionToggled}>
        <PropertyList {...listProps} />
      </PropertyCategoryBlock>
    );
  }
}
