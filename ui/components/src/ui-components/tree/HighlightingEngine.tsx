/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Tree */

import Highlighter from "react-highlight-words";
import * as React from "react";
import "./HighlightingEngine.scss";

/** Active match info for highlightable [[Tree]]
 * @beta
 */
export interface ActiveMatchInfo {
  nodeId: string;
  matchIndex: number;
}

/** Properties for the [[HighlightingEngine]]
 * @beta
 */
export interface HighlightableTreeProps {
  searchText: string;
  activeMatch?: ActiveMatchInfo;
}

/** Properties for a highlightable [[TreeNode]]
 * @beta
 */
export interface HighlightableTreeNodeProps {
  searchText: string;
  activeMatchIndex?: number;
}

// cSpell:ignore activehighlight

/** Tree highlighting engine
 * @beta
 */
export class HighlightingEngine {
  private _searchText: string;
  private _activeMatch?: ActiveMatchInfo;
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

  public static renderNodeLabel(text: string, props: HighlightableTreeNodeProps): React.ReactNode {
    if (props.searchText) {
      return (
        <Highlighter
          searchWords={[props.searchText]}
          findChunks={findChunksNoRegex as any} // .d.ts declaration wrong
          activeIndex={props.activeMatchIndex as any} // .d.ts file seems to be wrong, doesn't work if it's a string
          activeClassName={HighlightingEngine.ACTIVE_CLASS_NAME}
          autoEscape={true}
          textToHighlight={text}
        />
      );
    }
    return text;
  }
}

interface HighlighterChunk {
  highlight: boolean;
  start: number;
  end: number;
}
interface FindChunksArgs {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  searchWords: string[];
  textToHighlight: string;
}
const findChunksNoRegex = (args: FindChunksArgs): HighlighterChunk[] => {
  const text = args.caseSensitive ? args.textToHighlight : args.textToHighlight.toUpperCase();
  const term = args.caseSensitive ? args.searchWords[0] : args.searchWords[0].toUpperCase();
  const chunks: HighlighterChunk[] = [];
  let index = text.indexOf(term);
  while (index !== -1) {
    chunks.push({ start: index, end: index + term.length, highlight: true });
    index = text.indexOf(term, index + 1);
  }
  return chunks;
};
