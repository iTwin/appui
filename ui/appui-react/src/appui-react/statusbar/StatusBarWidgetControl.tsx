/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl.js";
import { ConfigurableUiControlType } from "../configurableui/ConfigurableUiControl.js";
import { WidgetControl } from "../widgets/WidgetControl.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Status Bar Field type.
 * @public
 * @deprecated in 4.16.0. Type is not used in AppUI.
 */
export type StatusBarFieldId = string | null;

/** Status Bar Widget Control.
 * @public
 * @deprecated in 4.16.0. Extends a deprecated class {@link WidgetControl}.
 */
export abstract class StatusBarWidgetControl extends WidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  /** Gets the React node associated with this StatusBar Widget Control */
  public abstract getReactNode(): React.ReactNode;

  /** Gets the type of ConfigurableUiControl, which is 'StatusBarWidget' in this case */
  public override getType(): ConfigurableUiControlType {
    return ConfigurableUiControlType.StatusBarWidget;
  }
}
