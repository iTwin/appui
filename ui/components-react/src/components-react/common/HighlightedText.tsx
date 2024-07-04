/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import React, { useMemo } from "react";
import { HighlightingEngine } from "../tree/HighlightingEngine";

/**
 * Properties of [[HighlightedText]]
 * @public
 */
export interface HighlightedTextProps {
  /* Filter text which we want to highlight */
  searchText: string;
  /* Index of actively highlighted part in a text */
  activeMatchIndex?: number;
  /* Full text */
  text: string;
  /** Should search be case sensitive */
  caseSensitive?: boolean;
}

/**
 * Highlighted text
 * Used for highlighting parts in the 'text' which match with 'searchText'
 * Also actively highlights one matched part which is selected with 'activeMatchIndex'
 * @public
 */
export function HighlightedText(props: HighlightedTextProps) {
  const { searchText, activeMatchIndex, text, caseSensitive } = props;
  const chunks = useMemo(
    () => findChunks(text, searchText, caseSensitive),
    [text, searchText, caseSensitive]
  );
  const markedChunks = useMemo(
    () => markChunks(text, chunks, activeMatchIndex),
    [text, chunks, activeMatchIndex]
  );
  return <>{markedChunks}</>;
}

interface HighlightedChunk {
  start: number;
  end: number;
}

function findChunks(
  text: string,
  searchText: string,
  caseSensitive?: boolean
): HighlightedChunk[] {
  const chunks: HighlightedChunk[] = [];
  const contentText = caseSensitive ? text : text.toLowerCase();
  const inputText = caseSensitive ? searchText : searchText.toLowerCase();
  let index = contentText.indexOf(inputText);

  while (index !== -1) {
    chunks.push({ start: index, end: index + inputText.length });
    index = contentText.indexOf(inputText, index + 1);
  }

  return chunks;
}

function markChunks(
  text: string,
  chunks: HighlightedChunk[],
  activeChunk?: number
) {
  const markedText: React.ReactElement[] = [];
  let previousIndex = 0;

  const { mergedChunks, newActiveIndex } = mergeChunks(chunks, activeChunk);

  for (let i = 0; i < mergedChunks.length; i++) {
    const { start, end } = mergedChunks[i];

    // add unmarked text between previous chunk and current one
    const nonMarkedText = text.substring(previousIndex, start);
    if (nonMarkedText.length) {
      markedText.push(<span key={previousIndex}>{nonMarkedText}</span>);
    }

    // add marked chunk text
    markedText.push(
      <mark
        key={start}
        className={
          i === newActiveIndex
            ? HighlightingEngine.ACTIVE_CLASS_NAME
            : undefined
        }
      >
        {text.substring(start, end)}
      </mark>
    );
    previousIndex = end;
  }

  // add unmarked text after last chunk
  const lastNonMarkedText = text.substring(previousIndex, text.length);
  if (lastNonMarkedText.length) {
    markedText.push(<span key={previousIndex}>{lastNonMarkedText}</span>);
  }

  return markedText;
}

function mergeChunks(chunks: HighlightedChunk[], activeChunk?: number) {
  const mergedChunks: HighlightedChunk[] = [];
  let lastChunk: { isActive: boolean; info: HighlightedChunk } | undefined;
  let newActiveIndex: number | undefined;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const isActive = i === activeChunk;
    if (
      lastChunk &&
      lastChunk.info.end === chunk.start &&
      !isActive &&
      !lastChunk.isActive
    ) {
      lastChunk.info.end = chunk.end;
      continue;
    }
    isActive && (newActiveIndex = mergedChunks.length);
    const newChunk = { start: chunk.start, end: chunk.end };
    lastChunk = { isActive, info: newChunk };
    mergedChunks.push(newChunk);
  }
  return { mergedChunks, newActiveIndex };
}
