/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import { HighlightedText } from "../../common/HighlightedText.js";
import type { HighlightingComponentProps } from "../../common/HighlightingComponentProps.js";
import { CommonPropertyRenderer } from "./CommonPropertyRenderer.js";
import { PrimitivePropertyLabelRenderer } from "./label/PrimitivePropertyLabelRenderer.js";
import type { SharedRendererProps } from "./PropertyRenderer.js";
import { PropertyView } from "./PropertyView.js";
import { Orientation } from "../../common/Orientation.js";

/** Properties of [[CustomizablePropertyRenderer]] React component
 * @public
 */
interface CustomizablePropertyRendererProps extends SharedRendererProps {
  /** Property value as a React element */
  valueElement?: React.ReactNode;
  /** Render callback for property value. If specified, `valueElement` is ignored */
  valueElementRenderer?: () => React.ReactNode;
  /** Multiplier of how much the property is indented to the right */
  indentation?: number;
  /** Properties used for highlighting */
  highlight?: HighlightingComponentProps;
}

/** React Component that renders customizable properties
 * @public
 */
export function CustomizablePropertyRenderer(
  props: CustomizablePropertyRendererProps
) {
  const { indentation, highlight, ...passthroughProps } = props;
  const displayLabel = props.propertyRecord.property.displayLabel;
  const offset = CommonPropertyRenderer.getLabelOffset(
    indentation,
    passthroughProps.orientation,
    passthroughProps.width,
    passthroughProps.columnRatio,
    passthroughProps.columnInfo?.minLabelWidth
  );

  const activeMatchIndex =
    props.propertyRecord.property.name ===
    highlight?.activeHighlight?.highlightedItemIdentifier
      ? highlight.activeHighlight.highlightIndex
      : undefined;
  const label = highlight
    ? HighlightedText({
        text: displayLabel,
        searchText: highlight.highlightedText,
        activeMatchIndex,
      })
    : displayLabel;

  return (
    <PropertyView
      {...passthroughProps}
      labelElement={
        <PrimitivePropertyLabelRenderer
          offset={offset}
          renderColon={props.orientation === Orientation.Horizontal}
          tooltip={displayLabel}
        >
          {label}
        </PrimitivePropertyLabelRenderer>
      }
    />
  );
}
