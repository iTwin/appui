/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ReactElement } from "react";
import type {} from "@itwin/core-frontend";

declare module "@itwin/core-frontend" {
  interface ToolAssistanceInstruction {
    iconElement?: ReactElement;
  }
}
