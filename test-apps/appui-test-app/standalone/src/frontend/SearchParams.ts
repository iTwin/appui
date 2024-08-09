/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export interface AppParams extends PreviewFeatureParams {
  frontstageId?: string;
}

export interface PreviewFeatureParams {
  reparentPopoutWidgets?: 0 | 1;
}
