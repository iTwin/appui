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
import {
  calculateToolbarOpacity,
  getToolbarBackgroundColor,
  useRefs,
  useWidgetOpacityContext,
} from "@itwin/core-react/internal";
import { UiFramework } from "../../UiFramework.js";
import { ProcessDetector } from "@itwin/core-bentley";

type SurfaceProps = React.ComponentProps<typeof IUI_Surface> & {
  orientation: "horizontal" | "vertical";
};

/** @internal */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface({ className, style, orientation, ...rest }, forwardedRed) {
    const { ref, proximityScale } = useWidgetOpacityContext<HTMLDivElement>();
    const refs = useRefs(ref, forwardedRed);

    const opacity = React.useMemo(() => {
      if (
        (UiFramework.visibility.useProximityOpacity || // eslint-disable-line deprecation/deprecation
          UiFramework.visibility.snapWidgetOpacity) &&
        !ProcessDetector.isMobileBrowser
      ) {
        return calculateToolbarOpacity(proximityScale);
      }
      return undefined;
    }, [proximityScale]);
    const backgroundColor =
      opacity === undefined ? undefined : getToolbarBackgroundColor(opacity);

    return (
      <IUI_Surface
        {...rest}
        style={{
          backgroundColor,
          ...style,
        }}
        className={classnames(
          "uifw-toolbar-group-surface",
          `uifw-${orientation}`,
          className
        )}
        ref={refs}
      />
    );
  }
);
