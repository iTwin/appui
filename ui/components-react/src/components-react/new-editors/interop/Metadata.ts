/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type {
  EnumerationChoicesInfo,
  PropertyEditorParams,
} from "@itwin/appui-abstract";
import type { ValueMetadata } from "../values/Metadata.js";

/* v8 ignore start */

/**
 * Metadata that is created by mapping `PropertyRecord` used to render old editor into the new editor metadata.
 * @internal
 */
export interface OldEditorMetadata extends ValueMetadata {
  params?: PropertyEditorParams[];
  extendedData?: { [key: string]: unknown };
  enum?: EnumerationChoicesInfo;
  quantityType?: string;
  typename: string;
}

/**
 * Type guard for `OldEditorMetadata`.
 * @internal
 */
export function isOldEditorMetadata(
  metadata: ValueMetadata
): metadata is OldEditorMetadata {
  return (metadata as OldEditorMetadata).typename !== undefined;
}

/* v8 ignore stop */
