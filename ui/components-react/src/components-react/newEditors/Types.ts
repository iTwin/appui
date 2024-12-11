/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ValueMetadata } from "./values/Metadata.js";
import type { Value } from "./values/Values.js";

/**
 *
 */
export interface EditorSpec {
  applies: (metaData: ValueMetadata, value: Value | undefined) => boolean;
  Editor: React.ComponentType<EditorProps>;
}

interface BaseEditorProps<TValue = Value> {
  metadata: ValueMetadata;
  onChange: (value: TValue) => void;
  onFinish: () => void;
  disabled?: boolean;
  size?: "small" | "large";
}

/**
 *
 */
export interface EditorProps<TValue = Value> extends BaseEditorProps<TValue> {
  value?: TValue;
}

/**
 *
 */
export interface ConcreteEditorProps<TValue = Value>
  extends BaseEditorProps<TValue> {
  value: TValue;
}
