/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Base */

import * as React from "react";

/** Properties for the [[Div]] React component */
export interface DivProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /** CSS class name */
  className?: string;
  /** CSS style properties */
  style?: React.CSSProperties;
}

/** Div React component is a wrapper for the HTML div element */
export class Div extends React.Component<DivProps> {
  /** Renders the component */
  public render() {
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default Div;
