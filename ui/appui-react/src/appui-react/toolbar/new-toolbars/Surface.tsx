/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Surface.scss";
import * as React from "react";
import classnames from "classnames";
import { Surface as IUI_Surface } from "@itwin/itwinui-react";

type SurfaceProps = React.ComponentProps<typeof IUI_Surface> & {
  orientation: "horizontal" | "vertical";
};

/** @internal */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface({ className, orientation, ...rest }, ref) {
    return (
      <IUI_Surface
        {...rest}
        className={classnames(
          "uifw-toolbar-group-surface",
          `uifw-${orientation}`,
          className
        )}
        ref={ref}
      />
    );
  }
);
