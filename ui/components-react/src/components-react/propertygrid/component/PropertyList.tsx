/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */

import classnames from "classnames";
import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import type { PropertyUpdatedArgs } from "../../editors/EditorContainer.js";
import type { ActionButtonRenderer } from "../../properties/renderers/ActionButtonRenderer.js";
import type { PropertyGridColumnInfo } from "../../properties/renderers/PropertyGridColumns.js";
import { PropertyRenderer } from "../../properties/renderers/PropertyRenderer.js";
import type { PropertyValueRendererManager } from "../../properties/ValueRendererManager.js";
import type { PropertyCategory } from "../PropertyDataProvider.js";
import { Orientation } from "../../common/Orientation.js";

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface PropertyListBaseProps extends CommonProps {
  orientation: Orientation;
  width: number;
  category?: PropertyCategory;
  properties: PropertyRecord[];
  selectedPropertyKey?: string;
  onPropertyClicked?: (property: PropertyRecord, key?: string) => void;
  onPropertyRightClicked?: (property: PropertyRecord, key?: string) => void;
  onPropertyContextMenu?: (
    property: PropertyRecord,
    e: React.MouseEvent
  ) => void;
  columnRatio?: number;
  /** Callback to column ratio changed event */
  onColumnChanged?: (ratio: number) => void | {
    ratio: number;
  };
  propertyValueRendererManager?: PropertyValueRendererManager;
  editingPropertyKey?: string;
  onEditCommit?: (
    args: PropertyUpdatedArgs,
    category: PropertyCategory
  ) => void;
  onEditCancel?: () => void;
  /** Enables/disables property hovering effect */
  isPropertyHoverEnabled?: boolean;
  /** Enables/disables property selection */
  isPropertySelectionEnabled?: boolean;
  /** Enables/disables property right click selection */
  isPropertyRightClickSelectionEnabled?: boolean;
  /** Array of action button renderers */
  actionButtonRenderers?: ActionButtonRenderer[];
  /** Is resize handle hovered */
  isResizeHandleHovered?: boolean;
  /** Callback to hover event change */
  onResizeHandleHoverChanged?: (isHovered: boolean) => void;
  /** Is resize handle being dragged */
  isResizeHandleBeingDragged?: boolean;
  /** Callback to drag event change */
  onResizeHandleDragChanged?: (isDragStarted: boolean) => void;
  /** Information for styling property grid columns */
  columnInfo?: PropertyGridColumnInfo;
}

/** @public */
interface PropertyListLegacyProps extends PropertyListBaseProps {
  /**
   * Specifies which editors system should be used: legacy or the new one.
   * @default "legacy"
   * @beta
   * @deprecated in 5.30. Legacy editors system is deprecated. Use `editorSystem: "new"`.
   */
  editorSystem?: "legacy";
}

/** @public */
interface PropertyListNewProps extends PropertyListBaseProps {
  /**
   * Specifies which editors system should be used: legacy or the new one.
   * @default "legacy"
   * @beta
   */
  editorSystem: "new";
}

/** Properties of [[PropertyList]] React component
 * @public
 */
export type PropertyListProps = PropertyListLegacyProps | PropertyListNewProps;

interface PropertyListComponent {
  /**
   * React Component that renders struct and array properties
   * @public
   */
  (props: PropertyListNewProps): React.JSX.Element;
  /**
   * @deprecated in 5.30. Use `PropertyList` with `editorSystem="new"` instead.
   * @public
   */
  (props: PropertyListLegacyProps): React.JSX.Element;
  /** @public */
  (props: PropertyListProps): React.JSX.Element;
}

/**
 * Get unique key for property record
 * @internal
 */
export function getPropertyKey(
  propertyCategory: PropertyCategory,
  propertyRecord: PropertyRecord
) {
  return propertyCategory.name + propertyRecord.property.name;
}

/** A React component that renders multiple properties within a category as a list.
 * @public
 */
export const PropertyList: PropertyListComponent = (props) => {
  return <PropertyListImpl {...props} />;
};

class PropertyListImpl extends React.Component<PropertyListProps> {
  constructor(props: PropertyListProps) {
    super(props);
  }

  private _listRef = React.createRef<HTMLDivElement>();

  private _onEditCommit = (args: PropertyUpdatedArgs) => {
    if (this.props.onEditCommit && this.props.category)
      this.props.onEditCommit(args, this.props.category);
  };

  public override render() {
    const propertyListClassName = classnames(
      this.props.orientation === Orientation.Horizontal
        ? "components-property-list--horizontal"
        : "components-property-list--vertical",
      this.props.className
    );

    return (
      <div
        className={propertyListClassName}
        style={this.props.style}
        ref={this._listRef}
      >
        {this.props.properties.map((propertyRecord: PropertyRecord) => {
          const key = this.props.category
            ? getPropertyKey(this.props.category, propertyRecord)
            : propertyRecord.property.name;
          return (
            <PropertyRenderer
              key={key}
              uniqueKey={key}
              isHoverable={this.props.isPropertyHoverEnabled}
              isSelectable={this.props.isPropertySelectionEnabled}
              isSelected={key === this.props.selectedPropertyKey}
              propertyRecord={propertyRecord}
              orientation={this.props.orientation}
              onClick={
                propertyRecord.value.valueFormat ===
                PropertyValueFormat.Primitive
                  ? this.props.onPropertyClicked
                  : undefined
              }
              onRightClick={
                propertyRecord.value.valueFormat ===
                PropertyValueFormat.Primitive
                  ? this.props.onPropertyRightClicked
                  : undefined
              }
              onContextMenu={this.props.onPropertyContextMenu}
              columnRatio={this.props.columnRatio}
              onColumnRatioChanged={this.props.onColumnChanged}
              propertyValueRendererManager={
                this.props.propertyValueRendererManager
              }
              isEditing={key === this.props.editingPropertyKey}
              onEditCommit={this._onEditCommit}
              onEditCancel={this.props.onEditCancel}
              width={this.props.width}
              actionButtonRenderers={this.props.actionButtonRenderers}
              isResizeHandleHovered={this.props.isResizeHandleHovered}
              onResizeHandleHoverChanged={this.props.onResizeHandleHoverChanged}
              isResizeHandleBeingDragged={this.props.isResizeHandleBeingDragged}
              onResizeHandleDragChanged={this.props.onResizeHandleDragChanged}
              columnInfo={this.props.columnInfo}
              // eslint-disable-next-line @typescript-eslint/no-deprecated
              editorSystem={this.props.editorSystem}
            />
          );
        })}
      </div>
    );
  }
}
