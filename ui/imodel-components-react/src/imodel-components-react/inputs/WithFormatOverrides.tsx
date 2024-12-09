/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { ComponentType } from "react";
import type { FormatOverrides } from "./FormatOverrides.js";
import type { EditorProps } from "@itwin/components-react";

/**
 *
 */
export interface EditorPropsWithFormatOverrides extends EditorProps {
  formatOverrides?: FormatOverrides;
}

/**
 *
 */
export function withFormatOverrides(
  BaseEditor: ComponentType<EditorPropsWithFormatOverrides>,
  formatOverrides: FormatOverrides
) {
  return function EditorWithFormatOverrides(props: EditorProps) {
    return <BaseEditor {...props} formatOverrides={formatOverrides} />;
  };
}
