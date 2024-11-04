/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { HighlightingComponentProps } from "../../../common/HighlightingComponentProps.js";
import type { PropertyUpdatedArgs } from "../../../editors/EditorContainer.js";
import { EditorContainer } from "../../../editors/EditorContainer.js";
import { CommonPropertyRenderer } from "../../../properties/renderers/CommonPropertyRenderer.js";
import type { PrimitiveRendererProps } from "../../../properties/renderers/PrimitivePropertyRenderer.js";
import type { SharedRendererProps } from "../../../properties/renderers/PropertyRenderer.js";
import { PropertyValueRendererManager } from "../../../properties/ValueRendererManager.js";
import type { PropertyCategory } from "../../PropertyDataProvider.js";
import { FlatNonPrimitivePropertyRenderer } from "./FlatNonPrimitivePropertyRenderer.js";
import { CustomizablePropertyRenderer } from "../../../properties/renderers/CustomizablePropertyRenderer.js";
import { Orientation } from "../../../common/Orientation.js";

/** Properties of [[FlatPropertyRenderer]] React component
 * @internal
 */
export interface FlatPropertyRendererProps extends SharedRendererProps {
  category?: PropertyCategory;
  /** Custom value renderer */
  propertyValueRendererManager?: PropertyValueRendererManager;
  /** Multiplier of how much the property is indented to the right */
  indentation?: number;
  /** Indicates property is being edited */
  isEditing?: boolean;
  /** Callback to determine which editors should be always visible */
  showOnlyEditor?: (property: PropertyRecord) => boolean;
  /** Called when property edit is committed. */
  onEditCommit?: (
    args: PropertyUpdatedArgs,
    category: PropertyCategory
  ) => void;
  /** Called when property edit is cancelled. */
  onEditCancel?: () => void;
  /** Whether property value is displayed in expanded state. */
  isExpanded: boolean;
  /** Called when toggling between expanded and collapsed property value display state. */
  onExpansionToggled: () => void;
  /** Reports property height changes. */
  onHeightChanged?: (newHeight: number) => void;

  highlight?: HighlightingComponentProps & {
    applyOnLabel: boolean;
    applyOnValue: boolean;
  };

  children?: never;
}

/**  A React component that renders flat properties
 * @internal
 */
export const FlatPropertyRenderer: React.FC<FlatPropertyRendererProps> = (
  props
) => {
  const { propertyValueRendererManager, highlight, ...passthroughProps } =
    props;

  const valueElementRenderer = () => <DisplayValue {...props} />;

  const primitiveRendererProps: PrimitiveRendererProps = {
    ...passthroughProps,
    valueElementRenderer,
    indentation: props.indentation,
  };

  const rendererManager =
    propertyValueRendererManager ?? PropertyValueRendererManager.defaultManager;
  const hasCustomRenderer = rendererManager.hasCustomRenderer(
    passthroughProps.propertyRecord
  );

  switch (props.propertyRecord.value.valueFormat) {
    case PropertyValueFormat.Primitive:
      return (
        <CustomizablePropertyRenderer
          highlight={highlight?.applyOnLabel ? highlight : undefined}
          {...primitiveRendererProps}
        />
      );

    case PropertyValueFormat.Array:
      // If array is empty or has a custom renderer registered, render it as a customizable property
      if (props.propertyRecord.value.items.length === 0 || hasCustomRenderer)
        return (
          <CustomizablePropertyRenderer
            highlight={highlight?.applyOnLabel ? highlight : undefined}
            {...primitiveRendererProps}
          />
        );

    // eslint-disable-next-line no-fallthrough
    case PropertyValueFormat.Struct:
      // If a custom renderer is registered for the struct property, render it as a customizable property
      if (hasCustomRenderer) {
        return (
          <CustomizablePropertyRenderer
            highlight={highlight?.applyOnLabel ? highlight : undefined}
            {...primitiveRendererProps}
          />
        );
      }

      return (
        <FlatNonPrimitivePropertyRenderer
          {...primitiveRendererProps}
          isExpanded={props.isExpanded}
          onExpandToggled={props.onExpansionToggled}
          valueElement={undefined}
          valueElementRenderer={undefined}
        />
      );
  }
};

interface DisplayValueProps {
  isEditing?: boolean;
  isPropertyEditingEnabled?: boolean;
  showOnlyEditor?: (property: PropertyRecord) => boolean;
  propertyRecord: PropertyRecord;

  orientation: Orientation;
  columnRatio?: number;
  /** Pass width to rerender component as property grid width changes */
  width?: number;
  indentation?: number;
  propertyValueRendererManager?: PropertyValueRendererManager;
  isExpanded?: boolean;
  onExpansionToggled?: () => void;
  onHeightChanged?: (newHeight: number) => void;

  category?: PropertyCategory;
  onEditCancel?: () => void;
  onEditCommit?: (
    args: PropertyUpdatedArgs,
    category: PropertyCategory
  ) => void;

  highlight?: HighlightingComponentProps & {
    applyOnLabel: boolean;
    applyOnValue: boolean;
  };
}

const DisplayValue: React.FC<DisplayValueProps> = (props) => {
  useResetHeightOnEdit(
    props.orientation,
    props.isEditing,
    props.onHeightChanged
  );

  const showsOnlyEditor = props.showOnlyEditor
    ? props.showOnlyEditor(props.propertyRecord)
    : false;

  if (props.isEditing || (showsOnlyEditor && props.isPropertyEditingEnabled)) {
    const _onEditCommit = (args: PropertyUpdatedArgs) => {
      if (props.category) props.onEditCommit?.(args, props.category);
    };

    return (
      <EditorContainer
        propertyRecord={props.propertyRecord}
        onCommit={_onEditCommit}
        onCancel={props.onEditCancel ?? (() => {})}
        setFocus={props.isEditing}
      />
    );
  }

  return CommonPropertyRenderer.createNewDisplayValue(
    props.orientation,
    props.propertyRecord,
    props.indentation,
    props.propertyValueRendererManager,
    props.isExpanded,
    props.onExpansionToggled,
    props.onHeightChanged,
    props.highlight
  );
};

function useResetHeightOnEdit(
  orientation: Orientation,
  isEditing?: boolean,
  onHeightChanged?: (newHeight: number) => void
) {
  const previousEditingStatusRef = React.useRef(isEditing);
  React.useEffect(() => {
    if (!previousEditingStatusRef.current && isEditing) {
      onHeightChanged?.(orientation === Orientation.Vertical ? 48 : 28);
    }

    previousEditingStatusRef.current = isEditing;
  });
}
