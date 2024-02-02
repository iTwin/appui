/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { assert } from "@itwin/core-bentley";
import { HorizontalAlignment } from "@itwin/core-react";
import { Button, DropdownMenu, MenuItem } from "@itwin/itwinui-react";
import * as React from "react";
import {
  isHorizontalPanelSide,
  PanelSideContext,
} from "../widget-panels/Panel";
import type {
  HorizontalPanelSide,
  PanelSide,
} from "../widget-panels/PanelTypes";

/** default value used when not provided or disabled */
const defaultAlignments = {
  top: HorizontalAlignment.Justify,
  bottom: HorizontalAlignment.Justify,
};

const HorizontalPanelAlignContext = React.createContext<{
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

/** Horizontal panel alignment preview feature state.
 * @internal
 */
export function usePreviewHorizontalPanelAlign() {
  return React.useContext(HorizontalPanelAlignContext);
}

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
  const { enabled, alignments, setAlignment } =
    usePreviewHorizontalPanelAlign();

  if (!enabled || !isHorizontalPanelSide(side)) return null;
  return (
    <DropdownMenu
      menuItems={(close) =>
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
                close();
              }}
              icon={getIcon(side, align)}
              isSelected={alignments[side] === align}
            >
              {capitalize(align)}
            </MenuItem>
          );
        })
      }
    >
      <Button size="small" styleType="borderless" title={"Align panel"}>
        {getIcon(side, alignments[side])}
      </Button>
    </DropdownMenu>
  );
}
