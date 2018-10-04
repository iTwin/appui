/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module PropertyGrid */

import * as React from "react";
import { DisposeFunc } from "@bentley/bentleyjs-core";
import { Orientation } from "@bentley/ui-core";
import { PropertyRecord } from "../../properties";
import { PropertyDataProvider, PropertyCategory, PropertyData } from "../PropertyDataProvider";
import { PropertyCategoryBlock } from "./PropertyCategoryBlock";
import { PropertyRenderer } from "./PropertyRenderer";

/** Props for PropertyGrid React component */
export interface PropertyGridProps {
  dataProvider: PropertyDataProvider;
  orientation: Orientation;
}

export interface PropertyGridCategory {
  propertyCategory: PropertyCategory;
  propertyCount: number;
  properties: PropertyRecord[];
}

export interface PropertyGridState {
  categories: PropertyGridCategory[];
}

/** PropertyGrid React component.
 */
export class PropertyGrid extends React.Component<PropertyGridProps, PropertyGridState> {

  private _dataChangesListenerDisposeFunc?: DisposeFunc;
  private _isMounted = false;

  public readonly state: Readonly<PropertyGridState> = {
    categories: [],
  };

  constructor(props: PropertyGridProps) {
    super(props);
    this._dataChangesListenerDisposeFunc = this.props.dataProvider.onDataChanged.addListener(this._onPropertyDataChanged);
  }

  public componentDidMount() {
    this._isMounted = true;
    this.gatherData(this.props.dataProvider);
  }

  public componentWillUnmount() {
    if (this._dataChangesListenerDisposeFunc) {
      this._dataChangesListenerDisposeFunc();
      this._dataChangesListenerDisposeFunc = undefined;
    }
    this._isMounted = false;
  }

  public componentDidUpdate() {
    if (this._dataChangesListenerDisposeFunc)
      this._dataChangesListenerDisposeFunc();
    this._dataChangesListenerDisposeFunc = this.props.dataProvider.onDataChanged.addListener(this._onPropertyDataChanged);
  }

  private _onPropertyDataChanged = () => {
    this.gatherData(this.props.dataProvider);
  }

  private _shouldExpandCategory = (category: PropertyCategory): boolean => {
    if (category.expand)
      return true;
    return this.state.categories.some((stateCategory: PropertyGridCategory) => {
      return stateCategory.propertyCategory.name === category.name && stateCategory.propertyCategory.expand;
    });
  }

  private async gatherData(dataProvider: PropertyDataProvider) {
    const propertyData: PropertyData = await dataProvider.getData();
    if (!this._isMounted)
      return;

    const categories = new Array<PropertyGridCategory>();
    propertyData.categories.map((category: PropertyCategory, _index: number) => {
      const gridCategory: PropertyGridCategory = {
        propertyCategory: { ...category, expand: this._shouldExpandCategory(category) },
        propertyCount: propertyData.records[category.name].length,
        properties: propertyData.records[category.name],
      };
      categories.push(gridCategory);
    });
    this.setState({ categories });
  }

  private _toggleCategoryExpansion = (category: PropertyGridCategory) => {
    const index = this.state.categories.findIndex((c) => c.propertyCategory.name === category.propertyCategory.name);
    if (-1 === index)
      return;

    const newCategory = {
      ...category,
      propertyCategory: {
        ...category.propertyCategory,
        expand: !category.propertyCategory.expand,
      },
    };
    const categories = [...this.state.categories];
    categories[index] = newCategory;
    this.setState({ categories });
  }

  public render() {
    return (
      <div className="PropertyGridWrapper">
        <div className="BwcExpandableBlocksList PropertyGrid">
          {
            this.state.categories.map((gridCategory: PropertyGridCategory) => {
              const onCategoryHeaderPressed = () => {
                this._toggleCategoryExpansion(gridCategory);
              };

              return (
                <PropertyCategoryBlock key={gridCategory.propertyCategory.name} category={gridCategory.propertyCategory} onBlockHeaderPressed={onCategoryHeaderPressed}>
                  <PropertyList orientation={this.props.orientation}>
                    {
                      gridCategory.properties.map((propertyRecord: PropertyRecord) => (
                        <PropertyRenderer key={propertyRecord.property.name} propertyRecord={propertyRecord} orientation={this.props.orientation} />
                      ))
                    }
                  </PropertyList>
                </PropertyCategoryBlock>
              );
            })
          }
        </div>
      </div>
    );
  }
}

interface PropertyListProps {
  orientation: Orientation;
}

/** Container component for properties within a category.
 */
class PropertyList extends React.Component<PropertyListProps> {
  public render() {
    if (this.props.orientation === Orientation.Horizontal) {
      return (
        <table className="HorizontalPropertyList">
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      );
    } else {
      return (
        <div className="VerticalPropertyList">
          {this.props.children}
        </div>
      );
    }
  }
}
