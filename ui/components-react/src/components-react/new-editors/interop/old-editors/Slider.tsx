/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { EditorProps } from "../../Types.js";
import { createEditorSpec } from "../../Types.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { NumericValue } from "../../values/Values.js";
import type { SliderEditorParams } from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import { Button, Icon, Popover, Slider } from "@itwin/itwinui-react";
import { useSliderEditorParams } from "./UseEditorParams.js";
import { findIcon } from "../IconsRegistry.js";
import { isNumeric } from "../../values/ValueUtilities.js";

/* v8 ignore start */

/** @internal */
export const SliderEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) &&
    metadata.type === "number" &&
    !!metadata.params?.find(
      (param) => param.type === PropertyEditorParamTypes.Slider.valueOf()
    ) &&
    metadata.preferredEditor === StandardEditorNames.Slider,
  isValueSupported: isNumeric,
  Editor: SliderEditor,
});

function SliderEditor({
  metadata,
  value,
  disabled,
  onChange,
  commit,
  size,
}: EditorProps<OldEditorMetadata, NumericValue>) {
  const sliderParams = useSliderEditorParams(metadata);
  if (!sliderParams) {
    return null;
  }

  const minLabel =
    sliderParams.showMinMax && sliderParams.minIconSpec ? (
      <Icon>{findIcon(sliderParams.minIconSpec)}</Icon>
    ) : undefined;
  const maxLabel =
    sliderParams.showMinMax && sliderParams.maxIconSpec ? (
      <Icon>{findIcon(sliderParams.maxIconSpec)}</Icon>
    ) : undefined;

  const handleChange = (values: ReadonlyArray<number>): void => {
    const newValue = values[0];
    onChange({ rawValue: newValue, displayValue: `${newValue}` });
  };

  const currentValue = value?.rawValue ?? sliderParams.minimum;
  const slider = (
    <Slider
      values={[currentValue]}
      min={sliderParams.minimum}
      max={sliderParams.maximum}
      step={sliderParams.step}
      thumbMode={
        1 === sliderParams.mode ? "allow-crossing" : "inhibit-crossing"
      }
      trackDisplayMode={!sliderParams.reversed ? "auto" : "odd-segments"}
      minLabel={minLabel}
      maxLabel={maxLabel}
      tooltipProps={(_index, tooltipValue) => {
        return {
          placement: sliderParams.tooltipBelow ? "bottom" : "top",
          content: formatTickLabel(tooltipValue, sliderParams),
          visible: sliderParams.showTooltip,
        };
      }}
      tickLabels={getTickLabels(sliderParams)}
      onChange={handleChange}
      disabled={disabled}
    />
  );
  return (
    <Popover
      placement="bottom"
      style={{ minWidth: "300px", padding: "8px" }}
      content={slider}
      onVisibleChange={(visible) => {
        if (!visible) {
          commit?.();
        }
      }}
      applyBackground={true}
    >
      <Button style={{ width: "100%" }} size={size} disabled={disabled}>
        {currentValue}
      </Button>
    </Popover>
  );
}

function getTickLabels(sliderParams: SliderEditorParams) {
  if (!sliderParams.showTicks || !sliderParams.showTickLabels) {
    return undefined;
  }
  const count = sliderParams.getTickCount ? sliderParams.getTickCount() : 0;
  if (count > 0) {
    const increment = (sliderParams.maximum - sliderParams.minimum) / count;
    return Array.from({ length: count + 1 }, (_, i) =>
      formatTickLabel(i * increment + sliderParams.minimum, sliderParams)
    );
  }
  return sliderParams
    .getTickValues?.()
    .map((val) => formatTickLabel(val, sliderParams));
}

function formatTickLabel(value: number, params: SliderEditorParams) {
  return params.formatTooltip ? params.formatTooltip(value) : `${value}`;
}

/* v8 ignore stop */
