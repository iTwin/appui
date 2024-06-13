/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import classnames from "classnames";
import * as React from "react";
import { ToolbarComposer } from "../toolbar/ToolbarComposer";
import { ToolWidgetComposer } from "./ToolWidgetComposer";
import { BackstageAppButton } from "./BackstageAppButton";
import { useUiVisibility } from "../hooks/useUiVisibility";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import { ToolbarItems } from "../tools/ToolbarItems";

/** Properties that can be used to append items to the default set of toolbar items.
 * @public
 */
export interface BasicToolWidgetProps {
  /** if true include hide/isolate Models and Categories */
  showCategoryAndModelsContextTools?: boolean;
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id. */
  icon?: string;
  /** optional set of additional items to include in horizontal toolbar */
  additionalHorizontalItems?: ToolbarItem[];
  /** optional set of additional items to include in vertical toolbar */
  additionalVerticalItems?: ToolbarItem[];
}

/** Default Tool Widget for standard "review" applications. Provides standard tools to review, and measure elements.
 * This definition will also show a overflow button if there is not enough room to display all the toolbar buttons.
 * @public
 */
export function BasicToolWidget(props: BasicToolWidgetProps) {
  const getHorizontalToolbarItems = React.useCallback(
    (useCategoryAndModelsContextTools: boolean): ToolbarItem[] => {
      const items: ToolbarItem[] = [];
      if (useCategoryAndModelsContextTools) {
        items.push(
          ToolbarItems.createClearSelection({
            itemPriority: 10,
          }),
          ToolbarItems.createClearHideIsolateEmphasizeElements({
            itemPriority: 20,
          }),
          ToolbarItems.createHideSectionGroup({
            itemPriority: 30,
          }),
          ToolbarItems.createIsolateSelectionGroup({
            itemPriority: 40,
          }),
          ToolbarItems.createEmphasizeElements({
            itemPriority: 50,
          })
        );
      } else {
        items.push(
          ToolbarItems.createClearSelection({
            itemPriority: 10,
          }),
          ToolbarItems.createClearHideIsolateEmphasizeElements({
            itemPriority: 20,
          }),
          ToolbarItems.createHideElements({
            itemPriority: 30,
          }),
          ToolbarItems.createIsolateElements({
            itemPriority: 40,
          }),
          ToolbarItems.createEmphasizeElements({
            itemPriority: 50,
          })
        );
      }
      if (props.additionalHorizontalItems)
        items.push(...props.additionalHorizontalItems);
      return items;
    },
    [props.additionalHorizontalItems]
  );

  const getVerticalToolbarItems = React.useCallback((): ToolbarItem[] => {
    const items: ToolbarItem[] = [];
    items.push(
      ToolbarItems.createSelectElement({
        itemPriority: 10,
      }),
      ToolbarItems.createMeasureGroup({
        itemPriority: 20,
      }),
      ToolbarItems.createSectionGroup({
        itemPriority: 30,
      })
    );
    if (props.additionalVerticalItems)
      items.push(...props.additionalVerticalItems);
    return items;
  }, [props.additionalVerticalItems]);

  const [horizontalItems, setHorizontalItems] = React.useState(() =>
    getHorizontalToolbarItems(!!props.showCategoryAndModelsContextTools)
  );
  const [verticalItems, setVerticalItems] = React.useState(() =>
    getVerticalToolbarItems()
  );

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setHorizontalItems(
        getHorizontalToolbarItems(!!props.showCategoryAndModelsContextTools)
      );
      setVerticalItems(getVerticalToolbarItems());
    }
  }, [
    props.showCategoryAndModelsContextTools,
    props.additionalHorizontalItems,
    props.additionalVerticalItems,
    getHorizontalToolbarItems,
    getVerticalToolbarItems,
  ]);

  const uiIsVisible = useUiVisibility();
  const className = classnames(!uiIsVisible && "nz-hidden");
  return (
    <ToolWidgetComposer
      className={className}
      cornerItem={<BackstageAppButton icon={props.icon} />}
      horizontalToolbar={
        <ToolbarComposer
          items={horizontalItems}
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
        />
      }
      verticalToolbar={
        <ToolbarComposer
          items={verticalItems}
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Vertical}
        />
      }
    />
  );
}
