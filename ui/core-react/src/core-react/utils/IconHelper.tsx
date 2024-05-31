/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import type { IconSpec } from "../icons/IconComponent";
import { Icon } from "../icons/IconComponent";
import { ConditionalIconItem } from "../icons/ConditionalIconItem";

/** Icon Helper Class used to store the data needed to generate an <Icon> for use in any control that shows an icon.
 * @public
 */
export class IconHelper {
  public static get reactIconKey(): string {
    return "#-react-iconspec-node-#";
  }
  public static get conditionalIconItemKey(): string {
    return "#-conditional-icon-item-node-#";
  }
  /** Returns an <Icon> ReactNode from the many ways an icon can be specified.
   * @param icon abstract icon specification.
   * @param internalData a map that may hold a React.ReactNode stored in an abstract item definition.
   */
  public static getIconReactNode(
    icon:
      | string
      | ConditionalStringValue
      | React.ReactNode
      | ConditionalIconItem,
    internalData?: Map<string, any>
  ): React.ReactNode {
    if (!icon) return null;

    if (ConditionalIconItem.isConditionalIconItem(icon))
      return <Icon iconSpec={ConditionalIconItem.getValue(icon)} />;
    if (React.isValidElement(icon)) return <Icon iconSpec={icon} />;

    // istanbul ignore if
    if (!(icon instanceof ConditionalStringValue) && typeof icon !== "string")
      return null;

    const iconString = ConditionalStringValue.getValue(icon);
    if (!iconString) return null;

    if (iconString === IconHelper.reactIconKey) {
      if (internalData)
        return (
          <Icon
            iconSpec={
              internalData.get(IconHelper.reactIconKey) as React.ReactNode
            }
          />
        );
      return null;
    } else if (iconString === IconHelper.conditionalIconItemKey) {
      if (internalData) {
        const iconItem = internalData.get(
          IconHelper.conditionalIconItemKey
        ) as ConditionalIconItem;
        return <Icon iconSpec={ConditionalIconItem.getValue(iconItem)} />;
      }
      return null;
    }
    return <Icon iconSpec={iconString} />;
  }

  /** Returns an icon definition that can be stored in an abstract item definition. If the iconSpec specifies a ReactNode
   * then the react data is stored in the internalData map and the key to the react data is returned.
   * @param iconSpec any supported variations of how an icon can be defined in an abstract item or IconProps.
   * @param internalData a map supplied by the caller to store away react element if React.ReactNode
   */
  public static getIconData(
    iconSpec: IconSpec,
    internalData?: Map<string, any>
  ): string | ConditionalStringValue {
    let icon;
    if (ConditionalIconItem.isConditionalIconItem(iconSpec)) {
      icon = IconHelper.conditionalIconItemKey;
      if (internalData)
        internalData.set(IconHelper.conditionalIconItemKey, iconSpec);
      return icon;
    } else {
      icon = React.isValidElement(iconSpec)
        ? IconHelper.reactIconKey
        : iconSpec;
    }

    if (
      internalData &&
      typeof icon === "string" &&
      icon === IconHelper.reactIconKey
    ) {
      internalData.set(IconHelper.reactIconKey, iconSpec);
    }

    if (typeof icon === "string" || icon instanceof ConditionalStringValue)
      return icon;

    return "";
  }
}
