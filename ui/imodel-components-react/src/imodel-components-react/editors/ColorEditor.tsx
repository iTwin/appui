/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./ColorEditor.scss";
import classnames from "classnames";
import * as React from "react";
import { ColorDef } from "@itwin/core-common";
import type {
  ColorEditorParams,
  PropertyEditorParams,
  PropertyRecord,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import type { PropertyEditorProps, TypeEditor } from "@itwin/components-react";
import { PropertyEditorBase } from "@itwin/components-react";
import { ColorPickerButton } from "../color/ColorPickerButton.js";

/** @internal */
interface ColorEditorState {
  colorValue: number;
  readonly: boolean;
  isDisabled?: boolean;
  numColumns: number;
  availableColors: ColorDef[];
}

/** ColorEditor React component that is a property editor with text input
 * @beta
 */
export class ColorEditor
  extends React.PureComponent<PropertyEditorProps, ColorEditorState>
  implements TypeEditor
{
  private _buttonElement: React.RefObject<HTMLButtonElement> =
    React.createRef();

  public override readonly state: Readonly<ColorEditorState> = {
    colorValue: 0,
    readonly: false,
    numColumns: 4,
    availableColors: [],
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
    const record = this.props.propertyRecord;
    let propertyValue: PropertyValue | undefined;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.colorValue,
        displayValue: "",
      };
    }

    return propertyValue;
  }

  public get htmlElement(): HTMLElement | null {
    return this._buttonElement.current;
  }

  public get hasFocus(): boolean {
    return document.activeElement === this._buttonElement.current;
  }

  private setFocus(): void {
    if (
      this._buttonElement &&
      this._buttonElement.current &&
      !this.state.isDisabled
    ) {
      this._buttonElement.current.focus();
    }
  }

  private _onColorPick = (color: ColorDef) => {
    const propertyRecord = this.props.propertyRecord as PropertyRecord;

    this.setState(
      {
        colorValue: color.tbgr,
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
    void this.setStateFromProps();
  }

  public override componentDidUpdate(prevProps: PropertyEditorProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }

  private async setStateFromProps() {
    const record = this.props.propertyRecord;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      const colorValue = record.value.value as number;
      let numColumns = 4;
      const availableColors = new Array<ColorDef>();
      const readonly =
        record && undefined !== record.isReadonly ? record.isReadonly : false;
      const isDisabled = record ? record.isDisabled : undefined;

      if (record.property.editor && record.property.editor.params) {
        const colorParams = record.property.editor.params.find(
          (param: PropertyEditorParams) =>
            param.type === PropertyEditorParamTypes.ColorData.valueOf()
        ) as ColorEditorParams;
        if (colorParams) {
          colorParams.colorValues.forEach((colorNumber: number) => {
            availableColors.push(ColorDef.create(colorNumber));
          });
          if (colorParams.numColumns) numColumns = colorParams.numColumns;
        }
      }
      this.setState(
        { colorValue, readonly, isDisabled, numColumns, availableColors },
        () => {
          if (this.props.setFocus) {
            this.setFocus();
          }
        }
      );
    }
  }

  public override render() {
    const colorDef = ColorDef.create(this.state.colorValue);
    return (
      <div
        className={classnames("components-color-editor", this.props.className)}
        style={this.props.style}
      >
        <ColorPickerButton // eslint-disable-line deprecation/deprecation
          ref={this._buttonElement}
          initialColor={colorDef}
          colorDefs={
            this.state.availableColors.length > 0
              ? this.state.availableColors
              : [colorDef]
          }
          numColumns={this.state.numColumns}
          disabled={this.state.isDisabled ? true : false}
          readonly={this.state.readonly}
          onColorPick={this._onColorPick}
          data-testid="components-color-editor"
        />
      </div>
    );
  }
}

/** Color Property Editor registered for the "number" type name and "color-picker" editor name.
 * It uses the [[ColorEditor]] React component.
 * @beta
 */
export class ColorPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <ColorEditor />;
  }
}
