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
  useDragPanelWidget,
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
  FloatingWidgetHandle,
  useFloatingWidget,
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
import { useBorders } from "../../layout/widget/PanelWidget.js";
import { useTranslation } from "../../hooks/useTranslation.js";

const TabsContext = React.createContext<
  | {
      // Last focused tab, used to expose decorative actions to screen readers.
      actionTabId: string | undefined;
      setActionTabId: (id: string | undefined) => void;
      // Describes if the action should be anchored to the decorative tab action.
      anchored: boolean;
      setAnchored: (anchored: boolean) => void;
      hideTab: (id: string) => void;
      setTabElement: (id: string, element: HTMLElement | undefined) => void;
      // Describes if the tab action is focused.
      actionFocused: boolean;
      setActionFocused: (focused: boolean) => void;
      // Track focused tab to focus the action (skips focus of active tab)
      focusedTabId: string | undefined;
      setFocusedTabId: (id: string | undefined) => void;
    }
  | undefined
>(undefined);

type WidgetProps = React.ComponentProps<typeof Tabs.Wrapper> & {
  minimized?: boolean;
  handles?: React.ReactNode;
};

const Widget = React.forwardRef<HTMLElement, WidgetProps>(
  (props, forwardedRef) => {
    const { handles, minimized, ...rest } = props;
    const widgetId = useSafeContext(WidgetIdContext);
    const dispatch = React.useContext(NineZoneDispatchContext);
    const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
    const activeTabId = useActiveTabId();
    const [actionTabId, setActionTabId] = React.useState<string | undefined>(
      undefined
    );
    const [focusedTabId, setFocusedTabId] = React.useState<string | undefined>(
      undefined
    );
    const [anchored, setAnchored] = React.useState(false);
    const [actionFocused, setActionFocused] = React.useState(false);
    const tabElementsRef = React.useRef(
      new Map<string, HTMLElement | undefined>()
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
      [dispatch, tabIds]
    );
    const setTabElement = React.useCallback(
      (id: string, element: HTMLElement | undefined) => {
        tabElementsRef.current.set(id, element);
      },
      []
    );

    const [widgetRef, value] = useWidgetContextValue();
    const ref = useRefs(forwardedRef, widgetRef);
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
            actionFocused,
            setActionFocused,
            focusedTabId,
            setFocusedTabId,
          }}
        >
          <Tabs.Wrapper
            {...rest}
            className={classnames(
              "uifw-preview-widgetTabActions-widget_wrapper",
              props.className
            )}
            value={minimized ? "" : activeTabId}
            focusActivationMode="manual"
            ref={ref}
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
            </Tabs.TabList>

            <TabsActions />

            <Tabs.Panel
              value={activeTabId}
              className="uifw-preview-widgetTabActions-widget_panel"
            >
              <PanelContent />
            </Tabs.Panel>

            {handles}
          </Tabs.Wrapper>
        </TabsContext.Provider>
      </WidgetContext.Provider>
    );
  }
);
Widget.displayName = "Widget";

