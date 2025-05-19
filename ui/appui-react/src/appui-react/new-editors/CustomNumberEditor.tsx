/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  CustomNumberEditor as BaseCustomNumberEditor,
  CustomNumberEditorSpec as BaseCustomNumberEditorSpec,
} from "@itwin/components-react/internal";
import { LockButtonInputDecoration } from "../editors/LockProvider.js";

/* v8 ignore start */

/** @internal */
export const CustomNumberEditorSpec = {
  ...BaseCustomNumberEditorSpec,
  Editor: CustomNumberEditor as (typeof BaseCustomNumberEditorSpec)["Editor"],
};

type BaseCustomNumberEditorProps = React.ComponentProps<
  typeof BaseCustomNumberEditor
>;

function CustomNumberEditor(
  props: Omit<BaseCustomNumberEditorProps, "decoration">
) {
  return (
    <BaseCustomNumberEditor
      {...props}
      decoration={<LockButtonInputDecoration />}
    />
  );
}

/* v8 ignore stop */
