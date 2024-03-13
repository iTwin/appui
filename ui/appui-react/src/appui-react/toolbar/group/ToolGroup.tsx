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
import { Surface } from "@itwin/itwinui-react";
import { ActionItem } from "./ActionItem";
import { GroupItem } from "./GroupItem";
import { CustomItem } from "./CustomItem";
import { OverflowButton } from "./OverflowButton";
import { getLength, useOverflow } from "./useOverflow";
import { getChildKey } from "../../layout/tool-settings/Docked";

/** @internal */
interface ToolGroupProps extends CommonProps {
  alignment?: "start" | "end";
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}

type Child = ReturnType<typeof React.Children.toArray>[0];

/** @internal */
export function ToolGroup({
  alignment = "start",
  orientation = "horizontal",
  ...props
}: ToolGroupProps) {
  const childrenArray = React.Children.toArray(props.children);
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

  const getItemSize = React.useCallback(
    (item: string): number => {
      const element = itemRefs.current.get(item);
      if (!element) return 0;
      const bounds = element.getBoundingClientRect();
      return getLength(bounds, orientation);
    },
    [orientation]
  );
  const getOverflowSize = React.useCallback((): number => {
    orientation;
    return 36;
  }, [orientation]);

  const [containerRef, componentRef, visibleCount, renderOverflow] =
    useOverflow(childrenKeys, orientation, getItemSize, getOverflowSize);

  const keyToChildEntries = Array.from(keyToChildMap.entries());
  const children = keyToChildEntries.slice(0, visibleCount);
  const overflown = keyToChildEntries.slice(visibleCount);

  return (
    <div
      className={classnames(
        "uifw-toolbar-group-toolGroup_container",
        `uifw-${orientation}`,
        `uifw-${alignment}`
      )}
      ref={containerRef}
    >
      <Surface
        className={classnames(
          "uifw-toolbar-group-toolGroup",
          `uifw-${orientation}`,
          props.className
        )}
        style={props.style}
        ref={componentRef}
      >
        {children.map(([item, child]) => {
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
          <OverflowButton>
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
