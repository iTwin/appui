/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as React from "react";
import type { IconSpec } from "@itwin/core-react";
import { Icon, IconHelper } from "@itwin/core-react";
import type {
  StringGetter,
  // @ts-ignore Removed in 4.0
  AbstractWidgetProps as UIA_AbstractWidgetProps,
  // @ts-ignore Removed in 4.0
  CommonBackstageItem as UIA_CommonBackstageItem,
} from "@itwin/appui-abstract";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { IModelApp } from "@itwin/core-frontend";

/** A set of helper methods for various props
 * @public
 * @deprecated in 4.16.0. Used internally.
 */
export class PropsHelper {
  /** Get spec for returning a string. Could be a simple string of a 'StringGetter' method used to return the string. */
  public static getStringSpec(
    explicitValue: string | StringGetter | ConditionalStringValue | undefined,
    stringKey?: string
  ): string | StringGetter | ConditionalStringValue {
    if (explicitValue) {
      return explicitValue;
    }

    const outValue = stringKey
      ? IModelApp.localization.getLocalizedString(stringKey)
      : "";
    return outValue;
  }

  /** Get the display string. */
  public static getStringFromSpec(
    spec: string | StringGetter | ConditionalStringValue
  ): string {
    let label = "";
    if (typeof spec === "string") label = spec;
    else if (spec instanceof ConditionalStringValue) label = spec.value;
    else label = spec();
    return label;
  }

  /** Get JSX element that defines an icon. If iconSpec is a string, then a web-font icon class is used otherwise a ReactNode holding an SVG icon is assumed. */
  public static getIcon(
    iconSpec: string | ConditionalStringValue | React.ReactNode
  ): React.ReactElement | undefined {
    if (iconSpec instanceof ConditionalStringValue)
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      return <Icon iconSpec={iconSpec.value} />;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return iconSpec ? <Icon iconSpec={iconSpec} /> : undefined;
  }

  /** returns true if the two objects are the same using a shallow compare of each property */
  public static isShallowEqual(newObj: any, prevObj: any) {
    for (const key in newObj) {
      if (newObj[key] !== prevObj[key]) return false;
    }
    return true;
  }

  /** @deprecated in 4.0 These abstract props types are obsolete. */
  public static getAbstractPropsForReactIcon(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    iconSpec: IconSpec,
    internalData?: Map<string, any>
    // eslint-disable-next-line @typescript-eslint/no-deprecated, @typescript-eslint/no-redundant-type-constituents
  ): Partial<UIA_AbstractWidgetProps> | Partial<UIA_CommonBackstageItem> {
    if (!iconSpec || !React.isValidElement(iconSpec)) return {};

    if (!internalData) internalData = new Map<string, any>();

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const icon = IconHelper.getIconData(iconSpec, internalData);

    return icon === "" ? { icon } : { icon, internalData };
  }
}
