/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { OldEditorMetadata } from "../Metadata.js";
import type {
  ButtonGroupEditorParams,
  ColorEditorParams,
  CustomFormattedNumberParams,
  IconEditorParams,
  InputEditorSizeParams,
} from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";

/**
 * @internal
 */
export function useCustomFormattedNumberParams(
  metadata: OldEditorMetadata
): CustomFormattedNumberParams | undefined {
  return React.useMemo(() => {
    const formatParams = metadata.params?.find(
      (param) =>
        param.type === PropertyEditorParamTypes.CustomFormattedNumber.valueOf()
    ) as CustomFormattedNumberParams | undefined;
    return formatParams;
  }, [metadata]);
}

/**
 * @internal
 */
export function useInputEditorSizeParams(
  metadata: OldEditorMetadata
): InputEditorSizeParams | undefined {
  return React.useMemo(() => {
    const sizeParams = metadata.params?.find(
      (param) =>
        param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
    ) as InputEditorSizeParams | undefined;
    return sizeParams;
  }, [metadata]);
}

/**
 * @internal
 */
export function useIconEditorParams(
  metadata: OldEditorMetadata
): IconEditorParams | undefined {
  return React.useMemo(() => {
    const iconParams = metadata.params?.find(
      (param) => param.type === PropertyEditorParamTypes.Icon.valueOf()
    ) as IconEditorParams | undefined;
    return iconParams;
  }, [metadata]);
}

/**
 * @internal
 */
export function useButtonGroupEditorParams(
  metadata: OldEditorMetadata
): ButtonGroupEditorParams | undefined {
  return React.useMemo(() => {
    const buttonGroupParams = metadata.params?.find(
      (param) =>
        param.type === PropertyEditorParamTypes.ButtonGroupData.valueOf()
    ) as ButtonGroupEditorParams | undefined;
    return buttonGroupParams;
  }, [metadata]);
}

/**
 * @internal
 */
export function useColorEditorParams(
  metadata: OldEditorMetadata
): ColorEditorParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) => param.type === PropertyEditorParamTypes.ColorData.valueOf()
      ) as ColorEditorParams,
    [metadata]
  );
}
