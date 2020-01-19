/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Footer
 */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, NoChildrenProps } from "@bentley/ui-core";
import "./Separator.scss";

/** Properties of [[FooterSeparator]] component.
 * @beta
 */
export interface FooterSeparatorProps extends CommonProps, NoChildrenProps {
}

/** Footer indicator separator used in [[Footer]] component.
 * @beta
 */
export class FooterSeparator extends React.PureComponent<FooterSeparatorProps> {
  public render() {
    const className = classnames(
      "nz-footer-separator",
      this.props.className);

    return (
      <div
        className={className}
        style={this.props.style}
      />
    );
  }
}
