/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

/**
 * Returns the name of a class from a static or instance object.
 * @internal
 */
export const getObjectClassName = (obj: any): string => {
  return obj?.name
    ? obj.name
    : obj?.constructor?.name
    ? obj.constructor.name
    : "";
};
