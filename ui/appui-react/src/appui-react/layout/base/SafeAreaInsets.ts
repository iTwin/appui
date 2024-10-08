/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
import { SafeAreaInsets } from "../../safearea/SafeAreaInsets.js";

/** @internal */
export class SafeAreaInsetsHelpers {
  public static isBottom(flags: SafeAreaInsets) {
    return SafeAreaInsets.Bottom.valueOf() === (flags & SafeAreaInsets.Bottom);
  }

  public static isLeft(flags: SafeAreaInsets) {
    return SafeAreaInsets.Left.valueOf() === (flags & SafeAreaInsets.Left);
  }

  public static isRight(flags: SafeAreaInsets) {
    return SafeAreaInsets.Right.valueOf() === (flags & SafeAreaInsets.Right);
  }

  public static isTop(flags: SafeAreaInsets) {
    return SafeAreaInsets.Top.valueOf() === (flags & SafeAreaInsets.Top);
  }

  public static getCssClassNames = (flags: SafeAreaInsets) => {
    return {
      "nz-safe-area-bottom": SafeAreaInsetsHelpers.isBottom(flags),
      "nz-safe-area-left": SafeAreaInsetsHelpers.isLeft(flags),
      "nz-safe-area-right": SafeAreaInsetsHelpers.isRight(flags),
      "nz-safe-area-top": SafeAreaInsetsHelpers.isTop(flags),
    };
  };
}
