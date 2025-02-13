/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./ToggleEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type { PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer.js";
import { PropertyEditorBase } from "./PropertyEditorManager.js";
import { ToggleSwitch } from "@itwin/itwinui-react";

/** @internal */
interface ToggleEditorState {
  toggleValue: boolean;
  isDisabled?: boolean;
}

/** ToggleEditor React component that is a property editor with checkbox input
 * @public
 */
export class ToggleEditor
  extends React.PureComponent<PropertyEditorProps, ToggleEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _inputElement = React.createRef<HTMLInputElement>();

  public override readonly state: Readonly<ToggleEditorState> = {
    toggleValue: false,
    isDisabled: false,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.toggleValue,
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

  private _updateToggleValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): any => {
    if (this._isMounted) {
      if (this._isMounted) {
        const toggleValue = !!e.target.checked;

        this.setState(
          {
            toggleValue,
          },
          async () => {
            if (this.props.propertyRecord && this.props.onCommit) {
              const propertyValue = await this.getPropertyValue();
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
    }
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
    const { propertyRecord } = this.props;
    let toggleValue = false;
    let isDisabled = false;

    if (
      propertyRecord &&
      propertyRecord.value.valueFormat === PropertyValueFormat.Primitive
    ) {
      const primitiveValue = propertyRecord.value.value;
      toggleValue = primitiveValue as boolean;
    }

    if (propertyRecord && propertyRecord.isDisabled)
      isDisabled = propertyRecord.isDisabled;

    if (this._isMounted) this.setState({ toggleValue, isDisabled });
  }

  public override render() {
    const className = classnames(
      "components-cell-editor",
      "components-toggle-editor",
      this.props.className
    );
    const isChecked = this.state.toggleValue;
    const isDisabled = !!this.state.isDisabled;

    return (
      <ToggleSwitch
        ref={this._inputElement}
        onBlur={this.props.onBlur}
        className={className}
        style={this.props.style}
        checked={isChecked}
        disabled={isDisabled}
        onChange={this._updateToggleValue}
        data-testid="components-toggle-editor"
        autoFocus={this.props.setFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
    );
  }
}

/** Toggle Property Editor registered for the "bool" and "boolean" type names and "toggle" editor name.
 * It uses the [[ToggleEditor]] React component.
 * @public
 */
export class TogglePropertyEditor extends PropertyEditorBase {
  public override get containerHandlesBlur(): boolean {
    return false;
  }

  public get reactNode(): React.ReactNode {
    return <ToggleEditor />;
  }
}
