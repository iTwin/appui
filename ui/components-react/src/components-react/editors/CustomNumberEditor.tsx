/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./CustomNumberEditor.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import { Logger } from "@itwin/core-bentley";
import type {
  CustomFormattedNumberParams,
  IconEditorParams,
  InputEditorSizeParams,
  PrimitiveValue,
  PropertyEditorParams,
  PropertyRecord,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  MessageSeverity,
  PropertyEditorParamTypes,
  PropertyValueFormat,
  UiAdmin,
} from "@itwin/appui-abstract";
import { Icon, IconInput } from "@itwin/core-react";
import { Input, InputWithDecorations } from "@itwin/itwinui-react";
import { UiComponents } from "../UiComponents.js";
import type {
  InternalInputEditorProps,
  PropertyEditorProps,
  TypeEditor,
} from "./EditorContainer.js";
import { PropertyEditorBase } from "./PropertyEditorManager.js";
import type { IconNodeEditorParams } from "../../internal.js";

type InputProps = React.ComponentPropsWithoutRef<typeof Input>;

interface CustomNumberEditorState {
  inputValue: string;
  size?: number;
  maxLength?: number;
  iconSpec?: React.ReactNode;
}

/** CustomNumberEditor is a React component that is a property editor for numbers that specify custom formatting and parsing functions.
 * @alpha
 */
