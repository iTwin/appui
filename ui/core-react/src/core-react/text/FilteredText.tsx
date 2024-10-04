/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Text
 */

// cSpell:ignore focusvalue

import * as React from "react";
import classnames from "classnames";
import type { CommonProps } from "../utils/Props.js";
import type { IMatch } from "../utils/matches.js";
import "./FilteredText.scss";

/** Props supported by [FilteredText] component
 * @alpha
 * @deprecated in 4.15.0. Props of deprecated {@link FilteredText} component.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FilteredTextProps extends CommonProps {
  /** string that matched a filter string */
  value: string;
  /** define array of start and end positions of filter matches. */
  matches?: IMatch[];
  /** holds class name for matching span text. */
  matchClassName?: string;
  /** holds style for matching span text. */
  matchStyle?: React.CSSProperties;
}

/** Component used to highlight filter matches within a text string.
 * @alpha
 * @deprecated in 4.15.0. Used internally.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function FilteredText(props: FilteredTextProps) {
  const {
    value,
    className,
    matches,
    matchClassName,
    matchStyle,
    ...otherProps
  } = props;
  if (matches && matches.length > 0) {
    const spans: React.ReactNode[] = [];

    let startPos = 0;
    for (const span of matches) {
      if (span.start !== startPos)
        spans.push(
          <span key={startPos} className="uicore-partial-filtered-text">
            {value.substring(startPos, span.start)}
          </span>
        );
      spans.push(
        <span
          key={span.start}
          style={matchStyle}
          className={classnames("uicore-filtered-text-match", matchClassName)}
        >
          {value.substring(span.start, span.end)}
        </span>
      );
      startPos = span.end;
    }
    const endPos = value.length;
    if (startPos < endPos) {
      spans.push(
        <span key={startPos} className="uicore-partial-filtered-text">
          {value.substring(startPos, endPos)}
        </span>
      );
    }
    return (
      <div
        {...otherProps}
        className={classnames("uicore-filtered-text", className)}
        title={value}
      >
        {spans}
      </div>
    );
  }

  return (
    <span
      {...otherProps}
      className={classnames("uicore-filtered-text", className)}
      title={value}
    >
      {value}
    </span>
  );
}
