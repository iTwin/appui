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
import DOMPurify from "dompurify";
import { ConditionalIconItem } from "./ConditionalIconItem.js";

/* eslint-disable @typescript-eslint/no-deprecated */

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
  const { iconSpec, ...rest } = props;
  const iconSpecValue = useIconSpecValue(iconSpec);
  if (!iconSpec) return undefined;

  const typedValue = getTypedValue(iconSpecValue);

  if (typedValue.type === "css-icon") {
    return (
      <i
        {...rest}
        className={classnames(
          "icon",
          "core-css-icon",
          typedValue.iconName,
          props.className
        )}
      />
    );
  }

  if (typedValue.type === "svg-loader") {
    return (
      <i
        {...rest}
        className={classnames("icon", "core-svg-icon", props.className)}
      >
        <SvgLoader src={typedValue.src} />
      </i>
    );
  }

  return (
    <i
      {...rest}
      className={classnames("icon", "core-svg-icon", props.className)}
      style={props.style}
    >
      {typedValue.node}
    </i>
  );
}

type IconSpecValue = Exclude<
  IconSpec,
  ConditionalIconItem | ConditionalStringValue
>;

/** @internal */
export function useIconSpecValue(
  iconSpec: IconSpec | undefined
): IconSpecValue | undefined {
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

/** @internal */
export function getTypedValue(value: IconSpecValue) {
  if (typeof value === "string") {
    const webComponentSource = getWebComponentSource(value);
    if (
      value.startsWith("data:") ||
      value.endsWith(".svg") ||
      webComponentSource
    ) {
      const src = webComponentSource ? webComponentSource : value;
      return {
        type: "svg-loader" as const,
        src,
      };
    }

    return {
      type: "css-icon" as const,
      iconName: value,
    };
  }
  return {
    type: "react-node" as const,
    node: value,
  };
}

interface SvgLoaderProps {
  src: string;
}

/** @internal */
export function SvgLoader(props: SvgLoaderProps) {
  const { src, ...rest } = props;
  const svgLoader = `<svg-loader src="${src}"></svg-loader>`;
  const svgDiv = `<div>${svgLoader}</div>`;
  const sanitizerConfig = {
    ALLOWED_TAGS: ["svg-loader"],
    ADD_URI_SAFE_ATTR: src.startsWith("data:") ? ["src"] : [],
  };
  const sanitizedIconString = DOMPurify.sanitize(svgDiv, sanitizerConfig);
  return (
    <div
      {...rest}
      // we can safely disable jam3/no-sanitizer-with-danger as we are sanitizing above
      // eslint-disable-next-line jam3/no-sanitizer-with-danger
      dangerouslySetInnerHTML={{ __html: sanitizedIconString }}
    />
  );
}
