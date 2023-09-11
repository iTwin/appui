/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

/** Describes the location based on which the toolbar item is inserted to the layout.
 * @internal
 */
export interface ToolbarItemLocation {
  readonly id: string;
  readonly toolbarId?: string;
  readonly groupPriority?: number;
  readonly itemPriority: number;
  readonly stageId?: string;
  readonly stageUsage?: string;
}
