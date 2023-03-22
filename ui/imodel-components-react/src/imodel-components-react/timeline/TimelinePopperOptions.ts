/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { DropdownMenuProps } from "@itwin/itwinui-react";

type Options = Required<DropdownMenuProps>["popperOptions"];
type Modifier = Required<Options>["modifiers"][0];

/**
 * Applies a specific class to the popper object so we can target it with CSS
 * With it, we make it max-height to the viewport, and make all the inner elements
 * display:flex and the iui-menu overflow:auto so the menu correctly have a scrollbar.
 */
const applyMaxClass: Modifier = {
  name: "applyMaxClass",
  enabled: true,
  phase: "beforeWrite",
  fn({ state }) {
    state.attributes.popper.class = "timeline-component-max-sized-scrolling-menu";
  },
};

/**
 * Ensure that the top of the popper will not go over the top of the document.
 */
const computeStyles: Modifier = {
  name: "computeStyles",
  options: {
    roundOffsets: ({ x, y }: { x: number, y: number }) => ({
      x,
      y: Math.max(y, 0),
    }),
  },
};

/**
 * Allow the popper to go below the reference element and use as much space as needed.
 */
const preventOverflow: Modifier = {
  name: "preventOverflow",
  options: {
    altAxis: true,
  },
};

/**
 * When the timeline is no longer visible, hide the popper.
 * (Handle edge cases where the screen would be really too small to work anyway)
 */
const hide: Modifier = {
  name: "hide",
};

/**
 * Modify the menu so it takes as much space as it needs, up to the total
 * height of the document. Hide when the component is not visible.
 */
export const maxSizeModifiers: Options["modifiers"] = [hide, preventOverflow, computeStyles, applyMaxClass];
