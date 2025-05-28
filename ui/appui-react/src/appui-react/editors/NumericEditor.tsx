/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import {
  NumericInputEditor as BaseNumericInputEditor,
  NumericInputPropertyEditor as BaseNumericInputPropertyEditor,
} from "@itwin/components-react";
import type { InternalInputEditorProps } from "@itwin/components-react/internal";
import {
  LockButtonInputDecoration,
  useLockDecoration,
} from "./LockProvider.js";
import { useToolSettingsKeyPressCommit } from "../preview/tool-settings-key-press-commit/useToolSettingsKeyPressCommit.js";

/** @internal */
export class NumericInputPropertyEditor extends BaseNumericInputPropertyEditor {
  public override get reactNode() {
    return <NumericEditor />;
  }
}

const NumericEditor = React.forwardRef<BaseNumericInputEditor>(
  function NumericEditor(props, forwardedRef) {
    const shouldCommitOnChange = useToolSettingsKeyPressCommit();
    const lockDecoration = useLockDecoration();
    const internalProps = {
      decoration: lockDecoration ? <LockButtonInputDecoration /> : undefined,
    } satisfies InternalInputEditorProps;
    return (
      <BaseNumericInputEditor
        {...props}
        {...internalProps}
        shouldCommitOnChange={shouldCommitOnChange}
        ref={forwardedRef}
      />
    );
  }
);
