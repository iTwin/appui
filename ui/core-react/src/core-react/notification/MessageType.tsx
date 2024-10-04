/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import type * as React from "react";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Describes a React based message
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export interface ReactMessage {
  reactNode: React.ReactNode;
}

/** Types for message
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export type MessageType = string | HTMLElement | ReactMessage;

/** HTMLElement type guard.
 * @internal
 */
export const isHTMLElement = (message: MessageType): message is HTMLElement => {
  return (message as HTMLElement).outerHTML !== undefined;
};

/** ReactMessage type guard.
 * @internal
 */
export const isReactMessage = (
  message: MessageType
): message is ReactMessage => {
  return (message as ReactMessage).reactNode !== undefined;
};
