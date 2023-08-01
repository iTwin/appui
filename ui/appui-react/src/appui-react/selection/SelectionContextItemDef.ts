/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import {
  ConditionalBooleanValue,
  IconSpecUtilities,
} from "@itwin/appui-abstract";
import { SessionStateActionId } from "../redux/SessionState";
import { CommandItemDef } from "../shared/CommandItemDef";
import type { BaseItemState } from "../shared/ItemDefBase";
import { SyncUiEventId } from "../syncui/SyncUiEventDispatcher";
import { GroupItemDef } from "../toolbar/GroupItem";
import { UiFramework } from "../UiFramework";
import svgModelIsolate from "@bentley/icons-generic/icons/model-isolate.svg";
import svgLayersIsolate from "@bentley/icons-generic/icons/layers-isolate.svg";
import svgAssetIsolate from "@bentley/icons-generic/icons/asset-isolate.svg";
import svgIsolate from "@bentley/icons-generic/icons/isolate.svg";
import svgModelHide from "@bentley/icons-generic/icons/model-hide.svg";
import svgLayersHide from "@bentley/icons-generic/icons/layers-hide.svg";
import svgAssetClassificationHide from "@bentley/icons-generic/icons/asset-classification-hide.svg";
import svgVisibilitySemiTransparent from "@bentley/icons-generic/icons/visibility-semi-transparent.svg";
import svgVisibilityHide from "@bentley/icons-generic/icons/visibility-hide_2.svg";
import svgVisibility from "@bentley/icons-generic/icons/visibility.svg";

/** return SyncEventIds that trigger selection state function refresh.
 * @beta
 */
export function getFeatureOverrideSyncEventIds(): string[] {
  return [
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SyncUiEventId.FeatureOverridesChanged,
    SyncUiEventId.ViewedModelsChanged,
  ];
}

/** return SyncEventIds that trigger selection state function refresh.
 * @beta
 */
export function getSelectionContextSyncEventIds(): string[] {
  return [
    SyncUiEventId.SelectionSetChanged,
    SyncUiEventId.ActiveContentChanged,
    SyncUiEventId.ActiveViewportChanged,
    SessionStateActionId.SetNumItemsSelected,
    SyncUiEventId.FeatureOverridesChanged,
    SyncUiEventId.ViewedModelsChanged,
  ];
}

/** return SyncEventIds that trigger selection state function refresh.
 * @beta
 */
export function isNoSelectionActive(): boolean {
  const activeContentControl = UiFramework.content.getActiveContentControl();
  let selectionCount = 0;
  // istanbul ignore if
  if (!UiFramework.frameworkStateKey)
    selectionCount =
      UiFramework.store.getState()[UiFramework.frameworkStateKey].frameworkState
        .sessionState.numItemsSelected;

  // istanbul ignore if
  if (activeContentControl?.viewport) {
    const hiddenElementsSet = activeContentControl.viewport.neverDrawn;
    const selectedElementsSet =
      activeContentControl.viewport.view.iModel.selectionSet.elements;
    // TODO: add check for categories, subcategories and models
    if (
      selectionCount > 0 ||
      ![...selectedElementsSet].every((value) => hiddenElementsSet?.has(value))
    )
      return false;
  }
  return true;
}

/** return ConditionalBooleanValue object used to show items if selection set is active.
 * @beta
 */
export function areNoFeatureOverridesActive(): boolean {
  const activeContentControl = UiFramework.content.getActiveContentControl();
  // istanbul ignore next
  if (activeContentControl && activeContentControl.viewport)
    return !UiFramework.hideIsolateEmphasizeActionHandler.areFeatureOverridesActive(
      activeContentControl.viewport
    );

  return true;
}

/** return ConditionalBooleanValue object used to show item if feature overrides are active.
 * @beta
 */
export function getIsHiddenIfFeatureOverridesActive(): ConditionalBooleanValue {
  return new ConditionalBooleanValue(
    areNoFeatureOverridesActive,
    getFeatureOverrideSyncEventIds()
  );
}

/** return ConditionalBooleanValue object used to show items if selection set is active.
 * @beta
 */
export function getIsHiddenIfSelectionNotActive(): ConditionalBooleanValue {
  return new ConditionalBooleanValue(
    isNoSelectionActive,
    getSelectionContextSyncEventIds()
  );
}

/** return state with isVisible set to true is SectionSet is active.
 * @beta
 */
// istanbul ignore next
export function featureOverridesActiveStateFunc(
  state: Readonly<BaseItemState>
): BaseItemState {
  const activeContentControl = UiFramework.content.getActiveContentControl();
  let isVisible = false;

  // istanbul ignore next
  if (activeContentControl && activeContentControl.viewport)
    isVisible =
      UiFramework.hideIsolateEmphasizeActionHandler.areFeatureOverridesActive(
        activeContentControl.viewport
      );

  return { ...state, isVisible };
}

/** return state with isVisible set to true is SectionSet is active.
 * @beta
 */
// istanbul ignore next
export function selectionContextStateFunc(
  state: Readonly<BaseItemState>
): BaseItemState {
  const activeContentControl = UiFramework.content.getActiveContentControl();
  let isVisible = false;

  let selectionCount = 0;
  if (!UiFramework.frameworkStateKey)
    selectionCount =
      UiFramework.store.getState()[UiFramework.frameworkStateKey].frameworkState
        .sessionState.numItemsSelected;

  if (
    activeContentControl &&
    activeContentControl.viewport &&
    (activeContentControl.viewport.view.iModel.selectionSet.size > 0 ||
      selectionCount > 0)
  )
    isVisible = true;
  return { ...state, isVisible };
}

/** Utility Class that provides definitions for tools dependent on current selection. These definitions can be used to populate toolbars.
 * @public
 */
// istanbul ignore next
export class SelectionContextToolDefinitions {
  public static get isolateModelsInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.IsolateModel",
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgModelIsolate),
      labelKey: "UiFramework:tools.isolateModels",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processIsolateSelectedElementsModel(),
    });
  }

  public static get isolateCategoriesInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.IsolateCategory",
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgLayersIsolate),
      labelKey: "UiFramework:tools.isolateCategories",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processIsolateSelectedElementsCategory(),
    });
  }

  public static get isolateElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.IsolateSelected",
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgAssetIsolate),
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
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgIsolate),
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
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgModelHide),
      labelKey: "UiFramework:tools.hideModels",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processHideSelectedElementsModel(),
    });
  }

  public static get hideCategoriesInSelectionItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.HideCategory",
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgLayersHide),
      labelKey: "UiFramework:tools.hideCategories",
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processHideSelectedElementsCategory(),
    });
  }

  public static get hideElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.HideSelected",
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(
        svgAssetClassificationHide
      ),
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
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgVisibilityHide),
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
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(
        svgVisibilitySemiTransparent
      ),
      labelKey: "UiFramework:tools.emphasizeSelected",
      isHidden: getIsHiddenIfSelectionNotActive(),
      execute: async () =>
        UiFramework.hideIsolateEmphasizeActionHandler.processEmphasizeSelected(),
    });
  }

  public static get clearHideIsolateEmphasizeElementsItemDef() {
    return new CommandItemDef({
      commandId: "UiFramework.ClearHideIsolateEmphasize",
      iconSpec: IconSpecUtilities.createWebComponentIconSpec(svgVisibility),
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
