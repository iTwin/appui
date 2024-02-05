/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { useLayout } from "../base/LayoutStore";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel";
import { Dock } from "./Dock";
import { PinToggle } from "./PinToggle";
import { PopoutToggle, usePopoutToggle } from "./PopoutToggle";
import {
  PreviewHorizontalPanelAlignButton,
  useHorizontalPanelAlignButton,
} from "./PreviewHorizontalPanelAlign";
import {
  PreviewMaximizeToggle,
  useMaximizeToggle,
} from "./PreviewMaximizeToggle";
import { SendBack, useSendBack } from "./SendBack";
import { WidgetIdContext } from "./Widget";
import {
  MoreButton,
  useDropdownFeatures,
} from "../../preview/widget-action-dropdown/MoreButton";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab";
import "./Buttons.scss";

/** @internal */
export function TabBarButtons() {
  const features = useWidgetFeatures();
  const [sortedFeatures, isDropdown] = useDropdownFeatures(features);

  const buttons = sortedFeatures.map((feature) => {
    switch (feature) {
      case "popout":
        return <PopoutToggle key="popout" />;
      case "maximize":
        return <PreviewMaximizeToggle key="maximize" />;
      case "sendBack":
        return <SendBack key="sendBack" />;
      case "dock":
        return <Dock key="dock" />;
      case "horizontalAlign":
        return <PreviewHorizontalPanelAlignButton key="horizontalAlign" />;
      case "pin":
        return <PinToggle key="pin" />;
    }
    return undefined;
  });

  return (
    <div className="nz-widget-buttons">
      {isDropdown ? <MoreButton>{buttons}</MoreButton> : buttons}
    </div>
  );
}

/** @internal */
export function useWidgetFeatures() {
  const isToolSettings = useIsToolSettingsTab();
  const isMainPanelWidget = useIsMainPanelWidget();

  const popoutToggle = usePopoutToggle();
  const maximizeToggle = useMaximizeToggle();
  const sendBack = useSendBack();
  const dock = isToolSettings;
  const horizontalPanelAlignButton = useHorizontalPanelAlignButton();
  const pinToggle = isMainPanelWidget;

  return [
    ...(popoutToggle ? (["popout"] as const) : []),
    ...(maximizeToggle ? (["maximize"] as const) : []),
    ...(sendBack ? (["sendBack"] as const) : []),
    ...(dock ? (["dock"] as const) : []),
    ...(horizontalPanelAlignButton ? (["horizontalAlign"] as const) : []),
    ...(pinToggle ? (["pin"] as const) : []),
  ];
}

/** @internal */
export function useIsMainPanelWidget() {
  const side = React.useContext(PanelSideContext);
  const widgetId = React.useContext(WidgetIdContext);
  return useLayout((state) => {
    const widgets = side ? state.panels[side].widgets : undefined;
    if (!widgets) return false;
    assert(!!side);
    const mainWidget = isHorizontalPanelSide(side)
      ? widgets[widgets.length - 1]
      : widgets[0];
    return mainWidget === widgetId;
  });
}
