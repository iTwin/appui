/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */
import { assert } from "@itwin/core-bentley";
import { SvgError } from "@itwin/itwinui-illustrations-react";
import { NonIdealState } from "@itwin/itwinui-react";
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
import { PopoutThemeProvider } from "../preview/reparent-popout-widgets/PopoutThemeProvider";

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

  return (
    <PopoutThemeProvider>
      <ScrollableWidgetContent itemId={itemId} providerId={providerId}>
        <ErrorBoundary FallbackComponent={WidgetFallback}>
          {widget?.reactNode}
        </ErrorBoundary>
      </ScrollableWidgetContent>
    </PopoutThemeProvider>
  );
}

/** @internal */
export function useWidgetDef(id?: WidgetDef["id"]): WidgetDef | undefined {
  const frontstage = useActiveFrontstageDef();
  const context = React.useContext(TabIdContext);
  const tabId = id ?? context;
  assert(!!tabId);
  const [widgetDef, setWidgetDef] = React.useState(() =>
    frontstage?.findWidgetDef(tabId)
  );

  const [prevTabId, setPrevTabId] = React.useState(tabId);
  if (prevTabId !== tabId) {
    setPrevTabId(tabId);
    setWidgetDef(frontstage?.findWidgetDef(tabId));
  }

  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setWidgetDef(frontstage?.findWidgetDef(tabId));
    });
  }, [frontstage, tabId]);

  return widgetDef?.id === tabId ? widgetDef : undefined;
}
