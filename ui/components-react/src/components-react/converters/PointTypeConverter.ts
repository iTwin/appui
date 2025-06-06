/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module TypeConverters
 */

import type { Primitives } from "@itwin/appui-abstract";
import { StandardTypeNames } from "@itwin/appui-abstract";
import { TypeConverter } from "./TypeConverter.js";
import { TypeConverterManager } from "./TypeConverterManager.js";
import type { ConvertedPrimitives } from "./valuetypes/ConvertedTypes.js";
import { isPromiseLike } from "../common/UseAsyncValue.js";

/**
 * Point type converter.
 * @public
 */
export abstract class BasePointTypeConverter extends TypeConverter {
  public componentConverterName: string;

  public constructor(
    componentConverterName: string = StandardTypeNames.Double
  ) {
    super();
    this.componentConverterName = componentConverterName;
  }

  private formatValue(value: number | string): string | Promise<string> {
    if (typeof value === "string") value = parseFloat(value);
    return TypeConverterManager.getConverter(
      this.componentConverterName
    ).convertToString(value);
  }

  public override convertToString(
    value?: Primitives.Point
  ): string | Promise<string> {
    if (!value) return "";

    let components = new Array<string | Promise<string>>();
    if (Array.isArray(value)) {
      if (value.length === 0) return "";
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      components = (value as Array<string | number>).map(
        (c): string | Promise<string> => this.formatValue(c)
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      components = [this.formatValue(value.x), this.formatValue(value.y)];
      if (undefined !== (value as any).z)
        components.push(this.formatValue((value as any).z));
    }
    const hasAsyncComponents = components.some(isPromiseLike);
    if (hasAsyncComponents) {
      return Promise.all(
        components.map(async (c) => (isPromiseLike(c) ? c : Promise.resolve(c)))
      ).then((c) => c.join(", "));
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return components.join(", ");
  }

  public override convertFromString(value: string) {
    return this.constructPoint(value.split(","));
  }
  protected abstract constructPoint(
    _values: Primitives.Point
  ): ConvertedPrimitives.Point | undefined;

  protected abstract getVectorLength(
    point: Primitives.Point
  ): number | undefined;

  public sortCompare(
    a: Primitives.Point,
    b: Primitives.Point,
    _ignoreCase?: boolean
  ): number {
    const aLength = this.getVectorLength(a);
    const bLength = this.getVectorLength(b);

    if (aLength === bLength) return 0;
    if (aLength === undefined) return -1;
    if (bLength === undefined) return 1;

    return aLength - bLength;
  }
}

/**
 * Point2d type converter.
 * @public
 */
export class Point2dTypeConverter extends BasePointTypeConverter {
  public constructor(componentConverterName?: string) {
    super(componentConverterName);
  }

  protected getVectorLength(point: Primitives.Point): number | undefined {
    const derivedPoint = this.constructPoint(point);

    if (derivedPoint === undefined) return undefined;

    return Math.sqrt(Math.pow(derivedPoint.x, 2) + Math.pow(derivedPoint.y, 2));
  }

  protected constructPoint(
    values: Primitives.Point
  ): ConvertedPrimitives.Point2d | undefined {
    if (Array.isArray(values)) {
      if (values.length !== 2 || isNaN(+values[0]) || isNaN(+values[1]))
        return undefined;
      return { x: +values[0], y: +values[1] };
    }
    return values;
  }
}

/**
 * Point3d type converter.
 * @public
 */
export class Point3dTypeConverter extends BasePointTypeConverter {
  public constructor(componentConverterName?: string) {
    super(componentConverterName);
  }

  protected getVectorLength(point: Primitives.Point): number | undefined {
    const derivedPoint = this.constructPoint(point);

    if (derivedPoint === undefined) return undefined;

    return Math.sqrt(
      Math.pow(derivedPoint.x, 2) +
        Math.pow(derivedPoint.y, 2) +
        Math.pow(derivedPoint.z, 2)
    );
  }

  protected constructPoint(
    values: Primitives.Point
  ): ConvertedPrimitives.Point3d | undefined {
    if (Array.isArray(values)) {
      if (
        values.length !== 3 ||
        isNaN(+values[0]) ||
        isNaN(+values[1]) ||
        isNaN(+values[2])
      )
        return undefined;
      return { x: +values[0], y: +values[1], z: +values[2] };
    }
    const z = (values as any).z;
    return { ...values, z: z ? z : 0 };
  }
}
