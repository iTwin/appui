/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Color
 */

import * as React from "react";
import classnames from "classnames";
import { ColorByName, ColorDef } from "@itwin/core-common";
import { RelativePosition } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import { Icon, Popup } from "@itwin/core-react";
import { useRefs } from "@itwin/core-react/internal";
import {
  ColorBuilder,
  ColorInputPanel,
  ColorPalette,
  ColorPicker,
  ColorValue,
} from "@itwin/itwinui-react";
import "./ColorPickerPopup.scss";
import { getCSSColorFromDef } from "./getCSSColorFromDef.js";
import {
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  SvgClose,
} from "@itwin/itwinui-icons-react";
import { useTranslation } from "../useTranslation.js";

/** Properties for the [[ColorPickerPopup]] React component
 * @public
 * @deprecated in 4.11.0. Props of deprecated component {@link ColorPickerPopup}.
 */
export interface ColorPickerPopupProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    CommonProps {
  /** Current color */
  initialColor: ColorDef;
  /** Preset colors. Pass undefined to show default preset colors. Pass empty array to show no presets.
   *  Displayed in rows of 9 items */
  colorDefs?: ColorDef[];
  /** Function to call when the color value is changed */
  onColorChange?: ((newColor: ColorDef) => void) | undefined;
  /** Function to call when the popup is closed */
  onClose?: ((colorValue: ColorDef) => void) | undefined;
  /** Disabled or not */
  disabled?: boolean;
  /** Readonly or not, color displayed on button but button will not trigger pop-up */
  readonly?: boolean;
  /** popup position. If not set RelativePosition.BottomLeft is used */
  popupPosition?: RelativePosition;
  /** Provides ability to return reference to HTMLButtonElement */
  ref?: React.Ref<HTMLButtonElement>;
  /** If true show up/down caret next to color  */
  showCaret?: boolean;
  /** If true, don't propagate clicks out of the ColorPicker */
  captureClicks?: boolean;
  /** If true, don't show close button at top */
  hideCloseButton?: boolean;
  /** If set show input values */
  colorInputType?: "hsl" | "rgb" | "hex";
}

// Defined using following pattern (const ColorPickerPopup at bottom) to ensure useful API documentation is extracted

const ForwardRefColorPickerPopup = React.forwardRef<
  HTMLButtonElement,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  ColorPickerPopupProps
