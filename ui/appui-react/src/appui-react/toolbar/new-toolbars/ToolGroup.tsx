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
import { ActionItem } from "./ActionItem.js";
import { GroupItem } from "./GroupItem.js";
import { CustomItem } from "./CustomItem.js";
import { OverflowButton } from "./OverflowButton.js";
import { useOverflow } from "./useOverflow.js";
import { getChildKey } from "../../layout/tool-settings/Docked.js";
import { ToolbarContext } from "./Toolbar.js";
import { Surface } from "./Surface.js";

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface ToolGroupProps extends CommonProps {
  children?: React.ReactNode;
}

type Child = ReturnType<typeof React.Children.toArray>[0];

/** @internal */
export function ToolGroup({ children, className, ...props }: ToolGroupProps) {
  const context = React.useContext(ToolbarContext);
  const expandsTo = context?.expandsTo ?? "bottom";
  const panelAlignment = context?.panelAlignment ?? "start";
  const orientation = getOrientation(expandsTo);
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
    return element.getBoundingClientRect();
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

ToolGroup.ActionItem = ActionItem;
ToolGroup.GroupItem = GroupItem;
ToolGroup.CustomItem = CustomItem;

type ToolbarContextProps = React.ContextType<typeof ToolbarContext>;

function getOrientation(
  expandsTo: NonNullable<ToolbarContextProps>["expandsTo"]
) {
  switch (expandsTo) {
    case "left":
    case "right":
      return "vertical";
    case "top":
    case "bottom":
      return "horizontal";
  }
}
