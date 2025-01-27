/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Tabs.scss";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { useResizeObserver } from "@itwin/core-react/internal";
import { ShowWidgetIconContext } from "../base/NineZone.js";
import { getChildKey, useOverflow } from "../tool-settings/Docked.js";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel.js";
import { WidgetOverflow } from "./Overflow.js";
import { WidgetTabProvider } from "./Tab.js";
import { TitleBarTarget } from "../target/TitleBarTarget.js";
import { useLayout } from "../base/LayoutStore.js";
import { WidgetIdContext } from "./Widget.js";
import { getWidgetState } from "../state/internal/WidgetStateHelpers.js";
import { Tabs } from "@itwin/itwinui-react";

/** @internal */
export function WidgetTabs() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  const showWidgetIcon = React.useContext(ShowWidgetIconContext);
  assert(!!widgetId);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const activeTabId = useLayout(
    (state) => getWidgetState(state, widgetId).activeTabId
  );
  const minimized = useLayout(
    (state) => getWidgetState(state, widgetId).minimized
  );
  const [showOnlyTabIcon, setShowOnlyTabIcon] = React.useState(false);

  const activeTabIndex = tabIds.findIndex((id) => id === activeTabId);
  const children = React.useMemo<React.ReactNode>(() => {
    return tabIds.map((id, index, array) => {
      const firstInactive = activeTabIndex + 1 === index;
      return (
        <WidgetTabProvider
          key={id}
          id={id}
          first={index === 0}
          firstInactive={firstInactive}
          last={index === array.length - 1}
          showOnlyTabIcon={showOnlyTabIcon && showWidgetIcon}
        />
      );
    });
  }, [tabIds, activeTabIndex, showOnlyTabIcon, showWidgetIcon]);
  const childrenKeys = React.Children.toArray(children).map((child, index) =>
    getChildKey(child, index)
  );
  const [overflown, handleResize, handleOverflowResize, handleEntryResize] =
    useOverflow(childrenKeys, activeTabIndex);
  const horizontal = side && isHorizontalPanelSide(side);
  const handleContainerResize = React.useCallback(
    (w: number) => {
      if (showWidgetIcon) setShowOnlyTabIcon(tabIds.length * 158 > w); // 158px per text tab
      handleResize && handleResize(w);
    },
    [handleResize, showWidgetIcon, tabIds]
  );

  const ref = useResizeObserver(handleContainerResize);
  const childrenArray = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );
  const tabChildren = childrenArray.reduce<Array<[string, React.ReactNode]>>(
    (acc, child, index) => {
      const key = getChildKey(child, index);
      if (!overflown) {
        acc.push([key, child]);
        return acc;
      }
      if (horizontal && minimized) return acc;
      overflown.indexOf(key) < 0 && acc.push([key, child]);
      return acc;
    },
    []
  );
  const panelChildren =
    tabChildren.length !== childrenArray.length
      ? childrenArray.map<[string, React.ReactNode]>((child, index) => {
          const key = getChildKey(child, index);
          return [key, child];
        })
      : [];
  return (
    <div className="nz-widget-tabs" ref={ref} role="tablist">
      <Tabs.TabList>
        {tabChildren.map(([key, child], index, array) => {
          return (
            <WidgetTabsEntryProvider
              children={child} // eslint-disable-line react/no-children-prop
              key={key}
              id={key}
              lastNotOverflown={
                index === array.length - 1 && panelChildren.length > 0
              }
              getOnResize={handleEntryResize}
            />
          );
        })}
      </Tabs.TabList>
      <TitleBarTarget />
      <WidgetOverflow
        hidden={overflown && panelChildren.length === 0}
        onResize={handleOverflowResize}
      >
        {panelChildren.map(([key, child]) => {
          return <React.Fragment key={key}>{child}</React.Fragment>;
        })}
      </WidgetOverflow>
    </div>
  );
}

interface WidgetTabsEntryContextArgs {
  readonly lastNotOverflown: boolean;
  readonly onResize?: (w: number) => void;
}

/** @internal */
export const WidgetTabsEntryContext = React.createContext<
  WidgetTabsEntryContextArgs | undefined
>(undefined);
WidgetTabsEntryContext.displayName = "nz:WidgetTabsEntryContext";

/** @internal */
export interface WidgetTabsEntryContextProviderProps {
  children?: React.ReactNode;
  id: string;
  getOnResize: (id: string) => (w: number) => void;
  lastNotOverflown: boolean;
}

/** @internal */
export function WidgetTabsEntryProvider(
  props: WidgetTabsEntryContextProviderProps
) {
  return (
    <WidgetTabsEntryContext.Provider
      value={{
        lastNotOverflown: props.lastNotOverflown,
        onResize: props.getOnResize(props.id),
      }}
    >
      {props.children}
    </WidgetTabsEntryContext.Provider>
  );
}
