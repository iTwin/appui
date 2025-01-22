/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { StandardEditorNames } from "@itwin/appui-abstract";
import { BooleanEditor } from "../editors/BooleanEditor.js";
import { DateTimeEditor } from "../editors/DateTimeEditor.js";
import { EnumEditor } from "../editors/EnumEditor.js";
import { NumericEditor } from "../editors/NumericEditor.js";
import { TextEditor } from "../editors/TextEditor.js";

import { ColorEditorSpec as InteropColorEditorSpec } from "../interop/old-editors/Color.js";
import { CustomNumberEditorSpec as InteropCustomNumberEditorSpec } from "../interop/old-editors/CustomNumber.js";
import { EnumEditorSpec as InteropEnumEditorSpec } from "../interop/old-editors/Enum.js";
import { EnumButtonGroupEditorSpec as InteropEnumButtonGroupEditorSpec } from "../interop/old-editors/EnumButtonGroup.js";
import { MultilineEditorSpec as InteropMultilineEditorSpec } from "../interop/old-editors/TextArea.js";
import { SliderEditorSpec as InteropSliderEditorSpec } from "../interop/old-editors/Slider.js";
import { NumericInputEditorSpec as InteropNumericInputEditorSpec } from "../interop/old-editors/NumericInput.js";

import { createEditorSpec, type EditorSpec } from "../Types.js";
import type { EnumValueMetadata, ValueMetadata } from "../values/Metadata.js";
import { Value } from "../values/Values.js";
import { ToggleEditor } from "../editors/ToggleEditor.js";
import { DateEditor } from "../editors/DateEditor.js";

/**
 * Specification for default text editor. It applies for values whose type is "string".
 * @internal
 */
export const TextEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isText,
  applies: (metadata) => metadata.type === "string",
  Editor: TextEditor,
});

/**
 * Specification for default date editor. It applies for values whose type is "date".
 * @internal
 */
export const DateEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isDate,
  applies: (metadata) => metadata.type === "date",
  Editor: DateEditor,
});

/**
 * Specification for default date editor. It applies for values whose type is "date".
 * @internal
 */
export const DateTimeEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isDate,
  applies: (metadata) => metadata.type === "dateTime",
  Editor: DateTimeEditor,
});

/**
 * Specification for default boolean editor. It applies for values whose type is "bool".
 * @internal
 */
export const BoolEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isBoolean,
  applies: (metadata) => metadata.type === "bool",
  Editor: BooleanEditor,
});

/**
 * Specification for default numeric editor. It applies for values whose type is "number".
 * @internal
 */
export const NumericEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isNumeric,
  applies: (metadata) => metadata.type === "number",
  Editor: NumericEditor,
});

/**
 * Specification for default toggle editor. It applies for values whose type is "bool" when preferred editor set to `toggle`.
 * @internal
 */
export const EnumEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is EnumValueMetadata =>
    metadata.type === "enum",
  isValueSupported: Value.isEnum,
  Editor: EnumEditor,
});

/**
 * Specification for default enum editor. It applies for values whose type is "enum".
 * @internal
 */
export const ToggleEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is ValueMetadata =>
    metadata.type === "bool",
  isValueSupported: Value.isBoolean,
  applies: (metadata) =>
    metadata.preferredEditor === StandardEditorNames.Toggle,
  Editor: ToggleEditor,
});

/**
 * List of default editor specifications that are used as fallback if EditorRegistry does not provide a custom editor.
 * @internal
 */
export const defaultEditorSpecs: EditorSpec[] = [
  // list editors with preferred editor check first
  ToggleEditorSpec,

  // list editors that checks only value type
  TextEditorSpec,
  BoolEditorSpec,
  NumericEditorSpec,
  DateEditorSpec,
  DateTimeEditorSpec,
  EnumEditorSpec,
];

/**
 * List of editor specifications that are rewritten based on the old version that accepts editor params from `PropertyRecord`. Needed to support
 * editing customizations used through `PropertyRecord`.
 * @internal
 */
export const interopEditorSpecs: EditorSpec[] = [
  InteropSliderEditorSpec,
  InteropEnumButtonGroupEditorSpec,
  InteropNumericInputEditorSpec,
  InteropCustomNumberEditorSpec,
  InteropColorEditorSpec,
  InteropMultilineEditorSpec,

  InteropEnumEditorSpec,
];

function anyMetadata(_metadata: ValueMetadata): _metadata is ValueMetadata {
  return true;
}
