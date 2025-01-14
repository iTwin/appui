/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { BooleanEditor } from "../editors/BooleanEditor.js";
import { DateEditor } from "../editors/DateTimeEditor.js";
import { EnumEditor } from "../editors/EnumEditor.js";
import { NumericEditor } from "../editors/NumericEditor.js";
import { TextEditor } from "../editors/TextEditor.js";
import { EnumEditorSpec as InterOpEnumEditorSpec } from "../interop/old-editors/enum/Enum.js";
import { EnumButtonGroupEditorSpec } from "../interop/old-editors/enum/EnumButtonGroup.js";

import { createEditorSpec, type EditorSpec } from "../Types.js";
import type { EnumValueMetadata, ValueMetadata } from "../values/Metadata.js";
import { Value } from "../values/Values.js";

/**
 * Specification for default text editor. It applies for values whose type is "string".
 * @beta
 */
export const TextEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isTextValue,
  applies: (metadata) => metadata.type === "string",
  Editor: TextEditor,
});

/**
 * Specification for default date editor. It applies for values whose type is "date".
 * @beta
 */
export const DateEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isDateValue,
  applies: (metadata) => metadata.type === "date",
  Editor: DateEditor,
});

/**
 * Specification for default boolean editor. It applies for values whose type is "bool".
 * @beta
 */
export const BoolEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isBooleanValue,
  applies: (metadata) => metadata.type === "bool",
  Editor: BooleanEditor,
});

/**
 * Specification for default numeric editor. It applies for values whose type is "number".
 * @beta
 */
export const NumericEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: anyMetadata,
  isValueSupported: Value.isNumericValue,
  applies: (metadata) => metadata.type === "number",
  Editor: NumericEditor,
});

/**
 * Specification for default enum editor. It applies for values whose type is "enum".
 * @beta
 */
export const EnumEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is EnumValueMetadata =>
    metadata.type === "enum",
  isValueSupported: Value.isEnumValue,
  Editor: EnumEditor,
});

/**
 * List of default editors that are used as fallback if EditorRegistry does not provide a custom editor.
 * @internal
 */
export const defaultEditors: EditorSpec[] = [
  TextEditorSpec,
  BoolEditorSpec,
  NumericEditorSpec,
  DateEditorSpec,
  EnumEditorSpec,
];

/**
 * Editors that are rewritten based on the old version that accepts editor params from `PropertyRecord`. Needed to support
 * editing customizations used through `PropertyRecord`.
 * @internal
 */
export const interopEditors: EditorSpec[] = [
  EnumButtonGroupEditorSpec,
  InterOpEnumEditorSpec,
];

function anyMetadata(_metadata: ValueMetadata): _metadata is ValueMetadata {
  return true;
}
