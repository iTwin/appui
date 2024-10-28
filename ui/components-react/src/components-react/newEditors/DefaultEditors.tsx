import { BooleanEditor } from "./editors/boolean-editor/BooleanEditor.js";
import { DateTimeEditor } from "./editors/date-editor/DateTimeEditor.js";
import { EnumEditor } from "./editors/enum-editor/EnumEditor.js";
import { NumericEditor } from "./editors/numeric-editor/NumericEditor.js";
import { TextEditor } from "./editors/text-editor/TextEditor.js";
import type { EditorSpec } from "./Types.js";

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
