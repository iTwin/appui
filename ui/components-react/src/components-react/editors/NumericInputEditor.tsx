/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./NumericInputEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  InputEditorSizeParams,
  PropertyEditorParams,
  PropertyValue,
  RangeEditorParams,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import { NumberInput } from "@itwin/core-react";
import type {
  InternalInputEditorProps,
  PropertyEditorProps,
  TypeEditor,
} from "./EditorContainer.js";
import { PropertyEditorBase } from "./PropertyEditorManager.js";
import { InputWithDecorations } from "@itwin/itwinui-react";

/** @internal */
interface NumericInputEditorState {
  value: number;
  size?: number;
  maxLength?: number;

  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

/** NumericInputEditor React component that is a property editor with numeric input & up/down buttons
 * @public
 */
export class NumericInputEditor
  extends React.PureComponent<PropertyEditorProps, NumericInputEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _inputElement: React.RefObject<HTMLInputElement | null> =
    React.createRef();
  public hasFocus = false; // hot used since containerHandlesEnter is false

  public override readonly state: Readonly<NumericInputEditorState> = {
    value: 0,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.value,
        displayValue: "",
      };
    }

    return propertyValue;
  }

  public get htmlElement(): HTMLElement | null {
    return this._inputElement.current;
  }

  private _handleCommit = async (): Promise<void> => {
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

  private _updateValue = (
    value: number | undefined,
    _stringValue: string
  ): void => {
    const newValue = value !== undefined ? value : 0;

    if (this._isMounted)
      this.setState(
        {
          value: newValue,
        },
        async () => {
          await this._handleCommit();
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
    let initialValue = 0;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value as number;
    }

    let size: number | undefined;
    let maxLength: number | undefined;
    let min: number | undefined;
    let max: number | undefined;
    let step: number | undefined;
    let precision: number | undefined;

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

      const rangeParams = record.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type === PropertyEditorParamTypes.Range.valueOf()
      ) as RangeEditorParams;
      if (rangeParams) {
        min = rangeParams.minimum;
        max = rangeParams.maximum;
        step = rangeParams.step;
        precision = rangeParams.precision;
      }
    }

    if (this._isMounted)
      this.setState({
        value: initialValue,
        size,
        maxLength,
        min,
        max,
        step,
        precision,
      });
  }

  public override render(): React.ReactNode {
    const { decoration } = this.props as InternalInputEditorProps;
    const className = classnames(
      "components-cell-editor",
      "components-numeric-input-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 8;
    const style: React.CSSProperties = {
      ...this.props.style,
      minWidth: `${minSize * 0.75}em`,
    };

    return (
      <NumericEditor
        ref={this._inputElement}
        className={className}
        style={style}
        value={this.state.value}
        min={this.state.min}
        max={this.state.max}
        step={this.state.step}
        precision={this.state.precision}
        readOnly={this.props.propertyRecord?.isReadonly}
        disabled={this.props.propertyRecord?.isDisabled}
        maxLength={this.state.maxLength}
        onBlur={this.props.onBlur}
        onChange={this._updateValue}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={
          this.props.setFocus && !this.props.propertyRecord?.isDisabled
        }
        isControlled={this.props.shouldCommitOnChange}
        decoration={decoration}
      />
    );
  }
}

/** Numeric Input Property Editor registered for the "number" type name and "numeric-input" editor name.
 * It uses the [[NumericInputEditor]] React component.
 * @public
 */
export class NumericInputPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <NumericInputEditor />;
  }
  public override get containerHandlesEnter(): boolean {
    // let input editor process enter key
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
type NumberInputProps = React.ComponentProps<typeof NumberInput>;

interface NumericEditorProps extends Omit<NumberInputProps, "step"> {
  decoration?: React.ReactNode;
  step?: number;
}

const NumericEditor = React.forwardRef<HTMLInputElement, NumericEditorProps>(
  function NumericEditor(props, forwardedRef) {
    const { decoration, ...rest } = props;
    if (decoration) {
      return (
        <LockNumericEditor
          {...rest}
          ref={forwardedRef}
          decoration={decoration}
        />
      );
    }

    return (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <NumberInput ref={forwardedRef} {...rest} />
    );
  }
);

interface LockNumericEditorProps extends NumericEditorProps {
  decoration: React.ReactNode;
}

const LockNumericEditor = React.forwardRef<
  HTMLInputElement,
  LockNumericEditorProps
>(function LockNumericEditor(props, forwardedRef) {
  const { decoration, precision, onChange, isControlled, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange?.(Number(value), value);
  };
  return (
    <InputWithDecorations size="small">
      <InputWithDecorations.Input
        {...rest}
        ref={forwardedRef}
        type="number"
        onChange={handleChange}
        size="small"
      />
      {decoration}
    </InputWithDecorations>
  );
});