function Tab() {
  const {
    actionTabId,
    actionFocused,
    setActionTabId,
    hideTab,
    setTabElement,
    focusedTabId,
    setFocusedTabId,
  } = useSafeContext(TabsContext);
  const id = useSafeContext(TabIdContext);
  const label = useLayout((state) => state.tabs[id].label);
  const closeAction = useWidgetTabCloseAction(id);
  const interactionsRef = useTabInteractions({});
  const ref = React.useCallback(
    (el: HTMLElement | null) => {
      setTabElement(id, el ?? undefined);
    },
    [id, setTabElement]
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
        setFocusedTabId(id);
      }}
      onBlur={() => {
        setFocusedTabId(undefined);
      }}
      data-_appui-mask={
        id === actionTabId && actionFocused ? "true" : undefined
      }
      data-_appui-decoration={closeAction ? "true" : undefined}
      {...(!!focusedTabId
        ? {
            tabIndex: -1,
          }
        : undefined)}
    >
      <Tabs.TabLabel className="uifw-preview-widgetTabActions-widget_label">
        {label}
      </Tabs.TabLabel>
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
      { threshold: 1 }
    );
    observer.observe(ref.current);
    return () => {
      setAnchored(false);
      observer.disconnect();
    };
  }, [isActionTab, setAnchored]);

  const { translate } = useTranslation();
  const closeLabel = translate("dialog.close");
  return (
    <IconButton
      as={Tabs.TabIcon}
      className="uifw-preview-widgetTabActions-widget_decoration"
      styleType="borderless"
      size="small"
      label={`${closeLabel} ${label}`}
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
  const { setActionTabId, hideTab, anchored, actionTabId, setActionFocused } =
    useSafeContext(TabsContext);
  assert(!!actionTabId);
  const label = useLayout((state) => state.tabs[actionTabId].label);
  const closeAction = useWidgetTabCloseAction(actionTabId);

  const { translate } = useTranslation();
  const closeLabel = translate("dialog.close");

  if (!closeAction) return null;
  return (
    <VisuallyHidden
      as="span"
      className="uifw-preview-widgetTabActions-widget_action"
      data-_appui-anchor={anchored ? "true" : undefined}
    >
      <IconButton
        onFocus={() => setActionFocused(true)}
        onBlur={() => {
          setActionTabId(undefined);
          setActionFocused(false);
        }}
        label={`${closeLabel} ${label}`}
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
    <Tabs.Actions
      className="uifw-preview-widgetTabActions-widget_actions"
      wrapperProps={{
        className: "uifw-preview-widgetTabActions-widget_actionsWrapper",
      }}
    >
      <TitleBarTarget className="uifw-preview-widgetTabActions-widget_titleBarTarget" />
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
      <div className="uifw-preview-widgetTabActions-widget_content" ref={ref} />
      {showTarget && <WidgetTarget />}
      <WidgetOutline />
    </>
  );
}

function WidgetHandle() {
  const ref = useDragWidgetHandle();
  return (
    <div className="uifw-preview-widgetTabActions-widget_handle" ref={ref} />
  );
}

/** @internal */
export function PanelWidget() {
  const widgetId = useSafeContext(WidgetIdContext);
  const widgetRef = useDragPanelWidget();
  const borders = useBorders(widgetId);
  return (
    <Widget
      className={classnames(
        "uifw-preview-widgetTabActions-widget_panelWidget",
        borders
      )}
      ref={widgetRef}
    />
  );
}

/** @internal */
export function FloatingWidget() {
  const {
    ref,
    style,
    hidden,
    minimized,
    resizable,
    dragged,
    isToolSettingsTab,
    maximizedWidget,
  } = useFloatingWidget();
  return (
    <Widget
      className={classnames(
        "uifw-preview-widgetTabActions-widget_floating",
        maximizedWidget.classNames
      )}
      handles={resizable ? <ResizeHandles /> : undefined}
      minimized={minimized}
      data-_appui-dragged={dragged ? "true" : undefined}
      data-_appui-hidden={hidden ? "true" : undefined}
      data-_appui-minimized={minimized ? "true" : undefined}
      data-_appui-tool-settings={isToolSettingsTab ? "true" : undefined}
      style={style}
      ref={ref}
    />
  );
}

function ResizeHandle(
  props: Pick<React.ComponentProps<typeof FloatingWidgetHandle>, "handle">
) {
  return (
    <FloatingWidgetHandle
      {...props}
      className="uifw-preview-widgetTabActions-widget_resizeHandle"
    />
  );
}

function ResizeHandles() {
  return (
    <>
      <ResizeHandle handle="left" />
      <ResizeHandle handle="top" />
      <ResizeHandle handle="right" />
      <ResizeHandle handle="bottom" />
      <ResizeHandle handle="topLeft" />
      <ResizeHandle handle="topRight" />
      <ResizeHandle handle="bottomLeft" />
      <ResizeHandle handle="bottomRight" />
    </>
  );
}
