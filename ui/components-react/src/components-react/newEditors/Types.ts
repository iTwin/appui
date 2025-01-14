/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ValueMetadata } from "./values/Metadata.js";
import type { Value } from "./values/Values.js";

/**
 * An editor specification defining single editor with a predicate that determines if the editor can be used for a given value.
 * @beta
 */
export interface EditorSpec {
  applies: (metaData: ValueMetadata, value: Value | undefined) => boolean;
  Editor: React.ComponentType<EditorProps>;
}

/**
 * Generic editor props that are supplied to the editor for rendering.
 * @beta
 */
export interface EditorProps<TMetadata = ValueMetadata, TValue = Value> {
  metadata: TMetadata;
  value?: TValue;
  onChange: (value: TValue) => void;
  onFinish: () => void;
  disabled?: boolean;
  size?: "small" | "large";
}

/**
 * Utility function to create an editor spec for editor with concrete metadata and value types.
 * @beta
 */
export function createEditorSpec<
  TMetadata extends ValueMetadata,
  TValue extends Value
>({
  Editor,
  isMetadataSupported,
  isValueSupported,
  applies,
}: {
  isMetadataSupported: (metadata: ValueMetadata) => metadata is TMetadata;
  isValueSupported: (value: Value) => value is TValue;
  applies?: (metadata: TMetadata, value?: TValue) => boolean;
  Editor: React.ComponentType<EditorProps<TMetadata, TValue>>;
}): EditorSpec {
  return {
    applies: (metadata: ValueMetadata, value?: Value) =>
      isMetadataSupported(metadata) &&
      (value === undefined || isValueSupported(value)) &&
      (applies === undefined || applies(metadata, value)),
    // typeguards in `applies` function will take care of casting
    Editor: Editor as unknown as React.ComponentType<EditorProps>,
  };
}
