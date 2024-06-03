/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import { BeEvent } from "@itwin/core-bentley";
import type { GeometricElementProps } from "@itwin/core-common";
import { FeatureAppearance } from "@itwin/core-common";
import type {
  FeatureOverrideProvider,
  FeatureSymbology,
  IModelConnection,
  ScreenViewport,
  Viewport,
} from "@itwin/core-frontend";
import { EmphasizeElements, IModelApp } from "@itwin/core-frontend";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";

/** Supported Hide, Isolate, and Emphasize Actions. These also serve as FeatureTracking Ids.
 * @public
 */
export enum HideIsolateEmphasizeAction {
  EmphasizeSelectedElements = "EmphasizeSelectedElements",
  IsolateSelectedElements = "IsolateSelectedElements",
  IsolateSelectedCategories = "IsolateSelectedCategories",
  IsolateSelectedModels = "IsolateSelectedModels",
  HideSelectedElements = "HideSelectedElements",
  HideSelectedModels = "HideSelectedModels",
  HideSelectedCategories = "HideSelectedCategories",
  ClearHiddenIsolatedEmphasized = "ClearHiddenIsolatedEmphasized",
  ClearOverrideModels = "ClearOverrideModels",
  ClearOverrideCategories = "ClearOverrideCategories",
}

/** Selection Context Action Event Argument
 * @public
 */
export interface EmphasizeElementsChangedArgs {
  /** viewport where action was performed */
  readonly viewport: ScreenViewport;
  /** action being performed */
  readonly action: HideIsolateEmphasizeAction;
}

/** Overrides given models to provide emphasize functionality
 * @public
 */
class ModelOverrideProvider implements FeatureOverrideProvider {
  constructor(
    public modelIds: string[],
    public defaultAppearance: FeatureAppearance
  ) {}

  public addFeatureOverrides(
    overrides: FeatureSymbology.Overrides,
    _viewport: Viewport
  ): void {
    overrides.setDefaultOverrides(this.defaultAppearance, true);
    // Override with nothing so that we keep the model looking normal and override the default appearance of everything else
    const appearance = FeatureAppearance.fromJSON({});
    this.modelIds.forEach((modelId: string) => {
      overrides.override({ modelId, appearance, onConflict: "replace" });
    });
  }
}

/** Overrides given categories to provide emphasize functionality
 *  @public
 */
class SubCategoryOverrideProvider implements FeatureOverrideProvider {
  constructor(
    public subCategoryIds: string[],
    public defaultAppearance: FeatureAppearance
  ) {}

  public addFeatureOverrides(
    overrides: FeatureSymbology.Overrides,
    _viewport: Viewport
  ): void {
    overrides.setDefaultOverrides(this.defaultAppearance, true);
    // Override with nothing so that we keep the category looking normal and override the default appearance of everything else
    const appearance = FeatureAppearance.fromJSON({});
    this.subCategoryIds.forEach((subCategoryId: string) => {
      overrides.override({ subCategoryId, appearance, onConflict: "replace" });
    });
  }
}

/**
 * Interface for class that handles Hide, Isolate, and Emphasize Actions
 * @public
 */
export abstract class HideIsolateEmphasizeActionHandler {
  public static emphasizeElementsChanged = new BeEvent<
    (args: EmphasizeElementsChangedArgs) => void
  >();

  /** String Id sent to allow UI to refresh its display state.  */
  public static get hideIsolateEmphasizeUiSyncId() {
    return "selection-context-emphasize-elements-changed";
  }

  /**
   * Function run when `IsolateSelectedElementsModel` tool button is pressed
   */
  public abstract processIsolateSelectedElementsModel(): Promise<void>;
  /**
   * Function run when `IsolateSelectedElementsModel` tool button is pressed
   */

  public abstract processIsolateSelectedElementsCategory(): Promise<void>;

  /**
   * Function run when `HideSelectedElementsModel` tool button is pressed
   */
  public abstract processIsolateSelected(
    clearSelection?: boolean
  ): Promise<void>;

  /**
   * Function run when `HideSelectedElementsModel` tool button is pressed
   */
  public abstract processHideSelectedElementsModel(): Promise<void>;

  /**
   * Function that is run when `HideSelectedElementsCategory` tool button is pressed
   */
  public abstract processHideSelectedElementsCategory(): Promise<void>;

  /**
   * Function that is run when `HideSelected` tool button is pressed
   */
  public abstract processHideSelected(): Promise<void>;

