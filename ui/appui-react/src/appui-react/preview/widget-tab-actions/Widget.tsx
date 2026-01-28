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
import { assert } from "@itwin/core-bentley";
import { useRefs } from "@itwin/core-react/internal";
import { IconButton, Tabs, VisuallyHidden } from "@itwin/itwinui-react";
import { SvgCloseSmall } from "@itwin/itwinui-icons-react";

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
import {
  useFloatingWidgetStyle,
  useIsDraggedWidget,
} from "../../layout/widget/FloatingWidget.js";
import { useWidgetTabCloseAction } from "./useWidgetTabActions.js";
import { NineZoneDispatchContext } from "../../layout/base/NineZone.js";
import { ConfigurableUiContext } from "../../configurableui/ConfigurableUiContent.js";
import { WidgetActions } from "../../layout/widget/WidgetActions.js";
import { TabTarget } from "../../layout/target/TabTarget.js";
import { TitleBarTarget } from "../../layout/target/TitleBarTarget.js";
import { WidgetTarget } from "../../layout/target/WidgetTarget.js";
import { WidgetOutline } from "../../layout/outline/WidgetOutline.js";
import { PanelSideContext } from "../../layout/widget-panels/Panel.js";
import { useDragWidgetHandle } from "../../layout/widget/TabBar.js";

const TabsContext = React.createContext<
  | {
      // Last focused tab, used to expose decorative actions to screen readers.
      actionTabId: string | undefined;
      setActionTabId: (id: string | undefined) => void;
      // Describes if the action should be anchored to the decorative action.
      anchored: boolean;
      setAnchored: (anchored: boolean) => void;
      hideTab: (id: string) => void;
      setTabElement: (id: string, element: HTMLElement | undefined) => void;
    }
  | undefined
>(undefined);

/** @internal */
export function Widget(props: React.ComponentProps<typeof Tabs.Wrapper>) {
  const widgetId = useSafeContext(WidgetIdContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const activeTabId = useActiveTabId();
  const [widgetRef, value] = useWidgetContextValue();
  const [actionTabId, setActionTabId] = React.useState<string | undefined>(
    undefined,
  );
  const [anchored, setAnchored] = React.useState(false);
  const tabElementsRef = React.useRef(
    new Map<string, HTMLElement | undefined>(),
  );
  const hideTab = React.useCallback(
    (id: string) => {
      setActionTabId(undefined);
      dispatch({
        type: "WIDGET_TAB_HIDE",
        id,
      });

      const tabIndex = tabIds.indexOf(id);
      const nextTabIndex =
        tabIndex + 1 > tabIds.length - 1 ? tabIndex - 1 : tabIndex + 1;

      if (nextTabIndex < 0) return;
      const nextTabId = tabIds[nextTabIndex];
      const tabEl = tabElementsRef.current.get(nextTabId);
      tabEl?.focus();
    },
    [dispatch, tabIds],
  );
  const setTabElement = React.useCallback(
    (id: string, element: HTMLElement | undefined) => {
      tabElementsRef.current.set(id, element);
    },
    [],
  );
  return (
    <WidgetContext.Provider value={value}>
      <TabsContext.Provider
        value={{
          actionTabId,
          setActionTabId,
          hideTab,
          setTabElement,
          anchored,
          setAnchored,
        }}
      >
        <Tabs.Wrapper
          {...props}
          className={classnames(
            "uifw-preview-widgetTabActions-widget_wrapper",
            props.className,
          )}
          value={activeTabId}
          focusActivationMode="manual"
          ref={widgetRef}
        >
          <WidgetHandle />
          <Tabs.TabList className="uifw-preview-widgetTabActions-widget_tabList">
            {tabIds.map((tabId) => {
              return (
                <TabIdContext.Provider key={tabId} value={tabId}>
                  <Tab />
                </TabIdContext.Provider>
              );
            })}
            <TitleBarTarget />
          </Tabs.TabList>

          <TabsActions />

          <Tabs.Panel
            value={activeTabId}
            className="uifw-preview-widgetTabActions-widget_panel"
          >
            <PanelContent />
          </Tabs.Panel>
        </Tabs.Wrapper>
      </TabsContext.Provider>
    </WidgetContext.Provider>
  );
}

function Tab() {
  const { setActionTabId, hideTab, setTabElement } =
    useSafeContext(TabsContext);
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  const closeAction = useWidgetTabCloseAction();
  const interactionsRef = useTabInteractions({});
  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      setTabElement(id, el ?? undefined);
    },
    [id, setTabElement],
  );
  return (
    <Tabs.Tab
      className="uifw-preview-widgetTabActions-widget_tab"
      value={id}
      ref={useRefs(ref, interactionsRef)}
      onKeyDown={(e) => {
        if (e.key === "Delete") {
          e.preventDefault();
          hideTab(id);
        }
      }}
      onFocus={() => {
        setActionTabId(id);
      }}
    >
      <Tabs.TabLabel>{label}</Tabs.TabLabel>
      {closeAction && <CloseTabDecoration />}
      <TabTarget />
    </Tabs.Tab>
  );
}

