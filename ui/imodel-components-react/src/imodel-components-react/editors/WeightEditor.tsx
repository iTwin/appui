/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./WeightEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type { PropertyRecord, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyEditorProps, TypeEditor } from "@itwin/components-react";
import { PropertyEditorBase } from "@itwin/components-react";
import { WeightPickerButton } from "../lineweight/WeightPickerButton.js";

/** @internal */
interface WeightEditorState {
  weightValue: number;
  readonly: boolean;
  isDisabled?: boolean;
}

/** WeightEditor React component that is a property editor for picking a weight using a [[WeightPickerButton]] component
 * @public
 */
export class WeightEditor
  extends React.PureComponent<PropertyEditorProps, WeightEditorState>
  implements TypeEditor
{
  private _control: any = null;
  private _isMounted = false;
  private _availableWeights: number[] = [];
  private _divElement = React.createRef<HTMLDivElement>();

  public override readonly state: Readonly<WeightEditorState> = {
    weightValue: 0,
    readonly: false,
  };

  constructor(props: PropertyEditorProps) {
    super(props);

    // TODO: add support for following if we need to specify set of weights to display
    //  const record = this.props.propertyRecord;
    //  if (record && record.property && record.property.editor && record.property.editor.params) {
    //    const weightParams = record.property.editor.params.find((param: PropertyEditorParams) => param.type === PropertyEditorParamTypes.ColorData) as WeightEditorParams;
    //        //    if (weightParams) {
    //      weightParams.weightValues.forEach((weight: number) => {
    //        this._availableWeights.push(weight);
    //      });
    //    }
    //   }
  }

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.weightValue,
        displayValue: "",
      };
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

  private setFocus(): void {
    if (this._control && !this.state.isDisabled) {
      this._control.setFocus();
    }
  }

  private _onLineWeightPick = (weight: number) => {
    const propertyRecord = this.props.propertyRecord as PropertyRecord;

    this.setState(
      {
        weightValue: weight,
      },
      async () => {
        if (propertyRecord && this.props.onCommit) {
          const propertyValue = await this.getPropertyValue();
          if (propertyValue !== undefined) {
            this.props.onCommit({ propertyRecord, newValue: propertyValue });
          }
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
    let initialValue = 0;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value as number;
    }

    const readonly =
      record && undefined !== record.isReadonly ? record.isReadonly : false;
    const isDisabled = record ? record.isDisabled : undefined;

    if (this._isMounted)
      this.setState({ weightValue: initialValue, readonly, isDisabled }, () => {
        if (this.props.setFocus) {
          this.setFocus();
        }
      });
  }

  public override render() {
    return (
      <div
        className={classnames("components-weight-editor", this.props.className)}
        style={this.props.style}
        ref={this._divElement}
      >
        <WeightPickerButton
          ref={(control) => (this._control = control)}
          activeWeight={this.state.weightValue}
          weights={
            this._availableWeights.length > 0
              ? this._availableWeights
              : undefined
          }
          disabled={this.state.isDisabled ? true : false}
          readonly={this.state.readonly}
          onLineWeightPick={this._onLineWeightPick}
          data-testid="components-weight-editor"
        />
      </div>
    );
  }
}

/** Weight Property Editor registered for the "number" type name and "weight-picker" editor name.
 * It uses the [[WeightEditor]] React component.
 * @public
 */
export class WeightPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <WeightEditor />;
  }
}