export class CustomNumberEditor
  extends React.PureComponent<PropertyEditorProps, CustomNumberEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _formatParams: CustomFormattedNumberParams | undefined;
  private _inputElement = React.createRef<HTMLInputElement>();
  private _lastValidValue: PropertyValue | undefined;

  // Used to track the last user typed value.
  private _lastInputValue: string | undefined;
  private _lastValue: PropertyValue | undefined;

  public override readonly state: Readonly<CustomNumberEditorState> = {
    inputValue: "",
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    // This is called by the container to commit the value. Format the value.
    this._lastInputValue = undefined;
    this._lastValue = undefined;

    const value = await this.#getPropertyValue();

    if (
      this.props.shouldCommitOnChange &&
      this._formatParams &&
      isPrimitiveValue(value) &&
      typeof value.value === "number"
    ) {
      const newDisplayValue = this._formatParams.formatFunction(value.value);
      this.setState({
        inputValue: newDisplayValue,
      });
    }
    return value;
  }

  async #getPropertyValue(): Promise<PropertyValue | undefined> {
    // This is called by the editor to get the current input value as a PropertyValue.
    const record = this.props.propertyRecord as PropertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record.isReadonly) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: (record.value as PrimitiveValue).value,
        displayValue: (record.value as PrimitiveValue).displayValue,
      };
    }

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      const parseResults = (
        this._formatParams as CustomFormattedNumberParams
      ).parseFunction(this.state.inputValue);
      if (!parseResults.parseError && undefined !== parseResults.value) {
        const newDisplayValue = (
          this._formatParams as CustomFormattedNumberParams
        ).formatFunction(parseResults.value as number);
        propertyValue = {
          valueFormat: PropertyValueFormat.Primitive,
          value: parseResults.value,
          displayValue: newDisplayValue,
        };
        this._lastValidValue = { ...propertyValue };
        // make sure the text in the input item matches the latest formatted text... this could get out if the input string say 1.5 === the display string of 1'-6"
        if (
          // This should not happen in a getter, for now fix only if shouldCommitOnChange is true.
          !this.props.shouldCommitOnChange &&
          newDisplayValue !== this.state.inputValue
        ) {
          this.setState({ inputValue: newDisplayValue });
        }
      } else {
        if (this.htmlElement) {
          UiAdmin.messagePresenter.displayInputFieldMessage(
            this.htmlElement,
            MessageSeverity.Error,
            parseResults.parseError
              ? parseResults.parseError
              : UiComponents.translate("errors.unable-to-parse-quantity")
          );
          this.htmlElement.focus();
        } else {
          UiAdmin.messagePresenter.displayMessage(
            MessageSeverity.Error,
            parseResults.parseError
              ? parseResults.parseError
              : UiComponents.translate("errors.unable-to-parse-quantity")
          );
        }

        const displayValue =
          record.value.displayValue && record.value.displayValue.length > 0
            ? record.value.displayValue
            : (
                this._formatParams as CustomFormattedNumberParams
              ).formatFunction(record.value.value as number);
        propertyValue = this._lastValidValue
          ? { ...this._lastValidValue }
          : {
              valueFormat: PropertyValueFormat.Primitive,
              value: record.value.value,
              displayValue,
            };
      }
    }

    return propertyValue;
  }

  public get htmlElement(): HTMLElement | null {
    return this._inputElement.current;
  }

  public get hasFocus(): boolean {
    return document.activeElement === this._inputElement.current;
  }

  private shouldSetFocus(): boolean {
    if (!this.props.setFocus) return false;

    const record = this.props.propertyRecord as PropertyRecord;
    const disabled = record && !record.isDisabled ? false : true;
    const readonly = record && !record.isReadonly ? false : true;

    return !disabled && !readonly;
  }

  private _applyUpdatedValue(userInput: string) {
    const record = this.props.propertyRecord as PropertyRecord;
    const readonly = record && !record.isReadonly ? false : true;
    const disabled = record && !record.isDisabled ? false : true;

    if (readonly || disabled) return;

    if (this._isMounted)
      this.setState(
        {
          inputValue: userInput,
        },
        async () => {
          if (!this.props.shouldCommitOnChange) return;
          if (!this.props.onCommit) return;
          if (!this.props.propertyRecord) return;

          const newValue = await this.#getPropertyValue();
          if (!newValue) return;

          this._lastInputValue = this.state.inputValue;
          this._lastValue = newValue;
          this.props.onCommit({
            propertyRecord: this.props.propertyRecord,
            newValue,
          });
        }
      );
  }

  private _updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._applyUpdatedValue(e.target.value);
  };

  public override componentDidMount() {
    this._isMounted = true;
    this.setStateFromProps();
  }

  public override componentWillUnmount() {
    this._isMounted = false;
  }

  public override componentDidUpdate(prevProps: PropertyEditorProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      this.setStateFromProps();
    }
  }

  private _getInitialDisplayValue(): string {
    const record = this.props.propertyRecord;
    let initialDisplayValue = "";
    let numberValue = 0;
    if (record) {
      if (record.value.valueFormat === PropertyValueFormat.Primitive) {
        const primitiveValue = record.value;
        numberValue =
          undefined !== primitiveValue.value
            ? (primitiveValue.value as number)
            : 0;
        if (primitiveValue.displayValue)
          initialDisplayValue = primitiveValue.displayValue;
        else
          initialDisplayValue = (
            this._formatParams as CustomFormattedNumberParams
          ).formatFunction(numberValue);
      }
    }

    return initialDisplayValue;
  }

  private setStateFromProps() {
    if (!this._isMounted) return;

    const record = this.props.propertyRecord;
    if (!record || !record.property) {
      Logger.logError(
        UiComponents.loggerCategory("CustomNumberEditor"),
        "PropertyRecord must be defined to use CustomNumberPropertyEditor"
      );
      return;
    }
    if (
      record.property &&
      record.property.editor &&
      record.property.editor.params
    ) {
      this._formatParams = record.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type ===
          PropertyEditorParamTypes.CustomFormattedNumber.valueOf()
      ) as CustomFormattedNumberParams;
    }

    if (!this._formatParams) {
      Logger.logError(
        UiComponents.loggerCategory("CustomNumberEditor"),
        `CustomFormattedNumberParams must be defined for property ${record.property.name}`
      );
      return;
    }

    const initialDisplayValue = this._getInitialDisplayValue();
    this._lastValidValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: (record.value as PrimitiveValue).value,
      displayValue: initialDisplayValue,
    };
    let size: number | undefined;
    let maxLength: number | undefined;
    let iconSpec: React.ReactNode | undefined;

    if (
      record.property &&
      record.property.editor &&
      record.property.editor.params
    ) {
      const editorSizeParams = record.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
      ) as InputEditorSizeParams;
      if (editorSizeParams) {
        if (editorSizeParams.size) size = editorSizeParams.size;
        if (editorSizeParams.maxLength) maxLength = editorSizeParams.maxLength;
      }

      const iconParams = record.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type === PropertyEditorParamTypes.Icon.valueOf()
      ) as IconEditorParams;
      if (iconParams) {
        iconSpec = iconParams.definition.iconSpec;
      }

      const iconNodeParam = record.property.editor.params.find(
        (param): param is IconNodeEditorParams =>
          param.type ===
          ("appui-icon-node" satisfies IconNodeEditorParams["type"])
      );
      if (iconNodeParam) {
        iconSpec = iconNodeParam.icon;
      }
    }

    let inputValue = initialDisplayValue;
    if (
      this.props.shouldCommitOnChange &&
      this._lastInputValue &&
      isPrimitiveValue(this._lastValue) &&
      isPrimitiveValue(this.props.propertyRecord?.value) &&
      this._lastValue.value === this.props.propertyRecord.value.value
    ) {
      // If the value matches the user-entered value - keep it unformatted.
      inputValue = this._lastInputValue;
    }

    this.setState({
      inputValue,
      size,
      maxLength,
      iconSpec,
    });
  }

  private _resetToLastValidDisplayValue() {
    const initialDisplayValue =
      (this._lastValidValue &&
        (this._lastValidValue as PrimitiveValue).displayValue) ??
      this._getInitialDisplayValue();
    this.setState({ inputValue: initialDisplayValue });
  }

  private _onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Key.Escape.valueOf()) {
      const initialDisplayValue =
        (this._lastValidValue &&
          (this._lastValidValue as PrimitiveValue).displayValue) ??
        this._getInitialDisplayValue();
      if (initialDisplayValue !== this.state.inputValue) {
        e.preventDefault();
        e.stopPropagation();
        this._resetToLastValidDisplayValue();
      } else {
        if (this.props.onCancel) this.props.onCancel();
      }
    }

    if (e.key !== Key.Enter.valueOf()) {
      UiAdmin.messagePresenter.closeInputFieldMessage();
    }
  };

  private _onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  public override render(): React.ReactNode {
    const { decoration } = this.props as InternalInputEditorProps;
    const minSize = this.state.size ? this.state.size : 8;
    const minWidthStyle: React.CSSProperties = {
      minWidth: `${minSize * 0.75}em`,
    };
    const record = this.props.propertyRecord as PropertyRecord;
    if (!record || !this._formatParams) return null;

    const readOnly = !record.isReadonly ? false : true;
    const disabled = !record.isDisabled ? false : true;

    const className = classnames(
      "components-cell-editor",
      "components-customnumber-editor",
      this.props.className
    );

    const inputProps: Omit<InputProps, "size"> = {
      className,
      style: this.props.style ? this.props.style : minWidthStyle,
      readOnly,
      disabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onChange: this._updateInputValue,
      onBlur: this.props.onBlur,
      onFocus: this._onFocus,
      autoFocus: this.shouldSetFocus(),
      onKeyDown: this._onKeyPress,
    };

    const icon = this.state.iconSpec ? (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <Icon iconSpec={this.state.iconSpec} />
    ) : undefined;

    return (
      <LockNumberEditor
        {...inputProps}
        ref={this._inputElement}
        id={this.props.propertyRecord?.property.name}
        icon={icon}
        decoration={decoration}
      />
    );
  }
}

