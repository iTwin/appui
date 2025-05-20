/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import {
  CustomNumberEditor as BaseCustomNumberEditor,
  CustomNumberPropertyEditor as BaseCustomNumberPropertyEditor,
} from "@itwin/components-react";
import type { InternalInputEditorProps } from "@itwin/components-react/internal";
import {
  LockButtonInputDecoration,
  useLockDecoration,
} from "./LockProvider.js";

/** @internal */
export class CustomNumberPropertyEditor extends BaseCustomNumberPropertyEditor {
  public override get reactNode() {
    return <CustomNumberEditor />;
  }
}

const CustomNumberEditor = React.forwardRef<BaseCustomNumberEditor>(
  function CustomNumberEditor(props, forwardedRef) {
    const lockDecoration = useLockDecoration();
    const internalProps = {
      decoration: lockDecoration ? <LockButtonInputDecoration /> : undefined,
    } satisfies InternalInputEditorProps;
    return (
      <BaseCustomNumberEditor
        {...props}
        {...internalProps}
        ref={forwardedRef}
      />
    );
  }
);