  /**
   * Function that is run when `EmphasizeSelected` tool button is pressed
   */
  public abstract processEmphasizeSelected(): Promise<void>;

  /**
   * Function that is run when `ClearEmphasize` tool button is pressed
   */
  public abstract processClearEmphasize(): Promise<void>;

  /**
   * Function that informs called if Hide, Isolate, or Emphasize of elements is active.
   */
  public abstract areFeatureOverridesActive(vp: Viewport): boolean;

  /**
   * Function run when `ClearOverrideCategories` tool button is pressed
   */
  public abstract processClearOverrideCategories(): Promise<void>;

  /**
   * Function run when `ClearOverrideModels` tool button is pressed
   */
  public abstract processClearOverrideModels(): Promise<void>;
}

/** Provides helper functions for doing commands on logical selection like categories and subjects.
 * @public
 */
export class HideIsolateEmphasizeManager extends HideIsolateEmphasizeActionHandler {
  private static _overrideCategoryIds = new Map<Viewport, Set<string>>();
  private static _overrideModelIds = new Map<Viewport, Set<string>>();

  /** Returns true if there is only a category hilited. */
  private static categorySelected(vp: Viewport) {
    const subcategories = vp.iModel.hilited.subcategories;
    return subcategories.size === 1;
  }

  /** Returns true if only a model is hilited. */
  private static modelSelected(vp: Viewport) {
    const models = vp.iModel.hilited.models;
    return models.size === 1;
  }

  /**
   * Hide the hilited categories.
   * @param vp Viewport to affect
   */
  private static hideSelectedCategory(vp: Viewport) {
    const ids = vp.iModel.hilited.subcategories.toId64Set();
    vp.changeCategoryDisplay(ids, false);
  }

  /** Get sub categories that relate to the category Id */
  private static async _getSubCategories(
    iModelConnection: IModelConnection,
    categoryIds: string[]
  ) {
    const allSubcats: string[] = [];
    const request = iModelConnection.subcategories.load(categoryIds);
    if (request) await request.promise;

    for (const categoryId of categoryIds) {
      const subcats =
        iModelConnection.subcategories.getSubCategories(categoryId);
      if (subcats) allSubcats.push(...subcats);
    }
    return allSubcats;
  }

  /**
   * Emphasize hilited categories.
   * @param vp Viewport to affect
   */
  public static async emphasizeSelectedCategory(vp: Viewport) {
    const ids = vp.iModel.hilited.subcategories.toId64Array();
    if (ids.length === 0) return;

    const defaultAppearance =
      EmphasizeElements.getOrCreate(vp).createDefaultAppearance();
    EmphasizeElements.clear(vp);
    const subcats = await HideIsolateEmphasizeManager._getSubCategories(
      vp.iModel,
      ids
    );
    vp.addFeatureOverrideProvider(
      new SubCategoryOverrideProvider(subcats, defaultAppearance)
    );
  }

  /**
   * Hide the selected model
   * @param vp Viewport to affect
   */
  private static hideSelectedModel(vp: Viewport) {
    const ids = vp.iModel.hilited.models.toId64Array();
    if (ids.length === 0) return;

    vp.changeModelDisplay(ids, false);
  }

  /**
   * Isolate the selected model
   * @param vp Viewport to affect
   */
  private static emphasizeSelectedModel(vp: Viewport) {
    const ids = vp.iModel.hilited.models.toId64Array();
    if (ids.length === 0) return;

    const defaultAppearance =
      EmphasizeElements.getOrCreate(vp).createDefaultAppearance();
    EmphasizeElements.clear(vp);
    vp.addFeatureOverrideProvider(
      new ModelOverrideProvider(ids, defaultAppearance)
    );
  }

  /**
   * Isolate the selected elements
   * @param vp Viewport to affect
   */
  public static isolateSelected(vp: Viewport) {
    EmphasizeElements.getOrCreate(vp).isolateSelectedElements(vp, true, false); // Isolate selected elements
  }

  /**
   * Hide the selected elements
   * @param vp Viewport to affect
   */
  public static hideSelected(vp: Viewport) {
    EmphasizeElements.getOrCreate(vp).hideSelectedElements(vp, false, false); // Hide all selected elements
  }

  /**
   * Clear Hidden,Isolated, or Emphasized elements in specified view
   * @param vp Viewport to affect
   *
   */
  public static clearEmphasize(vp: Viewport | undefined) {
    if (vp) {
      EmphasizeElements.getOrCreate(vp).clearEmphasizedElements(vp);
      EmphasizeElements.clear(vp);
    }
  }

