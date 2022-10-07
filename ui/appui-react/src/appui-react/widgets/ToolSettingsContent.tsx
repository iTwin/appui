/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";

// TODO: remove? This is only used in ToolSettingsGridContainer.

/** @internal */
export interface ToolSettingsContentContextProps {
  readonly availableContentWidth: number;
}

/** @internal */
export const ToolSettingsContentContext = React.createContext<ToolSettingsContentContextProps>({ // eslint-disable-line @typescript-eslint/naming-convention
  availableContentWidth: 0,
});
