/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import { StandardEditorNames, StandardTypeNames } from "@itwin/appui-abstract";
import {
  BasicPropertyEditor,
  registerDefaultPropertyEditor,
} from "./PropertyEditorManager.js";
import {
  DateTimePropertyEditor,
  ShortDateTimePropertyEditor,
} from "./DateTimeEditor.js";
import { BooleanPropertyEditor } from "./BooleanEditor.js";
import { CustomNumberPropertyEditor } from "./CustomNumberEditor.js";
import { EnumPropertyButtonGroupEditor } from "./EnumButtonGroupEditor.js";
import { EnumPropertyEditor } from "./EnumEditor.js";
import { IconPropertyEditor } from "./IconEditor.js";
import { ImageCheckBoxPropertyEditor } from "./ImageCheckBoxEditor.js";
import { NumericInputPropertyEditor } from "./NumericInputEditor.js";
import { SliderPropertyEditor } from "./SliderEditor.js";
import { TextareaPropertyEditor } from "./TextareaEditor.js";
import { TogglePropertyEditor } from "./ToggleEditor.js";

/** @internal */
export function registerEditors() {
  registerDefaultPropertyEditor(StandardTypeNames.Bool, BooleanPropertyEditor);
  registerDefaultPropertyEditor(
    StandardTypeNames.Boolean,
    BooleanPropertyEditor
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Boolean,
    ImageCheckBoxPropertyEditor,
    StandardEditorNames.ImageCheckBox
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Bool,
    ImageCheckBoxPropertyEditor,
    StandardEditorNames.ImageCheckBox
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Bool,
    TogglePropertyEditor,
    StandardEditorNames.Toggle
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Boolean,
    TogglePropertyEditor,
    StandardEditorNames.Toggle
  );

  registerDefaultPropertyEditor(
    StandardTypeNames.Number,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Int,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Float,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Double,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Number,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Int,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Float,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Double,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Number,
    CustomNumberPropertyEditor,
    StandardEditorNames.NumberCustom
  );

  registerDefaultPropertyEditor(StandardTypeNames.Text, BasicPropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.String, BasicPropertyEditor);
  registerDefaultPropertyEditor(
    StandardTypeNames.Text,
    IconPropertyEditor,
    StandardEditorNames.IconPicker
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.String,
    IconPropertyEditor,
    StandardEditorNames.IconPicker
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Text,
    TextareaPropertyEditor,
    StandardEditorNames.MultiLine
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.String,
    TextareaPropertyEditor,
    StandardEditorNames.MultiLine
  );

  registerDefaultPropertyEditor(
    StandardTypeNames.Enum,
    EnumPropertyButtonGroupEditor,
    StandardEditorNames.EnumButtonGroup
  );
  registerDefaultPropertyEditor(StandardTypeNames.Enum, EnumPropertyEditor);

  registerDefaultPropertyEditor(
    StandardTypeNames.ShortDate,
    ShortDateTimePropertyEditor
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.DateTime,
    DateTimePropertyEditor
  );
}
