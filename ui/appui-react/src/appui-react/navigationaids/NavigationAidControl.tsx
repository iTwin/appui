/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import type * as React from "react";
import type { IModelConnection } from "@itwin/core-frontend";
import { UiEvent } from "@itwin/appui-abstract";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl.js";
import {
  ConfigurableUiControl,
  ConfigurableUiControlType,
} from "../configurableui/ConfigurableUiControl.js";

/* eslint-disable deprecation/deprecation */

/** NavigationAid Activated Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface NavigationAidActivatedEventArgs {
  navigationAidId: string;
  iModelConnection: IModelConnection;
}

/** NavigationAid Activated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
export class NavigationAidActivatedEvent extends UiEvent<NavigationAidActivatedEventArgs> {}

/** The base class for Navigation Aid controls.
 * @public
 * @deprecated in 4.16.0. Extends a deprecated class {@link ConfigurableUiControl}.
 */
export class NavigationAidControl extends ConfigurableUiControl {
  private _reactNode: React.ReactNode;

  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  /** The React element associated with this control */
  public get reactNode(): React.ReactNode {
    return this._reactNode;
  }
  public set reactNode(r: React.ReactNode) {
    this._reactNode = r;
  }

  /** Square size of navigation aid. Default size is "64px". Override to set a different size. */
  public getSize(): string | undefined {
    return undefined;
  }

  /** Get the type of this control. */
  public getType(): ConfigurableUiControlType {
    return ConfigurableUiControlType.NavigationAid;
  }
}
