/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Color
 */

import "./SaturationPicker.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import { ColorDef, HSVColor } from "@itwin/core-common";
import type { CommonProps } from "@itwin/core-react";
import { useTranslation } from "../useTranslation.js";

function calculateChange(
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  hsv: HSVColor,
  container: HTMLDivElement
): HSVColor | undefined {
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
    if (undefined !== e.touches && e.touches.length) x = e.touches[0].pageX;
  }
  if (undefined === x) return hsv;

  let y = 0;
  if ("pageY" in e) {
    y = e.pageY;
  } else {
    if (undefined !== e.touches && e.touches.length) y = e.touches[0].pageY;
  }
  if (undefined === y) return hsv;

  let left = x - (containerLeft + window.scrollX);
  let top = y - (containerTop + window.scrollY);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  } else if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  let saturation = Math.round((left * 100) / containerWidth);
  let value = Math.round(-((top * 100) / containerHeight) + 100);

  if (saturation < 0) saturation = 0;
  if (saturation > 100) saturation = 100;
  if (value < 0) value = 0;
  if (value > 100) value = 100;

  return hsv.clone(hsv.h, saturation, value);
}

/** Properties for the [[SaturationPicker]] React component
 * @beta
 * @deprecated in 4.11.0. Props of deprecated component {@link SaturationPicker}.
 */
export interface SaturationPickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    CommonProps {
  /** function to run when user selects location in saturation region */
  onSaturationChange?: ((saturation: HSVColor) => void) | undefined;
  /** HSV Color Value */
  hsv: HSVColor;
}

/** SaturationPicker component used to set the saturation value.
 * @beta
 * @deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/colorpicker iTwinUI color picker} instead.
 */
export function SaturationPicker({
  onSaturationChange,
  hsv,
  className,
  style,
}: // eslint-disable-next-line @typescript-eslint/no-deprecated
SaturationPickerProps) {
  const { translate } = useTranslation();
  const container = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const onChange = React.useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (container.current) {
        const newHsvColor = calculateChange(e, hsv, container.current);
        if (newHsvColor) {
          if (onSaturationChange) onSaturationChange(newHsvColor);
        }
      }
    },
    [hsv, onSaturationChange]
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
      if (isDragging.current) {
        onChange(event);
        isDragging.current = false;
      }
    },
    [onChange]
  );

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) {
        isDragging.current = true;
        document.addEventListener("mouseup", onMouseUp, {
          capture: true,
          once: true,
        });
      }

      onChange(e);

      if (container.current) container.current.focus();

      e.preventDefault();
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
      const h = hsv.h;
      let { s, v } = { ...hsv };
      if (evt.key === Key.ArrowLeft.valueOf()) {
        s -= evt.ctrlKey ? 10 : 1;
      } else if (evt.key === Key.ArrowDown.valueOf()) {
        v -= evt.ctrlKey ? 10 : 1;
      } else if (evt.key === Key.ArrowRight.valueOf()) {
        s += evt.ctrlKey ? 10 : 1;
      } else if (evt.key === Key.ArrowUp.valueOf()) {
        v += evt.ctrlKey ? 10 : 1;
      } else if (evt.key === Key.PageDown.valueOf()) {
        v = 0;
      } else if (evt.key === Key.PageUp.valueOf()) {
        v = 100;
      } else if (evt.key === Key.Home.valueOf()) {
        s = 0;
      } else {
        if (evt.key === Key.End.valueOf()) {
          s = 100;
        }
      }

      if (s < 0) s = 0;
      if (s > 100) s = 100;
      if (v < 0) v = 0;
      if (v > 100) v = 100;

      const newColor = new HSVColor(h, s, v);
      if (onSaturationChange) onSaturationChange(newColor);

      evt.preventDefault();
    },
    [hsv, onSaturationChange]
  );

  const pointerStyle: React.CSSProperties = React.useMemo(
    () => ({
      left: `${hsv.s}%`,
      top: `${-hsv.v + 100}%`,
      backgroundColor: `${ColorDef.fromHSV(hsv).toRgbString()}`,
    }),
    [hsv]
  );

  const colorStyle: React.CSSProperties = React.useMemo(
    () => ({ backgroundColor: `hsl(${hsv.h} ,100%, 50%)` }),
    [hsv]
  );

  return (
    <div
      className={classnames("components-saturation-container", className)}
      style={style}
      data-testid="saturation-container"
    >
      <div
        data-testid="saturation-region"
        role="slider"
        aria-label={translate("color.saturation")}
        aria-valuenow={hsv.s}
        style={colorStyle}
        className="components-saturation-region"
        ref={container}
        onMouseDown={onMouseDown}
        onMouseMove={onDragging}
        onTouchMove={onDragging}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          style={pointerStyle}
          className="components-saturation-pointer"
          data-testid="saturation-pointer"
        />
      </div>
    </div>
  );
}
