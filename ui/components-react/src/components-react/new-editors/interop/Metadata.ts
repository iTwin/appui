/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import type {
  EnumerationChoicesInfo,
  PropertyEditorParams,
} from "@itwin/appui-abstract";
import type { ValueMetadata } from "../values/Metadata.js";

/* v8 ignore start */

/**
 * Metadata that is created by mapping `PropertyRecord` into the editor metadata.
 * @beta
 */
export interface PropertyRecordEditorMetadata extends ValueMetadata {
  params?: PropertyEditorParams[];
  extendedData?: { [key: string]: unknown };
  enum?: EnumerationChoicesInfo;
  quantityType?: string;
  typename: string;
}

/**
 * Type guard for `PropertyRecordEditorMetadata`.
 * @beta
 */
export function isPropertyRecordEditorMetadata(
  metadata: ValueMetadata
): metadata is PropertyRecordEditorMetadata {
  return (metadata as PropertyRecordEditorMetadata).typename !== undefined;
}

/* v8 ignore stop */
