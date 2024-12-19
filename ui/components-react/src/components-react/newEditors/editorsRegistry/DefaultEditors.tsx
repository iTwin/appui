/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BooleanEditor } from "../editors/boolean/BooleanEditor.js";
import { DateTimeEditor } from "../editors/date/DateTimeEditor.js";
import { EnumEditor } from "../editors/enum/EnumEditor.js";
import { NumericEditor } from "../editors/numeric/NumericEditor.js";
import { TextEditor } from "../editors/text/TextEditor.js";
import { OldEnumEditorSpec } from "../interop/old-editors/enum/Enum.js";
import { EnumButtonGroupEditorSpec } from "../interop/old-editors/enum/EnumButtonGroup.js";

import type { EditorSpec } from "../Types.js";

export const TextEditorSpec: EditorSpec = {
  applies: (metadata) => metadata.type === "string",
  Editor: TextEditor,
};

export const DateEditorSpec: EditorSpec = {
  applies: (metadata) => metadata.type === "date",
  Editor: DateTimeEditor,
};

export const BoolEditorSpec: EditorSpec = {
  applies: (metadata) => metadata.type === "bool",
  Editor: BooleanEditor,
};

export const NumericEditorSpec: EditorSpec = {
  applies: (metadata) => metadata.type === "number",
  Editor: NumericEditor,
};

export const EnumEditorSpec: EditorSpec = {
  applies: (metadata) => metadata.type === "enum",
  Editor: EnumEditor,
};

export const defaultEditors: EditorSpec[] = [
  TextEditorSpec,
  BoolEditorSpec,
  NumericEditorSpec,
  DateEditorSpec,
  EnumEditorSpec,
];

// editors that are rewritten based on the old version that accepts editor params from `PropertyRecord`
export const interopEditors: EditorSpec[] = [
  EnumButtonGroupEditorSpec,
  OldEnumEditorSpec,
];
