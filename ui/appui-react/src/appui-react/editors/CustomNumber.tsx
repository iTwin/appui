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
import type { InternalCustomNumberEditorProps } from "@itwin/components-react/internal";
import {
  LockButtonInputDecoration,
  useLockDecoration,
} from "./LockProvider.js";

/** @internal */
export class CustomNumberPropertyEditor extends BaseCustomNumberPropertyEditor {
  public override get reactNode(): React.ReactNode {
    return <CustomNumberEditor />;
  }
}

const CustomNumberEditor = React.forwardRef(function CustomNumberEditor(
  props,
  forwardedRef
) {
  const lockDecoration = useLockDecoration();
  const internalProps = {
    decoration: lockDecoration ? <LockButtonInputDecoration /> : undefined,
  } satisfies InternalCustomNumberEditorProps;
  return (
    <BaseCustomNumberEditor
      {...props}
      {...internalProps}
      ref={forwardedRef as any}
    />
  );
});
