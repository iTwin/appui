/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import type { CommonProps } from "../utils/Props.js";

/** Properties for the [[Gap]] component.
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link Gap}.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface GapProps extends CommonProps {
  size?: string;
}

/** Horizontal gap or space React component. Defaults to 10px.
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/flex iTwinUI Flex `gap`} or {@link https://itwinui.bentley.com/docs/variables#size iTwinUI size variables} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function Gap(props: GapProps) {
  const { size, style, ...rest } = props;
  const paddingLeft = size ?? "10px";

  return <span style={{ ...style, paddingLeft }} {...rest} />;
}
