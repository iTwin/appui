/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgClose } from "@itwin/itwinui-icons-react";
import { ActionButton } from "../widget-action-dropdown/Button";
import { WidgetState } from "../../widgets/WidgetState";
import { usePreviewFeatures } from "../PreviewFeatures";
import { useActiveTabId } from "../../layout/widget/Widget";
import { useWidgetDef } from "../../widget-panels/Content";

/** @internal */
export function CloseTabButton() {
  const activeTabId = useActiveTabId();
  const widgetDef = useWidgetDef(activeTabId);

  return (
    <ActionButton
      icon={<SvgClose />}
      title="Close tab"
      onClick={() => {
        widgetDef?.setWidgetState(WidgetState.Hidden);
      }}
    />
  );
}

/** @internal */
export function useCloseTab() {
  const { controlWidgetVisibility } = usePreviewFeatures();
  return !!controlWidgetVisibility;
}
