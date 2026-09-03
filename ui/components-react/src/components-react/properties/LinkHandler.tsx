/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import { BentleyError, BentleyStatus } from "@itwin/core-bentley";
import type { LinkElementsInfo } from "@itwin/appui-abstract";
import { Anchor } from "@itwin/itwinui-react";
import { matchLinks } from "../common/Links.js";

const allowedSchemas = ["http:", "https:", "mailto:", "pw:"];

/**
 * Ensures that provided text contains exactly one link and returns its href.
 */
function useTagHref(text: string) {
  const matches = matchLinks(text);
  if (matches.length !== 1) return undefined;

  const match = matches[0];
  if (match.index !== 0 || match.lastIndex !== text.length) return undefined;

  if (!allowedSchemas.includes(match.schema)) return undefined;

  const url = match.url;
  if (match.schema === "pw:" && url.startsWith("pw:")) {
    // remove // or \\ from the link. Links with custom schema should use opaque path like `schema:path` instead of `schema://path`
    return url.replace(/pw:\/\/|pw:\\\\/g, "pw:");
  }

  return url;
}

interface TagProps {
  text: string;
  links: LinkElementsInfo;
  highlight?: (text: string) => React.ReactNode;
}

function Tag(props: TagProps) {
  const { text, links, highlight } = props;

  const highlighted = highlight ? highlight(text) : text;

  const href = useTagHref(text);
  if (!href) {
    return <>{highlighted}</>;
  }

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        links.onClick(text);
      }}
    >
      {highlighted}
    </Anchor>
  );
}

interface Match {
  start: number;
  end: number;
}

function matchComparison(matchA: Match, matchB: Match) {
  if (matchA.start > matchB.start) return 1;
  if (matchB.start > matchA.start) return -1;
  return 0;
}

function renderTextPart(
  text: string,
  highlight?: (text: string) => React.ReactNode
): React.ReactNode {
  return highlight ? highlight(text) : text;
}

function renderText(
  text: string,
  links: LinkElementsInfo,
  highlight?: (text: string) => React.ReactNode
): React.ReactNode {
  const { matcher } = links;

  if (!matcher) {
    return <Tag text={text} links={links} highlight={highlight} />;
  }

  const matches = matcher(text);

  // Sort just to be sure
  matches.sort(matchComparison);

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  for (const match of matches) {
    // If matches overlap there must be something wrong with the matcher
    if (lastIndex > match.start)
      throw new BentleyError(
        BentleyStatus.ERROR,
        "renderText: matcher returned overlapping matches"
      );

    if (lastIndex < match.start)
      parts.push(
        renderTextPart(text.substring(lastIndex, match.start), highlight)
      );

    const anchorText = text.substring(match.start, match.end);
    parts.push(<Tag text={anchorText} links={links} highlight={highlight} />);

    lastIndex = match.end;
  }
  if (text.length > lastIndex)
    parts.push(renderTextPart(text.substring(lastIndex), highlight));

  // Need to map, because React complains about the lack of keys
  return parts.map((part, index) => (
    <React.Fragment key={index}>{part}</React.Fragment>
  ));
}

function renderHighlighted(
  text: string,
  highlight: (text: string) => React.ReactNode
): React.ReactNode {
  return highlight(text);
}

/** Renders anchor tag by wrapping or splitting provided text
 * @public
 */
export const renderLinks = (
  text: string,
  links: LinkElementsInfo,
  highlight?: (text: string) => React.ReactNode
): React.ReactNode => {
  return renderText(text, links, highlight);
};

/** If record has links, wraps stringValue in them, otherwise returns unchanged stringValue
 * Optionally it can highlight text
 * @public
 */
export const withLinks = (
  stringValue: string,
  links?: LinkElementsInfo,
  highlight?: (text: string) => React.ReactNode
): React.ReactNode => {
  if (links) return renderLinks(stringValue, links, highlight);
  if (highlight) return renderHighlighted(stringValue, highlight);
  return stringValue;
};

/**
 * Properties for [[LinksRenderer]] component.
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof LinksRenderer>`
 */
export interface LinksRendererProps {
  value: string;
  links?: LinkElementsInfo;
  highlighter?: (text: string) => React.ReactNode;
}

/**
 * React component for rendering string with links.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function LinksRenderer(props: LinksRendererProps) {
  return <>{withLinks(props.value, props.links, props.highlighter)}</>;
}
