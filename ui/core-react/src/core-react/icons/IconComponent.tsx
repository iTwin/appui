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
import { ConditionalStringValue } from "@itwin/appui-abstract";
import type { CommonProps } from "../utils/Props.js";
import DOMPurify, * as DOMPurifyNS from "dompurify";
import { ConditionalIconItem } from "./ConditionalIconItem.js";

/* eslint-disable deprecation/deprecation */

/** Prototype for an IconSpec which can be a string, ReactNode or ConditionalStringValue.
 * Strings are expected to be one of the following:
 *  - Created by `IconSpecUtilities.createWebComponentIconSpec` in appui-abstract (deprecated).
 *  - A URL to a SVG file (must end with ".svg").
 *  - A dataURI with MimeTypes `image/svg+xml` (ensure valid dataURI encoding) or `image/svg+xml;base64`;
 *  - Anything else will be treated as a class name and be directly added to the `class` attribute.
 * @public
 * @deprecated in 4.16.0. Use `React.ReactNode` instead.
 */
export type IconSpec =
  | string
  | ConditionalStringValue
  | React.ReactNode
  | ConditionalIconItem;

/** Properties for the [[Icon]] React component
 * @public
 * @deprecated in 4.16.0. Props of deprecated {@link Icon} component.
 */
export interface IconProps extends CommonProps {
  /** CSS class name or SvgPath for icon. This is optional because it is improperly
   * used to extend other interfaces and changing it would break existing API.
   */
  iconSpec?: IconSpec;
}

/** Get the SVG Source from an svg-loader IconSpec */
function getWebComponentSource(iconSpec: string): string | undefined {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }

  return undefined;
}

/** Icon Functional component displays an icon based on an [[IconSpec]].
 * @public
 * @deprecated in 4.16.0. Used to render a deprecated {@link IconSpec} type. Use {@link https://itwinui.bentley.com/ iTwinUI Icon} instead.
 */
export function Icon(props: IconProps) {
  if (!props.iconSpec) return null;

  const iconSpecValue = getIconSpecValue(props.iconSpec);
  if (typeof iconSpecValue === "string") {
    const iconString = iconSpecValue;
    const webComponentString = getWebComponentSource(iconString);

    if (
      iconString.startsWith("data:") ||
      iconString.endsWith(".svg") ||
      webComponentString
    ) {
      const definitiveIconString = webComponentString
        ? webComponentString
        : iconString;
      const svgLoader = `<svg-loader src="${definitiveIconString}"></svg-loader>`;
      const svgDiv = `<div>${svgLoader}</div>`;
      // the esm build of dompurify has a default import but the cjs build does not
      // if there is a default export, use it (likely esm), otherwise use the namespace
      const sanitizer = DOMPurify ?? DOMPurifyNS;

      const sanitizerConfig = {
        ALLOWED_TAGS: ["svg-loader"],
        ADD_URI_SAFE_ATTR: definitiveIconString.startsWith("data:")
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

    // CSS icon
    return (
      <i
        className={classnames("icon", iconString, props.className)}
        style={props.style}
      />
    );
  }

  // ReactNode icon
  return (
    <i
      className={classnames("icon", "core-svg-icon", props.className)}
      style={props.style}
    >
      {iconSpecValue}
    </i>
  );
}

function getIconSpecValue(
  iconSpec: IconSpec
): Exclude<IconSpec, ConditionalIconItem | ConditionalStringValue> {
  let value = iconSpec;
  while (true) {
    if (value instanceof ConditionalIconItem) {
      value = ConditionalIconItem.getValue(value);
      continue;
    }
    if (value instanceof ConditionalStringValue) {
      value = ConditionalStringValue.getValue(value);
      break;
    }
    break;
  }
  return value;
}
