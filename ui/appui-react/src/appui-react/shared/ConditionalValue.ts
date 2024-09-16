/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */
import {
  ConditionalBooleanValue as _ConditionalBooleanValue,
  ConditionalStringValue as _ConditionalStringValue,
} from "@itwin/appui-abstract";
import { ConditionalIconItem as _ConditionalIconItem } from "@itwin/core-react";

/** Class used to return a boolean value. The boolean value is refreshed by using the specified function. The `syncEventIds` define
 * events that would require the `testFunc` function to be rerun.
 * @public
 */
export type ConditionalBooleanValue = _ConditionalBooleanValue;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConditionalBooleanValue = _ConditionalBooleanValue;

/** Class used to return a string value. The string value is refreshed by using the specified function. The `syncEventIds` define
 * events that would require the `stringGetter` function to be rerun.
 * @public
 */
export type ConditionalStringValue = _ConditionalStringValue;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConditionalStringValue = _ConditionalStringValue;
