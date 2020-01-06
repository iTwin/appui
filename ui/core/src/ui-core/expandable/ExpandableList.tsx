/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Expandable */

import * as React from "react";
import * as classnames from "classnames";
import { CommonProps } from "../utils/Props";
import "./ExpandableList.scss";

/** Properties for [[ExpandableList]] component
 * @public
 */
export interface ExpandableListProps extends CommonProps {
  /** Indicates whether to allow only one expanded block */
  singleExpandOnly?: boolean;
  /** Index of the default active block */
  defaultActiveBlock?: number;
}

/** @internal */
interface ExpandableListState {
  activeBlock: number;
}

/**
 * ExpandableList React component
 * @public
 */
export class ExpandableList extends React.PureComponent<ExpandableListProps, ExpandableListState> {

  constructor(props: ExpandableListProps) {
    super(props);

    this.state = { activeBlock: this.props.defaultActiveBlock! };
  }

  public static defaultProps: Partial<ExpandableListProps> = {
    singleExpandOnly: false,
    defaultActiveBlock: 0,
  };

  // set active block
  private _handleBlockClick = (index: number, onClick: () => any) => {
    this.setState({ activeBlock: index });

    // istanbul ignore else
    if (onClick) {
      onClick(); // fire the ExpandableBlock onClick
    }
  }

  private renderBlocks() {
    return React.Children.map(this.props.children, (child: any, i) => {
      return React.cloneElement(child, {
        key: i,
        isExpanded: (this.props.singleExpandOnly) ? i === this.state.activeBlock : child.props.isExpanded,
        onClick: this._handleBlockClick.bind(this, i, child.props.onClick),
      });
    });
  }

  public render(): JSX.Element {
    return (
      <div className={classnames("BwcExpandableBlocksList", this.props.className)} style={this.props.style}>
        {this.renderBlocks()}
      </div>
    );
  }
}
