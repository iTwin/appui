/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import type { ColorDef } from "@itwin/core-common";
import type { IconSpec } from "@itwin/core-react";

/** AccuDraw User Interface Settings
 * @beta
 */
export interface AccuDrawUiSettings {
  /** X field style */
  xStyle?: React.CSSProperties;
  /** Y field style */
  yStyle?: React.CSSProperties;
  /** Z field style */
  zStyle?: React.CSSProperties;
  /** Angle field style */
  angleStyle?: React.CSSProperties;
  /** Distance field style */
  distanceStyle?: React.CSSProperties;

  /** X field background color */
  xBackgroundColor?: ColorDef | string;
  /** Y field background color */
  yBackgroundColor?: ColorDef | string;
  /** Z field background color */
  zBackgroundColor?: ColorDef | string;
  /** Angle field background color */
  angleBackgroundColor?: ColorDef | string;
  /** Distance field background color */
  distanceBackgroundColor?: ColorDef | string;

  /** X field foreground color */
  xForegroundColor?: ColorDef | string;
  /** Y field foreground color */
  yForegroundColor?: ColorDef | string;
  /** Z field foreground color */
  zForegroundColor?: ColorDef | string;
  /** Angle field foreground color */
  angleForegroundColor?: ColorDef | string;
  /** Distance field foreground color */
  distanceForegroundColor?: ColorDef | string;

  /** X field label */
  xLabel?: string;
  /** Y field label */
  yLabel?: string;
  /** Z field label */
  zLabel?: string;
  /** Angle field label */
  angleLabel?: string;
  /** Distance field label */
  distanceLabel?: string;

  /** X field icon.
   * @deprecated in 4.16.0. Use {@link AccuDrawUiSettings.xIconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  xIcon?: IconSpec;
  /** X field icon. */
  xIconNode?: React.ReactNode;
  /** Y field icon.
   * @deprecated in 4.16.0. Use {@link AccuDrawUiSettings.yIconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  yIcon?: IconSpec;
  /** Y field icon. */
  yIconNode?: React.ReactNode;
  /** Z field icon.
   * @deprecated in 4.16.0. Use {@link AccuDrawUiSettings.zIconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  zIcon?: IconSpec;
  /** Z field icon. */
  zIconNode?: React.ReactNode;
  /** Angle field icon.
   * @deprecated in 4.16.0. Use {@link AccuDrawUiSettings.angleIconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  angleIcon?: IconSpec;
  /** Angle field icon. */
  angleIconNode?: React.ReactNode;
  /** Distance field icon.
   * @deprecated in 4.16.0. Use {@link AccuDrawUiSettings.distanceIconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  distanceIcon?: IconSpec;
  /** Distance field icon. */
  distanceIconNode?: React.ReactNode;
}
