/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SpatialToolbarItem } from "./SpatialToolbarItem";
import { ContentButton, ContentButtonGroup } from "../../spatial/ContentButton";
import { isToolbarActionItem, isToolbarCustomItem } from "@itwin/appui-react";
import { SpatialLayoutContext } from "./Layout";

interface ToolbarProps
  extends Partial<
    Pick<React.ComponentProps<typeof ContentButtonGroup>, "className">
  > {
  items: SpatialToolbarItem[];
}

// Maps toolbar item definitions to toolbar buttons.
export function Toolbar(props: ToolbarProps) {
  const { items, ...rest } = props;
  const { activeWidget, setActiveWidget } =
    React.useContext(SpatialLayoutContext);
  return (
    <ContentButtonGroup {...rest} orientation="vertical">
      {items.map((item) => {
        const widgetId = item.layouts.spatial.widgetId;
        if (item.layouts.spatial.content)
          return (
            <React.Fragment key={item.id}>
              {item.layouts.spatial.content}
            </React.Fragment>
          );
        if (isToolbarCustomItem(item)) {
          // TODO: return an icon button with `panelContent` rendered in a popover.
        }
        return (
          <ContentButton
            key={item.id}
            testId=""
            isActive={activeWidget === widgetId}
            onClick={() => {
              if (isToolbarActionItem(item)) {
                item.execute();
              }

              // Toggle the active widget on and off.
              setActiveWidget(activeWidget === widgetId ? "" : widgetId ?? "");
            }}
            icon={item.iconNode}
            label={typeof item.label === "string" ? item.label : ""}
          />
        );
      })}
    </ContentButtonGroup>
  );
}
