/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { DropdownMenu } from "@itwin/itwinui-react";
import { TabBarButton } from "../../layout/widget/Button";
import { usePreviewFeatures } from "../PreviewFeatures";
import { useLayout } from "../../layout/base/LayoutStore";
import { PanelSideContext } from "../../layout/widget-panels/Panel";

/** @internal */
export function MoreButton(props: React.PropsWithChildren<{}>) {
  return (
    <DropdownMenu
      placement="bottom-end"
      menuItems={(onClose) => [
        <WidgetActionDropdownContext.Provider key={0} value={{ onClose }}>
          <CloseOnPanelCollapse />
          {props.children}
        </WidgetActionDropdownContext.Provider>,
      ]}
    >
      {/* TODO: offset is not available for DropdownMenu */}
      <div style={{ height: "100%", display: "flex", marginInline: "0.25em" }}>
        <TabBarButton label="More actions">
          <SvgMoreVertical />
        </TabBarButton>
      </div>
    </DropdownMenu>
  );
}

/** @internal */
export const WidgetActionDropdownContext = React.createContext<
  | undefined
  | {
      onClose: () => void;
    }
>(undefined);

function CloseOnPanelCollapse() {
  const context = React.useContext(WidgetActionDropdownContext);
  assert(!!context);
  const side = React.useContext(PanelSideContext);

  const { onClose } = context;
  const collapsed = useLayout((state) => {
    if (!side) return false;
    return state.panels[side].collapsed;
  });
  React.useEffect(() => {
    if (collapsed) onClose();
  }, [collapsed, onClose]);
  return null;
}

const order = [
  "pin",
  "maximize",
  "popout",
  "horizontalAlign",
  "dock",
  "sendBack",
];

/** @internal */
export function useDropdownFeatures(buttons: string[]) {
  const { widgetActionDropdown } = usePreviewFeatures();
  const threshold = widgetActionDropdown?.threshold ?? Infinity;
  const isDropdown = buttons.length > threshold;
  if (!isDropdown) return [buttons, false] as const;
  const sorted = [...buttons].sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );
  return [sorted, true] as const;
}
