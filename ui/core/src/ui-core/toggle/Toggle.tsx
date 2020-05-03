/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toggle
 */

import "./Toggle.scss";
import classnames from "classnames";
import * as React from "react";
import { CommonProps } from "../utils/Props";

/** Toggle display types
 * @public
 */
export enum ToggleButtonType {
  /** Primary (green) background */
  Primary,
  /** Blue background */
  Blue,
}

/** Properties for [[Toggle]] component
 * @public
 */
export interface ToggleProps extends CommonProps {
  /** Indicates whether the Toggle is disabled (default is false) */
  disabled?: boolean;
  /** Indicates whether the Toggle is "on" or "off" (default is false) */
  isOn?: boolean;
  /** Show the toggle rounded or square (rounded is default) */
  rounded?: boolean;
  /** Show a check mark icon when the toggle is "on" (false is default) */
  showCheckmark?: boolean;
  /** Button type, either Primary or Blue (Blue is default) */
  buttonType?: ToggleButtonType;
  /** Function called when the toggle state is changed */
  onChange?: (checked: boolean) => any;
  /** Function called when the toggle loses focus  */
  onBlur?: (event: React.FocusEvent) => any;
  /** Use larger size (default is false) */
  large?: boolean;
  /** Indicates whether to set focus to the input element */
  setFocus?: boolean;
}

/**
 * Toggle React component to show an "on" or "off" state
 * @public
 */
export function Toggle(props: ToggleProps) {
  const inputElement = React.useRef<HTMLInputElement>(null);
  const padding = 2;
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [checked, setChecked] = React.useState(props.isOn ? true : false);
  const [toggling, setToggling] = React.useState(false);

  React.useEffect(() => {
    if (props.setFocus && inputElement.current)
      inputElement.current.focus();
  }, [props]);

  React.useEffect(() => {
    setChecked(props.isOn ? true : false);
  }, [props.isOn]);

  const handleChange = React.useCallback(() => {
    const newChecked = !checked;

    setToggling(true);
    setChecked(newChecked);

    // istanbul ignore else
    if (props.onChange)
      props.onChange(newChecked);

    setTimeout(() => {
      // istanbul ignore else
      if (inputElement.current)
        setToggling(false);
    }, 250);
  }, [props, checked]);

  const handleBlur = React.useCallback((event: React.FocusEvent) => {
    // istanbul ignore else
    if (props.onBlur)
      props.onBlur(event);
  }, [props]);

  const handleCheckboxBlur = React.useCallback((event: React.FocusEvent) => {
    event.stopPropagation();
  }, []);

  const setHeightFromRef = React.useCallback((el: HTMLLabelElement | null) => {
    if (el !== null) {
      // istanbul ignore next
      if ((Math.abs(height - el.clientHeight) > 1) || (Math.abs(width - el.clientWidth) > 1)) {
        setHeight(el.clientHeight);
        setWidth(el.clientWidth);
      }
    }
  }, [height, width]);

  const _getOffset = (): number => {
    return (checked) ? width - height : 0;
  };

  /** Default props */
  const rounded = props.rounded !== undefined ? props.rounded : true;
  const showCheckmark = props.showCheckmark !== undefined ? props.showCheckmark : false;
  const buttonType = props.buttonType !== undefined ? props.buttonType : ToggleButtonType.Blue;

  const halfHeight = height / 2;
  const checkmarkClassName = classnames(
    "core-toggle-checkmark",
    "icon", "icon-checkmark",
    showCheckmark && "visible",
    toggling && "core-toggling",
  );
  const toggleStyle: React.CSSProperties = { borderRadius: rounded ? halfHeight : 3, fontSize: halfHeight, ...props.style };
  const toggleClassName = classnames(
    "core-toggle",
    buttonType === ToggleButtonType.Primary && "core-toggle-primary",
    props.large && "core-toggle-large",
    rounded && "rounded",
    props.disabled && "uicore-disabled",
    props.className);
  const toggleHandleStyle: React.CSSProperties = {
    width: height - (padding * 2),
    transform: "translateX(" + _getOffset() + "px)",
    top: padding,
    bottom: padding,
    left: padding,
  };
  const handleClassName = classnames(
    "core-toggle-handle",
    toggling && "core-toggling",
  );

  return (
    <label ref={setHeightFromRef} style={toggleStyle} className={toggleClassName} onBlur={handleBlur}>
      <input type="checkbox" ref={inputElement} className="core-toggle-input"
        checked={checked} disabled={props.disabled}
        onChange={handleChange} onBlur={handleCheckboxBlur} />
      <span className="core-toggle-background" />
      <span className={checkmarkClassName} />
      <span className={handleClassName} style={toggleHandleStyle} />
    </label>
  );
}
