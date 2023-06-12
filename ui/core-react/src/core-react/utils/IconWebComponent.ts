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
 * "getSvg" list
 * (if multiple icon require the same thing,
 * only do the fetch once, and have all icon use the same result)
 */
const promises = new Map<string, Promise<any>>();

/**
 * Parse 'data:' uri to retrieve the Svg component within it.
 * @param src data:image/svg+xml;base64
 * @param element Element for logging purpose.
 * @returns HTMLElement (svg)
 */
function parseSvgFromDataUri(src: string, element: any) {
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
  if (errorNode || "svg" !== parsedSvg.documentElement.nodeName.toLowerCase()) {
    throw new UiError(UiCore.loggerCategory(element), "Unable to load icon.");
  }

  return parsedSvg.documentElement;
}

/**
 * Fetch the src from the network and return the SVG element.
 * @param src URL representing a .svg file
 * @param element Element for logging purpose
 * @returns HTMLElement (svg)
 */
async function fetchSvg(src: string, element: any) {
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

/**
 * Get the svg (fetch and parse for url, or decode and parse for data: url)
 * @param src URL of the content to download/parse
 * @param element Element for logging purpose.
 * @returns HTMLElement (svg)
 */
async function getSvg(src: string, element: any) {
  if (src.startsWith("data:")) {
    return parseSvgFromDataUri(src, element);
  }
  return fetchSvg(src, element);
}

/**
 * Return promise if created for the id, otherwise, create a new one and save it.
 * if the promise fail, remove it from cache so we'll try again.
 * @param id Identification for the promise
 * @param createPromise Function to create the promise if not already running.
 * @returns created promise
 */
async function reuseOrCreatePromise<T>(
  id: string,
  createPromise: () => Promise<T>
): Promise<T> {
  let getPromise = promises.get(id);
  if (!getPromise) {
    getPromise = createPromise().catch((e) => {
      // Don't keep the cache if we fail, could be a temporary network error.
      promises.delete(id);
      throw e;
    });
    promises.set(id, getPromise);
  }

  return getPromise;
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
    if (!src) return;

    const svg = await reuseOrCreatePromise(src, async () => getSvg(src, this));
    if (svg && !this.childNodes.length) {
      this.append(svg.cloneNode(true));
    }
  }
}
