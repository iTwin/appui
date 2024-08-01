/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./EnumEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type { EnumerationChoice, PropertyValue } from "@itwin/appui-abstract";
import { PropertyValueFormat, StandardTypeNames } from "@itwin/appui-abstract";
import type { SelectOption } from "@itwin/itwinui-react";
import { Select } from "@itwin/itwinui-react";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer";
import {
  PropertyEditorBase,
  PropertyEditorManager,
} from "./PropertyEditorManager";
import { UiComponents } from "../UiComponents";

/** @internal */
interface EnumEditorState {
  selectValue: string | number;
  valueIsNumber: boolean;
  options: SelectOption<string>[];
  parentDiv: HTMLDivElement | null;
}

/** EnumEditor React component that is a property editor with select input
 * @public
 */
export class EnumEditor
  extends React.PureComponent<PropertyEditorProps, EnumEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _divElement = React.createRef<HTMLDivElement>();

  /** @internal */
  public override readonly state: Readonly<EnumEditorState> = {
    selectValue: "",
    valueIsNumber: false,
    options: [],
    parentDiv: null,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.selectValue,
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

  private _updateSelectValue = (newValue: string) => {
    if (this._isMounted) {
      let selectValue: string | number;

      if (this.state.valueIsNumber) selectValue = parseInt(newValue, 10);
      else selectValue = newValue;

      this.setState(
        {
          selectValue,
        },
        async () => {
          if (this.props.propertyRecord && this.props.onCommit) {
            const propertyValue = await this.getPropertyValue();
            if (propertyValue) {
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

  /** @internal */
  public override componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }

  /** @internal */
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
    let initialValue: string | number = "";
    let valueIsNumber: boolean = false;

    if (
      propertyRecord &&
      propertyRecord.value.valueFormat === PropertyValueFormat.Primitive
    ) {
      const primitiveValue = propertyRecord.value.value;
      if (typeof primitiveValue === "string") {
        initialValue = primitiveValue;
        valueIsNumber = false;
      } else {
        initialValue = primitiveValue as number;
        valueIsNumber = true;
      }
    }

    let choices: EnumerationChoice[] | undefined;

    if (propertyRecord && propertyRecord.property.enum) {
      if (propertyRecord.property.enum.choices instanceof Promise) {
        choices = await propertyRecord.property.enum.choices;
      } else {
        choices = propertyRecord.property.enum.choices;
      }
    }

    const options: SelectOption<string>[] = [];
    if (choices) {
      choices.forEach((choice: EnumerationChoice) => {
        options.push({ value: choice.value.toString(), label: choice.label });
      });
    }

    if (this._isMounted)
      this.setState({
        selectValue: initialValue,
        valueIsNumber,
        options,
        parentDiv: this._divElement.current,
      });
  }

  public override render() {
    const className = classnames(
      "components-cell-editor",
      "components-enum-editor",
      this.props.className
    );
    const selectValue =
      this.state.selectValue !== undefined
        ? this.state.selectValue.toString()
        : undefined;

    // set min-width to show about 4 characters + down arrow
    const minWidthStyle: React.CSSProperties = {
      minWidth: `6em`,
    };

    // The iTwinUI-react Select onBlur still does not work properly, so it cannot be used yet. NEEDSWORK
    // onBlur={this.props.onBlur}
    return (
      <div ref={this._divElement}>
        <Select
          className={className}
          style={this.props.style ? this.props.style : minWidthStyle}
          value={selectValue}
          onChange={this._updateSelectValue}
          data-testid="components-select-editor"
          options={this.state.options}
          triggerProps={{
            ref: (el) => {
              if (!this.props.setFocus) return;
              el?.focus();
            },
            className: "components-button",
          }}
          aria-label={UiComponents.translate("editor.enum")}
          size="small"
        />
      </div>
    );
  }
}

/** Enum Property Button Group Editor registered for the "enum" type name.
 * It uses the [[EnumEditor]] React component.
 * @public
 */
export class EnumPropertyEditor extends PropertyEditorBase {
  public override get containerHandlesEnter(): boolean {
    return false;
  }
  public override get containerStopsKeydownPropagation(): boolean {
    return false;
  }

  public get reactNode(): React.ReactNode {
    return <EnumEditor />;
  }
}

PropertyEditorManager.registerEditor(
  StandardTypeNames.Enum,
  EnumPropertyEditor
);
