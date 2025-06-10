/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./ToolGroup.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { OverflowButton } from "./OverflowButton.js";
import { useOverflow } from "./useOverflow.js";
import { getChildKey } from "../../layout/tool-settings/Docked.js";
import { ToolbarContext } from "./Toolbar.js";
import { Surface } from "./Surface.js";
import { useSafeContext } from "../../hooks/useSafeContext.js";

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface ToolGroupProps extends CommonProps {
  children?: React.ReactNode;
}

type Child = ReturnType<typeof React.Children.toArray>[0];

/** @internal */
export function ToolGroup({ children, className, ...props }: ToolGroupProps) {
  const { panelAlignment, orientation } = useSafeContext(ToolbarContext);
  const childrenArray = React.Children.toArray(children);

  const keyToChildMap = childrenArray.reduce<Map<string, Child>>(
    (acc, child, index) => {
      const childKey = getChildKey(child, index);
      acc.set(childKey, child);
      return acc;
    },
    new Map()
  );
  const childrenKeys = Array.from(keyToChildMap.keys());
  const itemRefs = React.useRef<Map<string, Element>>(new Map());
  const overflowRef = React.useRef<HTMLButtonElement>(null);

  const getItemSize = React.useCallback((item: string) => {
    const element = itemRefs.current.get(item);
    if (!element) return { width: 0, height: 0 };

    const elementSize = element.getBoundingClientRect();

    const separatorSize = getSeparatorSize(element);
    if (!separatorSize) return elementSize;

    return {
      width: elementSize.width + separatorSize.width,
      height: elementSize.height + separatorSize.height,
    };
  }, []);
  const getOverflowSize = React.useCallback(() => {
    const element = overflowRef.current;
    if (!element) return { width: 0, height: 0 };
    return element.getBoundingClientRect();
  }, []);

  const [containerRef, componentRef, visibleCount, renderOverflow] =
    useOverflow(childrenKeys, orientation, getItemSize, getOverflowSize);

  const keyToChildEntries = Array.from(keyToChildMap.entries());
  const visibleChildren = keyToChildEntries.slice(0, visibleCount);
  const overflown = keyToChildEntries.slice(visibleCount);
  return (
    <div
      className={classnames(
        "uifw-toolbar-group-toolGroup_container",
        `uifw-${orientation}`,
        `uifw-${panelAlignment}`,
        className
      )}
      ref={containerRef}
    >
      <Surface orientation={orientation} ref={componentRef} {...props}>
        {visibleChildren.map(([item, child]) => {
          if (!React.isValidElement<{ ref: React.Ref<Element> }>(child))
            return child;
          return React.cloneElement(child, {
            ref: (el: Element | null) => {
              if (!el) {
                itemRefs.current.delete(item);
                return;
              }
              itemRefs.current.set(item, el);
            },
          });
        })}
        {renderOverflow && (
          <OverflowButton ref={overflowRef}>
            {overflown.map(([_, child]) => child)}
          </OverflowButton>
        )}
      </Surface>
    </div>
  );
}

// First item in the group reserves space for the separator to correctly calculate the overflow.
function getSeparatorSize(toolbarItem: Element) {
  const firstInGroup = isFirstInGroup(toolbarItem);
  if (!firstInGroup) return undefined;

  // Last group does not have a separator.
  if (isLastGroup(toolbarItem)) return undefined;

  const separator = getSeparator(toolbarItem);
  if (!separator) return undefined;

  return separator.getBoundingClientRect();
}

// Returns if the toolbar item is the first in its group.
function isFirstInGroup(toolbarItem: Element) {
  const prev = toolbarItem.previousElementSibling;
  if (prev?.tagName === "BUTTON") return false;
  return true;
}

// Returns if the toolbar item is in the last group of the toolbar.
function isLastGroup(toolbarItem: Element) {
  let el = toolbarItem.nextElementSibling;
  while (el) {
    if (el.tagName === "BUTTON" && el.hasAttribute("data-item-id")) {
      return false;
    }
    el = el.nextElementSibling;
  }
  return true;
}

// Returns the first separator element after the toolbar item, if it exists.
function getSeparator(toolbarItem: Element) {
  let el = toolbarItem.nextElementSibling;
  while (el) {
    if (el.classList.contains("uifw-toolbar-newToolbars-separator")) {
      return el;
    }
    el = el.nextElementSibling;
  }
  return undefined;
}
