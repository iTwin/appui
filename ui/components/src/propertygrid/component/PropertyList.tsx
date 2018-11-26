/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module PropertyGrid */

import * as React from "react";
import { Orientation } from "@bentley/ui-core";
import { PropertyRecord, PropertyValueFormat } from "../../properties";
import { PropertyRenderer } from "../../properties/renderers/PropertyRenderer";
import { PropertyCategory } from "../PropertyDataProvider";
import { PropertyValueRendererManager } from "../../properties/ValueRendererManager";
import { PropertyUpdatedArgs } from "../../editors/EditorContainer";

/** Properties of [[PropertyList]] React component */
export interface PropertyListProps {
  orientation: Orientation;
  category?: PropertyCategory;
  properties: PropertyRecord[];
  selectedPropertyKey?: string;
  onPropertyClicked?: (property: PropertyRecord, key?: string) => void;
  columnRatio?: number;
  onColumnChanged?: (ratio: number) => void;
  propertyValueRendererManager?: PropertyValueRendererManager;
  editingPropertyKey?: string;
  onEditCommit?: (args: PropertyUpdatedArgs, category: PropertyCategory) => void;
  onEditCancel?: () => void;
  /** Enables/disables property selection */
  isPropertySelectionEnabled?: boolean;
}

/**
 * Get unique key for property record
 * @hidden
 */
export function getPropertyKey(propertyCategory: PropertyCategory, propertyRecord: PropertyRecord) {
  return propertyCategory.name + propertyRecord.property.name;
}

/** A React component that renders multiple properties within a category as a list. */
export class PropertyList extends React.Component<PropertyListProps> {
  private _onEditCommit = (args: PropertyUpdatedArgs) => {
    if (this.props.onEditCommit && this.props.category)
      this.props.onEditCommit(args, this.props.category);
  }

  public render() {
    const propertyListClassName = (this.props.orientation === Orientation.Horizontal)
      ? "components-property-list--horizontal" : "components-property-list--vertical";
    return (
      <div className={propertyListClassName}>
        {this.props.properties.map((propertyRecord: PropertyRecord) => {
          const key = this.props.category ? getPropertyKey(this.props.category, propertyRecord) : propertyRecord.property.name;
          return (
            <PropertyRenderer
              key={key}
              uniqueKey={key}
              isSelectable={this.props.isPropertySelectionEnabled}
              isSelected={key === this.props.selectedPropertyKey}
              propertyRecord={propertyRecord}
              orientation={this.props.orientation}
              onClick={propertyRecord.value.valueFormat === PropertyValueFormat.Primitive ? this.props.onPropertyClicked : undefined}
              columnRatio={this.props.columnRatio}
              onColumnRatioChanged={this.props.onColumnChanged}
              propertyValueRendererManager={this.props.propertyValueRendererManager}
              isEditing={key === this.props.editingPropertyKey}
              onEditCommit={this._onEditCommit}
              onEditCancel={this.props.onEditCancel}
            />);
        })}
      </div>
    );
  }
}
