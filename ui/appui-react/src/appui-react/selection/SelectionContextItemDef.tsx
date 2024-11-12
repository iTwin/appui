/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { SessionStateActionId } from "../redux/SessionState.js";
import { CommandItemDef } from "../shared/CommandItemDef.js";
import type { BaseItemState } from "../shared/ItemDefBase.js";
import { SyncUiEventId } from "../syncui/SyncUiEventDispatcher.js";
import { GroupItemDef } from "../toolbar/GroupItem.js";
import { UiFramework } from "../UiFramework.js";
import { SvgModelIsolate } from "../icons/SvgModelIsolate.js";
import { SvgLayersIsolate } from "../icons/SvgLayersIsolate.js";
import { SvgAssetIsolate } from "../icons/SvgAssetIsolate.js";
import { SvgIsolate } from "@itwin/itwinui-icons-react";
import { SvgModelHide } from "../icons/SvgModelHide.js";
import { SvgLayersHide } from "../icons/SvgLayersHide.js";
import { SvgAssetClassificationHide } from "../icons/SvgAssetClassificationHide.js";
import { SvgVisibilityHalf } from "@itwin/itwinui-icons-react";
import { SvgVisibilityHide } from "@itwin/itwinui-icons-react";
import { SvgVisibilityShow } from "@itwin/itwinui-icons-react";
import type { ToolbarItems } from "../tools/ToolbarItems.js";
import { getActiveViewport } from "../utils/getActiveViewport.js";
import * as React from "react";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Return SyncEventIds that trigger selection state function refresh.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function getFeatureOverrideSyncEventIds(): string[] {
  return [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.FeatureOverridesChanged,
    SyncUiEventId.ViewedModelsChanged,
  ];
}

/** Return SyncEventIds that trigger selection state function refresh.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function getSelectionContextSyncEventIds(): string[] {
  return [
    SyncUiEventId.SelectionSetChanged,
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    SessionStateActionId.SetNumItemsSelected,
    SyncUiEventId.FeatureOverridesChanged,
    SyncUiEventId.ViewedModelsChanged,
  ];
}

/** Return SyncEventIds that trigger selection state function refresh.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function isNoSelectionActive(): boolean {
  const viewport = getActiveViewport();
  if (!viewport) {
    return true;
  }

  const selectionCount = UiFramework.getNumItemsSelected();
  if (selectionCount > 0) return false;

  // TODO: add check for categories, subcategories and models
  const hiddenElementsSet = viewport.neverDrawn;
  const selectedElementsSet = viewport.view.iModel.selectionSet.elements;
  if (![...selectedElementsSet].every((value) => hiddenElementsSet?.has(value)))
    return false;

  return true;
}

/** Return ConditionalBooleanValue object used to show items if selection set is active.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function areNoFeatureOverridesActive(): boolean {
  const viewport = getActiveViewport();
  if (!viewport) {
    return true;
  }

  return !UiFramework.hideIsolateEmphasizeActionHandler.areFeatureOverridesActive(
    viewport
  );
}

/** Return ConditionalBooleanValue object used to show item if feature overrides are active.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function getIsHiddenIfFeatureOverridesActive(): ConditionalBooleanValue {
  return new ConditionalBooleanValue(
    areNoFeatureOverridesActive,
    getFeatureOverrideSyncEventIds()
  );
}

/** Return ConditionalBooleanValue object used to show items if selection set is active.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function getIsHiddenIfSelectionNotActive(): ConditionalBooleanValue {
  return new ConditionalBooleanValue(
    isNoSelectionActive,
    getSelectionContextSyncEventIds()
  );
}

/** Return state with isVisible set to true is SectionSet is active.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function featureOverridesActiveStateFunc(
  state: Readonly<BaseItemState>
): BaseItemState {
  const viewport = getActiveViewport();
  if (!viewport) {
    return { ...state, isVisible: false };
  }

  const isVisible =
    UiFramework.hideIsolateEmphasizeActionHandler.areFeatureOverridesActive(
      viewport
    );
  return { ...state, isVisible };
}

/** Return state with isVisible set to true is SectionSet is active.
 * @beta
 * @deprecated in 4.15.0. Use {@link ToolbarItems} or a custom conditional value instead.
 */
