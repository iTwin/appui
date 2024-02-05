/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { SvgMoreVertical } from "@itwin/itwinui-icons-react";
import { DropdownMenu } from "@itwin/itwinui-react";
import { TabBarButton } from "../../layout/widget/Button";
import { usePreviewFeatures } from "../PreviewFeatures";

/** @internal */
export function MoreButton(props: React.PropsWithChildren<{}>) {
  return (
    <DropdownMenu
      placement="bottom-end"
      menuItems={(onClose) => [
        <WidgetActionDropdownContext.Provider key={0} value={{ onClose }}>
          {props.children}
        </WidgetActionDropdownContext.Provider>,
      ]}
      offset={[0, 2]}
    >
      <TabBarButton label="More actions" style={{ marginInline: "0.25em" }}>
        <SvgMoreVertical />
      </TabBarButton>
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
  return [sorted, isDropdown] as const;
}
