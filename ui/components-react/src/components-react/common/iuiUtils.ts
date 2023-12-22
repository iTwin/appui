/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

/**
 * iTwinUI components default to the size "medium" is the size isn't specied.
 * We're using the "small" size for the default size of our components if the size isn't specified so we need to consolidate the two.
 * @param size size of the component
 * @returns string representing the iTwinUI size of the component
 */
export function getiTwinUISize(size: string | undefined) {
  return !size ? "small" : size === "medium" ? undefined : "large";
}
