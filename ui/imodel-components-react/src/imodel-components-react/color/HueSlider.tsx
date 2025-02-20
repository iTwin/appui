/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Color
 */

import "./HueSlider.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { HSVColor } from "@itwin/core-common";
import type { CommonProps } from "@itwin/core-react";
import { useTranslation } from "../useTranslation.js";

// hue is a value from 0 to 360
function calculateHue(currentPos: number, high: number, isVertical: boolean) {
  if (currentPos <= 0) {
    return isVertical ? 359 : 0;
  } else if (currentPos >= high) {
    return isVertical ? 0 : 359;
  } else {
    let percent = (currentPos * 100) / high;
    if (isVertical) percent = 100 - percent;
    return Math.round((359 * percent) / 100);
  }
}

function calculateChange(
  currentHue: number,
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  isHorizontal: boolean,
  container: HTMLDivElement
) {
  const {
    width: containerWidth,
    height: containerHeight,
    top: containerTop,
    left: containerLeft,
  } = container.getBoundingClientRect();

  let x: number | undefined;
  if ("pageX" in e) {
    x = e.pageX;
  } else {
    if (undefined === e.touches || 0 === e.touches.length) return currentHue;
    x = e.touches[0].pageX;
  }
  if (undefined === x) return currentHue;

  let y: number | undefined;
  if ("pageY" in e) {
    y = e.pageY;
  } else {
    if (undefined === e.touches || 0 === e.touches.length) return currentHue;
    y = e.touches[0].pageY;
  }
  if (undefined === y) return currentHue;

  const pointerX = x - (containerLeft + window.scrollX);
  const pointerY = y - (containerTop + window.scrollY);

  if (!isHorizontal) {
    // vertical
    return calculateHue(pointerY, containerHeight, true);
  } else {
    // horizontal
    return calculateHue(pointerX, containerWidth, false);
  }
}

/** Properties for the [[HueSlider]] React component
 * @beta
 * @deprecated in 4.11.0. Props of deprecated component {@link HueSlider}.
 */
export interface HueSliderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    CommonProps {
  /** true if slider is oriented horizontal, else vertical orientation is assumed */
  isHorizontal?: boolean;
  /** function to run when user hue is changed */
  onHueChange?: ((hue: HSVColor) => void) | undefined;
  /** HSV Color Value */
  hsv: HSVColor;
}

/** HueSlider component used to set the hue value.
 * @beta
 * @deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/colorpicker iTwinUI color picker} instead.
 */
export function HueSlider({
  isHorizontal,
  onHueChange,
  hsv,
  className,
  style,
}: // eslint-disable-next-line @typescript-eslint/no-deprecated
HueSliderProps) {
  const { translate } = useTranslation();
  const container = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const onChange = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (container.current) {
        const newHue = calculateChange(
          hsv.h,
          e,
          !!isHorizontal,
          container.current
        );
        const newColor = hsv.clone(newHue);
        if (onHueChange) onHueChange(newColor);
      }
    },
    [isHorizontal, hsv, onHueChange]
  );

  const onDragging = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (isDragging.current) {
        onChange(e);
      }
    },
    [onChange]
  );

  const onMouseUp = React.useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
    }
  }, []);

  const onTouchEnd = React.useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (isDragging.current) {
        onChange(event);
        isDragging.current = false;
      }
    },
    [onChange]
  );

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (e.target !== e.currentTarget) {
        if (!isDragging.current) {
          document.addEventListener("mouseup", onMouseUp, {
            capture: true,
            once: true,
          });
          isDragging.current = true;
        }
      }

      onChange(e);

      if (container.current) container.current.focus();
    },
    [onChange, onMouseUp]
  );

  const onTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) isDragging.current = true;

      onChange(e);

      if (container.current) container.current.focus();
    },
    [onChange]
  );

  const onKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      let newHue: number | undefined;
      const hueValue = hsv.h;
      if (
        evt.key === Key.ArrowLeft.valueOf() ||
        evt.key === Key.ArrowDown.valueOf()
      ) {
        newHue = hueValue - (evt.ctrlKey ? 10 : 1);
      } else if (
        evt.key === Key.ArrowRight.valueOf() ||
        evt.key === Key.ArrowUp.valueOf()
      ) {
        newHue = hueValue + (evt.ctrlKey ? 10 : 1);
      } else if (evt.key === Key.PageDown.valueOf()) {
        newHue = hueValue - (evt.ctrlKey ? 180 : 60);
      } else if (evt.key === Key.PageUp.valueOf()) {
        newHue = hueValue + (evt.ctrlKey ? 180 : 60);
      } else if (evt.key === Key.Home.valueOf()) {
        newHue = 0;
      } else {
        if (evt.key === Key.End.valueOf()) {
          newHue = 359;
        }
      }

      if (undefined !== newHue) {
        if (newHue > 359) newHue = 359; // 360 is same as zero
        if (newHue < 0) newHue = 0;

        const newColor = hsv.clone(newHue);
        if (onHueChange) onHueChange(newColor);
        evt.preventDefault();
      }
    },
    [hsv, onHueChange]
  );

  const containerClasses = classnames(
    isHorizontal
      ? "components-hue-container-horizontal"
      : "components-hue-container-vertical",
    className
  );

  const pointerStyle: React.CSSProperties = isHorizontal
    ? {
        left: `${(hsv.h * 100) / 360}%`,
        backgroundColor: `hsl(${hsv.h} ,100%, 50%)`,
      }
    : {
        left: `0px`,
        top: `${-((hsv.h * 100) / 360) + 100}%`,
        backgroundColor: `hsl(${hsv.h} ,100%, 50%)`,
      };

  return (
    <div className={containerClasses} style={style} data-testid="hue-container">
      <div
        data-testid="hue-slider"
        role="slider"
        aria-label={translate("color.hue")}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={hsv.h}
        className="components-hue-slider"
        ref={container}
        onMouseDown={onMouseDown}
        onMouseMove={onDragging}
        onTouchMove={onDragging}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          style={pointerStyle}
          className="components-hue-pointer"
          data-testid="hue-pointer"
        />
      </div>
    </div>
  );
}
