/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module LineWeight
 */

import "./Swatch.scss";
import classnames from "classnames";
import * as React from "react";
import type { ColorDef } from "@itwin/core-common";
import type { CommonProps } from "@itwin/core-react";
import { getCSSColorFromDef } from "../color/getCSSColorFromDef.js";

/** Properties for the [[LineWeightSwatch]] React component
 * @public
 */
export interface LineWeightSwatchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    // eslint-disable-next-line deprecation/deprecation
    CommonProps {
  /** color specification */
  weight: number;
  /** color specification */
  colorDef?: ColorDef;
  /** hide the weight label */
  hideLabel?: boolean;
  /** Disabled or not */
  disabled?: boolean;
  /** Readonly or not */
  readonly?: boolean;
  /** function to run when user selects a line weight swatch */
  onClick?: () => void;
}

/** LineWeightSwatch Functional component
 * @public
 */
export class LineWeightSwatch extends React.PureComponent<LineWeightSwatchProps> {
  constructor(props: LineWeightSwatchProps) {
    super(props);
  }

  public override componentDidMount() {}

  public override render() {
    const {
      onClick,
      colorDef,
      weight,
      hideLabel,
      className, // do not pass on color swatch specific props
      disabled,
      readonly,
      ...otherProps // pass-through props
    } = this.props;

    let rgbaString = "";

    if (colorDef) {
      rgbaString = getCSSColorFromDef(colorDef);
    }

    const buttonStyle: React.CSSProperties = colorDef
      ? {
          ...this.props.style,
          color: rgbaString,
        }
      : {
          ...this.props.style,
        };

    const svgStyle: React.CSSProperties = colorDef
      ? {
          height: `${weight}px`,
          background: rgbaString,
        }
      : {
          height: `${weight}px`,
        };

    const handleClick = (_e: React.MouseEvent) => {
      if (onClick) onClick();
    };

    const classes = classnames(
      "components-lineweight-swatch",
      hideLabel && "hide-label",
      readonly && "readonly",
      className
    );

    return (
      <button
        {...otherProps}
        style={buttonStyle}
        className={classes}
        onClick={handleClick}
        disabled={disabled}
      >
        {!hideLabel && <span>{weight.toFixed(0)}</span>}
        <div style={svgStyle} />
      </button>
    );
  }
}
