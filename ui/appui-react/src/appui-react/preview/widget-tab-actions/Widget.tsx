/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Widget.scss";
import * as React from "react";
import { Tabs } from "@itwin/itwinui-react";
import {
  useActiveTabId,
  useWidgetContextValue,
  WidgetContext,
  WidgetIdContext,
} from "../../layout/widget/Widget.js";
import { useSafeContext } from "../../hooks/useSafeContext.js";
import { useLayout } from "../../layout/base/LayoutStore.js";
import { getWidgetState } from "../../layout/state/internal/WidgetStateHelpers.js";
import { TabIdContext } from "../../layout/widget/ContentRenderer.js";
import { useWidgetContentContainer } from "../../layout/widget/ContentContainer.js";
import { useTabInteractions } from "../../layout/widget/Tab.js";

/** @internal */
export function Widget() {
  const widgetId = useSafeContext(WidgetIdContext);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const activeTabId = useActiveTabId();
  const [widgetRef, value] = useWidgetContextValue();
  return (
    <WidgetContext.Provider value={value}>
      <Tabs.Wrapper
        className="uifw-preview-widgetTabActions-widget_wrapper"
        value={activeTabId}
        focusActivationMode="manual"
        ref={widgetRef}
      >
        <Tabs.TabList>
          {tabIds.map((tabId) => {
            return (
              <TabIdContext.Provider key={tabId} value={tabId}>
                <Tab />
              </TabIdContext.Provider>
            );
          })}
        </Tabs.TabList>

        <Tabs.Panel
          value={activeTabId}
          className="uifw-preview-widgetTabActions-widget_panel"
        >
          <PanelContent />
        </Tabs.Panel>
      </Tabs.Wrapper>
    </WidgetContext.Provider>
  );
}

function Tab() {
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  const ref = useTabInteractions({});
  return (
    <Tabs.Tab value={id} ref={ref}>
      <Tabs.TabLabel>{label}</Tabs.TabLabel>
    </Tabs.Tab>
  );
}

function PanelContent() {
  const ref = useWidgetContentContainer();
  return (
    <>
      <div ref={ref} />
    </>
  );
}
