/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./Buttons.scss";
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

const widgetActions = {
  popout: PopoutToggle,
  sendBack: SendBack,
  dock: Dock,
  pin: PinToggle,
  maximize: MaximizeToggle,
  horizontalAlign: PreviewHorizontalPanelAlignButton,
  closeWidget: CloseWidgetButton,
  addWidget: AddWidgetButton,
};

type WidgetActionId = keyof typeof widgetActions;

interface WidgetAction {
  id: WidgetActionId | (string & {});
  action: React.ComponentType;
}

interface TabBarButtonsProps {
  actions?: (defaultActions: WidgetAction[]) => WidgetAction[];
}

/** @internal */
export type WidgetFeature = WidgetActionId;

/** @internal */
export function TabBarButtons(props: TabBarButtonsProps) {
  const { actions } = props;
  const features = useWidgetFeatures();
  const [sortedFeatures, isDropdown] = useDropdownFeatures(features);
  const finalActions = React.useMemo(() => {
    const knownActions = sortedFeatures.map((feature) => ({
      id: feature,
      action: widgetActions[feature],
    }));
    if (!actions) return knownActions;
    return actions(knownActions);
  }, [sortedFeatures, actions]);

  const buttons = finalActions.map(({ id, action: Action }) => {
    return <Action key={id} />;
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
