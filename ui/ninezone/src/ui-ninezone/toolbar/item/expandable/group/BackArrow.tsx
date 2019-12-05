/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, NoChildrenProps } from "@bentley/ui-core";
import { useTargeted } from "../../../../base/useTargeted";
import "./BackArrow.scss";

/** Properties of [[BackArrow]] component.
 * @alpha
 */
export interface BackArrowProps extends CommonProps, NoChildrenProps {
  /** Function called when arrow is clicked. */
  onClick?: () => void;
  /** Function called when pointer up event is received. */
  onPointerUp?: () => void;
}

function BackArrowComponent(props: BackArrowProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const targeted = useTargeted(ref);
  const className = classnames(
    "nz-toolbar-item-expandable-group-backArrow",
    targeted && "nz-targeted",
    props.className);
  return (
    <div
      className={className}
      onClick={props.onClick}
      onPointerUp={props.onPointerUp}
      ref={ref}
      style={props.style}
    />
  );
}

/** Back arrow used in [[NestedGroup]] component.
 * @alpha
 */
export class BackArrow extends React.PureComponent<BackArrowProps> {
  public render() {
    return <BackArrowComponent {...this.props} />;
  }
}
