/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Color
 */

import "./Swatch.scss";
import classnames from "classnames";
import * as React from "react";
import type { ColorDef } from "@itwin/core-common";
import type { CommonProps } from "@itwin/core-react";
import { getCSSColorFromDef } from "./getCSSColorFromDef.js";

/** Properties for the [[ColorSwatch]] React component
 * @beta
 * @deprecated in 4.11.0. Props of deprecated component {@link ColorSwatch}.
 */
export interface ColorSwatchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    // eslint-disable-next-line deprecation/deprecation
    CommonProps {
  /** color specification */
  colorDef: ColorDef;
  /** function to run when user selects color swatch */
  onColorPick?: ((color: ColorDef, e: React.MouseEvent) => void) | undefined;
  /** Show swatches as squares unless round is set to true */
  round?: boolean;
}

/** ColorSwatch Functional component displays a color swatch in a button
 * @beta
 * @deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/colorpicker iTwinUI color picker} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function ColorSwatch(props: ColorSwatchProps) {
  const rgbaString = getCSSColorFromDef(props.colorDef);
  const colorStyle: React.CSSProperties = {
    backgroundColor: rgbaString,
    ...props.style,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (props && props.onColorPick) props.onColorPick(props.colorDef, e);
  };

  const classes = classnames(
    "components-color-swatch",
    props.round && "round",
    props.className
  );

  const {
    onColorPick,
    colorDef,
    round, // do not pass on color swatch specific props
    ...otherProps // pass-through props
  } = props;

  return (
    <button
      {...otherProps}
      style={colorStyle}
      className={classes}
      onClick={handleClick}
    />
  );
}
