/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

/* eslint-disable @typescript-eslint/no-deprecated */

import "./HighlightingEngine.scss";
import * as React from "react";
import { HighlightedText } from "../common/HighlightedText.js";

/**
 * Properties for identifying an active highlight on a node in a tree.
 * @see [[HighlightableTreeProps.activeMatch]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface ActiveMatchInfo {
  nodeId: string;
  matchIndex: number;
}

/**
 * Properties for highlighting nodes in a tree.
 * @see [[ControlledTreeProps.nodeHighlightingProps]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface HighlightableTreeProps {
  searchText: string;
  activeMatch?: ActiveMatchInfo;
}

/**
 * Properties for a highlightable [[TreeNode]]
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export interface HighlightableTreeNodeProps {
  searchText: string;
  activeMatchIndex?: number;
}

/**
 * Tree highlighting engine
 * @public
 * @deprecated in 5.28.0. Use Tree component from `@stratakit/structures` instead.
 */
export class HighlightingEngine {
  private _searchText: string;
  private _activeMatch?: ActiveMatchInfo;
  /** @deprecated in 5.28.0. Use `HIGHLIGHT_ACTIVE_CLASS_NAME` instead. */
  public static readonly ACTIVE_CLASS_NAME = "components-activehighlight";

  constructor(props: HighlightableTreeProps) {
    this._searchText = props.searchText;
    this._activeMatch = props.activeMatch;
  }

  public isNodeActive(node: { id?: string }) {
    return this._activeMatch && node.id === this._activeMatch.nodeId;
  }

  public getActiveMatchIndex(node: { id?: string }) {
    return this.isNodeActive(node) ? this._activeMatch!.matchIndex : undefined;
  }

  public createRenderProps(node: { id?: string }): HighlightableTreeNodeProps {
    return {
      searchText: this._searchText,
      activeMatchIndex: this.getActiveMatchIndex(node),
    };
  }

  public static renderNodeLabel(
    text: string,
    props: HighlightableTreeNodeProps
  ): React.ReactNode {
    if (props.searchText) return <HighlightedText text={text} {...props} />;
    return text;
  }
}