/**
 * Decorative button to close the tab.
 */
function CloseTabDecoration() {
  const { actionTabId, hideTab, setAnchored } = useSafeContext(TabsContext);
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const isActionTab = actionTabId === id;
  React.useEffect(() => {
    if (!isActionTab || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setAnchored(entry.isIntersecting);
      },
      { threshold: 1 },
    );
    observer.observe(ref.current);
    return () => {
      setAnchored(false);
      observer.disconnect();
    };
  }, [isActionTab, setAnchored]);
  return (
    <IconButton
      as={Tabs.TabIcon}
      className="uifw-preview-widgetTabActions-widget_decoration"
      styleType="borderless"
      size="small"
      label={`Close ${label}`}
      aria-hidden="true"
      onClick={() => {
        hideTab(id);
      }}
      data-_appui-action={isActionTab ? "true" : undefined}
      ref={ref}
    >
      <SvgCloseSmall />
    </IconButton>
  );
}

/**
 * Visually hidden button to expose decorative close action to screen readers.
 * The action is anchored to the respective decoration when decoration is visible.
 */
function CloseTabAction() {
  const { setActionTabId, hideTab, anchored, actionTabId } =
    useSafeContext(TabsContext);
  assert(!!actionTabId);
  const label = useLayout((state) => state.tabs[actionTabId].label);

  return (
    <VisuallyHidden
      as="span"
      className="uifw-preview-widgetTabActions-widget_action"
      data-_appui-anchor={anchored ? "true" : undefined}
    >
      <IconButton
        onBlur={() => setActionTabId(undefined)}
        label={`Close ${label}`}
        styleType="borderless"
        size="small"
        onClick={() => {
          hideTab(actionTabId);
        }}
      >
        <SvgCloseSmall />
      </IconButton>
    </VisuallyHidden>
  );
}

function TabsActions() {
  const { actionTabId } = useSafeContext(TabsContext);
  const widgetId = useSafeContext(WidgetIdContext);
  const { widgetActions } = React.useContext(ConfigurableUiContext);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const actionTab = tabIds.find((id) => id === actionTabId);
  return (
    <Tabs.Actions className="uifw-preview-widgetTabActions-widget_actions">
      {actionTab && <CloseTabAction />}
      {widgetActions ?? <WidgetActions />}
    </Tabs.Actions>
  );
}

function PanelContent() {
  const side = React.useContext(PanelSideContext);
  const ref = useWidgetContentContainer();
  const showTarget = useLayout((state) => {
    if (side) {
      const panel = state.panels[side];
      return panel.widgets.length > 1;
    }
    return true;
  });
  return (
    <>
      <div ref={ref} />
      {showTarget && <WidgetTarget />}
      <WidgetOutline />
    </>
  );
}

/** @internal */
export function FloatingWidget() {
  const { style } = useFloatingWidgetStyle();
  const dragged = useIsDraggedWidget();
  return (
    <Widget
      data-_appui-floating="true"
      data-_appui-dragged={dragged ? "true" : undefined}
      style={style}
    />
  );
}

function WidgetHandle() {
  const ref = useDragWidgetHandle();
  return (
    <div className="uifw-preview-widgetTabActions-widget_handle" ref={ref} />
  );
}
