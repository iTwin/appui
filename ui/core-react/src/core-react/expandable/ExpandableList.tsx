/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Expandable
 */

import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props";

/** Properties for [[ExpandableList]] component
 * @public
 * @deprecated in 4.12.x. Props of deprecated component {@link ExpandableList}.
 */
// eslint-disable-next-line deprecation/deprecation
export interface ExpandableListProps extends CommonProps {
  /** Index of the default active block */
  defaultActiveBlock?: number;
  /** Indicates whether to allow only one expanded block */
  singleExpandOnly?: boolean;
  /** Indicates whether the single expanded block is collapsible */
  singleIsCollapsible?: boolean;
  /** Content */
  children?: React.ReactNode;
}

interface ExpandableListState {
  activeBlock: number;
}

/** ExpandableList React component is a container for ExpandableBlock components.
 * @public
 * @deprecated in 4.12.x. Use a custom container and manage {@link https://itwinui.bentley.com/docs/expandableblock expandable block} state manually.
 */
export class ExpandableList extends React.PureComponent<
  // eslint-disable-next-line deprecation/deprecation
  ExpandableListProps,
  ExpandableListState
> {
  // eslint-disable-next-line deprecation/deprecation
  constructor(props: ExpandableListProps) {
    super(props);

    this.state = { activeBlock: this.props.defaultActiveBlock! };
  }

  // eslint-disable-next-line deprecation/deprecation
  public static defaultProps: Partial<ExpandableListProps> = {
    singleExpandOnly: false,
    defaultActiveBlock: 0,
  };

  // set active block
  private _handleBlockToggle = (
    index: number,
    onToggle: (isExpanding: boolean) => any
  ) => {
    let activeBlock = index;

    if (this.props.singleIsCollapsible && index === this.state.activeBlock)
      activeBlock = -1;

    this.setState({ activeBlock });

    if (onToggle) {
      onToggle(activeBlock === index); // fire the ExpandableBlock onToggle
    }
  };

  private renderBlocks() {
    return React.Children.map(this.props.children, (child: any, i) => {
      return React.cloneElement(child, {
        key: i,
        isExpanded: this.props.singleExpandOnly
          ? i === this.state.activeBlock
          : child.props.isExpanded,
        onToggle: this._handleBlockToggle.bind(this, i, child.props.onToggle),
      });
    });
  }

  /** @internal */
  // eslint-disable-next-line deprecation/deprecation
  public override componentDidUpdate(prevProps: ExpandableListProps) {
    if (
      this.props.defaultActiveBlock !== prevProps.defaultActiveBlock &&
      this.props.defaultActiveBlock !== this.state.activeBlock
    ) {
      this.setState((_, props) => ({ activeBlock: props.defaultActiveBlock! }));
    }
  }

  public override render(): React.ReactElement {
    return (
      <div
        className={classnames(
          "uicore-expandable-blocks-list",
          this.props.className
        )}
        style={this.props.style}
      >
        {this.renderBlocks()}
      </div>
    );
  }
}
