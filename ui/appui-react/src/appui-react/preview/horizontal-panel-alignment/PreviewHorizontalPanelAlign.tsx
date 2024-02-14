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
} from "../../layout/widget-panels/Panel";
import type {
  HorizontalPanelSide,
  PanelSide,
} from "../../layout/widget-panels/PanelTypes";
import { WidgetActionDropdownContext } from "../widget-action-dropdown/MoreButton";
import { TabBarButton } from "../../layout/widget/Button";
import { useIsMainPanelWidget } from "../../layout/widget/useIsMainPanelWidget";

/** Default value used when not provided or disabled. */
const defaultAlignments = {
  top: HorizontalAlignment.Justify,
  bottom: HorizontalAlignment.Justify,
};

/** @internal */
export const HorizontalPanelAlignContext = React.createContext<{
  enabled: boolean;
  alignments: {
    [side in HorizontalPanelSide]: HorizontalAlignment;
  };
  setAlignment: (
    panel: PanelSide | undefined,
    alignment: HorizontalAlignment
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
    [x in HorizontalPanelSide]: HorizontalAlignment;
  }>({
    top: HorizontalAlignment.Justify,
    bottom: HorizontalAlignment.Justify,
  });
  const setAlignment = React.useCallback(
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

function getIcon(side: HorizontalPanelSide, alignment: HorizontalAlignment) {
  const scaleY = side === "top" ? "-1" : "1";
  if (alignment === HorizontalAlignment.Justify)
    return <SvgJustify transform={`scale(1, ${scaleY})`} />;
  if (alignment === HorizontalAlignment.Center)
    return <SvgCenter transform={`scale(1, ${scaleY})`} />;
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
  const title = "Align panel";

  const getMenuItems = (onClose?: () => void) =>
    [
      HorizontalAlignment.Justify,
      HorizontalAlignment.Center,
      HorizontalAlignment.Left,
      HorizontalAlignment.Right,
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
        subMenuItems={getMenuItems()}
      >
        {title}
      </MenuItem>
    );
  }
  return (
    <DropdownMenu menuItems={(close) => getMenuItems(close)}>
      <TabBarButton title={title}>
        {getIcon(side, alignments[side])}
      </TabBarButton>
    </DropdownMenu>
  );
}

/** @internal */
export function useHorizontalPanelAlignButton() {
  const side = React.useContext(PanelSideContext);
  const { enabled } = React.useContext(HorizontalPanelAlignContext);
  const isMainPanelWidget = useIsMainPanelWidget();

  return !!(
    enabled &&
    side &&
    isHorizontalPanelSide(side) &&
    isMainPanelWidget
  );
}
