/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import "./Content.scss";
import { assert } from "@itwin/core-bentley";
import { SvgError } from "@itwin/itwinui-illustrations-react";
import { NonIdealState, ThemeProvider } from "@itwin/itwinui-react";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { ScrollableWidgetContent } from "../layout/widget/Content";
import { TabIdContext } from "../layout/widget/ContentRenderer";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import { isProviderItem } from "../ui-items-provider/isProviderItem";
import type { WidgetDef } from "../widgets/WidgetDef";
import { useTransientState } from "./useTransientState";
import { useTranslation } from "../hooks/useTranslation";
import { useLayoutStore } from "../layout/base/LayoutStore";
import {
  getTabLocation,
  isPopoutTabLocation,
} from "../layout/state/TabLocation";
import { ThemeProvider as ThemeProviderV2 } from "@itwin/itwinui-react-v2";
import { usePopoutsStore } from "../childwindow/usePopoutsStore";

function WidgetFallback() {
  const { translate } = useTranslation();

  return (
    <div role="alert" style={{ position: "relative", minHeight: 400 }}>
      <NonIdealState
        svg={<SvgError />}
        heading={translate("widget.errorMessage.unknownError")}
      />
    </div>
  );
}

/** @internal */
export function WidgetContent() {
  const tabId = React.useContext(TabIdContext);
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
  const providerId =
    widget?.initialConfig && isProviderItem(widget?.initialConfig)
      ? widget?.initialConfig.providerId
      : undefined;

  const layoutStore = useLayoutStore();
  const stateRef = React.useRef(layoutStore.getState());
  React.useEffect(
    () => layoutStore.subscribe((state) => (stateRef.current = state)),
    [layoutStore]
  );
  const popoutContainer = usePopoutsStore((state) => {
    if (!tabId) return undefined;
    const tabLocation = getTabLocation(stateRef.current, tabId);
    if (!tabLocation) return undefined;
    if (!isPopoutTabLocation(tabLocation)) return undefined;
    return state.popouts[tabLocation.popoutWidgetId] as HTMLElement;
  });
  return (
    // Theme providers are required to open floating/popover elements in a popout widget window (instead of a main window).
    <ThemeProvider
      portalContainer={popoutContainer ?? undefined}
      className="uifw-widgetPanels-content_themeProvider"
    >
      <ThemeProviderV2
        theme="inherit"
        className="uifw-widgetPanels-content_themeProviderV2"
      >
        <ScrollableWidgetContent itemId={itemId} providerId={providerId}>
          <ErrorBoundary FallbackComponent={WidgetFallback}>
            {widget?.reactNode}
          </ErrorBoundary>
        </ScrollableWidgetContent>
      </ThemeProviderV2>
    </ThemeProvider>
  );
}

/** @internal */
export function useWidgetDef(): WidgetDef | undefined {
  const tabId = React.useContext(TabIdContext);
  assert(!!tabId);

  const frontstage = useActiveFrontstageDef();
  const [widgetDef, setWidgetDef] = React.useState(() =>
    frontstage?.findWidgetDef(tabId)
  );

  React.useEffect(() => {
    return InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.addListener(
      (args) => {
        if (
          args.frontstageDef !== frontstage ||
          !frontstage ||
          frontstage.isStageClosing ||
          frontstage.isApplicationClosing
        )
          return;
        setWidgetDef(frontstage.findWidgetDef(tabId));
      }
    );
  }, [frontstage, tabId]);

  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setWidgetDef(frontstage?.findWidgetDef(tabId));
    });
  }, [frontstage, tabId]);

  return widgetDef;
}
