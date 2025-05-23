/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import { StandardEditorNames, StandardTypeNames } from "@itwin/appui-abstract";
import { registerDefaultPropertyEditor } from "@itwin/components-react/internal";
import { LockPropertyEditor, LockPropertyEditorName } from "./LockEditor.js";
import { CustomNumberPropertyEditor } from "./CustomNumberEditor.js";
import { TextPropertyEditor } from "./TextEditor.js";
import { NumericInputPropertyEditor } from "./NumericEditor.js";

/** @internal */
export function registerEditors() {
  // Editors that support lock decorations.
  registerDefaultPropertyEditor(
    StandardTypeNames.Text,
    TextPropertyEditor,
    undefined,
    true
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.String,
    TextPropertyEditor,
    undefined,
    true
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Number,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput,
    true
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Int,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput,
    true
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Float,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput,
    true
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Double,
    NumericInputPropertyEditor,
    StandardEditorNames.NumericInput,
    true
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Number,
    CustomNumberPropertyEditor,
    StandardEditorNames.NumberCustom,
    true
  );

  // `appui-react` specific editors.
  registerDefaultPropertyEditor(
    StandardTypeNames.Bool,
    LockPropertyEditor,
    LockPropertyEditorName
  );
  registerDefaultPropertyEditor(
    StandardTypeNames.Boolean,
    LockPropertyEditor,
    LockPropertyEditorName
  );
}
