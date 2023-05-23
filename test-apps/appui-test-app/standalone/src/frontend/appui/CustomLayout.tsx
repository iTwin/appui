/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import "@itwin/core-react";
import styles from "./CustomLayout.module.scss";
import { NineZone, NineZoneStateReducer, PanelSideContext, WidgetContentRenderers, WidgetPanel, createLayoutStore } from "@itwin/appui-layout-react";
import { ThemeManager, ViewToolWidgetComposer, WidgetContent, initializeNineZoneState, useActiveFrontstageDef } from "@itwin/appui-react";
import { ViewportComponent } from "@itwin/imodel-components-react";
import { createBlankConnection, createBlankViewState } from "./BlankConnection";
import { useHandleURLParams } from "../UrlParams";
import { SampleAppIModelApp } from "..";
import { Provider } from "react-redux";

export function CustomLayout() {
  useHandleURLParams();
  const [layout] = React.useState(() => createLayoutStore());
  const frontstageDef = useActiveFrontstageDef();
  React.useEffect(() => {
    if (!frontstageDef)
      return;
    const state = initializeNineZoneState(frontstageDef);
    layout.setState(state);
  }, [frontstageDef]);
  const widgetContent = React.useMemo(() => <WidgetContent />, []);
  return (
    <Provider store={SampleAppIModelApp.store}>
      <ThemeManager>
        <NineZone
          dispatch={(action) => {
            layout.setState((prev) => {
              return NineZoneStateReducer(prev, action);
            });
          }}
          layout={layout}
          widgetContent={widgetContent}
        >
          <div className={styles.page}>
            <Viewport />
            <Tools />
            <SidePanel />
          </div>
          <WidgetContentRenderers />
        </NineZone>
      </ThemeManager>
    </Provider>
  );
}

export function Tools() {
  return (
    <div className={styles.tools}>
      <ViewToolWidgetComposer />
    </div>
  );
}

export function Viewport() {
  const [iModel] = React.useState(() => createBlankConnection());
  const [viewState] = React.useState(() => createBlankViewState(iModel));
  return (
    <div
      className={styles.content}
    >
      <ViewportComponent
        imodel={iModel}
        viewState={viewState}
      />
    </div>
  );
}

export function SidePanel() {
  return (
    <PanelSideContext.Provider value="right">
      <div className={styles.sidePanel}>
        <WidgetPanel className={styles.panel} />
      </div>
    </PanelSideContext.Provider>
  )
}
