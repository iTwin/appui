/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Color
 */

import "./AlphaSlider.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { CommonProps } from "@itwin/core-react";
import { UiIModelComponents } from "../UiIModelComponents";

/** Properties for the [[AlphaSlider]] React component
 * @public
 * @deprecated in 4.11.0. Props of deprecated component {@link AlphaSlider}.
 */
export interface AlphaSliderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CommonProps {
  /** true if slider is oriented horizontal, else vertical orientation is assumed */
  isHorizontal?: boolean;
  /** function to run when user selects color swatch */
  onAlphaChange?: ((alpha: number) => void) | undefined;
  /** Alpha value between 0 (transparent) and 1 (opaque) */
  alpha: number;
}

/** AlphaSlider component used to set the alpha value.
 * @public
 * @deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/colorpicker iTwinUI color picker} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class AlphaSlider extends React.PureComponent<AlphaSliderProps> {
  private _container: HTMLDivElement | null = null;

  /** @internal */
  // eslint-disable-next-line deprecation/deprecation
  constructor(props: AlphaSliderProps) {
    super(props);
  }

  private _calculateChange = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    isHorizontal: boolean,
    alpha: number,
    container: HTMLDivElement
  ): number | undefined => {
    e.preventDefault();
    const { width: containerWidth, height: containerHeight } =
      container.getBoundingClientRect();

    let x = 0;
    if ("pageX" in e) {
      x = e.pageX;
    } else {
      if (undefined === e.touches) return undefined;
      x = e.touches[0].pageX;
    }
    if (undefined === x) return undefined;

    let y = 0;
    if ("pageY" in e) {
      y = e.pageY;
    } else {
      if (undefined === e.touches) return;
      y = e.touches[0].pageY;
    }
    if (undefined === y) return undefined;

    const left = x - (container.getBoundingClientRect().left + window.scrollX);
    const top = y - (container.getBoundingClientRect().top + window.scrollY);

    let t = 0;

    if (!isHorizontal) {
      if (top < 0) {
        t = 1;
      } else if (top > containerHeight) {
        t = 0;
      } else {
        t = 1 - top / containerHeight;
      }
    } else {
      // horizontal
      if (left < 0) {
        t = 0;
      } else if (left > containerWidth) {
        t = 1;
      } else {
        t = left / containerWidth;
      }
    }

    if (t < 0) t = 0;
    if (t > 1) t = 1;
    return alpha !== t ? t : undefined;
  };

  /** @internal */
  public override componentWillUnmount() {
    this._unbindEventListeners();
  }

  private _onChange = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (this._container && this.props.onAlphaChange) {
      const change = this._calculateChange(
        e,
        this.props.isHorizontal ? this.props.isHorizontal : false,
        this.props.alpha,
        this._container
      );
      undefined !== change &&
        typeof this.props.onAlphaChange === "function" &&
        this.props.onAlphaChange(change);
    }
  };

  private _onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this._onChange(e);
    if (this._container) this._container.focus();
    window.addEventListener("mousemove", this._onChange as any);
    window.addEventListener("mouseup", this._onMouseUp);
  };

  private _onKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    let newTransparency: number | undefined;
    if (
      evt.key === Key.ArrowLeft.valueOf() ||
      evt.key === Key.ArrowDown.valueOf()
    ) {
      newTransparency = this.props.alpha - (evt.ctrlKey ? 0.1 : 0.05);
    } else if (
      evt.key === Key.ArrowRight.valueOf() ||
      evt.key === Key.ArrowUp.valueOf()
    ) {
      newTransparency = this.props.alpha + (evt.ctrlKey ? 0.1 : 0.05);
    } else if (evt.key === Key.PageDown.valueOf()) {
      newTransparency = this.props.alpha - (evt.ctrlKey ? 0.5 : 0.25);
    } else if (evt.key === Key.PageUp.valueOf()) {
      newTransparency = this.props.alpha + (evt.ctrlKey ? 0.5 : 0.25);
    } else if (evt.key === Key.Home.valueOf()) {
      newTransparency = 0;
    } else {
      if (evt.key === Key.End.valueOf()) {
        newTransparency = 1;
      }
    }

    if (undefined !== newTransparency) {
      if (newTransparency > 1) newTransparency = 1;
      if (newTransparency < 0) newTransparency = 0;
      if (this.props.onAlphaChange) this.props.onAlphaChange(newTransparency);
    }
  };

  private _onMouseUp = () => {
    this._unbindEventListeners();
  };

  private _unbindEventListeners() {
    window.removeEventListener("mousemove", this._onChange as any);
    window.removeEventListener("mouseup", this._onMouseUp);
  }

  /** @internal */
  public override render(): React.ReactNode {
    const containerClasses = classnames(
      this.props.isHorizontal
        ? "components-alpha-container-horizontal"
        : "components-alpha-container-vertical",
      this.props.className
    );

    const pointerStyle: React.CSSProperties = this.props.isHorizontal
      ? { left: `${this.props.alpha * 100}%` }
      : { left: `0px`, top: `${-(this.props.alpha * 100) + 100}%` };

    return (
      <div
        className={containerClasses}
        style={this.props.style}
        data-testid="alpha-container"
      >
        <div
          data-testid="alpha-slider"
          role="slider"
          aria-label={UiIModelComponents.translate("color.transparency")}
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={this.props.alpha}
          className="components-alpha-slider"
          ref={(container) => (this._container = container)}
          onMouseDown={this._onMouseDown}
          onTouchMove={this._onChange}
          onTouchStart={this._onChange}
          tabIndex={0}
          onKeyDown={this._onKeyDown}
        >
          <div
            style={pointerStyle}
            className="components-alpha-pointer"
            data-testid="alpha-pointer"
          />
        </div>
      </div>
    );
  }
}
