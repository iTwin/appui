/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./SectionTargets.scss";
import * as React from "react";
import { TargetContainer } from "./TargetContainer.js";
import { SectionTarget, useTargetDirection } from "./SectionTarget.js";
import type { WidgetState } from "../state/WidgetState.js";
import { MergeTarget } from "./MergeTarget.js";

/** @internal */
export interface SectionTargetsProps {
  widgetId: WidgetState["id"];
}

/** @internal */
export function SectionTargets(props: SectionTargetsProps) {
  const direction = useTargetDirection();
  const { widgetId } = props;
  return (
    <TargetContainer className="nz-target-sectionTargets" direction={direction}>
      <SectionTarget sectionIndex={0} />
      <MergeTarget widgetId={widgetId} />
      <SectionTarget sectionIndex={1} />
    </TargetContainer>
  );
}
