/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./TextEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  IconEditorParams,
  InputEditorSizeParams,
  PrimitiveValue,
  PropertyEditorParams,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import { Icon, IconInput } from "@itwin/core-react";
import { Input, InputWithDecorations } from "@itwin/itwinui-react";
import { TypeConverterManager } from "../converters/TypeConverterManager.js";
import type {
  InternalInputEditorProps,
  PropertyEditorProps,
  TypeEditor,
} from "./EditorContainer.js";
import { UiComponents } from "../UiComponents.js";

type InputProps = React.ComponentPropsWithoutRef<typeof Input>;

/** @internal */
interface TextEditorState {
  inputValue: string;
  readonly: boolean;
  isDisabled?: boolean;
  size?: number;
  maxLength?: number;
  iconSpec?: string;
}

/** TextEditor React component that is a property editor with text input
 * @public
 */
export class TextEditor
  extends React.PureComponent<PropertyEditorProps, TextEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _inputElement = React.createRef<HTMLInputElement>();

  public override readonly state: Readonly<TextEditorState> = {
    inputValue: "",
    readonly: false,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = await TypeConverterManager.getConverter(
        record.property.typename,
        record.property.converter?.name
      ).convertFromStringToPropertyValue(this.state.inputValue, record);
      (propertyValue as PrimitiveValue).displayValue = this.state.inputValue;
    }

    return propertyValue;
  }

  public get htmlElement(): HTMLElement | null {
    return this._inputElement.current;
  }

  public get hasFocus(): boolean {
    return document.activeElement === this._inputElement.current;
  }

  private _updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this._isMounted)
      this.setState(
        {
          inputValue: e.target.value,
        },
        async () => {
          if (
            this.props.shouldCommitOnChange &&
            this.props.onCommit &&
            this.props.propertyRecord
          ) {
            const newValue = await this.getPropertyValue();
            if (newValue)
              this.props.onCommit({
                propertyRecord: this.props.propertyRecord,
                newValue,
              });
          }
        }
      );
  };

  public override componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }

  public override componentWillUnmount() {
    this._isMounted = false;
  }

  /** @internal */
  public override componentDidUpdate(prevProps: PropertyEditorProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }

  private async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = "";

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      const value = record.value.value;
      initialValue = await TypeConverterManager.getConverter(
        record.property.typename,
        record.property.converter?.name
      ).convertPropertyToString(record.property, value);
    }

    const readonly =
      record && undefined !== record.isReadonly ? record.isReadonly : false;
    let size: number | undefined;
    let maxLength: number | undefined;
    let iconSpec: string | undefined;

    const isDisabled = record ? record.isDisabled : undefined;

    if (
      record &&
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
        inputValue: initialValue,
        readonly,
        size,
        maxLength,
        isDisabled,
        iconSpec,
      });
  }

  public override render(): React.ReactNode {
    const { decoration } = this.props as InternalInputEditorProps;
    const className = classnames(
      "components-cell-editor",
      "components-text-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 8;
    const minWidthStyle: React.CSSProperties = {
      minWidth: `${minSize * 0.75}em`,
    };
    const inputProps: InputProps = {
      type: "text",
      className,
      style: this.props.style ? this.props.style : minWidthStyle,
      readOnly: this.state.readonly,
      disabled: this.state.isDisabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onBlur: this.props.onBlur,
      onChange: this._updateInputValue,
      autoFocus: this.props.setFocus && !this.state.isDisabled,
      "aria-label": UiComponents.translate("editor.text"),
    };

    const icon = this.state.iconSpec ? (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <Icon iconSpec={this.state.iconSpec} />
    ) : undefined;
    return (
      <LockTextEditor
        {...inputProps}
        ref={this._inputElement}
        id={this.props.propertyRecord?.property.name}
        icon={icon}
        decoration={decoration}
      />
    );
  }
}

interface LockTextEditorProps extends InputProps {
  icon?: React.ReactNode;
  decoration?: React.ReactNode;
}

const LockTextEditor = React.forwardRef<HTMLInputElement, LockTextEditorProps>(
  function LockTextEditor(props, forwardedRef) {
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
            data-testid="components-text-editor"
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
          data-testid="components-text-editor"
        />
      );
    }
    return (
      <Input
        {...rest}
        ref={forwardedRef}
        data-testid="components-text-editor"
        size="small"
      />
    );
  }
);
