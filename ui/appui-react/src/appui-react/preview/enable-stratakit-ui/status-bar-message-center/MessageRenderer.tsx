/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module MessageCenter
 */

import * as React from "react";
import DOMPurify from "dompurify";
import { Text } from "@stratakit/bricks";

/** Message content types that can be rendered */
export type MessageContent = string | HTMLElement | React.ReactNode;

/** Properties for the MessageRenderer component */
export interface MessageRendererProps {
  message: MessageContent;
  className?: string;
  inline?: boolean;
  useSpan?: boolean;
}

const isHTMLElement = (message: MessageContent): message is HTMLElement => {
  return message instanceof HTMLElement && message.outerHTML !== undefined;
};

const isReactNode = (message: MessageContent): message is React.ReactNode => {
  return (
    React.isValidElement(message) ||
    (typeof message === "object" && message !== null && !isHTMLElement(message))
  );
};

/**
 * React component that renders message content using Stratakit components.
 * Supports string, HTMLElement, or React node content with proper sanitization.
 * @public
 */
export function MessageRenderer(props: MessageRendererProps) {
  const { message, className, inline = false } = props;
  const getHtmlUnderlyingElement = () => (inline ? <span /> : <div />);

  if (typeof message === "string") {
    return (
      <Text
        className={className}
        render={getHtmlUnderlyingElement()}
        variant="body-sm"
      >
        {message}
      </Text>
    );
  }

  if (isHTMLElement(message)) {
    // Security validation for anchor tags
    const validateAnchors = (element: HTMLElement): boolean => {
      const anchors = element.querySelectorAll('a[target="_blank"]');
      return Array.from(anchors).every((anchor) => {
        const rel = anchor.getAttribute("rel");
        return rel && (rel.includes("noopener") || rel.includes("noreferrer"));
      });
    };

    // Check if the element itself is an anchor with target="_blank"
    const isValidMainAnchor = (element: HTMLElement): boolean => {
      if (
        element.tagName === "A" &&
        element.getAttribute("target") === "_blank"
      ) {
        const rel = element.getAttribute("rel");
        return (
          rel !== null &&
          (rel.includes("noopener") || rel.includes("noreferrer"))
        );
      }
      return true;
    };

    const hasValidAnchors =
      isValidMainAnchor(message) && validateAnchors(message);

    const sanitizedHtml = hasValidAnchors
      ? DOMPurify.sanitize(message.outerHTML, { ADD_ATTR: ["target"] })
      : DOMPurify.sanitize(message.outerHTML);

    return (
      <Text
        render={getHtmlUnderlyingElement()}
        className={className}
        variant="body-sm"
        // we can safely disable jam3/no-sanitizer-with-danger as we are sanitizing above
        // eslint-disable-next-line jam3/no-sanitizer-with-danger
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  if (isReactNode(message)) {
    return (
      <Text
        render={getHtmlUnderlyingElement()}
        className={className}
        variant="body-sm"
      >
        {message}
      </Text>
    );
  }

  return null;
}