/** Custom Property Editor registered for the "number" type name and the "number-custom" editor name.
 * It uses the [[CustomNumberEditor]] React component.
 * @alpha
 */
export class CustomNumberPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <CustomNumberEditor />;
  }
  public override get containerHandlesEscape(): boolean {
    return false;
  }
}

interface LockNumberEditorProps extends InputProps {
  icon?: React.ReactNode;
  decoration?: React.ReactNode;
}

const LockNumberEditor = React.forwardRef<
  HTMLInputElement,
  LockNumberEditorProps
>(function LockNumberEditor(props, forwardedRef) {
  const { icon, decoration, ...rest } = props;
  if (decoration) {
    return (
      <InputWithDecorations size="small">
        {icon && (
          <InputWithDecorations.Icon size="small">
            {icon}
          </InputWithDecorations.Icon>
        )}
        <InputWithDecorations.Input
          {...rest}
          ref={forwardedRef}
          data-testid="components-customnumber-editor"
          size="small"
        />
        {decoration}
      </InputWithDecorations>
    );
  }

  if (icon) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <IconInput
        {...rest}
        ref={forwardedRef}
        icon={icon}
        data-testid="components-customnumber-editor"
      />
    );
  }
  return (
    <Input
      {...rest}
      ref={forwardedRef}
      data-testid="components-customnumber-editor"
      size="small"
    />
  );
});

function isPrimitiveValue(value?: PropertyValue): value is PrimitiveValue {
  return value?.valueFormat === PropertyValueFormat.Primitive;
}
