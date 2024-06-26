/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import "./PropertyLabelRenderer.scss";
import * as React from "react";
import classnames from "classnames";

/** Base properties for a property label renderer
 * @public
 */
export interface PropertyLabelRendererProps {
  /** Label to be rendered */
  children: string | React.ReactElement;
  /** Indicates whether to render a colon after the label */
  renderColon?: boolean;
  /** Custom tooltip for the component. */
  tooltip?: string;
}

/** @internal */
export class PropertyLabelRenderer extends React.PureComponent<PropertyLabelRendererProps> {
  /** Get React CSS style object based on provided offset from the left side */
  public static getStyle(offset?: number): React.CSSProperties {
    offset = offset ? offset : 0;
    return {
      paddingLeft: offset,
      width: `calc(100% - ${offset}px)`,
    };
  }

  public override render() {
    const title =
      this.props.tooltip ??
      (typeof this.props.children == "string"
        ? this.props.children
        : undefined);
    return (
      <>
        <span
          className={classnames(
            "components-property-label-renderer",
            this.props.renderColon && "components-property-label-renderer-colon"
          )}
          title={title}
        >
          {this.props.children}
        </span>
      </>
    );
  }
}
