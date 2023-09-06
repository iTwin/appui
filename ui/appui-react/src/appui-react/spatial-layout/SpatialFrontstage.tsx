/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import * as React from "react";
import type { SpatialLayoutProps } from "./SpatialLayout";
import { SpatialLayout } from "./SpatialLayout";
import { useSetupSpatialLayout } from "./useSetupSpatialLayout";

/** @internal */
export function SpatialFrontstage(props: SpatialLayoutProps) {
  useSetupSpatialLayout();
  return <SpatialLayout {...props} />;
}
