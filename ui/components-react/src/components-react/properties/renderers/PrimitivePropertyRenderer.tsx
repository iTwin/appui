/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import type { HighlightingComponentProps } from "../../common/HighlightingComponentProps.js";
import type { SharedRendererProps } from "./PropertyRenderer.js";
import { CustomizablePropertyRenderer } from "./CustomizablePropertyRenderer.js";
import React from "react";

/** Properties of [[PrimitivePropertyRenderer]] React component
 * @public
 */
export interface PrimitiveRendererProps extends SharedRendererProps {
  /** Property value as a React element */
  valueElement?: React.ReactNode;
  /** Render callback for property value. If specified, `valueElement` is ignored */
  valueElementRenderer?: () => React.ReactNode;
  /** Multiplier of how much the property is indented to the right */
  indentation?: number;
  /** Properties used for highlighting */
  highlight?: HighlightingComponentProps;
}

/** React Component that renders primitive properties
 * @public
 */
export class PrimitivePropertyRenderer extends React.Component<PrimitiveRendererProps> {
  constructor(props: PrimitiveRendererProps) {
    super(props);
  }

  public override render() {
    return <CustomizablePropertyRenderer {...this.props} />;
  }
}
