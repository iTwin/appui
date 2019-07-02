/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { Rectangle } from "../../../utilities/Rectangle";

/** @alpha */
export class Root {
  public static readonly FOOTER_HEIGHT = 40;  // Must match $footer-height in footer\_variables.scss
  private _isInFooterMode: boolean;

  public constructor(public bounds: Rectangle, isInFooterMode: boolean) {
    this._isInFooterMode = isInFooterMode;
  }

  public get isInFooterMode() {
    return this._isInFooterMode;
  }

  public set isInFooterMode(isInFooterMode: boolean) {
    this._isInFooterMode = isInFooterMode;
  }
}
