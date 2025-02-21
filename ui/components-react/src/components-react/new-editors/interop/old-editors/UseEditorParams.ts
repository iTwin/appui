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
  RangeEditorParams,
  SliderEditorParams,
} from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";

/* v8 ignore start */

/**
 * @internal
 */
export function useCustomFormattedNumberParams(
  metadata: OldEditorMetadata
): CustomFormattedNumberParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) =>
          param.type ===
          PropertyEditorParamTypes.CustomFormattedNumber.valueOf()
      ) as CustomFormattedNumberParams,
    [metadata]
  );
}

/**
 * @internal
 */
export function useInputEditorSizeParams(
  metadata: OldEditorMetadata
): InputEditorSizeParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) =>
          param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
      ) as InputEditorSizeParams,
    [metadata]
  );
}

/**
 * @internal
 */
export function useIconEditorParams(
  metadata: OldEditorMetadata
): IconEditorParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) => param.type === PropertyEditorParamTypes.Icon.valueOf()
      ) as IconEditorParams,
    [metadata]
  );
}

/**
 * @internal
 */
export function useButtonGroupEditorParams(
  metadata: OldEditorMetadata
): ButtonGroupEditorParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) =>
          param.type === PropertyEditorParamTypes.ButtonGroupData.valueOf()
      ) as ButtonGroupEditorParams,
    [metadata]
  );
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

/**
 * @internal
 */
export function useRangeEditorParams(
  metadata: OldEditorMetadata
): RangeEditorParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) => param.type === PropertyEditorParamTypes.Range.valueOf()
      ) as RangeEditorParams,
    [metadata]
  );
}

/**
 * @internal
 */
export function useSliderEditorParams(
  metadata: OldEditorMetadata
): SliderEditorParams | undefined {
  return React.useMemo(
    () =>
      metadata.params?.find(
        (param) => param.type === PropertyEditorParamTypes.Slider.valueOf()
      ) as SliderEditorParams,
    [metadata]
  );
}

/* v8 ignore stop */
