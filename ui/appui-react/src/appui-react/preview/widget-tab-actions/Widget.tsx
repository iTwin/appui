/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Widget.scss";
import classnames from "classnames";
import * as React from "react";
import { IconButton, Tabs, VisuallyHidden } from "@itwin/itwinui-react";
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
import { useFloatingWidgetStyle } from "../../layout/widget/FloatingWidget.js";
import { useWidgetTabCloseAction } from "./useWidgetTabActions.js";
import { SvgCloseSmall } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../../layout/base/NineZone.js";
import { ConfigurableUiContext } from "../../configurableui/ConfigurableUiContent.js";
import { WidgetActions } from "../../layout/widget/WidgetActions.js";
import { useRefs } from "@itwin/core-react/internal";

const TabActionsContext = React.createContext<{
  focused: string | undefined;
  setFocused: (id: string | undefined) => void;
  hideTab: (id: string) => void;
  setTabElement: (id: string, element: HTMLElement | null) => void;
}>({
  focused: undefined,
  setFocused: () => {},
  hideTab: () => {},
  setTabElement: () => {},
});

interface WidgetProps {
  className?: string;
  style?: React.CSSProperties;
}

/** @internal */
export function Widget(props: WidgetProps) {
  const { className, ...rest } = props;
  const widgetId = useSafeContext(WidgetIdContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const activeTabId = useActiveTabId();
  const [widgetRef, value] = useWidgetContextValue();
  const [focused, setFocused] = React.useState<string | undefined>(undefined);
  const [tabs, setTabs] = React.useState<Map<string, HTMLElement | null>>(
    new Map(),
  );
  const hideTab = (id: string) => {
    setFocused(undefined);
    dispatch({
      type: "WIDGET_TAB_HIDE",
      id,
    });

    const tabIndex = tabIds.indexOf(id);
    const nextTabIndex =
      tabIndex + 1 > tabIds.length - 1 ? tabIndex - 1 : tabIndex + 1;

    if (nextTabIndex < 0) return;
    const nextTabId = tabIds[nextTabIndex];
    const tabEl = tabs.get(nextTabId);
    tabEl?.focus();
  };
  const setTabElement = React.useCallback(
    (id: string, element: HTMLElement | null) => {
      setTabs((prev) => new Map(prev).set(id, element));
    },
    [],
  );
  return (
    <WidgetContext.Provider value={value}>
      <TabActionsContext.Provider
        value={{ focused, setFocused, hideTab, setTabElement }}
      >
        <Tabs.Wrapper
          {...rest}
          className={classnames(
            "uifw-preview-widgetTabActions-widget_wrapper",
            className,
          )}
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

          <TabsActions />

          <Tabs.Panel
            value={activeTabId}
            className="uifw-preview-widgetTabActions-widget_panel"
          >
            <PanelContent />
          </Tabs.Panel>
        </Tabs.Wrapper>
      </TabActionsContext.Provider>
    </WidgetContext.Provider>
  );
}

function Tab() {
  const { setFocused, hideTab, setTabElement } =
    React.useContext(TabActionsContext);
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  const interactionsRef = useTabInteractions({});
  const closeAction = useWidgetTabCloseAction();
  const ref = useRefs(
    interactionsRef,
    React.useCallback(
      (el: HTMLElement | null) => {
        setTabElement(id, el);
      },
      [id, setTabElement],
    ),
  );
  return (
    <Tabs.Tab
      className="uifw-preview-widgetTabActions-widget_tab"
      value={id}
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Delete") {
          e.preventDefault();
          hideTab(id);
        }
      }}
      onFocus={() => {
        setFocused(id);
      }}
    >
      <Tabs.TabLabel>{label}</Tabs.TabLabel>
      {closeAction && <CloseTabAction />}
    </Tabs.Tab>
  );
}

function CloseTabAction() {
  const { focused, hideTab } = React.useContext(TabActionsContext);
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  return (
    <IconButton
      as={Tabs.TabIcon}
      className="uifw-preview-widgetTabActions-widget_action"
      styleType="borderless"
      size="small"
      label={`Close ${label}`}
      aria-hidden="true"
      onClick={() => {
        hideTab(id);
      }}
      data-_appui-focused={focused === id ? "true" : undefined}
    >
      <SvgCloseSmall />
    </IconButton>
  );
}

interface TabActionsButtonProps {
  id: string;
}

function TabActionsButton(props: TabActionsButtonProps) {
  const { id } = props;
  const { setFocused, hideTab } = React.useContext(TabActionsContext);
  const label = useLayout((state) => state.tabs[id].label);

  return (
    <VisuallyHidden
      as="span"
      className="uifw-preview-widgetTabActions-widget_actionsButton"
    >
      <IconButton
        onBlur={() => setFocused(undefined)}
        label={`Close ${label}`}
        styleType="borderless"
        size="small"
        onClick={() => {
          hideTab(id);
        }}
      >
        <SvgCloseSmall />
      </IconButton>
    </VisuallyHidden>
  );
}

function TabsActions() {
  const { widgetActions } = React.useContext(ConfigurableUiContext);
  const { focused } = React.useContext(TabActionsContext);
  return (
    <Tabs.Actions>
      {focused && <TabActionsButton id={focused} />}
      {widgetActions ?? <WidgetActions />}
    </Tabs.Actions>
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

/** @internal */
export function FloatingWidget() {
  const { style } = useFloatingWidgetStyle();
  return <Widget className="uifw-floating" style={style} />;
}
