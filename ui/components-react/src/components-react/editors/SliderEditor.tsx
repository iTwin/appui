/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./SliderEditor.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  PropertyEditorParams,
  PropertyValue,
  SliderEditorParams,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import { Icon } from "@itwin/core-react";
import type { Tooltip } from "@itwin/itwinui-react";
import { Slider } from "@itwin/itwinui-react";
import type { PropertyEditorProps, TypeEditor } from "./EditorContainer.js";
import { PropertyEditorBase } from "./PropertyEditorManager.js";
import {
  PopupButton,
  PopupContent,
  PopupOkCancelButtons,
} from "./PopupButton.js";

type TooltipProps = React.ComponentPropsWithoutRef<typeof Tooltip>;

/** @internal */
interface SliderEditorState {
  value: number;
  isDisabled?: boolean;
  min: number;
  max: number;
  size?: number;
  step?: number;
  showTooltip?: boolean;
  tooltipBelow?: boolean;
  formatTooltip?: (value: number) => string;
  thumbMode?: "allow-crossing" | "inhibit-crossing";
  trackDisplayMode?: "auto" | "none" | "odd-segments" | "even-segments";
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
  tickLabels?: React.ReactNode;
}

/** SliderEditor React component that is a property editor with numeric input & up/down buttons
 * @public
 */
