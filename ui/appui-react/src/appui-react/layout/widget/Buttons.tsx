/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { assert } from "@itwin/core-bentley";
import * as React from "react";
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
import { usePreviewFeatures } from "../../preview/PreviewFeatures";
import { MoreButton } from "../../preview/widget-action-dropdown/MoreButton";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab";

/** @internal */
export function TabBarButtons() {
  const isToolSettings = useIsToolSettingsTab();
  const isMainPanelWidget = useIsMainPanelWidget();

  const popoutToggle = usePopoutToggle();
  const maximizeToggle = useMaximizeToggle();
  const sendBack = useSendBack();
  const dock = isToolSettings;
  const horizontalPanelAlignButton = useHorizontalPanelAlignButton();
  const pinToggle = isMainPanelWidget;

  const buttons = [
    ...(popoutToggle ? [<PopoutToggle key="popout" />] : []),
    ...(maximizeToggle ? [<PreviewMaximizeToggle key="maximize" />] : []),
    ...(sendBack ? [<SendBack key="sendBack" />] : []),
    ...(dock ? [<Dock key="dock" />] : []),
    ...(horizontalPanelAlignButton
      ? [<PreviewHorizontalPanelAlignButton key="horizontalAlign" />]
      : []),
    ...(pinToggle ? [<PinToggle key="pin" />] : []),
  ];

  const { widgetActionDropdown } = usePreviewFeatures();
  const threshold = widgetActionDropdown?.threshold ?? Infinity;
  if (buttons.length > threshold) {
    return <MoreButton>{buttons}</MoreButton>;
  }
  return <div className="nz-widget-tabBarButtons">{buttons}</div>;
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
