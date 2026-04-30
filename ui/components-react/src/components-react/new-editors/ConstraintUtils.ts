/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { PropertyRecord } from "@itwin/appui-abstract";
import type { NumericValueMetadata } from "./values/Metadata.js";

/** @internal */
export interface StringPropertyValueConstraints {
  minimumLength?: number;
  maximumLength?: number;
}

/** @internal */
export type NumericPropertyValueConstraints =
  Required<NumericValueMetadata>["constraints"];

/** @internal */
export interface ArrayPropertyValueConstraints {
  minOccurs?: number;
  maxOccurs?: number;
}

/**
 * Copy of `PropertyValueConstraints` from @itwin/presentation-common package to support pre-5.0 version.
 * @internal
 */
export type PropertyValueConstraints =
  | StringPropertyValueConstraints
  | NumericPropertyValueConstraints
  | ArrayPropertyValueConstraints;

/**
 * Expands specified type with additional constraints property.
 * @internal
 */
export type WithConstraints<T extends object> = T & {
  constraints?: PropertyValueConstraints;
};

/**
 * `PropertyRecord` with `constraints` on its `property` field.
 *
 * @internal
 */
export type PropertyRecordWithConstraints = Omit<PropertyRecord, "property"> & {
  property: WithConstraints<PropertyRecord["property"]>;
};

/**
 * Extracts `minimumValue`/`maximumValue` from a `PropertyValueConstraints` object.
 * Returns `{ min: undefined, max: undefined }` if the constraint object doesn't have those keys.
 * @internal
 */
export function getNumericConstraints(
  constraints: PropertyValueConstraints | undefined
): { min?: number; max?: number } {
  if (
    constraints &&
    ("minimumValue" in constraints || "maximumValue" in constraints)
  ) {
    return {
      min: constraints.minimumValue,
      max: constraints.maximumValue,
    };
  }
  return { min: undefined, max: undefined };
}

/**
 * Clamps `value` to `[min, max]`.
 * @internal
 */
export function applyNumericConstraints({
  value,
  min,
  max,
}: {
  value: number;
  min?: number;
  max?: number;
}): number {
  let clamped = value;
  if (min !== undefined) {
    clamped = Math.max(clamped, min);
  }
  if (max !== undefined) {
    clamped = Math.min(clamped, max);
  }
  return clamped;
}

/**
 * Extracts `minimumLength`/`maximumLength` from a `PropertyValueConstraints` object.
 * Returns `{ minLength: undefined, maxLength: undefined }` if the constraint object doesn't have those keys.
 * @internal
 */
export function getStringConstraints(
  constraints: PropertyValueConstraints | undefined
): { minLength?: number; maxLength?: number } {
  if (
    constraints &&
    ("minimumLength" in constraints || "maximumLength" in constraints)
  ) {
    return {
      minLength: constraints.minimumLength,
      maxLength: constraints.maximumLength,
    };
  }
  return { minLength: undefined, maxLength: undefined };
}
