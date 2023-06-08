/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// istanbul ignore file
// IconWebComponent requires in-browser testing
/** @packageDocumentation
 * @module Utilities
 */

import { UiError } from "@itwin/appui-abstract";
import { Logger } from "@itwin/core-bentley";
import { UiCore } from "../UiCore";
import DOMPurify, * as DOMPurifyNS from "dompurify";

/**
 * Completed SVG cache
 * (If we get it once, we use it from there afterwards)
 */
const svgCache = new Map<string, HTMLElement>();
/**
 * Active "getSource" list
 * (if multiple icon require the same thing at the same time,
 * only do the fetch once, and have all icon use the same result,
 * clear result afterwards, good or bad.)
 */
const getList = new Map<string, Promise<HTMLElement>>();

/**
 * Get the source (fetch and parse for url, or decode and parse for data: url)
 * @param src URL of the content to download/parse
 * @param element Element for logging purpose.
 * @returns HTMLElement (svg)
 */
async function getSource(src: string, element: any) {
  if (src.startsWith("data:")) {
    const dataUriParts = src.split(",");

    if (
      dataUriParts.length !== 2 ||
      "data:image/svg+xml;base64" !== dataUriParts[0]
    ) {
      Logger.logError(UiCore.loggerCategory(element), "Unable to load icon.");
    }

    // the esm build of dompurify has a default import but the cjs build does not
    // if there is a default export, use it (likely esm), otherwise use the namespace
    // istanbul ignore next
    const sanitizer = DOMPurify ?? DOMPurifyNS;
    // eslint-disable-next-line deprecation/deprecation
    const sanitizedSvg = sanitizer.sanitize(atob(dataUriParts[1]));

    const parsedSvg = new window.DOMParser().parseFromString(
      sanitizedSvg,
      "text/xml"
    );
    const errorNode = parsedSvg.querySelector("parsererror");
    if (
      errorNode ||
      "svg" !== parsedSvg.documentElement.nodeName.toLowerCase()
    ) {
      throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
    }

    return parsedSvg.documentElement;
  } else {
    const response = await fetch(src).catch((_error) => {
      Logger.logError(UiCore.loggerCategory(element), "Unable to load icon.");
    });
    if (!response || !response.ok) {
      throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
    }
    const str = await response.text();
    if (str === undefined) {
      throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
    }
    const data = new window.DOMParser().parseFromString(str, "text/xml");
    return data.documentElement;
  }
}

/**
 * Call `getSource` or wait for the previous result if
 * it was already called for this `src`, and reuse the result.
 * @param src URL of the content to download/parse
 * @param element Element for logging purpose
 * @returns HTMLElement (svg)
 */
async function callOrReuseGetSource(src: string, element: any) {
  // Check if already getting the source svg
  let getPromise = getList.get(src);
  if (!getPromise) {
    // if not, get the source, make this reusable for other icons.
    getPromise = getSource(src, element);
    getList.set(src, getPromise);
  }

  try {
    const svg = await getPromise;
    if (!svgCache.has(src) && svg) {
      // Cache the end result, so we don't have to await promise once that's done.
      svgCache.set(src, svg);
    }
    return svg;
  } finally {
    // Success or failure, we don't want to keep the promise once we have the svg (or it failed, try again).
    getList.delete(src);
  }
}

/**
 * IconWebComponent loads icon from an svg path
 */
export class IconWebComponent extends HTMLElement {
  private async connectedCallback() {
    await this.loadSvg();
    this.dispatchEvent(new CustomEvent("load"));
  }

  private async loadSvg() {
    // if svg was already appended don't request it again
    if (this.childNodes.length) return;

    const src = this.getAttribute("src") || "";

    // if svg was already downloaded, use it;
    let svg = svgCache.get(src);
    if (!svg) {
      svg = await callOrReuseGetSource(src, this);
    }
    if (svg && !this.childNodes.length) {
      this.append(svg.cloneNode(true));
    }
  }
}
