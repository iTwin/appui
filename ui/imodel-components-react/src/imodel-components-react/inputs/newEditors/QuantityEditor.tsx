/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { type QuantityTypeArg } from "@itwin/core-frontend";
import { useQuantityInfo } from "./UseQuantityInfo.js";
import type { EditorProps, EditorSpec } from "@itwin/components-react";
import { useNumericEditorProps } from "@itwin/components-react";
import { QuantityInput } from "./QuantityInput.js";

/**
 * Editor specification for quantity values based on `IModelApp.quantityFormatter`.
 * @beta
 */
export const QuantityEditorSpec: EditorSpec = {
  applies: (metadata) =>
    metadata.type === "number" &&
    "quantityType" in metadata &&
    metadata.quantityType !== undefined,
  Editor: QuantityEditor,
};

function QuantityEditor(props: EditorProps) {
  const { onChange, value, onFinish, size } = useNumericEditorProps(props);
  const quantityType =
    "quantityType" in props.metadata
      ? (props.metadata.quantityType as QuantityTypeArg)
      : undefined;

  const { formatter, parser } = useQuantityInfo({
    type: quantityType,
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
