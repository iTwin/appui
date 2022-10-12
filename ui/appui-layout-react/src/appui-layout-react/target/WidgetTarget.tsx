/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./WidgetTarget.scss";
import * as React from "react";
import { WidgetIdContext } from "../widget/Widget";
import { TargetContainer } from "./TargetContainer";
import { MergeTarget } from "./MergeTarget";

/** @internal */
export function WidgetTarget() {
  const widgetId = React.useContext(WidgetIdContext);
  return (
    <TargetContainer
      className="nz-target-widgetTarget"
      direction="horizontal"
    >
      <MergeTarget widgetId={widgetId} />
    </TargetContainer>
  );
}
