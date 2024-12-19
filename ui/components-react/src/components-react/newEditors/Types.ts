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
 * Base editor props that are supplied to every editor when rendering it.
 */
interface BaseEditorProps<TValue = Value> {
  metadata: ValueMetadata;
  onChange: (value: TValue) => void;
  onFinish: () => void;
  disabled?: boolean;
  size?: "small" | "large";
}

/**
 * Generic editor props that are supplied to the editor for rendering.
 * @beta
 */
export interface EditorProps<TValue = Value> extends BaseEditorProps<TValue> {
  value?: TValue;
}

/**
 * A type that makes a specific properties required in a type.
 * @beta
 */
export type RequiredProps<TProps, TKey extends keyof TProps> = Omit<
  TProps,
  TKey
> &
  Required<Pick<TProps, TKey>>;
