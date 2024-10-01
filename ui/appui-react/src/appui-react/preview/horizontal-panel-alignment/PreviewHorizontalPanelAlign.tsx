/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { HorizontalAlignment } from "@itwin/core-react";
import { DropdownMenu, MenuItem } from "@itwin/itwinui-react";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../../layout/widget-panels/Panel.js";
import type {
  HorizontalPanelSide,
  PanelSide,
} from "../../layout/widget-panels/PanelTypes.js";
import { WidgetActionDropdownContext } from "../widget-action-dropdown/MoreButton.js";
import { TabBarButton } from "../../layout/widget/Button.js";
import { useMainPanelWidgetId } from "../../layout/widget/usePanelWidgetId.js";
import { useIsMaximizedWidget } from "../enable-maximized-widget/useMaximizedWidget.js";

/** Default value used when not provided or disabled. */
const defaultAlignments = {
  top: HorizontalAlignment.Justify, // eslint-disable-line deprecation/deprecation
  bottom: HorizontalAlignment.Justify, // eslint-disable-line deprecation/deprecation
};

/** @internal */
export const HorizontalPanelAlignContext = React.createContext<{
  enabled: boolean;
  alignments: {
    [side in HorizontalPanelSide]: HorizontalAlignment; // eslint-disable-line deprecation/deprecation
  };
  setAlignment: (
    panel: PanelSide | undefined,
    alignment: HorizontalAlignment // eslint-disable-line deprecation/deprecation
  ) => void;
}>({
  enabled: false,
  alignments: defaultAlignments,
  setAlignment: () => {},
});

/** Preview horizontal panel alignment feature provider.
 * @internal
 */
export function PreviewHorizontalPanelAlignFeatureProvider({
  enabled,
  children,
}: {
  enabled?: boolean;
  children?: React.ReactNode;
}) {
  const [alignments, setAlignments] = React.useState<{
    [x in HorizontalPanelSide]: HorizontalAlignment; // eslint-disable-line deprecation/deprecation
  }>({
    top: HorizontalAlignment.Justify, // eslint-disable-line deprecation/deprecation
    bottom: HorizontalAlignment.Justify, // eslint-disable-line deprecation/deprecation
  });
  const setAlignment = React.useCallback(
    // eslint-disable-next-line deprecation/deprecation
    (panel: PanelSide | undefined, alignment: HorizontalAlignment) => {
      if (!panel || !isHorizontalPanelSide(panel)) return;
      setAlignments((prev) => ({
        ...prev,
        [panel]: alignment,
      }));
    },
    []
  );
  return (
    <HorizontalPanelAlignContext.Provider
      value={{
        enabled: !!enabled,
        alignments: enabled ? alignments : defaultAlignments,
        setAlignment,
      }}
    >
      {children}
    </HorizontalPanelAlignContext.Provider>
  );
}

function SvgSide(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 16 16"
      fill="var(--iui-color-icon-muted, currentColor)"
      {...props}
    >
      <path d="M0 2v12h16V2H0Zm11 7H1V3h10v6Zm4 4h-3V3h3v10Z" />
    </svg>
  );
}

function SvgJustify(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 16 16"
      fill="var(--iui-color-icon-muted, currentColor)"
      {...props}
    >
      <path d="M0 2v12h16V2H0Zm4 7H1V3h3v6Zm1 0V3h6v6H5Zm10 0h-3V3h3v6Z" />
    </svg>
  );
}

function SvgCenter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 16 16"
      fill="var(--iui-color-icon-muted, currentColor)"
      {...props}
    >
      <path d="M0 2v12h16V2H0Zm4 11H1V3h3v10Zm1-4V3h6v6H5Zm10 4h-3V3h3v10Z" />
    </svg>
  );
}

// eslint-disable-next-line deprecation/deprecation
function getIcon(side: HorizontalPanelSide, alignment: HorizontalAlignment) {
  const scaleY = side === "top" ? "-1" : "1";
  // eslint-disable-next-line deprecation/deprecation
  if (alignment === HorizontalAlignment.Justify)
    return <SvgJustify transform={`scale(1, ${scaleY})`} />;
  // eslint-disable-next-line deprecation/deprecation
  if (alignment === HorizontalAlignment.Center)
    return <SvgCenter transform={`scale(1, ${scaleY})`} />;
  // eslint-disable-next-line deprecation/deprecation
  const scaleX = alignment === HorizontalAlignment.Left ? "1" : "-1";
  return <SvgSide transform={`scale(${scaleX}, ${scaleY})`} />;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** @internal */
export function PreviewHorizontalPanelAlignButton() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  assert(isHorizontalPanelSide(side));
  const { alignments, setAlignment } = React.useContext(
    HorizontalPanelAlignContext
  );
  const label = "Align panel";

  const getMenuItems = (onClose?: () => void) =>
    [
      HorizontalAlignment.Justify, // eslint-disable-line deprecation/deprecation
      HorizontalAlignment.Center, // eslint-disable-line deprecation/deprecation
      HorizontalAlignment.Left, // eslint-disable-line deprecation/deprecation
      HorizontalAlignment.Right, // eslint-disable-line deprecation/deprecation
    ].map((align) => {
      return (
        <MenuItem
          key={align}
          onClick={() => {
            setAlignment(side, align);
            onClose?.();
          }}
          icon={getIcon(side, align)}
          isSelected={alignments[side] === align}
        >
          {capitalize(align)}
        </MenuItem>
      );
    });
  const dropdownContext = React.useContext(WidgetActionDropdownContext);
  if (dropdownContext !== undefined) {
    return (
      <MenuItem
        icon={getIcon(side, alignments[side])}
        subMenuItems={getMenuItems(dropdownContext.onClose)}
      >
        {label}
      </MenuItem>
    );
  }
  return (
    <DropdownMenu menuItems={(close) => getMenuItems(close)}>
      <TabBarButton label={label}>
        {getIcon(side, alignments[side])}
      </TabBarButton>
    </DropdownMenu>
  );
}

/** @internal */
export function useHorizontalPanelAlignButton() {
  const side = React.useContext(PanelSideContext);
  const { enabled } = React.useContext(HorizontalPanelAlignContext);
  const isMainPanelWidget = !!useMainPanelWidgetId();
  const isMaximizedWidget = useIsMaximizedWidget();

  if (!side) return false;
  const isHorizontalPanel = isHorizontalPanelSide(side);
  return (
    enabled && isHorizontalPanel && isMainPanelWidget && !isMaximizedWidget
  );
}
