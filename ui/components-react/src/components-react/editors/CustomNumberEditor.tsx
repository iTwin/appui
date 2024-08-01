/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

// cSpell:ignore customnumber testid

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
  StandardEditorNames,
  StandardTypeNames,
  UiAdmin,
} from "@itwin/appui-abstract";
import { Icon, IconInput } from "@itwin/core-react";
import { Input } from "@itwin/itwinui-react";

type InputProps = React.ComponentPropsWithoutRef<typeof Input>;

import { UiComponents } from "../UiComponents";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer";
import {
  PropertyEditorBase,
  PropertyEditorManager,
} from "./PropertyEditorManager";

/** @internal */
interface CustomNumberEditorState {
  inputValue: string;
  size?: number;
  maxLength?: number;
  iconSpec?: string;
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

  public override readonly state: Readonly<CustomNumberEditorState> = {
    inputValue: "",
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
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
        if (newDisplayValue !== this.state.inputValue) {
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
      this.setState({
        inputValue: userInput,
      });
  }

  private _updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this._applyUpdatedValue(e.target.value);
  };

  public override componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }

  public override componentWillUnmount() {
    this._isMounted = false;
  }

  public override componentDidUpdate(prevProps: PropertyEditorProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
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

  private async setStateFromProps() {
    const record = this.props.propertyRecord;
    if (!record || !record.property) {
      Logger.logError(
        UiComponents.loggerCategory(this),
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
        UiComponents.loggerCategory(this),
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
    let iconSpec: string | undefined;

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
    }

    if (this._isMounted)
      this.setState({
        inputValue: initialDisplayValue,
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

    let reactNode: React.ReactNode;
    if (this.state.iconSpec) {
      // eslint-disable-next-line deprecation/deprecation
      const icon = <Icon iconSpec={this.state.iconSpec} />;
      reactNode = (
        // eslint-disable-next-line deprecation/deprecation
        <IconInput
          {...inputProps}
          ref={this._inputElement}
          icon={icon}
          data-testid="components-customnumber-editor"
        />
      );
    } else {
      reactNode = (
        <Input
          {...inputProps}
          ref={this._inputElement}
          data-testid="components-customnumber-editor"
          size="small"
          id={this.props.propertyRecord?.property.name}
        />
      );
    }

    return reactNode;
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
PropertyEditorManager.registerEditor(
  StandardTypeNames.Number,
  CustomNumberPropertyEditor,
  StandardEditorNames.NumberCustom
);
