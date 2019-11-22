/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module PropertyEditors */

import * as React from "react";
import classnames from "classnames";
import {
  PropertyValueFormat, PrimitiveValue, PropertyValue, EnumerationChoice,
  PropertyEditorParamTypes, IconDefinition, PropertyEditorParams, ButtonGroupEditorParams, PropertyRecord,
} from "@bentley/imodeljs-frontend";
import { PropertyEditorManager, PropertyEditorBase } from "./PropertyEditorManager";
import { PropertyEditorProps, TypeEditor } from "./EditorContainer";
import "./EnumButtonGroupEditor.scss";
import { Icon } from "@bentley/ui-core";

/** @internal */
interface EnumEditorState {
  selectValue: string | number;
}

/** EnumButtonGroupEditor React component that is a property editor with select input
 * @beta
 */
export class EnumButtonGroupEditor extends React.Component<PropertyEditorProps, EnumEditorState> implements TypeEditor {
  private _isMounted = false;
  private _enumIcons?: IconDefinition[];
  private _btnRefs = new Map<string | number, HTMLButtonElement>();

  /** @internal */
  public readonly state: Readonly<EnumEditorState> = {
    selectValue: "",
  };

  /** @internal */
  constructor(props: PropertyEditorProps) {
    super(props);

    const state = EnumButtonGroupEditor.getStateFromProps(props);
    if (state)
      this.state = state;

    this.loadIcons();
  }

  private loadIcons(): void {
    // istanbul ignore else
    if (this._enumIcons)
      return;

    const { propertyRecord } = this.props;

    // istanbul ignore else
    if (propertyRecord) {
      // istanbul ignore else
      if (propertyRecord.property.enum) {
        const numChoices = propertyRecord.property.enum.choices.length;
        this._enumIcons = new Array<IconDefinition>(numChoices);
        this._enumIcons.fill({ iconSpec: "icon icon-placeholder" });

        // istanbul ignore else
        if (propertyRecord.property.editor && propertyRecord.property.editor.params) {
          const bgParams = propertyRecord.property.editor.params.find((param: PropertyEditorParams) => param.type === PropertyEditorParamTypes.ButtonGroupData) as ButtonGroupEditorParams;
          // istanbul ignore else
          if (bgParams) {
            bgParams.buttons.forEach((iconDef: IconDefinition, index: number) => {
              // istanbul ignore else
              if (index < numChoices) {
                this._enumIcons![index] = iconDef;
              }
            });
          }
        }
      }
    }
  }

  // istanbul ignore next
  public getValue(): string | number {
    return this.state.selectValue;
  }

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    // istanbul ignore else
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.selectValue,
        displayValue: "",
      };
    }

    return propertyValue;
  }

  public setFocus(): void {
    const button = this._btnRefs.get(this.state.selectValue);
    // istanbul ignore else
    if (button)
      button.focus({ preventScroll: true });
  }

  /** @internal */
  public componentDidMount() {
    this._isMounted = true;
  }

  /** @internal */
  public componentWillUnmount() {
    this._isMounted = false;
  }

  /** @internal */
  public componentDidUpdate(prevProps: PropertyEditorProps, _prevState: EnumEditorState) {
    // if the props have changed then we need to update the state
    const prevRecord = prevProps.propertyRecord;
    const currentRecord = this.props.propertyRecord;
    // istanbul ignore else
    if (prevRecord !== currentRecord) {
      const state = EnumButtonGroupEditor.getStateFromProps(this.props);
      this.setState(state);
      const button = this._btnRefs.get(state!.selectValue);
      // istanbul ignore else
      if (button)
        button.focus({ preventScroll: true });
    }
  }

  private static getStateFromProps(props: PropertyEditorProps): EnumEditorState | null {
    const propertyRecord = props.propertyRecord;
    let selectValue: string | number;

    // istanbul ignore else
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = (propertyRecord.value as PrimitiveValue).value;
      if (typeof primitiveValue === "string") {
        selectValue = primitiveValue as string;
      } else {
        selectValue = primitiveValue as number;
      }
      return { selectValue };
    }
    return null;
  }

  private getIcon(index: number) {
    // istanbul ignore else
    if (this._enumIcons && this._enumIcons.length > index)
      return (<Icon iconSpec={this._enumIcons[index].iconSpec} />);
    return null;
  }

  private _handleButtonClick = (index: number) => {
    const propertyRecord = this.props.propertyRecord as PropertyRecord;
    const choices = propertyRecord ? propertyRecord.property.enum!.choices : undefined;

    // istanbul ignore else
    if (this._isMounted && choices && choices.length > index) {
      const selectValue = choices[index].value;

      this.setState({
        selectValue,
      }, async () => {
        // istanbul ignore else
        if (propertyRecord && this.props.onCommit) {
          const propertyValue = await this.getPropertyValue();
          // istanbul ignore else
          if (propertyValue) {
            this.props.onCommit({ propertyRecord, newValue: propertyValue });
          }
        }
      });
    }
  }

  private getButton(choice: EnumerationChoice, index: number) {
    const { propertyRecord } = this.props;
    const choiceValue = propertyRecord!.property.enum!.choices[index].value;
    const isActive = (choiceValue === this.state.selectValue) ? true : false;
    let isDisabled = false;
    // istanbul ignore else
    if (this._enumIcons && this._enumIcons.length > index) {
      const isEnabledFunction = this._enumIcons![index].isEnabledFunction;
      if (isEnabledFunction) {
        isDisabled = !isEnabledFunction();
      }
    }

    const className = classnames(
      "components-enumbuttongroup-button",
      isDisabled && "nz-is-disabled",
      isActive && "nz-is-active",
    );

    return (
      <button
        ref={(ref: HTMLButtonElement) => this._btnRefs.set(choiceValue, ref)}
        data-testid={choice.label}
        className={className}
        title={choice.label}
        key={choice.label}
        onClick={() => this._handleButtonClick(index)}
      >
        {this.getIcon(index)}
      </button>
    );
  }

  /** @internal */
  public render() {
    const { propertyRecord } = this.props;
    let choices: EnumerationChoice[] | undefined;

    // istanbul ignore else
    if (propertyRecord && propertyRecord.property.enum)
      choices = propertyRecord.property.enum.choices;

    return (
      <div className={classnames("components-enumbuttongroup-editor", this.props.className)} style={this.props.style}>
        {choices && choices.map((choice: EnumerationChoice, index: number) => this.getButton(choice, index))}
      </div>);
  }
}

/** EnumPropertyButtonGroupEditor React component that uses the [[EnumButtonGroupEditor]] property editor.
 * @beta
 */
export class EnumPropertyButtonGroupEditor extends PropertyEditorBase {

  public get reactElement(): React.ReactNode {
    return <EnumButtonGroupEditor />;
  }
}

PropertyEditorManager.registerEditor("enum", EnumPropertyButtonGroupEditor, "enum-buttongroup");