  /**
   * Emphasize the selected elements from either presentation layer's logical selection or selected graphics
   * @param vp Viewport to affect
   * @param emphasisSilhouette defaults to true
   */
  public static async emphasizeSelected(
    vp: Viewport,
    emphasisSilhouette = true
  ) {
    if (HideIsolateEmphasizeManager.categorySelected(vp)) {
      await HideIsolateEmphasizeManager.emphasizeSelectedCategory(vp);
      return;
    } else if (HideIsolateEmphasizeManager.modelSelected(vp)) {
      HideIsolateEmphasizeManager.emphasizeSelectedModel(vp);
      return;
    }

    const ee = EmphasizeElements.getOrCreate(vp);
    ee.wantEmphasis = emphasisSilhouette;

    ee.emphasizeSelectedElements(vp, undefined, true, false); // Emphasize elements by making all others grey/transparent
    vp.isFadeOutActive = true; // Enable flat alpha for greyed out elements…
  }

  /**
   * Isolate hilited models.
   * @param vp Viewport to affect
   */
  public static async isolateSelectedModel(vp: Viewport) {
    const ids = vp.iModel.hilited.models.toId64Array();
    if (ids.length === 0) return;

    await vp.replaceViewedModels(ids);
  }

  /**
   * Isolate hilited categories.
   * @param vp Viewport to affect
   */
  private static isolateSelectedCategory(vp: Viewport) {
    const ids = vp.iModel.hilited.subcategories.toId64Set();
    const categoriesToDrop: string[] = [];
    vp.view.categorySelector.categories.forEach((categoryId: string) => {
      if (!ids.has(categoryId)) categoriesToDrop.push(categoryId);
    });
    vp.changeCategoryDisplay(categoriesToDrop, false);
    vp.changeCategoryDisplay(ids, true);
  }

  private static async getSelectionSetElementModels(iModel: IModelConnection) {
    const props = await iModel.elements.getProps(iModel.selectionSet.elements);
    const modelIds = new Set<string>();
    for (const prop of props) if (prop.model) modelIds.add(prop.model);
    return modelIds;
  }

  private static async getSelectionSetElementCategories(
    iModel: IModelConnection
  ) {
    const props = (await iModel.elements.getProps(
      iModel.selectionSet.elements
    )) as GeometricElementProps[];
    const categoryIds = new Set<string>();
    for (const prop of props) if (prop.category) categoryIds.add(prop.category);
    return categoryIds;
  }

  /**
   * Isolate either based on Presentation selection, if defined, else the selected graphic elements
   * @param vp Viewport to affect
   */
  public static async isolateCommand(vp: Viewport) {
    if (HideIsolateEmphasizeManager.categorySelected(vp)) {
      HideIsolateEmphasizeManager.isolateSelectedCategory(vp);
      return;
    } else if (HideIsolateEmphasizeManager.modelSelected(vp)) {
      await HideIsolateEmphasizeManager.isolateSelectedModel(vp);
      return;
    }
  }

  /**
   * Isolate model from selected elements
   * @param vp Viewport to affect
   */
  public static async isolateSelectedElementsModel(vp: Viewport) {
    const modelsToKeep = new Set(
      await HideIsolateEmphasizeManager.getSelectionSetElementModels(vp.iModel)
    );

    if (vp.view.isSpatialView()) {
      const modelsToTurnOff = [...vp.view.modelSelector.models].filter(
        (modelId: string) => !modelsToKeep.has(modelId)
      );
      this.updateModelOverride(vp, modelsToTurnOff);
    }

    await vp.replaceViewedModels(modelsToKeep);
  }

  /**
   * Isolate the selected category found in SelectionSet elements
   * @param vp Viewport to affect
   */
  public static async isolateSelectedElementsCategory(vp: Viewport) {
    const categoriesToKeep = new Set(
      await HideIsolateEmphasizeManager.getSelectionSetElementCategories(
        vp.iModel
      )
    );
    const categoriesToTurnOff = [...vp.view.categorySelector.categories].filter(
      (categoryId: string) => !categoriesToKeep.has(categoryId)
    );
    vp.changeCategoryDisplay(categoriesToTurnOff, false);
    vp.changeCategoryDisplay(categoriesToKeep, true);
    this.updateCategoryOverride(vp, categoriesToTurnOff);
  }

