/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { HighlightingComponentProps } from "../../common/HighlightingComponentProps";
import type { PropertyUpdatedArgs } from "../../editors/EditorContainer";
import { EditorContainer } from "../../editors/EditorContainer";
import { UiComponents } from "../../UiComponents";
import type { PropertyValueRendererManager } from "../ValueRendererManager";
import type { ActionButtonRenderer } from "./ActionButtonRenderer";
import { CommonPropertyRenderer } from "./CommonPropertyRenderer";
import { NonPrimitivePropertyRenderer } from "./NonPrimitivePropertyRenderer";
import type { PrimitiveRendererProps } from "./PrimitivePropertyRenderer";
import { PrimitivePropertyRenderer } from "./PrimitivePropertyRenderer";
import type { PropertyGridColumnInfo } from "./PropertyGridColumns";
import type { Orientation } from "../../common/Orientation";

/** Properties shared by all renderers and PropertyView
 * @public
 */
export interface SharedRendererProps {
  /** PropertyRecord to render */
  propertyRecord: PropertyRecord;
  /** Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided */
  uniqueKey?: string;
  /** Orientation to use for displaying the property */
  orientation: Orientation;
  /** Controls component selection */
  isSelected?: boolean;
  /** Called when property gets clicked. If undefined, clicking is disabled */
  onClick?: (property: PropertyRecord, key?: string) => void;
  /** Called when property gets right clicked. If undefined, right clicking is not working */
  onRightClick?: (property: PropertyRecord, key?: string) => void;
  /** Called to show a context menu for properties */
  onContextMenu?: (property: PropertyRecord, e: React.MouseEvent) => void;
  /** Ratio between label and value cells */
  columnRatio?: number;
  /** Callback to column ratio changed event */
  onColumnRatioChanged?: (ratio: number) => void | {
    ratio: number;
  };
  /** Indicates that properties have *hover* effect */
  isHoverable?: boolean;
  /** Indicates that properties can be selected */
  isSelectable?: boolean;
  /** Width of the whole property element */
  width?: number;
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

/** Properties of [[PropertyRenderer]] React component
 * @public
 */
export interface PropertyRendererProps extends SharedRendererProps {
  /** Custom value renderer */
  propertyValueRendererManager?: PropertyValueRendererManager;
  /** Multiplier of how much the property is indented to the right */
  indentation?: number;
  /** Indicates property is being edited  */
  isEditing?: boolean;
  /** Called when property edit is committed. */
  onEditCommit?: (args: PropertyUpdatedArgs) => void;
  /** Called when property edit is cancelled. */
  onEditCancel?: () => void;
  /** Props used for highlighting. */
  highlight?: HighlightingComponentProps;
}

/** State of [[PropertyRenderer]] React component
 * @internal
 */
interface PropertyRendererState {
  /** Currently loaded property value */
  displayValue?: React.ReactNode;
}

/**  A React component that renders properties
 * @public
 */
export class PropertyRenderer extends React.Component<
  PropertyRendererProps,
  PropertyRendererState
> {
  public override readonly state: Readonly<PropertyRendererState> = {
    displayValue: UiComponents.translate("general.loading"),
  };

  constructor(props: PropertyRendererProps) {
    super(props);
  }

  public static getLabelOffset(
    indentation?: number,
    orientation?: Orientation,
    width?: number,
    columnRatio?: number,
    minColumnLabelWidth?: number
  ): number {
    return CommonPropertyRenderer.getLabelOffset(
      indentation,
      orientation,
      width,
      columnRatio,
      minColumnLabelWidth
    );
  }

  private updateDisplayValue(props: PropertyRendererProps) {
    if (props.isEditing) {
      this.updateDisplayValueAsEditor(props);
      return;
    }

    const displayValue = CommonPropertyRenderer.createNewDisplayValue(
      props.orientation,
      props.propertyRecord,
      props.indentation,
      props.propertyValueRendererManager
    );
    this.setState({ displayValue });
  }

  private _onEditCommit = (args: PropertyUpdatedArgs) => {
    if (this.props.onEditCommit) this.props.onEditCommit(args);
  };

  private _onEditCancel = () => {
    if (this.props.onEditCancel) this.props.onEditCancel();
  };

  /** Display property record value in an editor */
  public updateDisplayValueAsEditor(props: PropertyRendererProps) {
    this.setState({
      displayValue: (
        <EditorContainer
          propertyRecord={props.propertyRecord}
          onCommit={this._onEditCommit}
          onCancel={this._onEditCancel}
          setFocus={true}
        />
      ),
    });
  }

  public override componentDidMount() {
    this.updateDisplayValue(this.props);
  }

  public override componentDidUpdate(prevProps: PropertyRendererProps) {
    if (
      prevProps.propertyRecord !== this.props.propertyRecord ||
      prevProps.isEditing !== this.props.isEditing ||
      prevProps.orientation !== this.props.orientation
    )
      this.updateDisplayValue(this.props);
  }

  public override render() {
    const {
      propertyValueRendererManager,
      isEditing,
      onEditCommit,
      onEditCancel,
      ...props
    } = this.props;
    const primitiveRendererProps: PrimitiveRendererProps = {
      ...props,
      valueElement: this.state.displayValue,
      indentation: this.props.indentation,
    };

    switch (this.props.propertyRecord.value.valueFormat) {
      case PropertyValueFormat.Primitive:
        return <PrimitivePropertyRenderer {...primitiveRendererProps} />;
      case PropertyValueFormat.Array:
        // If array is empty, render it as a primitive property
        if (
          this.props.propertyRecord.value.valueFormat ===
            PropertyValueFormat.Array &&
          this.props.propertyRecord.value.items.length === 0
        )
          return <PrimitivePropertyRenderer {...primitiveRendererProps} />;
      // eslint-disable-next-line no-fallthrough
      case PropertyValueFormat.Struct:
        return (
          <NonPrimitivePropertyRenderer
            isCollapsible={true}
            {...primitiveRendererProps}
          />
        );
    }
  }
}
