/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */
import "../../../properties/renderers/NonPrimitivePropertyRenderer.scss";
import * as React from "react";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { CommonPropertyRenderer } from "../../../properties/renderers/CommonPropertyRenderer";
import type { PrimitiveRendererProps } from "../../../properties/renderers/PrimitivePropertyRenderer";
import { NonPrimitivePropertyLabelRenderer } from "../../../properties/renderers/label/NonPrimitivePropertyLabelRenderer";
import { PropertyView } from "../../../properties/renderers/PropertyView";

/** Properties of [[FlatNonPrimitivePropertyRenderer]] React component
 * @internal
 */
export interface FlatNonPrimitivePropertyRendererProps
  extends PrimitiveRendererProps {
  isExpanded: boolean;
  onExpandToggled: () => void;
}

/** React Component that renders flat struct and array properties
 * @internal
 */
export class FlatNonPrimitivePropertyRenderer extends React.Component<FlatNonPrimitivePropertyRendererProps> {
  constructor(props: FlatNonPrimitivePropertyRendererProps) {
    super(props);
  }

  private _onExpanded = () => {
    if (!this.props.isExpanded) this.props.onExpandToggled();
  };

  private _onCollapsed = () => {
    if (this.props.isExpanded) this.props.onExpandToggled();
  };

  private getLabel(
    props: FlatNonPrimitivePropertyRendererProps
  ): React.ReactNode {
    const { orientation, indentation, width, columnRatio, columnInfo } = props;
    const offset = CommonPropertyRenderer.getLabelOffset(
      indentation,
      orientation,
      width,
      columnRatio,
      columnInfo?.minLabelWidth
    );

    let displayLabel = props.propertyRecord.property.displayLabel;
    if (props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      displayLabel = `${displayLabel} (${props.propertyRecord.value.items.length})`;

    return (
      <NonPrimitivePropertyLabelRenderer
        isExpanded={props.isExpanded}
        onExpand={this._onExpanded}
        onCollapse={this._onCollapsed}
        offset={offset}
        renderColon={false}
      >
        {displayLabel}
      </NonPrimitivePropertyLabelRenderer>
    );
  }

  public override render() {
    const { indentation, ...props } = this.props;
    return <PropertyView labelElement={this.getLabel(this.props)} {...props} />;
  }
}
