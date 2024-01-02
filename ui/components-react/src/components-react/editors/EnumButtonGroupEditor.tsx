/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./EnumButtonGroupEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  ButtonGroupEditorParams,
  EnumerationChoice,
  IconDefinition,
  PropertyEditorParams,
  PropertyRecord,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
  StandardEditorNames,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import { Icon } from "@itwin/core-react";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer";
import {
  PropertyEditorBase,
  PropertyEditorManager,
} from "./PropertyEditorManager";
import svgPlaceholder from "@bentley/icons-generic/icons/placeholder.svg";
import { Button } from "@itwin/itwinui-react";
import { getiTwinUISize } from "../common/iuiUtils";

// cspell:ignore buttongroup enumbuttongroup

/** @internal */
interface EnumButtonGroupEditorState {
  selectValue: string | number;
  enumIcons: IconDefinition[];
  choices: EnumerationChoice[];
}

/** EnumButtonGroupEditor React component that is a property editor with select input
 * @public
 */
export class EnumButtonGroupEditor
  extends React.Component<PropertyEditorProps, EnumButtonGroupEditorState>
  implements TypeEditor
{
  private _btnRefs = new Map<string | number, HTMLButtonElement>();
  private _divElement = React.createRef<HTMLDivElement>();

  /** @internal */
  public override readonly state: Readonly<EnumButtonGroupEditorState> = {
    selectValue: "",
    enumIcons: [],
    choices: [],
  };

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

  public get htmlElement(): HTMLElement | null {
    return this._divElement.current;
  }

  public get hasFocus(): boolean {
    let containsFocus = false;
    // istanbul ignore else
    if (this._divElement.current)
      containsFocus = this._divElement.current.contains(document.activeElement);
    return containsFocus;
  }

  /** @internal */
  public override componentDidMount() {
    void this.setStateFromProps();
  }

  /** @internal */
  public override componentDidUpdate(prevProps: PropertyEditorProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }

  private async setStateFromProps() {
    const { propertyRecord } = this.props;

    // istanbul ignore else
    if (
      propertyRecord &&
      propertyRecord.property.enum &&
      propertyRecord.value.valueFormat === PropertyValueFormat.Primitive
    ) {
      const primitiveValue = propertyRecord.value.value;
      let selectValue: string | number;

      if (typeof primitiveValue === "string") {
        selectValue = primitiveValue;
      } else {
        selectValue = primitiveValue as number;
      }

      let choices: EnumerationChoice[] = [];
      // istanbul ignore else
      if (propertyRecord && propertyRecord.property.enum) {
        if (propertyRecord.property.enum.choices instanceof Promise) {
          choices = await propertyRecord.property.enum.choices;
        } else {
          choices = propertyRecord.property.enum.choices;
        }
      }

      const numChoices = choices.length;
      const enumIcons = new Array<IconDefinition>(numChoices);
      enumIcons.fill({ iconSpec: svgPlaceholder });

      // istanbul ignore else
      if (
        propertyRecord.property.editor &&
        propertyRecord.property.editor.params
      ) {
        // istanbul ignore else
        if (
          propertyRecord.property.editor &&
          propertyRecord.property.editor.params
        ) {
          const bgParams = propertyRecord.property.editor.params.find(
            (param: PropertyEditorParams) =>
              param.type === PropertyEditorParamTypes.ButtonGroupData
          ) as ButtonGroupEditorParams;
          // istanbul ignore else
          if (bgParams) {
            bgParams.buttons.forEach(
              (iconDef: IconDefinition, index: number) => {
                // istanbul ignore else
                if (index < numChoices) {
                  enumIcons[index] = iconDef;
                }
              }
            );
          }
        }
      }

      this.setState({ selectValue, enumIcons, choices });
    }
  }

  private _handleButtonClick = (index: number) => {
    const propertyRecord = this.props.propertyRecord as PropertyRecord;

    // istanbul ignore else
    if (this.state.choices && this.state.choices.length > index) {
      const selectValue = this.state.choices[index].value;

      this.setState(
        {
          selectValue,
        },
        async () => {
          // istanbul ignore else
          if (propertyRecord && this.props.onCommit) {
            const propertyValue = await this.getPropertyValue();
            // istanbul ignore else
            if (propertyValue !== undefined) {
              this.props.onCommit({ propertyRecord, newValue: propertyValue });
            }
          }
        }
      );
    }
  };

  private getButton(choice: EnumerationChoice, index: number) {
    const choiceValue = this.state.choices
      ? this.state.choices[index].value
      : /* istanbul ignore next */ 0;
    const isActive = choiceValue === this.state.selectValue ? true : false;
    let isDisabled = false;
    const isEnabledFunction = this.state.enumIcons[index].isEnabledFunction;
    // istanbul ignore else
    if (isEnabledFunction) {
      isDisabled = !isEnabledFunction();
    }

    const className = classnames(
      "components-enumbuttongroup-button",
      this.getSizeClassname(this.props.size),
      isDisabled && "nz-is-disabled",
      isActive && "nz-is-active"
    );

    return (
      <Button
        ref={(ref: HTMLButtonElement | null) =>
          ref && this._btnRefs.set(choiceValue, ref)
        }
        data-testid={choice.label}
        className={className}
        title={choice.label}
        key={choice.label}
        onClick={() => this._handleButtonClick(index)}
        size={getiTwinUISize(this.props.size)}
      >
        <Icon iconSpec={this.state.enumIcons[index].iconSpec} />
      </Button>
    );
  }

  private getSizeClassname(size: string | undefined) {
    switch (size) {
      case "large":
        return "components-enumbuttongroup-large";
      case undefined:
        return "components-enumbuttongroup-small";
      default:
        return "components-enumbuttongroup-medium     ";
    }
  }

  /** @internal */
  public override render() {
    return (
      <div
        className={classnames(
          "components-enumbuttongroup-editor",
          this.getSizeClassname(this.props.size),
          this.props.className
        )}
        style={this.props.style}
        ref={this._divElement}
      >
        {this.state.choices &&
          this.state.enumIcons.length &&
          this.state.choices.map((choice: EnumerationChoice, index: number) =>
            this.getButton(choice, index)
          )}
      </div>
    );
  }
}

/** Enum Property Button Group Editor registered for the "enum" type name and the "enum-buttongroup" editor name.
 * It uses the [[EnumButtonGroupEditor]] React component.
 * @public
 */
export class EnumPropertyButtonGroupEditor extends PropertyEditorBase {
  // istanbul ignore next
  public get reactNode(): React.ReactNode {
    return <EnumButtonGroupEditor />;
  }
}

PropertyEditorManager.registerEditor(
  StandardTypeNames.Enum,
  EnumPropertyButtonGroupEditor,
  StandardEditorNames.EnumButtonGroup
);
