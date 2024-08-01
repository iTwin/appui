/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import { Orientation } from "@itwin/components-react";
import { useResizeObserver } from "@itwin/core-react";
import { AccuDrawFieldContainer } from "./AccuDrawFieldContainer";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl";
import { WidgetControl } from "../widgets/WidgetControl";
import { UiFramework } from "../UiFramework";

/** AccuDraw Widget Control
 * @public
 * @deprecated in 4.16.0. Use {@link AccuDrawWidget} component instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class AccuDrawWidgetControl extends WidgetControl {
  public static id = "AccuDrawWidget";

  public static get label(): string {
    return UiFramework.translate("accuDraw.dialogTitle");
  }

  // eslint-disable-next-line deprecation/deprecation
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = <AccuDrawWidget />;
  }
}

/** AccuDraw Widget displays [[AccuDrawFieldContainer]] for AccuDraw Ui
 * @public
 */
export function AccuDrawWidget() {
  const [orientation, setOrientation] = React.useState(Orientation.Vertical);
  const breakpoint = 400;

  const handleResize = React.useCallback((w: number, _h: number) => {
    setOrientation(
      w <= breakpoint ? Orientation.Vertical : Orientation.Horizontal
    );
  }, []);

  const ref = useResizeObserver<HTMLDivElement>(handleResize);

  return (
    <div ref={ref}>
      <AccuDrawFieldContainer orientation={orientation} />
    </div>
  );
}
