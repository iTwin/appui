/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ToolbarItem, isToolbarActionItem } from "@itwin/appui-react";
import { ButtonGroup, IconButton } from "@itwin/itwinui-react";

export interface ToolbarProps {
  items: ReadonlyArray<ToolbarItem>;
  orientation?: "horizontal" | "vertical";
}

// TODO: replace with iTwinUI based Toolbar components.
export function Toolbar({ items, orientation }: ToolbarProps) {
  return (
    <ButtonGroup orientation={orientation}>
      {items.map((item) => {
        // TODO: enhance CustomToolbarItem
        if (item.id === "context-select")
          return <React.Fragment key={item.id}>{item.icon}</React.Fragment>;
        return (
          <IconButton
            key={item.id}
            label={item.label}
            onClick={() => {
              if (isToolbarActionItem(item)) {
                item.execute();
              }
            }}
          >
            {item.icon}
          </IconButton>
        );
      })}
    </ButtonGroup>
  );
}