export class SliderEditor
  extends React.PureComponent<PropertyEditorProps, SliderEditorState>
  implements TypeEditor
{
  private _isMounted = false;
  private _enterKey = false;
  private _divElement = React.createRef<HTMLDivElement>();

  public override readonly state: Readonly<SliderEditorState> = {
    value: 0,
    min: 0,
    max: 100,
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
    return this._divElement.current;
  }

  public get hasFocus(): boolean {
    let containsFocus = false;
    if (this.htmlElement)
      containsFocus = this.htmlElement.contains(document.activeElement);
    return containsFocus;
  }

  private _handleChange = (values: readonly number[]): void => {
    const newValue = values[0];

    if (this._isMounted)
      this.setState({
        value: newValue,
      });
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

  private internalFormatTooltip = (value: number, step = 1) => {
    if (Number.isInteger(step)) return value.toFixed(0);

    const stepString = step.toString();
    const decimalIndex = stepString.indexOf(".");
    const numDecimals = step.toString().length - (decimalIndex + 1);
    return value.toFixed(numDecimals);
  };

  private async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = 0;

    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value as number;
    }

    let size: number | undefined;
    let min = 0;
    let max = 100;
    let step: number | undefined;
    let showTooltip: boolean | undefined;
    let tooltipBelow: boolean | undefined;
    let formatTooltip: ((value: number) => string) | undefined;
    let tickLabels: string[] | undefined;
    let minLabel: React.ReactNode | undefined;
    let maxLabel: React.ReactNode | undefined;
    let trackDisplayMode:
      | "auto"
      | "none"
      | "odd-segments"
      | "even-segments"
      | undefined;
    let thumbMode: "allow-crossing" | "inhibit-crossing" | undefined;

    const isDisabled = record ? record.isDisabled : undefined;

    if (
      record &&
      record.property &&
      record.property.editor &&
      record.property.editor.params
    ) {
      const sliderParams = record.property.editor.params.find(
        (param: PropertyEditorParams) =>
          param.type === PropertyEditorParamTypes.Slider.valueOf()
      ) as SliderEditorParams;
      if (sliderParams) {
        min = sliderParams.minimum;
        max = sliderParams.maximum;
        size = sliderParams.size;
        step = sliderParams.step;
        thumbMode =
          1 === sliderParams.mode ? "allow-crossing" : "inhibit-crossing";
        trackDisplayMode = !sliderParams.reversed ? "auto" : "odd-segments";
        showTooltip = sliderParams.showTooltip;
        tooltipBelow = sliderParams.tooltipBelow;
        formatTooltip = sliderParams.formatTooltip;

        minLabel = !sliderParams.showMinMax ? (
          ""
        ) : sliderParams.minIconSpec ? (
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          <Icon iconSpec={sliderParams.minIconSpec} />
        ) : undefined;
        maxLabel = !sliderParams.showMinMax ? (
          ""
        ) : sliderParams.maxIconSpec ? (
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          <Icon iconSpec={sliderParams.maxIconSpec} />
        ) : undefined;

        if (sliderParams.showTicks) {
          const count = sliderParams.getTickCount
            ? sliderParams.getTickCount()
            : 0;
          if (count) {
            tickLabels = [];
            const increment = (max - min) / count;
            for (let i = 0; i <= count; i++) {
              const value = i * increment + min;
              if (sliderParams.showTickLabels) {
                const label = sliderParams.formatTick
                  ? sliderParams.formatTick(value)
                  : this.internalFormatTooltip(value, step);
                tickLabels.push(label);
              } else {
                tickLabels.push("");
              }
            }
          } else if (sliderParams.getTickValues) {
            tickLabels = sliderParams
              .getTickValues()
              .map((val: number) =>
                sliderParams.formatTick
                  ? sliderParams.formatTick(val)
                  : this.internalFormatTooltip(val, step)
              );
          }
        }
      }
    }

    if (this._isMounted)
      this.setState({
        value: initialValue,
        isDisabled,
        size,
        min,
        max,
        step,
        trackDisplayMode,
        showTooltip,
        tooltipBelow,
        formatTooltip,
        minLabel,
        maxLabel,
        tickLabels,
        thumbMode,
      });
  }

  private _handleEnter = async (): Promise<void> => {
    this._enterKey = true;
    await this._handleCommit();
  };

  private _handleClose = async (): Promise<void> => {
    if (this._enterKey) {
      this._enterKey = false;
    } else {
      if (this.props.onCancel) this.props.onCancel();
    }
  };

  private _handleOk = async (_event: React.MouseEvent): Promise<void> => {
    await this._handleCommit();
  };

  private _handleCancel = (_event: React.MouseEvent): void => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

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

  private tooltipProps = (_index: number, val: number) => {
    const content = this.state.formatTooltip
      ? this.state.formatTooltip(val)
      : this.internalFormatTooltip(val, this.state.step);
    return {
      placement: this.state.tooltipBelow ? "bottom" : "top",
      content,
      visible: this.state.showTooltip,
    } as Partial<Omit<TooltipProps, "children">>;
  };

  public override render(): React.ReactNode {
    const className = classnames(
      "components-cell-editor",
      "components-slider-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 100;
    const style: React.CSSProperties = {
      ...this.props.style,
      minWidth: `${minSize}px`,
    };

    const tickProps = {
      "data-testid": "components-tick",
    } as React.ComponentProps<"span">;
    const popupContent = (
      <Slider
        className="components-slider-editor-slider"
        style={style}
        values={[this.state.value]}
        min={this.state.min}
        max={this.state.max}
        step={this.state.step}
        thumbMode={this.state.thumbMode}
        trackDisplayMode={this.state.trackDisplayMode}
        disabled={this.state.isDisabled}
        minLabel={this.state.minLabel}
        maxLabel={this.state.maxLabel}
        tooltipProps={this.tooltipProps}
        tickLabels={this.state.tickLabels}
        tickProps={tickProps}
        onChange={this._handleChange}
      />
    );

    return (
      <div className={className} ref={this._divElement}>
        <PopupButton
          label={this.state.value}
          onClose={this._handleClose}
          onEnter={this._handleEnter}
          setFocus={this.props.setFocus}
        >
          <PopupContent>
            {popupContent}
            <PopupOkCancelButtons
              onOk={this._handleOk}
              onCancel={this._handleCancel}
            />
          </PopupContent>
        </PopupButton>
      </div>
    );
  }
}

/** Slider Property Editor registered for the "number" type name and "slider" editor name.
 * It uses the [[SliderEditor]] React component.
 * @public
 */
export class SliderPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <SliderEditor />;
  }
}
