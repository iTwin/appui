/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { Tabs } from "@itwin/itwinui-react";
import { WidgetIdContext } from "../../layout/widget/Widget.js";
import { useSafeContext } from "../../hooks/useSafeContext.js";
import { useLayout } from "../../layout/base/LayoutStore.js";
import { getWidgetState } from "../../layout/state/internal/WidgetStateHelpers.js";
import { TabIdContext } from "../../layout/widget/ContentRenderer.js";

/** @internal */
export function Widget() {
  const widgetId = useSafeContext(WidgetIdContext);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const [value, setValue] = React.useState(tabIds[0]);
  return (
    <Tabs.Wrapper
      value={value}
      onValueChange={setValue}
      focusActivationMode="manual"
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

      <Tabs.Panel value={value}>Content of {value}</Tabs.Panel>
    </Tabs.Wrapper>
  );
}

function Tab() {
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  return (
    <Tabs.Tab value={id}>
      <Tabs.TabLabel>{label}</Tabs.TabLabel>
    </Tabs.Tab>
  );
}