  /**
   * Hide either based on Presentation selection, if defined, else the selected graphic elements
   * @param vp Viewport to affect
   */
  public static async hideCommand(vp: Viewport) {
    if (HideIsolateEmphasizeManager.categorySelected(vp)) {
      HideIsolateEmphasizeManager.hideSelectedCategory(vp);
      return;
    } else if (HideIsolateEmphasizeManager.modelSelected(vp)) {
      HideIsolateEmphasizeManager.hideSelectedModel(vp);
      return;
    }
    EmphasizeElements.getOrCreate(vp).hideSelectedElements(vp, false, false); // Hide selected elements
  }

  /**
   * Hide the models defined by the elements in the current SelectionSet
   * @param vp Viewport to affect
   */
  public static async hideSelectedElementsModel(vp: Viewport) {
    const modelIds =
      await HideIsolateEmphasizeManager.getSelectionSetElementModels(vp.iModel);
    vp.changeModelDisplay(modelIds, false);
    this.updateModelOverride(vp, [...modelIds]);
  }

  /**
   * Clear (restore) the previously hidden/isolated models hidden by hideSelectedElementsModel
   * @param vp Viewport to affect
   */
  public static clearOverrideModels(vp: Viewport) {
    const ids = this._overrideModelIds.get(vp);
    if (ids) {
      vp.changeModelDisplay([...ids], true);
      this.clearModelOverride(vp);
    }
  }

  /**
   * Determine if models are hidden by hideSelectedElementsModel or isolateSelectedElementsModel
   * @param vp Viewport to affect
   */
  public static isOverrideModels(vp: Viewport): boolean {
    const ids = this._overrideModelIds.get(vp);
    return ids ? [...ids].length > 0 : false;
  }

  /**
   * Determine if categories are hidden by hideSelectedElementsCategory or isolateSelectedElementsCategory
   * @param vp Viewport to affect
   */
  public static isOverrideCategories(vp: Viewport): boolean {
    const ids = this._overrideCategoryIds.get(vp);
    return ids ? [...ids].length > 0 : false;
  }

  /**
   * Hide the categories defined by the elements in the current SelectionSet
   * @param vp Viewport to affect
   */
  public static async hideSelectedElementsCategory(vp: Viewport) {
    const categoryIds =
      await HideIsolateEmphasizeManager.getSelectionSetElementCategories(
        vp.iModel
      );
    vp.changeCategoryDisplay(categoryIds, false);
    this.updateCategoryOverride(vp, [...categoryIds]);
  }

  /**
   * Clear (restore) the previously hidden categories hidden by hideSelectedElementsCategory
   * @param vp Viewport to affect
   */
  public static clearOverrideCategories(vp: Viewport) {
    const ids = this._overrideCategoryIds.get(vp);
    if (ids) {
      vp.changeCategoryDisplay([...ids], true);
      this.clearCategoryOverride(vp);
    }
  }

  /** Checks to see if any featureOverrideProviders are active */
  public areFeatureOverridesActive(vp: Viewport): boolean {
    // Check all the emphasize possibilities
    const emphasizeElementsProvider =
      vp.findFeatureOverrideProviderOfType<EmphasizeElements>(
        EmphasizeElements
      );
    if (
      undefined !== emphasizeElementsProvider &&
      emphasizeElementsProvider.isActive(vp)
    )
      return true;
    else if (vp.neverDrawn && vp.neverDrawn.size > 0) return true;

    const modelOverrideProvider =
      vp.findFeatureOverrideProviderOfType<ModelOverrideProvider>(
        ModelOverrideProvider
      );
    if (
      undefined !== modelOverrideProvider &&
      modelOverrideProvider.modelIds.length > 0
    )
      return true;

    const subCategoryOverrideProvider =
      vp.findFeatureOverrideProviderOfType<SubCategoryOverrideProvider>(
        SubCategoryOverrideProvider
      );
    if (
      undefined !== subCategoryOverrideProvider &&
      subCategoryOverrideProvider.subCategoryIds.length > 0
    )
      return true;

    // Check hide/isolate possibilities
    if (HideIsolateEmphasizeManager.isOverrideCategories(vp)) return true;

    if (HideIsolateEmphasizeManager.isOverrideModels(vp)) return true;

    return false;
  }

