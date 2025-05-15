/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import { StandardEditorNames, StandardTypeNames } from "@itwin/appui-abstract";
import { CustomNumberPropertyEditor } from "./CustomNumber.js";
import { registerDefaultPropertyEditor } from "@itwin/components-react/internal";
import { LockPropertyEditor, LockPropertyEditorName } from "./LockEditor.js";

/** @internal */
export function registerEditors() {
  // Editors that support lock decorations.
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
