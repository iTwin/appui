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
  PropertyEditorManager,
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
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Bool,
    BooleanPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Boolean,
    BooleanPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Boolean,
    ImageCheckBoxPropertyEditor,
    StandardEditorNames.ImageCheckBox
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Bool,
    ImageCheckBoxPropertyEditor,
    StandardEditorNames.ImageCheckBox
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Bool,
    TogglePropertyEditor,
    StandardEditorNames.Toggle
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Boolean,
    TogglePropertyEditor,
    StandardEditorNames.Toggle
  );

  PropertyEditorManager.registerEditor(
    StandardTypeNames.Number,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Int,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Float,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Double,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Number,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Int,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Float,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Double,
    SliderPropertyEditor,
    StandardEditorNames.Slider
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Number,
    CustomNumberPropertyEditor,
    StandardEditorNames.NumberCustom
  );

  PropertyEditorManager.registerEditor(
    StandardTypeNames.Text,
    BasicPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.String,
    BasicPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Text,
    IconPropertyEditor,
    StandardEditorNames.IconPicker
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.String,
    IconPropertyEditor,
    StandardEditorNames.IconPicker
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Text,
    TextareaPropertyEditor,
    StandardEditorNames.MultiLine
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.String,
    TextareaPropertyEditor,
    StandardEditorNames.MultiLine
  );

  PropertyEditorManager.registerEditor(
    StandardTypeNames.Enum,
    EnumPropertyButtonGroupEditor,
    StandardEditorNames.EnumButtonGroup
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Enum,
    EnumPropertyEditor
  );

  PropertyEditorManager.registerEditor(
    StandardTypeNames.ShortDate,
    ShortDateTimePropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.DateTime,
    DateTimePropertyEditor
  );
}
