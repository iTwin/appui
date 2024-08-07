/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import "./SquareButton.scss";
import classnames from "classnames";
import * as React from "react";
import { Button } from "@itwin/itwinui-react";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type SquareButtonProps = Omit<ButtonProps, "size" | "styleType">;

/** @internal */
export class SquareButton extends React.PureComponent<SquareButtonProps> {
  public override render() {
    const { className, style, ...buttonProps } = this.props;

    const buttonClassNames = classnames("uifw-square-button", className);
    return (
      <Button
        {...buttonProps}
        size="small"
        className={buttonClassNames}
        style={style}
      />
    );
  }
}
