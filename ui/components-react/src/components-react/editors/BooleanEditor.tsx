/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./BooleanEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type { PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import { Checkbox } from "@itwin/itwinui-react";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer.js";
import {
  PropertyEditorBase,
  PropertyEditorManager,
} from "./PropertyEditorManager.js";

/** @internal */
interface BooleanEditorState {
  checkboxValue: boolean;
  isDisabled?: boolean;
}

/** BooleanEditor React component that is a property editor with checkbox input
 * @public
 */
export class BooleanEditor
  extends React.PureComponent<PropertyEditorProps, BooleanEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _inputElement = React.createRef<HTMLInputElement>();

  public override readonly state: Readonly<BooleanEditorState> = {
    checkboxValue: false,
    isDisabled: false,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    return this.getPropertyValueSync();
  }

  private getPropertyValueSync(): PropertyValue | undefined {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.checkboxValue,
        displayValue: "",
      };
    }

    return propertyValue;
  }

  public get htmlElement(): HTMLElement | null {
    return this._inputElement.current;
  }

  public get hasFocus(): boolean {
    return document.activeElement === this._inputElement.current;
  }

  private _updateCheckboxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this._isMounted) {
      const checkboxValue = !!e.target.checked;

      this.setState(
        {
          checkboxValue,
        },
        () => {
          if (this.props.propertyRecord && this.props.onCommit) {
            const propertyValue = this.getPropertyValueSync();
            if (propertyValue !== undefined) {
              this.props.onCommit({
                propertyRecord: this.props.propertyRecord,
                newValue: propertyValue,
              });
            }
          }
        }
      );
    }
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

  private setStateFromProps() {
    const { propertyRecord } = this.props;
    let checkboxValue = false;
    let isDisabled = false;

    if (
      propertyRecord &&
      propertyRecord.value.valueFormat === PropertyValueFormat.Primitive
    ) {
      const primitiveValue = propertyRecord.value.value;
      checkboxValue = primitiveValue as boolean;
    }

    if (propertyRecord && propertyRecord.isDisabled)
      isDisabled = propertyRecord.isDisabled;

    if (this._isMounted) this.setState({ checkboxValue, isDisabled });
  }

  public override render() {
    const className = classnames(
      "components-cell-editor",
      "components-boolean-editor",
      this.props.className
    );
    const checked = this.state.checkboxValue;
    const isDisabled = !!this.state.isDisabled;

    return (
      <Checkbox
        ref={this._inputElement}
        onBlur={this.props.onBlur}
        className={className}
        style={this.props.style}
        checked={checked}
        onChange={this._updateCheckboxValue}
        autoFocus={this.props.setFocus} // eslint-disable-line jsx-a11y/no-autofocus
        disabled={isDisabled}
        data-testid="components-checkbox-editor"
      ></Checkbox>
    );
  }
}

/** Boolean Property Editor registered for the "bool" and "boolean" type names.
 * It uses the [[BooleanEditor]] React component.
 * @public
 */
export class BooleanPropertyEditor extends PropertyEditorBase {
  public override get containerHandlesBlur(): boolean {
    return false;
  }

  public get reactNode(): React.ReactNode {
    return <BooleanEditor />;
  }
}

PropertyEditorManager.registerEditor(
  StandardTypeNames.Bool,
  BooleanPropertyEditor
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Boolean,
  BooleanPropertyEditor
);