  /**
   * Function that is run when `IsolateSelectedElementsModel` tool button is pressed
   */
  public async processIsolateSelectedElementsModel(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;

    await HideIsolateEmphasizeManager.isolateSelectedElementsModel(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.IsolateSelectedModels,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Function that is run when `IsolateSelectedElementsCategory` tool button is pressed
   */
  public async processIsolateSelectedElementsCategory(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;

    await HideIsolateEmphasizeManager.isolateSelectedElementsCategory(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.IsolateSelectedCategories,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Function that is run when `IsolateSelected` tool button is pressed
   */
  public async processIsolateSelected(clearSelection = true): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.isolateSelected(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.IsolateSelectedElements,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );

    if (!clearSelection) return;

    // clear out selection now that any callbacks have processed
    const selection = vp.view.iModel.selectionSet;
    if (selection.isActive) selection.emptyAll();
  }

  /**
   * Function that is run when `HideSelectedElementsModel` tool button is pressed
   */
  public async processHideSelectedElementsModel(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;

    await HideIsolateEmphasizeManager.hideSelectedElementsModel(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.HideSelectedModels,
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Function that is run when `HideSelectedElementsCategory` tool button is pressed
   */
  public async processHideSelectedElementsCategory(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;

    await HideIsolateEmphasizeManager.hideSelectedElementsCategory(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.HideSelectedCategories,
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Function that is run when `HideSelected` tool button is pressed
   */
  public async processHideSelected(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;

    HideIsolateEmphasizeManager.hideSelected(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.HideSelectedElements,
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );

    // clear out selection now that any callbacks have processed
    const selection = vp.view.iModel.selectionSet;
    if (selection.isActive) selection.emptyAll();
  }

  /**
   * Function that is run when `EmphasizeSelected` tool button is pressed
   */
  public async processEmphasizeSelected(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;

    await HideIsolateEmphasizeManager.emphasizeSelected(vp);
    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.EmphasizeSelectedElements,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );

    // clear out selection now that any callbacks have processed
    const selection = vp.view.iModel.selectionSet;
    if (selection.isActive) selection.emptyAll();
  }

  /**
   * Function that is run when `ClearEmphasize` tool button is pressed
   */
  public async processClearEmphasize(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.clearEmphasize(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.ClearHiddenIsolatedEmphasized,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Function that is run when `ClearOverrideModels` tool button is pressed
   */
  public async processClearOverrideModels(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.clearOverrideModels(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.ClearOverrideModels,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Function that is run when `ClearOverrideCategories` tool button is pressed
   */
  public async processClearOverrideCategories(): Promise<void> {
    const vp = IModelApp.viewManager.selectedView;
    if (!vp) return;
    HideIsolateEmphasizeManager.clearOverrideCategories(vp);

    HideIsolateEmphasizeActionHandler.emphasizeElementsChanged.raiseEvent({
      viewport: vp,
      action: HideIsolateEmphasizeAction.ClearOverrideCategories,
    });

    SyncUiEventDispatcher.dispatchSyncUiEvent(
      HideIsolateEmphasizeActionHandler.hideIsolateEmphasizeUiSyncId
    );
  }

  /**
   * Add category ids to the category override cache (hidden or isolated categories)
   */
  public static updateCategoryOverride(vp: Viewport, ids: string[]) {
    const prevIds = this._overrideCategoryIds.get(vp);
    const newIds = [...(prevIds || []), ...ids];
    this._overrideCategoryIds.set(vp, new Set(newIds));
  }

  /**
   * Add model ids to the model override cache (hidden or isolated models)
   */
  public static updateModelOverride(vp: Viewport, ids: string[]) {
    const prevIds = this._overrideModelIds.get(vp);
    const newIds = [...(prevIds || []), ...ids];
    this._overrideModelIds.set(vp, new Set(newIds));
  }

  /**
   * Return the list of category overrides (hidden or isolated categories)
   */
  public static getCategoryOverrides(vp: Viewport) {
    return this._overrideCategoryIds.get(vp);
  }

  /**
   * Return the list of model overrides (hidden or isolated models)
   */
  public static getModelOverrides(vp: Viewport) {
    return this._overrideModelIds.get(vp);
  }

  /**
   * Clear the category override cache (hidden or isolated categories)
   */
  private static clearCategoryOverride(vp: Viewport) {
    this._overrideCategoryIds.delete(vp);
  }

  /**
   * Clear the model override cache (hidden or isolated models)
   */
  private static clearModelOverride(vp: Viewport) {
    this._overrideModelIds.delete(vp);
  }
}
