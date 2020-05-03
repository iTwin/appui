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
import { PrimitiveValue, PropertyValue, PropertyValueFormat } from "@bentley/ui-abstract";
import { Checkbox } from "@bentley/ui-core";
import { PropertyEditorProps, TypeEditor } from "./EditorContainer";
import { PropertyEditorBase, PropertyEditorManager } from "./PropertyEditorManager";

/** @internal */
interface BooleanEditorState {
  checkboxValue: boolean;
}

/** BooleanEditor React component that is a property editor with checkbox input
 * @beta
 */
export class BooleanEditor extends React.PureComponent<PropertyEditorProps, BooleanEditorState> implements TypeEditor {
  private _isMounted = false;

  /** @internal */
  public readonly state: Readonly<BooleanEditorState> = {
    checkboxValue: false,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    // istanbul ignore else
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.checkboxValue,
        displayValue: "",
      };
    }

    return propertyValue;
  }

  private _updateCheckboxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // istanbul ignore else
    if (this._isMounted) {
      let checkboxValue: boolean = false;

      // istanbul ignore if
      if (e.target.checked !== undefined)   // Needed for unit test environment
        checkboxValue = e.target.checked;
      else {
        // istanbul ignore else
        if (e.target.value !== undefined && typeof e.target.value === "boolean")
          checkboxValue = e.target.value;
      }

      this.setState({
        checkboxValue,
      }, async () => {
        // istanbul ignore else
        if (this.props.propertyRecord && this.props.onCommit) {
          const propertyValue = await this.getPropertyValue();
          // istanbul ignore else
          if (propertyValue) {
            this.props.onCommit({ propertyRecord: this.props.propertyRecord, newValue: propertyValue });
          }
        }
      });
    }
  }

  /** @internal */
  public componentDidMount() {
    this._isMounted = true;
    this.setStateFromProps(); // tslint:disable-line:no-floating-promises
  }

  /** @internal */
  public componentWillUnmount() {
    this._isMounted = false;
  }

  /** @internal */
  public componentDidUpdate(prevProps: PropertyEditorProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      this.setStateFromProps(); // tslint:disable-line:no-floating-promises
    }
  }

  private async setStateFromProps() {
    const { propertyRecord } = this.props;
    let checkboxValue = false;

    // istanbul ignore else
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = (propertyRecord.value as PrimitiveValue).value;
      checkboxValue = primitiveValue as boolean;
    }

    // istanbul ignore else
    if (this._isMounted)
      this.setState({ checkboxValue });
  }

  /** @internal */
  public render() {
    const className = classnames("components-cell-editor", "components-boolean-editor", this.props.className);
    const checked = this.state.checkboxValue;

    return (
      <Checkbox
        onBlur={this.props.onBlur}
        className={className}
        style={this.props.style}
        checked={checked}
        onChange={this._updateCheckboxValue}
        setFocus={this.props.setFocus}
        data-testid="components-checkbox-editor">
      </Checkbox>
    );
  }
}

/** Boolean Property Editor registered for the "bool" and "boolean" type names.
 * It uses the [[BooleanEditor]] React component.
 * @beta
 */
export class BooleanPropertyEditor extends PropertyEditorBase {

  public get reactNode(): React.ReactNode {
    return <BooleanEditor />;
  }
}

PropertyEditorManager.registerEditor("bool", BooleanPropertyEditor);
PropertyEditorManager.registerEditor("boolean", BooleanPropertyEditor);
