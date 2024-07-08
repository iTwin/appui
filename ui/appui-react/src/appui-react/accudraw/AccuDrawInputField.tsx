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
import type { ItemField } from "@itwin/core-frontend";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import { Icon, useRefs } from "@itwin/core-react";
import { Input } from "@itwin/itwinui-react";
import { FrameworkAccuDraw } from "./FrameworkAccuDraw";
import { UiFramework } from "../UiFramework";
import { SvgLock } from "@itwin/itwinui-icons-react";

function isLetter(char: string): boolean {
  return char.length === 1 && char.toLowerCase() !== char.toUpperCase();
}

/** Properties for [[AccuDrawInputField]] component
 * @beta
 */
// eslint-disable-next-line deprecation/deprecation
export interface AccuDrawInputFieldProps extends CommonProps {
  /** Which AccuDraw field this represents */
  field: ItemField;
  /** id for the input element */
  id: string;
  /** Indicates whether field is locked */
  isLocked?: boolean;
  /** label for the input element */
  label?: string;
  /** Icon for the input element.
   * @deprecated in 4.16.0. Use `icon` instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  iconSpec?: IconSpec;
  /** Icon for the input element */
  icon?: React.ReactNode;
  /** Custom CSS class name for the label */
  labelClassName?: string;
  /** Custom CSS Style for the label */
  labelStyle?: React.CSSProperties;
  /** Center justified label */
  labelCentered?: boolean;
  /** Triggered when the content is changed */
  onValueChanged: (stringValue: string) => void;
  /** Frequency to poll for changes in value, in milliseconds */
  valueChangedDelay?: number;
  /** Listens for <Enter> keypress */
  onEnterPressed?: () => void;
  /** Listens for <Esc> keypress */
  onEscPressed?: () => void;
  /** Provides ability to return reference to HTMLInputElement */
  ref?: React.Ref<HTMLInputElement>;
}

const ForwardRefAccuDrawInput = React.forwardRef<
  HTMLInputElement,
  AccuDrawInputFieldProps
>(function ForwardRefAccuDrawInputField(props: AccuDrawInputFieldProps, ref) {
  const {
    className,
    style,
    id,
    label,
    // eslint-disable-next-line deprecation/deprecation
    iconSpec,
    icon,
    labelClassName,
    labelStyle,
    labelCentered,
    field,
    isLocked,
    onValueChanged,
    valueChangedDelay,
    onEnterPressed,
    onEscPressed,
    ...inputProps
  } = props;
  const [stringValue, setStringValue] = React.useState("");
  const timeoutId = React.useRef(0);
  const [needValueChanged, setNeedValueChanged] = React.useState(false);
  const [needSelection, setNeedSelection] = React.useState(false);
  const [isFocusField, setIsFocusField] = React.useState(false);
  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useRefs(inputElementRef, ref); // combine ref needed for target with the forwardRef needed by the Parent when parent is a Type Editor.

  React.useEffect(() => {
    const formattedValue = FrameworkAccuDraw.getFieldDisplayValue(field);
    setStringValue(formattedValue);
  }, [field]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.currentTarget.value;

      if (value === undefined) return;

      if (stringValue !== value) {
        setStringValue(value);
        setNeedValueChanged(true);
      }
    },
    [stringValue]
  );

  const unsetTimeout = (): void => {
    if (timeoutId) {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }
  };

  React.useEffect(() => {
    // After setStringValue & re-render
    if (needValueChanged) {
      if (valueChangedDelay) {
        unsetTimeout();
        timeoutId.current = window.setTimeout(() => {
          onValueChanged(stringValue);
        }, valueChangedDelay);
      } else {
        onValueChanged(stringValue);
      }
      setNeedValueChanged(false);
    }
  }, [onValueChanged, valueChangedDelay, stringValue, needValueChanged]);

  React.useEffect(() => {
    // On unmount
    return () => unsetTimeout();
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case Key.Escape.valueOf():
          onEscPressed && onEscPressed();
          return;
        case Key.Enter.valueOf():
          onEnterPressed && onEnterPressed();
          return;
      }

      if (isLetter(e.key)) {
        e.preventDefault();
        UiFramework.keyboardShortcuts.processKey(
          e.key,
          e.altKey,
          e.ctrlKey,
          e.shiftKey
        );
        return;
      }
    },
    [onEscPressed, onEnterPressed]
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
        {/* eslint-disable-next-line deprecation/deprecation */}
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
 * @beta
 */
export const AccuDrawInputField: (
  props: AccuDrawInputFieldProps
) => React.ReactNode = ForwardRefAccuDrawInput;
