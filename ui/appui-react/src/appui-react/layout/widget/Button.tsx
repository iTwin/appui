/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { IconButton } from "@itwin/itwinui-react";

/** @internal */
export const TabBarButton: typeof IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(function TabBarButton(props, ref) {
  return (
    <IconButton ref={ref} styleType="borderless" size="small" {...props} />
  );
});