>(function ForwardRefColorPickerPopup(props, ref) {
  const { translate } = useTranslation();
  const target = React.useRef<HTMLButtonElement>(null);
  const refs = useRefs(target, ref); // combine ref needed for target with the forwardRef needed by the Parent when parent is a Type Editor.
  const [showPopup, setShowPopup] = React.useState(false);
  const [colorDef, setColorDef] = React.useState(props.initialColor);
  const initialColorRef = React.useRef(props.initialColor);

  React.useEffect(() => {
    if (props.initialColor !== initialColorRef.current) {
      initialColorRef.current = props.initialColor;
      setColorDef(props.initialColor);
    }
  }, [props.initialColor]);

  const defaultColors = React.useRef([
    ColorValue.fromTbgr(ColorByName.red),
    ColorValue.fromTbgr(ColorByName.orange),
    ColorValue.fromTbgr(ColorByName.yellow),
    ColorValue.fromTbgr(ColorByName.green),
    ColorValue.fromTbgr(ColorByName.blue),
    ColorValue.fromTbgr(ColorByName.mediumBlue),
    ColorValue.fromTbgr(ColorByName.indigo),
    ColorValue.fromTbgr(ColorByName.violet),
    ColorValue.fromTbgr(ColorByName.black),
    ColorValue.fromTbgr(ColorByName.white),
    ColorValue.fromTbgr(ColorByName.cyan),
    ColorValue.fromTbgr(ColorByName.fuchsia),
    ColorValue.fromTbgr(ColorByName.tan),
    ColorValue.fromTbgr(ColorByName.gray),
    ColorValue.fromTbgr(ColorByName.brown),
    ColorValue.fromTbgr(ColorByName.purple),
    ColorValue.fromTbgr(ColorByName.olive),
    ColorValue.fromTbgr(ColorByName.darkGreen),
  ]);

  const closePopup = React.useCallback(() => {
    props.onClose && props.onClose(colorDef);
    setShowPopup(false);
  }, [colorDef, props]);

  const togglePopup = React.useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);

  const handleColorChanged = React.useCallback(
    (newColorValue: ColorValue) => {
      const newColor = ColorDef.fromTbgr(newColorValue.toTbgr());
      if (!newColor.equals(colorDef)) {
        setColorDef(newColor);

        props.onColorChange && props.onColorChange(newColor);
      }
    },
    [colorDef, props]
  );

  const rgbaString = getCSSColorFromDef(colorDef);

  const buttonStyle = { ...props.style } as React.CSSProperties;
  const swatchStyle = { backgroundColor: rgbaString } as React.CSSProperties;
  const buttonClassNames = classnames(
    "components-colorpicker-popup-button",
    props.readonly && "readonly",
    props.className
  );

  const clickHandler = (event: React.MouseEvent) => {
    if (props.captureClicks) event.stopPropagation();
  };

  const colorOptions = React.useMemo(() => {
    if (props.colorDefs && props.colorDefs.length) {
      return props.colorDefs.map((def) => ColorValue.fromTbgr(def.tbgr));
    }
    if (props.colorDefs && 0 === props.colorDefs.length) return undefined;
    return defaultColors.current;
  }, [props.colorDefs]);
  const popupPosition =
    undefined !== props.popupPosition
      ? props.popupPosition
      : RelativePosition.BottomLeft;

  const closeLabel = translate("color.close");
  const togglePopupLabel = translate("color.toggleColorPopup");

  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div onClick={clickHandler}>
      <button
        data-testid="components-colorpicker-popup-button"
        onClick={togglePopup}
        className={buttonClassNames}
        style={buttonStyle}
        disabled={props.disabled}
        ref={refs}
        title={togglePopupLabel}
      >
        <div className="components-colorpicker-button-container">
          <div
            className="components-colorpicker-button-color-swatch"
            style={swatchStyle}
            data-testid={showPopup ? "caret-up" : "caret-down"}
          />
          {props.showCaret && (
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            <Icon
              className="components-caret"
              iconSpec={showPopup ? <SvgCaretUpSmall /> : <SvgCaretDownSmall />}
            />
          )}
        </div>
      </button>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <Popup
        className="components-colorpicker-popup"
        isOpen={showPopup}
        position={popupPosition}
        onClose={closePopup}
        target={target.current}
        closeOnNestedPopupOutsideClick
      >
        <div className="components-colorpicker-popup-panel-padding">
          {!props.hideCloseButton && (
            <button
              title={closeLabel}
              className={
                "core-focus-trap-ignore-initial core-dialog-close icon"
              }
              data-testid="core-dialog-close"
              onClick={togglePopup}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Icon iconSpec={<SvgClose />} />
            </button>
          )}
          <ColorPicker
            selectedColor={ColorValue.fromTbgr(colorDef.tbgr)}
            onChangeComplete={handleColorChanged}
          >
            <ColorBuilder />
            {props.colorInputType && (
              <ColorInputPanel defaultColorFormat={props.colorInputType} />
            )}
            {colorOptions && <ColorPalette colors={colorOptions} />}
          </ColorPicker>
        </div>
      </Popup>
    </div>
  );
});

/**
 * ColorPickerButton component that allows user to select a color from a set of color swatches or to define a new color.
 * @note Using forwardRef so the ColorEditor (Type Editor) can access the ref of the button element inside this component.
 * @public
 * @deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/colorpicker iTwinUI color picker} instead.
 */
export const ColorPickerPopup: (
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  props: ColorPickerPopupProps
) => React.ReactNode = ForwardRefColorPickerPopup;