export function selectionContextStateFunc(
  state: Readonly<BaseItemState>
): BaseItemState {
  const viewport = getActiveViewport();
  if (!viewport) {
    return { ...state, isVisible: false };
  }

  const selectionCount = UiFramework.getNumItemsSelected();
  const isVisible =
    viewport.view.iModel.selectionSet.size > 0 || selectionCount > 0;
  return { ...state, isVisible };
}

/** Utility Class that provides definitions for tools dependent on current selection. These definitions can be used to populate toolbars.
 * @public
 * @deprecated in 4.15.0. Use {@link ToolbarItems} instead.
 */
export class SelectionContextToolDefinitions {
  public static get isolateModelsInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.IsolateModel",
      iconSpec: <SvgModelIsolate />,
      labelKey: "UiFramework:tools.isolateModels",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processIsolateSelectedElementsModel(),
    });
  }

  public static get isolateCategoriesInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.IsolateCategory",
      iconSpec: <SvgLayersIsolate />,
      labelKey: "UiFramework:tools.isolateCategories",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processIsolateSelectedElementsCategory(),
    });
  }

  public static get isolateElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.IsolateSelected",
      iconSpec: <SvgAssetIsolate />,
      labelKey: "UiFramework:tools.isolateSelected",
      isHidden: getIsHiddenIfSelectionNotActive(),
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processIsolateSelected(),
    });
  }

  public static get isolateSelectionToolGroup() {
    return new GroupItemDef({
      groupId: "UiFramework.IsolateSelectionGroup",
      labelKey: "UiFramework:tools.isolate",
      iconSpec: <SvgIsolate />,
      isHidden: getIsHiddenIfSelectionNotActive(),
      items: [
        this.isolateElementsItemDef,
        this.isolateCategoriesInSelectionItemDef,
        this.isolateModelsInSelectionItemDef,
      ],
      itemsInColumn: 3,
    });
  }

  public static get hideModelsInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.HideModel",
      iconSpec: <SvgModelHide />,
      labelKey: "UiFramework:tools.hideModels",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processHideSelectedElementsModel(),
    });
  }

  public static get hideCategoriesInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.HideCategory",
      iconSpec: <SvgLayersHide />,
      labelKey: "UiFramework:tools.hideCategories",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processHideSelectedElementsCategory(),
    });
  }

  public static get hideElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.HideSelected",
      iconSpec: <SvgAssetClassificationHide />,
      labelKey: "UiFramework:tools.hideSelected",
      isHidden: getIsHiddenIfSelectionNotActive(),
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processHideSelected(),
    });
  }

  public static get hideSectionToolGroup() {
    return new GroupItemDef({
      groupId: "UiFramework.HideSelectionGroup",
      labelKey: "UiFramework:tools.hide",
      iconSpec: <SvgVisibilityHide />,
      isHidden: getIsHiddenIfSelectionNotActive(),
      items: [
        this.hideElementsItemDef,
        this.hideCategoriesInSelectionItemDef,
        this.hideModelsInSelectionItemDef,
      ],
      itemsInColumn: 3,
    });
  }

  public static get emphasizeElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.EmphasizeSelected",
      iconSpec: <SvgVisibilityHalf />,
      labelKey: "UiFramework:tools.emphasizeSelected",
      isHidden: getIsHiddenIfSelectionNotActive(),
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processEmphasizeSelected(),
    });
  }

  public static get clearHideIsolateEmphasizeElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.ClearHideIsolateEmphasize",
      iconSpec: <SvgVisibilityShow />,
      labelKey: "UiFramework:tools.clearVisibility",
      isHidden: getIsHiddenIfFeatureOverridesActive(),
      execute: async () => {
        await UiFramework.hideIsolateEmphasizeActionHandler.processClearEmphasize();
        await UiFramework.hideIsolateEmphasizeActionHandler.processClearOverrideModels();
        await UiFramework.hideIsolateEmphasizeActionHandler.processClearOverrideCategories();
      },
    });
  }
}
