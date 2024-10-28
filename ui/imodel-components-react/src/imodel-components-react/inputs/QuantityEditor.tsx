import * as React from "react";
import { type QuantityTypeArg } from "@itwin/core-frontend";
import { useQuantityInfo } from "./UseQuantityInfo.js";
import type {
  EditorPropsWithFormatOverrides,
  EditorSpec,
} from "@itwin/components-react";
import { QuantityInput, useNumericEditorProps } from "@itwin/components-react";

export const QuantityEditorSpec: EditorSpec = {
  applies: (metadata) =>
    metadata.type === "number" &&
    "quantityType" in metadata &&
    metadata.quantityType !== undefined,
  Editor: QuantityEditor,
};

/**
 *
 */
export function QuantityEditor(props: EditorPropsWithFormatOverrides) {
  const { onChange, value, onFinish, size } = useNumericEditorProps(props);
  const quantityType =
    "quantityType" in props.metadata
      ? (props.metadata.quantityType as QuantityTypeArg)
      : undefined;

  const { formatter, parser } = useQuantityInfo({
    type: quantityType,
    formatOverrides: props.formatOverrides,
  });

  return (
    <QuantityInput
      value={value}
      onChange={onChange}
      onBlur={onFinish}
      size={size}
      formatter={formatter}
      parser={parser}
    />
  );
}
