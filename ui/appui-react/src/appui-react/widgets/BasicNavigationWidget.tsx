/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import classnames from "classnames";
import * as React from "react";
import { ToolbarComposer } from "../toolbar/ToolbarComposer.js";
import { useUiVisibility } from "../hooks/useUiVisibility.js";
import { NavigationWidgetComposer } from "./NavigationWidgetComposer.js";
import type { ToolbarItem } from "../toolbar/ToolbarItem.js";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem.js";
import { ToolbarItems } from "../tools/ToolbarItems.js";

/** Properties that can be used to append items to the default set of toolbar items.
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof BasicNavigationWidget>`
 */
export interface BasicNavigationWidgetProps {
  /** optional set of additional items to include in horizontal toolbar */
  additionalHorizontalItems?: ToolbarItem[];
  /** optional set of additional items to include in vertical toolbar */
  additionalVerticalItems?: ToolbarItem[];
}

/** Basic Navigation Widget that provides standard tools to manipulate views containing element data.
 * Supports the specification of additional horizontal and vertical toolbar items through props.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export function BasicNavigationWidget(props: BasicNavigationWidgetProps) {
  const getHorizontalToolbarItems = React.useCallback((): ToolbarItem[] => {
    const items: ToolbarItem[] = [
      ToolbarItems.createRotateView({
        itemPriority: 10,
      }),
      ToolbarItems.createPanView({
        itemPriority: 20,
      }),
      ToolbarItems.createFitView({
        itemPriority: 30,
      }),
      ToolbarItems.createWindowArea({
        itemPriority: 40,
      }),
      ToolbarItems.createViewUndo({
        itemPriority: 50,
      }),
      ToolbarItems.createViewRedo({
        itemPriority: 60,
      }),
    ];
    if (props.additionalHorizontalItems)
      items.push(...props.additionalHorizontalItems);
    return items;
  }, [props.additionalHorizontalItems]);

  const getVerticalToolbarItems = React.useCallback((): ToolbarItem[] => {
    const items: ToolbarItem[] = [];
    items.push(
      ToolbarItems.createWalkView({
        itemPriority: 10,
      }),
      ToolbarItems.createToggleCameraView({
        itemPriority: 20,
      })
    );
    if (props.additionalVerticalItems)
      items.push(...props.additionalVerticalItems);
    return items;
  }, [props.additionalVerticalItems]);

  const [horizontalItems, setHorizontalItems] = React.useState(() =>
    getHorizontalToolbarItems()
  );
  const [verticalItems, setVerticalItems] = React.useState(() =>
    getVerticalToolbarItems()
  );

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setHorizontalItems(getHorizontalToolbarItems());
      setVerticalItems(getVerticalToolbarItems());
    }
  }, [
    props.additionalHorizontalItems,
    props.additionalVerticalItems,
    getHorizontalToolbarItems,
    getVerticalToolbarItems,
  ]);

  const uiIsVisible = useUiVisibility();
  const className = classnames(!uiIsVisible && "nz-hidden");

  return (
    <NavigationWidgetComposer
      className={className}
      horizontalToolbar={
        <ToolbarComposer
          items={horizontalItems}
          usage={ToolbarUsage.ViewNavigation}
          orientation={ToolbarOrientation.Horizontal}
        />
      }
      verticalToolbar={
        <ToolbarComposer
          items={verticalItems}
          usage={ToolbarUsage.ViewNavigation}
          orientation={ToolbarOrientation.Vertical}
        />
      }
    />
  );
}
