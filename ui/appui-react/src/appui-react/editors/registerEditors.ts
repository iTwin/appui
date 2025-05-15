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

/** @internal */
export function registerEditors() {
  registerDefaultPropertyEditor(
    StandardTypeNames.Number,
    CustomNumberPropertyEditor,
    StandardEditorNames.NumberCustom,
    true
  );
}
