/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolAssistance
 */

import "./Instruction.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { ToolAssistanceItem } from "./Item.js";
import { NewDot } from "./NewDot.js";

/** Properties of [[ToolAssistanceInstruction]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolAssistanceInstructionProps extends CommonProps {
  /** Image for instruction */
  image: React.ReactNode;
  /** Indicates whether instruction is new */
  isNew?: boolean;
  /** Text for instruction */
  text: string;
}

/** Tool assistance instruction used in [[ToolAssistanceDialog]] component.
 * @internal
 */
export class ToolAssistanceInstruction extends React.PureComponent<ToolAssistanceInstructionProps> {
  public override render() {
    const className = classnames(
      "nz-footer-toolAssistance-instruction",
      this.props.className
    );
    const textClassName = this.props.isNew ? "nz-text-new" : undefined;

    return (
      <ToolAssistanceItem className={className} style={this.props.style}>
        <span className="nz-image">
          {this.props.isNew && <NewDot />}
          {this.props.image}
        </span>
        <span className={textClassName}>{this.props.text}</span>
      </ToolAssistanceItem>
    );
  }
}
