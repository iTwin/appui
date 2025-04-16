/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import type {
  BasePropertyEditorParams,
  PropertyDescription,
} from "@itwin/appui-abstract";

/**
 * Parameters used to display an icon next to property editor.
 * Like `IconEditorParams` of `@itwin/appui-abstract`, but accepts a `ReactNode`.
 * @internal
 */
export interface IconNodeEditorParams extends BasePropertyEditorParams {
  type: "appui-icon-node";
  icon: React.ReactNode;
}

/** @internal */
export function addIconNodeParam(
  description: PropertyDescription,
  icon: React.ReactNode
) {
  if (!description.editor) return;
  if (!description.editor.params) return;

  const param = {
    type: "appui-icon-node",
    icon,
  } satisfies IconNodeEditorParams;
  description.editor.params.push(param);
}
