/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import * as React from "react";
import { DrawingNavigationAid } from "@itwin/imodel-components-react";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl";
import { NavigationAidControl } from "./NavigationAidControl";

/** Navigation Aid that displays an interactive mini-map for Drawing views that synchronizes with the iModel Viewport.
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/imodel-components-react#DrawingNavigationAid} component instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class DrawingNavigationAidControl extends NavigationAidControl {
  public static navigationAidId = "DrawingNavigationAid";

  // eslint-disable-next-line deprecation/deprecation
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = (
      <DrawingNavigationAid
        iModelConnection={options.imodel}
        viewport={options.viewport}
      />
    );
  }

  public override getSize(): string | undefined {
    return "96px";
  }
}
