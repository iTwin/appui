/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { IconButton } from "@itwin/itwinui-react";
import { PolymorphicForwardRefComponent } from "@itwin/itwinui-react/cjs/core/utils";
import { IconButtonProps } from "@itwin/itwinui-react-v2";

/** @internal */
export const TabBarButton: React.ForwardRefExoticComponent<IconButtonProps> = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(function TabBarButton(props, ref) {
  return (
    <IconButton ref={ref} styleType="borderless" size="small" {...props} />
  );
});
