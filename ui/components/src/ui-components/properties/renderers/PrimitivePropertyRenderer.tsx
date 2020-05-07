/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import _ from "lodash";
import * as React from "react";
import { Orientation } from "@bentley/ui-core";
import { PrimitivePropertyLabelRenderer } from "./label/PrimitivePropertyLabelRenderer";
import { PropertyRenderer, SharedRendererProps } from "./PropertyRenderer";
import { PropertyView } from "./PropertyView";

/** Properties of [[PrimitivePropertyRenderer]] React component
 * @public
 */
export interface PrimitiveRendererProps extends SharedRendererProps {
  /** Property value as a React element */
  valueElement?: React.ReactNode;
  /** Multiplier of how much the property is indented to the right */
  indentation?: number;
}

/** React Component that renders primitive properties
 * @public
 */
export class PrimitivePropertyRenderer extends React.Component<PrimitiveRendererProps> {
  constructor(props: PrimitiveRendererProps) {
    super(props);
  }

  /** @internal */
  public render() {
    const { children, indentation, ...props } = this.props;
    const offset = PropertyRenderer.getLabelOffset(this.props.indentation);
    return (
      <PropertyView
        {...props}
        labelElement={
          <PrimitivePropertyLabelRenderer offset={offset} renderColon={this.props.orientation === Orientation.Horizontal}>
            {this.props.propertyRecord.property.displayLabel}
          </PrimitivePropertyLabelRenderer>}
      />
    );
  }
}
