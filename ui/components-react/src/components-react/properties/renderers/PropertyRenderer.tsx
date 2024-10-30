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
import type { HighlightingComponentProps } from "../../common/HighlightingComponentProps.js";
import type { PropertyUpdatedArgs } from "../../editors/EditorContainer.js";
import { EditorContainer } from "../../editors/EditorContainer.js";
import type { PropertyValueRendererManager } from "../ValueRendererManager.js";
import type { ActionButtonRenderer } from "./ActionButtonRenderer.js";
import { CommonPropertyRenderer } from "./CommonPropertyRenderer.js";
import { NonPrimitivePropertyRenderer } from "./NonPrimitivePropertyRenderer.js";
import type { PrimitiveRendererProps } from "./PrimitivePropertyRenderer.js";
import { PrimitivePropertyRenderer } from "./PrimitivePropertyRenderer.js";
import type { PropertyGridColumnInfo } from "./PropertyGridColumns.js";
import type { Orientation } from "../../common/Orientation.js";
import { useTranslation } from "../../l10n/useTranslation.js";

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
  /** Enables/disables property editing */
  isPropertyEditingEnabled?: boolean;
  /** Callback to hover event change */
  onResizeHandleHoverChanged?: (isHovered: boolean) => void;
  /** Is resize handle being dragged */
  isResizeHandleBeingDragged?: boolean;
  /** Callback to drag event change */
  onResizeHandleDragChanged?: (isDragStarted: boolean) => void;
  /** Information for styling property grid columns */
  columnInfo?: PropertyGridColumnInfo;
  /** Callback to determine which editors should be always visible */
  showOnlyEditor?: (property: PropertyRecord) => boolean;
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

/**  A React component that renders properties
 * @public
 */
export const PropertyRenderer = (props: PropertyRendererProps) => {
  const { translate } = useTranslation();
  const [displayValue, setDisplayValue] = React.useState<React.ReactNode>(() =>
    translate("general.loading")
  );

  const {
    isEditing,
    orientation,
    propertyRecord,
    indentation,
    propertyValueRendererManager,
    onEditCommit,
    onEditCancel,
    ...restProps
  } = props;

  const onCommit = React.useCallback(
    (args: PropertyUpdatedArgs) => {
      if (onEditCommit) onEditCommit(args);
    },
    [onEditCommit]
  );

  const onCancel = React.useCallback(() => {
    if (onEditCancel) onEditCancel();
  }, [onEditCancel]);

  React.useEffect(() => {
    if (isEditing) {
      setDisplayValue(
        <EditorContainer
          propertyRecord={propertyRecord}
          onCommit={onCommit}
          onCancel={onCancel}
          setFocus={true}
        />
      );
      return;
    }

    setDisplayValue(
      CommonPropertyRenderer.createNewDisplayValue(
        orientation,
        propertyRecord,
        indentation,
        propertyValueRendererManager
      )
    );
  }, [
    orientation,
    propertyRecord,
    indentation,
    propertyValueRendererManager,
    onCommit,
    onCancel,
    isEditing,
  ]);

  const primitiveRendererProps: PrimitiveRendererProps = {
    ...restProps,
    propertyRecord,
    orientation,
    indentation,
    valueElement: displayValue,
  };

  switch (props.propertyRecord.value.valueFormat) {
    case PropertyValueFormat.Primitive:
      return <PrimitivePropertyRenderer {...primitiveRendererProps} />;
    case PropertyValueFormat.Array:
      // If array is empty, render it as a primitive property
      if (
        props.propertyRecord.value.valueFormat === PropertyValueFormat.Array &&
        props.propertyRecord.value.items.length === 0
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
};

PropertyRenderer.getLabelOffset = (
  indentation?: number,
  orientation?: Orientation,
  width?: number,
  columnRatio?: number,
  minColumnLabelWidth?: number
) => {
  return CommonPropertyRenderer.getLabelOffset(
    indentation,
    orientation,
    width,
    columnRatio,
    minColumnLabelWidth
  );
};
