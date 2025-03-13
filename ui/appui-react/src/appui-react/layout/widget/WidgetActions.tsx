/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./WidgetActions.scss";
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
  useDropdownActions,
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
import type { StandardLayout } from "../../configurableui/ConfigurableUiContent.js";
import type { WidgetAction } from "./WidgetAction.js";

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

/** @internal */
export type WidgetActionId = keyof typeof widgetActions;

interface WidgetActionSpec {
  id: WidgetActionId | (string & {});
  action: React.ComponentType;
}

interface WidgetActionsProps {
  /** Function to modify the default widget actions.
   * Use {@link WidgetAction} component when adding new widget actions.
   */
  modifyActions?: (defaultActions: WidgetActionSpec[]) => WidgetActionSpec[];
}

/**
 * Renders widget actions in the widget title bar.
 * Should be used in `widgetActions` prop of {@link StandardLayout} component.
 * @alpha
 */
export function WidgetActions(props: WidgetActionsProps) {
  const { modifyActions } = props;
  const defaultActions = useWidgetActions();
  const [dropdownActions, isDropdown] = useDropdownActions(defaultActions);
  const finalActions = React.useMemo(() => {
    const knownActions = dropdownActions.map((feature) => ({
      id: feature,
      action: widgetActions[feature],
    }));
    if (!modifyActions) return knownActions;
    return modifyActions(knownActions);
  }, [dropdownActions, modifyActions]);

  const buttons = finalActions.map(({ id, action: Action }) => {
    return <Action key={id} />;
  });

  return (
    <div className="nz-widget-widgetActions">
      {isDropdown ? <MoreButton>{buttons}</MoreButton> : buttons}
    </div>
  );
}

/** @internal */
export function useWidgetActions(): WidgetActionId[] {
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
