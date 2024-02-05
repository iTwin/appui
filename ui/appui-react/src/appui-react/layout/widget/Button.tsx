/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { Button } from "@itwin/itwinui-react";

/** @internal */
export const TabBarButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function TabBarButton(props, ref) {
  return <Button ref={ref} styleType="borderless" size="small" {...props} />;
});
