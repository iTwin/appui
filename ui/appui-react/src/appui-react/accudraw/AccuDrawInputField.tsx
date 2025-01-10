/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import "./AccuDrawInputField.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import {
  AccuDrawShortcuts,
  IModelApp,
  type ItemField,
} from "@itwin/core-frontend";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { useRefs } from "@itwin/core-react/internal";
import { Input } from "@itwin/itwinui-react";
import { FrameworkAccuDraw } from "./FrameworkAccuDraw.js";
import { UiFramework } from "../UiFramework.js";
import { SvgLock } from "@itwin/itwinui-icons-react";
import { useAllowBearingLettersInAccuDrawInputFields } from "../preview/allow-bearing-letters-in-accudraw-input-fields/useAllowBearingLettersInAccuDrawInputFields.js";

function isLetter(char: string): boolean {
  return char.length === 1 && char.toLowerCase() !== char.toUpperCase();
}

/** Properties for [[AccuDrawInputField]] component
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof AccuDrawInputField>`
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface AccuDrawInputFieldProps extends CommonProps {
  /** Which AccuDraw field this represents */
  field: ItemField;
  /** id for the input element */
  id: string;
  /** Indicates whether field is locked */
  isLocked?: boolean;
  /** Indicates whether the field is displaying bearing angles. */
  isBearingAngle?: boolean;
  /** label for the input element */
  label?: string;
  /** Icon for the input element.
   * @deprecated in 4.16.0. Use `icon` instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  iconSpec?: IconSpec;
  /** Icon for the input element. */
  icon?: React.ReactNode;
  /** Custom CSS class name for the label */
  labelClassName?: string;
  /** Custom CSS Style for the label */
  labelStyle?: React.CSSProperties;
  /** Center justified label */
  labelCentered?: boolean;
  /** Triggered when the content is changed */
  onValueChanged: (stringValue: string) => void;
  /** Listens for <Enter> keypress */
  onEnterPressed?: () => void;
  /** Listens for <Esc> keypress */
  onEscPressed?: () => void;
  /** Listens for <Tab> keypress */
  onTabPressed?: () => void;
  /** Provides ability to return reference to HTMLInputElement */
  ref?: React.Ref<HTMLInputElement>;
}

const ForwardRefAccuDrawInput = React.forwardRef<
  HTMLInputElement,
  /* eslint-disable-next-line @typescript-eslint/no-deprecated */
  AccuDrawInputFieldProps
  /* eslint-disable-next-line @typescript-eslint/no-deprecated */
>(function ForwardRefAccuDrawInputField(props: AccuDrawInputFieldProps, ref) {
  const {
    className,
    style,
    id,
    label,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    iconSpec,
    icon,
    labelClassName,
    labelStyle,
    labelCentered,
    field,
    isLocked,
    isBearingAngle = false,
    onValueChanged,
    onEnterPressed,
    onEscPressed,
    onTabPressed,
    ...inputProps
  } = props;
  const [stringValue, setStringValue] = React.useState("");
  const [needSelection, setNeedSelection] = React.useState(false);
  const [isFocusField, setIsFocusField] = React.useState(false);
  const inputElementRef = React.useRef<HTMLInputElement | null>(null);
  const refs = useRefs(inputElementRef, ref); // combine ref needed for target with the forwardRef needed by the Parent when parent is a Type Editor.

  const allowBearingLettersInAccuDrawInputFields =
    useAllowBearingLettersInAccuDrawInputFields();

  React.useEffect(() => {
    const formattedValue = IModelApp.accuDraw.getFormattedValueByIndex(field);
    setStringValue(formattedValue);
  }, [field]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      let value = event.currentTarget.value;
      AccuDrawShortcuts.itemFieldNewInput(field);

      if (value === undefined) return;

      if (stringValue !== value) {
        if (isBearingAngle) {
          // Parsing bearing only works properly when parsing UpperCase letters. Ex : S45°00'00"E <- ok, s45°00'00"e <- doesn't work.
          value = value.toUpperCase();
          if (value.length > stringValue.length) {
            // Automatically add Bearing special characters to help users type the angle. Ex: S45°00'00"E (degrees `°`, minutes `'`, seconds `"`)
            if (value.length === 3 && value[2] !== "°") {
              value += "°";
            } else if (value.length === 6 && value[5] !== "'") {
              value += "'";
            } else if (value.length === 9 && value[8] !== '"') {
              value += '"';
            }
          }
        }
        setStringValue(value);
        onValueChanged(value);
      }
    },
    [stringValue, isBearingAngle, onValueChanged, field]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case Key.Escape.valueOf():
          onEscPressed && onEscPressed();
          // Prevent ToolAdmin from receiving the event when Escape is pressed in the input field.
          // If Escape is pressed again, the input should not be focused anymore, so this code will not be called and ToolAdmin will receive the event normally.
          e.stopPropagation();
          return;
        case Key.Enter.valueOf():
          onEnterPressed && onEnterPressed();
          return;
        case Key.Tab.valueOf():
          onTabPressed && onTabPressed();
          // Prevent from focusing other elements in the page. Act like a focus trap.
          e.preventDefault();
          return;
      }

      if (isLetter(e.key)) {
        if (isBearingAngle && allowBearingLettersInAccuDrawInputFields) {
          const bearingReservedKeys = ["n", "s", "e", "w", "N", "S", "E", "W"];
          if (bearingReservedKeys.includes(e.key)) {
            return; // The letter is displayed in the Bearing input field.
          }
        }
        e.preventDefault();
        UiFramework.keyboardShortcuts.processKey(
          e.key,
          e.altKey,
          e.ctrlKey,
          e.shiftKey
        );
      }
    },
    [
      onEscPressed,
      onEnterPressed,
      onTabPressed,
      isBearingAngle,
      allowBearingLettersInAccuDrawInputFields,
    ]
  );

  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetFieldValueToUiEvent.addListener(
      (args) => {
        if (args.field === field && stringValue !== args.formattedValue) {
          setStringValue(args.formattedValue);
          if (isFocusField) setNeedSelection(true);
        }
      }
    );
  }, [field, isFocusField, stringValue]);

  React.useEffect(() => {
    if (needSelection) {
      if (inputElementRef.current) inputElementRef.current.select();
      setNeedSelection(false);
    }
  }, [needSelection]);

  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(
      (args) => {
        setIsFocusField(args.field === field);
      }
    );
  }, [field]);

  const inputClassNames = classnames("uifw-accudraw-input-field", className);
  const labelClassNames = classnames(
    "uifw-accudraw-input-label",
    labelCentered && "uifw-label-centered",
    labelClassName
  );

  return (
    <>
      <label htmlFor={id} className={labelClassNames} style={labelStyle}>
        {label}
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        {icon ? icon : iconSpec && <Icon iconSpec={iconSpec} />}
      </label>
      <Input
        {...inputProps}
        ref={refs}
        id={id}
        value={stringValue}
        className={inputClassNames}
        style={style}
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        size="small"
      />
      <span className="uifw-accudraw-lock">{isLocked && <SvgLock />}</span>
    </>
  );
});

/** Input field for AccuDraw UI.
 * @public
 */
export const AccuDrawInputField: (
  /* eslint-disable-next-line @typescript-eslint/no-deprecated */
  props: AccuDrawInputFieldProps
) => React.ReactNode = ForwardRefAccuDrawInput;
