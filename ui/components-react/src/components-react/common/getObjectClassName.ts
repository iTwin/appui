/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Returns the name of a class from a static or instance object.
 * @internal
 */
export function getObjectClassName(obj: any): any {
  return obj?.name ? obj.name : obj?.constructor?.name ? obj.constructor.name : "";
}
