/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ReactElement } from "react";
import type {} from "@itwin/core-frontend";

declare module "@itwin/core-frontend" {
  interface ToolAssistanceInstruction {
    /** The icon to display for the tool assistance instruction. Takes precedence over `image`. */
    iconElement?: ReactElement;
  }
}

declare module "@itwin/appui-abstract" {
  interface InputEditorSizeParams {
    /** The max-width for an input editor. */
    maxWidth?: number;
  }
}
