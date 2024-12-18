/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./TextareaEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  InputEditorSizeParams,
  MultilineTextEditorParams,
  PrimitiveValue,
  PropertyEditorParams,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import { Textarea } from "@itwin/itwinui-react";
import { TypeConverterManager } from "../converters/TypeConverterManager.js";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer.js";
import { PropertyEditorBase } from "./PropertyEditorManager.js";
import {
  PopupButton,
  PopupContent,
  PopupOkCancelButtons,
} from "./PopupButton.js";
import { UiComponents } from "../UiComponents.js";

type TextareaProps = React.ComponentPropsWithoutRef<typeof Textarea>;

/** @internal */
interface TextareaEditorState {
  inputValue: string;
  readonly: boolean;
  isDisabled?: boolean;
  size?: number;
  maxLength?: number;
  rows: number;
}

const DEFAULT_ROWS = 3;

/** TextareaEditor React component that is a property editor with text input
 * @public
 */
export class TextareaEditor
  extends React.PureComponent<PropertyEditorProps, TextareaEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _divElement = React.createRef<HTMLDivElement>();
  private _textAreaElement = React.createRef<HTMLTextAreaElement>();

  public override readonly state: Readonly<TextareaEditorState> = {
    inputValue: "",
    readonly: false,
    rows: DEFAULT_ROWS,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = await TypeConverterManager.getConverter(
        record.property.typename
      ).convertFromStringToPropertyValue(this.state.inputValue, record);
      (propertyValue as PrimitiveValue).displayValue = this.state.inputValue;
    }

    return propertyValue;
  }

  public get htmlElement(): HTMLElement | null {
    return this._divElement.current;
  }

  public get hasFocus(): boolean {
    let containsFocus = false;
    if (this._divElement.current)
      containsFocus = this._divElement.current.contains(document.activeElement);
    return containsFocus;
  }

  private _updateTextareaValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (this._isMounted)
      this.setState({
        inputValue: e.target.value,
      });
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
        record.property.typename
      ).convertPropertyToString(record.property, value);
    }

    const readonly =
      record && undefined !== record.isReadonly ? record.isReadonly : false;
    let size: number | undefined;
    let maxLength: number | undefined;
    let rows: number = DEFAULT_ROWS;

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

      const multilineParams = record.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type === PropertyEditorParamTypes.MultilineText.valueOf()
      ) as MultilineTextEditorParams;
      if (multilineParams) {
        rows = multilineParams.rows;
      }
    }

    if (this._isMounted)
      this.setState({
        inputValue: initialValue,
        readonly,
        size,
        maxLength,
        isDisabled,
        rows,
      });
  }

  private _handleOk = async (_event: React.MouseEvent): Promise<void> => {
    if (this.props.propertyRecord && this.props.onCommit) {
      const propertyValue = await this.getPropertyValue();
      if (propertyValue !== undefined) {
        this.props.onCommit({
          propertyRecord: this.props.propertyRecord,
          newValue: propertyValue,
        });
      }
    }
  };

  private _handleCancel = (_event: React.MouseEvent): void => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  public override render(): React.ReactNode {
    const className = classnames(
      "components-cell-editor",
      "components-textarea-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 8;
    const style: React.CSSProperties = {
      ...this.props.style,
      minWidth: `${minSize * 0.75}em`,
    };
    const textareaProps: TextareaProps = {
      className: "components-textarea-editor-textarea",
      style,
      rows: this.state.rows,
      readOnly: this.state.readonly,
      disabled: this.state.isDisabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onChange: this._updateTextareaValue,
      autoFocus: this.props.setFocus && !this.state.isDisabled,
    };

    textareaProps["aria-label"] = UiComponents.translate("editor.textarea");

    return (
      <div className={className} ref={this._divElement}>
        <PopupButton
          label={this.state.inputValue}
          closeOnEnter={false}
          setFocus={this.props.setFocus}
          focusTarget={this._textAreaElement}
        >
          <PopupContent>
            <Textarea
              {...textareaProps}
              data-testid="components-textarea-editor"
              ref={this._textAreaElement}
            />
            <PopupOkCancelButtons
              onOk={this._handleOk}
              onCancel={this._handleCancel}
            />
          </PopupContent>
        </PopupButton>
      </div>
    );
  }
}

/** Textarea Property Editor registered for the "text" and "string" type names and "multi-line" editor name.
 * It uses the [[TextareaEditor]] React component.
 * @public
 */
export class TextareaPropertyEditor extends PropertyEditorBase {
  public override get containerHandlesBlur(): boolean {
    return false;
  }
  public override get containerHandlesEnter(): boolean {
    return false;
  }
  public override get containerHandlesTab(): boolean {
    return false;
  }

  public get reactNode(): React.ReactNode {
    return <TextareaEditor />;
  }
}
