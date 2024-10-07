/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyGrid
 */

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { ExpandableBlock } from "@itwin/itwinui-react";
import { HighlightedText } from "../../common/HighlightedText.js";
import type { HighlightingComponentProps } from "../../common/HighlightingComponentProps.js";
import type { PropertyCategory } from "../PropertyDataProvider.js";

/**
 * Properties for the [[PropertyCategoryBlock]] React component
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface PropertyCategoryBlockProps extends CommonProps {
  /** Category of the properties */
  category: PropertyCategory;
  /** Callback to when PropertyCategoryBlock gets expended or collapsed */
  onExpansionToggled?: (categoryName: string) => void;
  /** Properties used for highlighting */
  highlight?: HighlightingComponentProps;
  /** Content */
  children?: React.ReactNode;
}

/**
 * PropertyCategoryBlock React component
 * @public
 */
export class PropertyCategoryBlock extends React.Component<PropertyCategoryBlockProps> {
  constructor(props: PropertyCategoryBlockProps) {
    super(props);
  }

  private toggleExpansion() {
    if (this.props.onExpansionToggled)
      this.props.onExpansionToggled(this.props.category.name);
  }

  private _handleToggle = (_isExpanding: boolean): void => {
    this.toggleExpansion();
  };

  public override render() {
    const { highlight, category, children, onExpansionToggled, ...other } =
      this.props;
    const activeMatchIndex =
      this.props.category.name ===
      highlight?.activeHighlight?.highlightedItemIdentifier
        ? highlight.activeHighlight.highlightIndex
        : undefined;
    const label = highlight ? (
      <HighlightedText
        text={category.label}
        activeMatchIndex={activeMatchIndex}
        searchText={highlight.highlightedText}
      />
    ) : (
      category.label
    );
    return (
      <ExpandableBlock.Wrapper
        isExpanded={category.expand}
        onToggle={this._handleToggle}
        size="small"
        {...other}
      >
        <ExpandableBlock.Trigger label={label} />
        <ExpandableBlock.Content className="components-expandable-content">
          {category.expand && children}
        </ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    );
  }
}
