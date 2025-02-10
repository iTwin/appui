/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { Dock, useDock } from "./Dock.js";
import { PinToggle, usePinToggle } from "./PinToggle.js";
import { PopoutToggle, usePopoutToggle } from "./PopoutToggle.js";
import {
  PreviewHorizontalPanelAlignButton,
  useHorizontalPanelAlignButton,
} from "../../preview/horizontal-panel-alignment/PreviewHorizontalPanelAlign.js";
import { SendBack, useSendBack } from "./SendBack.js";
import {
  MoreButton,
  useDropdownFeatures,
} from "../../preview/widget-action-dropdown/MoreButton.js";
import {
  MaximizeToggle,
  useMaximizeToggle,
} from "../../preview/enable-maximized-widget/MaximizeToggle.js";
import {
  CloseWidgetButton,
  useCloseTab,
} from "../../preview/control-widget-visibility/CloseWidgetButton.js";
import {
  AddWidgetButton,
  useAddTab,
} from "../../preview/control-widget-visibility/AddWidgetButton.js";

/** @internal */
export type WidgetFeature =
  | "popout"
  | "maximize"
  | "sendBack"
  | "dock"
  | "horizontalAlign"
  | "pin"
  | "closeWidget"
  | "addWidget";

/** @internal */
export function TabBarButtons() {
  const features = useWidgetFeatures();
  const [sortedFeatures, isDropdown] = useDropdownFeatures(features);

  const buttons = sortedFeatures.map((feature) => {
    switch (feature) {
      case "popout":
        return <PopoutToggle key="popout" />;
      case "maximize":
        return <MaximizeToggle key="maximize" />;
      case "sendBack":
        return <SendBack key="sendBack" />;
      case "dock":
        return <Dock key="dock" />;
      case "horizontalAlign":
        return <PreviewHorizontalPanelAlignButton key="horizontalAlign" />;
      case "pin":
        return <PinToggle key="pin" />;
      case "closeWidget":
        return <CloseWidgetButton key="closeWidget" />;
      case "addWidget":
        return <AddWidgetButton key="addWidget" />;
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
export function useWidgetFeatures(): WidgetFeature[] {
  const popoutToggle = usePopoutToggle();
  const maximizeToggle = useMaximizeToggle();
  const sendBack = useSendBack();
  const dock = useDock();
  const horizontalPanelAlignButton = useHorizontalPanelAlignButton();
  const pinToggle = usePinToggle();
  const closeTab = useCloseTab();
  const addTab = useAddTab();
  return [
    ...(addTab ? (["addWidget"] as const) : []),
    ...(closeTab ? (["closeWidget"] as const) : []),
    ...(popoutToggle ? (["popout"] as const) : []),
    ...(maximizeToggle ? (["maximize"] as const) : []),
    ...(sendBack ? (["sendBack"] as const) : []),
    ...(dock ? (["dock"] as const) : []),
    ...(horizontalPanelAlignButton ? (["horizontalAlign"] as const) : []),
    ...(pinToggle ? (["pin"] as const) : []),
  ];
}
