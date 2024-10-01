/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import * as React from "react";
import { CubeNavigationAid } from "@itwin/imodel-components-react";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl.js";
import { NavigationAidControl } from "./NavigationAidControl.js";

/** Navigation Aid that displays an interactive rotation cube for Spatial views that synchronizes with the rotation of the iModel Viewport
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/imodel-components-react#CubeNavigationAid} component instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class CubeNavigationAidControl extends NavigationAidControl {
  public static navigationAidId = "CubeNavigationAid";

  // eslint-disable-next-line deprecation/deprecation
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = (
      <CubeNavigationAid
        iModelConnection={options.imodel}
        viewport={options.viewport}
      />
    );
  }

  public override getSize(): string | undefined {
    return "96px";
  }
}
