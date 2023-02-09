/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import * as React from "react";
import { ScrollableWidgetContent, TabIdContext } from "@itwin/appui-layout-react";
import { WidgetDef } from "../widgets/WidgetDef";
import { FrontstageManager } from "../frontstage/FrontstageManager";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { useTransientState } from "./useTransientState";
import { assert } from "@itwin/core-bentley";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import { isProviderItem } from "../ui-items-provider/isProviderItem";

/** @internal */
export function WidgetContent() {
  const widget = useWidgetDef();
  // istanbul ignore next
  const itemId = widget?.id ?? widget?.label ?? "unknown";
  const onSave = React.useCallback(() => {
    // istanbul ignore next
    widget?.saveTransientState();
  }, [widget]);
  const onRestore = React.useCallback(() => {
    // istanbul ignore next
    widget?.restoreTransientState();
  }, [widget]);
  useTransientState(onSave, onRestore);
  const providerId = widget?.initialConfig && isProviderItem(widget?.initialConfig) ? widget?.initialConfig.providerId : undefined;
  return (
    <ScrollableWidgetContent
      itemId={itemId}
      providerId={providerId}
    >
      {widget?.reactNode}
    </ScrollableWidgetContent>
  );
}

/** @internal */
export function useWidgetDef(): WidgetDef | undefined {
  const tabId = React.useContext(TabIdContext);
  assert(!!tabId);

  const frontstage = useActiveFrontstageDef();
  const [widgetDef, setWidgetDef] = React.useState(() => frontstage?.findWidgetDef(tabId));

  React.useEffect(() => {
    return FrontstageManager.onFrontstageNineZoneStateChangedEvent.addListener((args) => {
      if (args.frontstageDef !== frontstage || !frontstage || frontstage.isStageClosing || frontstage.isApplicationClosing)
        return;
      setWidgetDef(frontstage.findWidgetDef(tabId));
    });
  }, [frontstage, tabId]);

  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setWidgetDef(frontstage?.findWidgetDef(tabId));
    });
  }, [frontstage, tabId]);

  return widgetDef;
}
