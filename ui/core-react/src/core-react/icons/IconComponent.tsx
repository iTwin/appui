/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Icon
 */

import "./IconComponent.scss";
import * as React from "react";
import classnames from "classnames";
import {
  ConditionalStringValue,
  IconSpecUtilities,
} from "@itwin/appui-abstract";
import type { CommonProps } from "../utils/Props";
import DOMPurify, * as DOMPurifyNS from "dompurify";
import { ConditionalIconItem } from "./ConditionalIconItem";

/** Prototype for an IconSpec which can be a string, ReactNode or ConditionalStringValue.
 * @public
 */
export type IconSpec =
  | string
  | ConditionalStringValue
  | React.ReactNode
  | ConditionalIconItem;

/** Properties for the [[Icon]] React component
 * @public
 */
export interface IconProps extends CommonProps {
  /** CSS class name or SvgPath for icon. This is optional because it is improperly
   * used to extend other interfaces and changing it would break existing API.
   */
  iconSpec?: IconSpec;
}

/** Icon Functional component displays an icon based on an [[IconSpec]].
 * @public
 */
export function Icon(props: IconProps) {
  if (!props.iconSpec) return null;

  const iconString =
    typeof props.iconSpec === "string" ||
    props.iconSpec instanceof ConditionalStringValue
      ? ConditionalStringValue.getValue(props.iconSpec)
      : undefined;

  if (iconString) {
    const webComponentString =
      IconSpecUtilities.getWebComponentSource(iconString);
    if (webComponentString) {
      const svgLoader = `<svg-loader src="${webComponentString}"></svg-loader>`;
      const svgDiv = `<div>${svgLoader}</div>`;
      // the esm build of dompurify has a default import but the cjs build does not
      // if there is a default export, use it (likely esm), otherwise use the namespace
      // istanbul ignore next
      const sanitizer = DOMPurify ?? DOMPurifyNS;

      const sanitizerConfig = {
        ALLOWED_TAGS: ["svg-loader"],
        ADD_URI_SAFE_ATTR: webComponentString.startsWith("data:")
          ? ["src"]
          : [],
      };

      const sanitizedIconString = sanitizer.sanitize(svgDiv, sanitizerConfig);
      const webComponentNode = (
        // we can safely disable jam3/no-sanitizer-with-danger as we are sanitizing above
        // eslint-disable-next-line jam3/no-sanitizer-with-danger
        <div dangerouslySetInnerHTML={{ __html: sanitizedIconString }}></div>
      );
      return (
        <i className={classnames("icon", "core-svg-icon", props.className)}>
          {webComponentNode}
        </i>
      );
    }
    return (
      <i
        className={classnames("icon", iconString, props.className)}
        style={props.style}
      />
    );
  }

  if (ConditionalIconItem.isConditionalIconItem(props.iconSpec)) {
    return (
      <i
        className={classnames("icon", "core-svg-icon", props.className)}
        style={props.style}
      >
        {ConditionalIconItem.getValue(props.iconSpec)}
      </i>
    );
  }

  return (
    <i
      className={classnames("icon", "core-svg-icon", props.className)}
      style={props.style}
    >
      {props.iconSpec instanceof ConditionalStringValue
        ? undefined
        : props.iconSpec}
    </i>
  );
}
