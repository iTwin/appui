/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import { UiEvent } from "@itwin/appui-abstract";
import type { MarkRequired } from "@itwin/core-bentley";
import { Logger } from "@itwin/core-bentley";
import type { BackstageItem } from "../backstage/BackstageItem";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import type { StagePanelSection } from "../stagepanels/StagePanelSection";
import type { StatusBarItem } from "../statusbar/StatusBarItem";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import type { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import { UiFramework } from "../UiFramework";
import type { Widget } from "../widgets/Widget";
import type { ProviderItem } from "./ProviderItem";
import type { UiItemsProvider } from "./UiItemsProvider";
import {
  createAbstractUiItemsManagerAdapter,
  createGetPropertyAdapter,
} from "./AbstractUiItemsManager";

/** UiItemsProvider register event args.
 * @public
 */
export interface UiItemsProviderRegisteredEventArgs {
  providerId: string;
}

/** UiItemsProvider overrides allows the application that registers a provider to limit when it is allowed to provide items
 * @public
 */
export interface AllowedUiItemsProviderOverrides {
  /** allows providerId to be overridden in the items manager for cases where the same provider needs to provide different content to different stages */
  providerId?: string;
  /** if specified then the current stage's Usage will be compared before allowing any items to be provided */
  stageUsages?: string[];
  /** if specified then the current stage's Id will be compared before allowing any items to be provided */
  stageIds?: string[];
}

/** Allowed overrides applied to a UiItemsProvider the application that registers a provider to limit when it is allowed to provide items.
 * Note that if an override `providerId` is specified then either `stageIds` or `stageUsages` must be defined to limit when the provider's
 * items are allowed.
 * @public
 */
export type UiItemsProviderOverrides =
  | MarkRequired<AllowedUiItemsProviderOverrides, "providerId" | "stageUsages">
  | MarkRequired<AllowedUiItemsProviderOverrides, "providerId" | "stageIds">
  | MarkRequired<AllowedUiItemsProviderOverrides, "stageIds">
  | MarkRequired<AllowedUiItemsProviderOverrides, "stageUsages">
  | MarkRequired<
    AllowedUiItemsProviderOverrides,
    "providerId" | "stageUsages" | "stageIds"
  >;

/** Interface that defines an instance of a UiItemsProvider and its application specified overrides. */
interface UiItemProviderEntry {
  provider: UiItemsProvider;
  overrides?: UiItemsProviderOverrides;
}

/** Controls registering of UiItemsProviders and calls the provider's methods when populating different parts of the User Interface.
 * @public
 */
export class UiItemsManager {
  private static _registeredUiItemsProviders: Map<string, UiItemProviderEntry> =
    new Map<string, UiItemProviderEntry>();
  private static _onUiProviderRegisteredEvent =
    new UiEvent<UiItemsProviderRegisteredEventArgs>();
  private static _abstractAdapter = createAbstractUiItemsManagerAdapter();

  /** For use in unit testing
   * @internal
   */
  public static useAbstractAdapter(useAbstractAdapter: boolean) {
    if (useAbstractAdapter) {
      this._abstractAdapter = createAbstractUiItemsManagerAdapter();
    } else {
      this._abstractAdapter = undefined;
    }
  }

  /** For use in unit testing
   * @internal */
  public static clearAllProviders() {
    if (this._abstractAdapter) return this._abstractAdapter.clearAllProviders();

    UiItemsManager._registeredUiItemsProviders.clear();
  }

  /** Event raised any time a UiProvider is registered or unregistered. */
  public static get onUiProviderRegisteredEvent(): UiEvent<UiItemsProviderRegisteredEventArgs> {
    if (this._abstractAdapter)
      return this._abstractAdapter.onUiProviderRegisteredEvent;

    return this._onUiProviderRegisteredEvent;
  }

  /** Return number of registered UiProvider. */
  public static get registeredProviderIds(): string[] {
    if (this._abstractAdapter)
      return this._abstractAdapter.registeredProviderIds;

    const ids = [...UiItemsManager._registeredUiItemsProviders.keys()];
    return ids;
  }

  /** Return true if there is any registered UiProvider. */
  public static get hasRegisteredProviders(): boolean {
    if (this._abstractAdapter)
      return this._abstractAdapter.hasRegisteredProviders;

    return this._registeredUiItemsProviders.size > 0;
  }

  /**
   * Retrieves a previously loaded UiItemsProvider.
   * @param providerId id of the UiItemsProvider to get
   */
  public static getUiItemsProvider(
    providerId: string
  ): UiItemsProvider | undefined {
    if (this._abstractAdapter)
      return this._abstractAdapter.getUiItemsProvider(providerId);

    return UiItemsManager._registeredUiItemsProviders.get(providerId)?.provider;
  }

  private static sendRegisteredEvent(args: UiItemsProviderRegisteredEventArgs) {
    UiItemsManager.onUiProviderRegisteredEvent.raiseEvent(args);
  }

  /**
   * Registers a UiItemsProvider with the UiItemsManager.
   * @param uiProvider the UI items provider to register.
   * @param overrides the UI items provider to register.
   */
  public static register(
    uiProvider: UiItemsProvider,
    overrides?: UiItemsProviderOverrides
  ): void {
    if (this._abstractAdapter)
      return this._abstractAdapter.register(uiProvider, overrides);

    const providerId = overrides?.providerId ?? uiProvider.id;

    if (UiItemsManager.getUiItemsProvider(providerId)) {
      Logger.logInfo(
        UiFramework.loggerCategory(this),
        `UiItemsProvider (${providerId}) is already loaded`
      );
    } else {
      UiItemsManager._registeredUiItemsProviders.set(providerId, {
        provider: uiProvider,
        overrides,
      });
      Logger.logInfo(
        UiFramework.loggerCategory(this),
        `UiItemsProvider ${uiProvider.id} registered as ${providerId} `
      );

      UiItemsManager.sendRegisteredEvent({ providerId });
    }
  }

  /** Remove a specific UiItemsProvider from the list of available providers. */
  public static unregister(providerId: string): void {
    if (this._abstractAdapter)
      return this._abstractAdapter.unregister(providerId);

    const provider = UiItemsManager.getUiItemsProvider(providerId);
    if (!provider) return;

    provider.onUnregister && provider.onUnregister();

    UiItemsManager._registeredUiItemsProviders.delete(providerId);
    Logger.logInfo(
      UiFramework.loggerCategory(this),
      `UiItemsProvider (${providerId}) unloaded`
    );

    // trigger a refresh of the ui
    UiItemsManager.sendRegisteredEvent({ providerId });
  }

  private static allowItemsFromProvider(
    entry: UiItemProviderEntry,
    stageId?: string,
    stageUsage?: string
  ) {
    // istanbul ignore else
    const overrides = entry.overrides;
    if (
      undefined !== stageId &&
      overrides?.stageIds &&
      !overrides.stageIds.some((value: string) => value === stageId)
    )
      return false;
    if (
      undefined !== stageUsage &&
      overrides?.stageUsages &&
      !overrides.stageUsages.some((value: string) => value === stageUsage)
    )
      return false;
    return true;
  }

  /** Called when the application is populating a toolbar so that any registered UiItemsProvider can add tool buttons that either either execute
   * an action or specify a registered ToolId into toolbar.
   * @param stageId a string identifier of the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @param usage usage of the toolbar
   * @param orientation orientation of the toolbar
   * @returns an array of error messages. The array will be empty if the load is successful, otherwise it is a list of one or more problems.
   */
  public static getToolbarButtonItems(
    stageId: string,
    stageUsage: string,
    usage: ToolbarUsage,
    orientation: ToolbarOrientation
  ): ReadonlyArray<ProviderItem<ToolbarItem>> {
    if (this._abstractAdapter) {
      return this._abstractAdapter.getToolbarButtonItems(
        stageId,
        stageUsage,
        usage,
        orientation
      );
    }

    const items: ProviderItem<ToolbarItem>[] = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;

      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      const provider = createGetPropertyAdapter(uiProvider);
      const providerItems = provider
        .provideToolbarItems(stageId, stageUsage, usage, orientation)
        .map((item) => ({
          ...item,
          providerId,
        }));
      items.push(...providerItems);
    });

    return getUniqueItems(items);
  }

  /** Called when the application is populating the statusbar so that any registered UiItemsProvider can add status fields
   * @param stageId a string identifier of the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @returns An array of CommonStatusBarItem that will be used to create controls for the status bar.
   */
  public static getStatusBarItems(
    stageId: string,
    stageUsage: string
  ): ReadonlyArray<ProviderItem<StatusBarItem>> {
    if (this._abstractAdapter) {
      return this._abstractAdapter.getStatusBarItems(stageId, stageUsage);
    }

    const items: ProviderItem<StatusBarItem>[] = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;

      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      const provider = createGetPropertyAdapter(uiProvider);

      const providerItems = provider
        .provideStatusBarItems(stageId, stageUsage)
        .map((item) => ({
          ...item,
          providerId,
        }));
      items.push(...providerItems);
    });

    return getUniqueItems(items);
  }

  /** Called when the application is populating the statusbar so that any registered UiItemsProvider can add status fields
   * @returns An array of BackstageItem that will be used to create controls for the backstage menu.
   */
  public static getBackstageItems(): ReadonlyArray<
    ProviderItem<BackstageItem>
  > {
    if (this._abstractAdapter) {
      return this._abstractAdapter.getBackstageItems();
    }

    const items: ProviderItem<BackstageItem>[] = [];
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      const provider = createGetPropertyAdapter(uiProvider);
      // Note: We do not call this.allowItemsFromProvider here as backstage items
      // should not be considered stage specific.
      const providerItems = provider.provideBackstageItems().map((item) => ({
        ...item,
        providerId,
      }));
      items.push(...providerItems);
    });

    return getUniqueItems(items);
  }

  /** Called when the application is populating the Stage Panels so that any registered UiItemsProvider can add widgets
   * @param stageId a string identifier of the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @param location the location within the stage.
   * @param section the section within location.
   * @returns An array of widgets.
   */
  public static getWidgets(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<ProviderItem<Widget>> {
    const items: ProviderItem<Widget>[] = [];
    if (this._abstractAdapter) {
      const abstractWidgets = this._abstractAdapter.getWidgets(
        stageId,
        stageUsage,
        location,
        section
      );
      items.push(...abstractWidgets);
    }

    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;

      const provider = createGetPropertyAdapter(uiProvider);
      const providerItems = provider
        .provideWidgets(stageId, stageUsage, location, section)
        .map((item) => ({
          ...item,
          providerId,
        }));
      items.push(...providerItems);
    });

    return getUniqueItems(items);
  }
}

function getUniqueItems<T extends { id: string }>(items: readonly T[]) {
  const uniqueItems: T[] = [];
  items.forEach((item) => {
    if (uniqueItems.find((existingItem) => item.id === existingItem.id)) return;
    uniqueItems.push(item);
  });
  return uniqueItems;
}
