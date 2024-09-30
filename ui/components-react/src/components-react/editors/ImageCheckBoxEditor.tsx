/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./ImageCheckBoxEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  ImageCheckBoxParams,
  PropertyEditorParams,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
  StandardEditorNames,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer.js";
import {
  PropertyEditorBase,
  PropertyEditorManager,
} from "./PropertyEditorManager.js";
import { ImageCheckBox } from "@itwin/core-react";

// cSpell:ignore imagecheckbox

/** @internal */
interface ImageCheckBoxEditorState {
  /** Image for the "checked" state */
  imageOn: string;
  /** Image for the "unchecked" (default) state */
  imageOff: string;
  checkboxValue: boolean;
  isDisabled?: boolean;
}
/** [[ImageCheckBoxEditor]]
 * Boolean editor that renders with an image instead of checkbox
 * @public
 */
export class ImageCheckBoxEditor
  extends React.PureComponent<PropertyEditorProps, ImageCheckBoxEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _inputElement: React.RefObject<HTMLInputElement> = React.createRef();

  public override readonly state: Readonly<ImageCheckBoxEditorState> = {
    imageOff: "",
    imageOn: "",
    checkboxValue: false,
    isDisabled: false,
  };

  public async getPropertyValue(): Promise<PropertyValue | undefined> {
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
    let imageOn = "";
    let imageOff = "";
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

    if (
      propertyRecord &&
      propertyRecord.property &&
      propertyRecord.property.editor &&
      propertyRecord.property.editor.params
    ) {
      const imageCheckBoxParams = propertyRecord.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type === PropertyEditorParamTypes.CheckBoxImages.valueOf()
      ) as ImageCheckBoxParams;
      if (imageCheckBoxParams) {
        imageOn = imageCheckBoxParams.imageOn;
        imageOff = imageCheckBoxParams.imageOff;
      }
    }
    this.setState({ imageOn, imageOff, checkboxValue, isDisabled });
  }

  private _handleClick = (checked: boolean) => {
    this.setState(
      {
        checkboxValue: checked,
      },
      async () => {
        if (this.props.propertyRecord && this.props.onCommit) {
          const propertyValue = await this.getPropertyValue();
          if (this._isMounted && propertyValue !== undefined) {
            this.props.onCommit({
              propertyRecord: this.props.propertyRecord,
              newValue: propertyValue,
            });
          }
        }
      }
    );
  };

  public override render() {
    const className = classnames(
      "components-cell-editor",
      "components-imagecheckbox-editor",
      this.props.className
    );
    const checked = this.state.checkboxValue;
    const isDisabled = !!this.state.isDisabled;

    return (
      // eslint-disable-next-line deprecation/deprecation
      <ImageCheckBox
        inputRef={this._inputElement}
        imageOff={this.state.imageOff}
        imageOn={this.state.imageOn}
        className={className}
        border={true}
        style={this.props.style}
        checked={checked}
        disabled={isDisabled}
        onClick={this._handleClick}
        data-testid="components-imagecheckbox-editor"
      />
    );
  }
}

/** ImageCheckBox Property Editor registered for the "bool" and "boolean" type names.
 * It uses the [[ImageCheckBoxEditor]] React component.
 * @public
 */
export class ImageCheckBoxPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <ImageCheckBoxEditor />;
  }
}

PropertyEditorManager.registerEditor(
  StandardTypeNames.Boolean,
  ImageCheckBoxPropertyEditor,
  StandardEditorNames.ImageCheckBox
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Bool,
  ImageCheckBoxPropertyEditor,
  StandardEditorNames.ImageCheckBox
);
