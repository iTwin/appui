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
import { IconButton, Tabs } from "@itwin/itwinui-react";
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

interface WidgetProps {
  className?: string;
  style?: React.CSSProperties;
}

/** @internal */
export function Widget(props: WidgetProps) {
  const { className, ...rest } = props;
  const widgetId = useSafeContext(WidgetIdContext);
  const tabIds = useLayout((state) => getWidgetState(state, widgetId).tabs);
  const activeTabId = useActiveTabId();
  const [widgetRef, value] = useWidgetContextValue();
  return (
    <WidgetContext.Provider value={value}>
      <Tabs.Wrapper
        {...rest}
        className={classnames(
          "uifw-preview-widgetTabActions-widget_wrapper",
          className
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
  const closeAction = useWidgetTabCloseAction();
  return (
    <Tabs.Tab
      className="uifw-preview-widgetTabActions-widget_tab"
      value={id}
      ref={ref}
    >
      <Tabs.TabLabel>{label}</Tabs.TabLabel>
      {closeAction && <CloseTabAction label={label} />}
    </Tabs.Tab>
  );
}

interface CloseTabActionProps {
  label: string;
}

function CloseTabAction(props: CloseTabActionProps) {
  const id = useSafeContext(TabIdContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  return (
    <IconButton
      as={Tabs.TabIcon}
      className="uifw-preview-widgetTabActions-widget_action"
      styleType="borderless"
      size="small"
      label={`Close ${props.label}`}
      aria-hidden="true"
      onClick={() => {
        dispatch({
          type: "WIDGET_TAB_HIDE",
          id,
        });
      }}
    >
      <SvgCloseSmall />
    </IconButton>
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
