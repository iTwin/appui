/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import type { MarkRequired } from "@itwin/core-bentley";
import { BeUiEvent, Logger } from "@itwin/core-bentley";
import type { BackstageItem } from "../backstage/BackstageItem.js";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import type { StagePanelSection } from "../stagepanels/StagePanelSection.js";
import type { StatusBarItem } from "../statusbar/StatusBarItem.js";
import type { ToolbarItem } from "../toolbar/ToolbarItem.js";
import type {
  ToolbarOrientation,
  ToolbarUsage,
} from "../toolbar/ToolbarItem.js";
import { UiFramework } from "../UiFramework.js";
import type { Widget } from "../widgets/Widget.js";
import type { ProviderItem } from "./ProviderItem.js";
import type { UiItemsProvider } from "./UiItemsProvider.js";
import {
  createAbstractUiItemsManagerAdapter,
  createGetPropertyAdapter,
} from "./AbstractUiItemsManager.js";

/** UiItemsProvider register event args.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
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
    new BeUiEvent<UiItemsProviderRegisteredEventArgs>(); // eslint-disable-line @typescript-eslint/no-deprecated
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
    if (this._abstractAdapter) {
      this._abstractAdapter.clearAllProviders();
    }

    UiItemsManager._registeredUiItemsProviders.clear();
  }

  /** Event raised any time a UiProvider is registered or unregistered. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get onUiProviderRegisteredEvent(): BeUiEvent<UiItemsProviderRegisteredEventArgs> {
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

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private static sendRegisteredEvent(args: UiItemsProviderRegisteredEventArgs) {
    UiItemsManager.onUiProviderRegisteredEvent.raiseEvent(args);
  }

  /**
   * Registers an {@link UiItemsProvider}.
   * Optional overrides can be specified to limit when the provider is allowed to provide items.
   */
  public static register(
    uiProvider: UiItemsProvider,
    overrides?: UiItemsProviderOverrides
  ): void {
    const providerId = overrides?.providerId ?? uiProvider.id;
    if (UiItemsManager.getUiItemsProvider(providerId)) {
      Logger.logInfo(
        UiFramework.loggerCategory("UiItemsManager"),
        `UiItemsProvider '${providerId}' is already registered`
      );
      return;
    }

    if (this._abstractAdapter) {
      // Using the same structure to support layout agnostic methods i.e. `getToolbarItems`.
      UiItemsManager._registeredUiItemsProviders.set(providerId, {
        provider: uiProvider,
        overrides,
      });
      return this._abstractAdapter.register(uiProvider, overrides);
    }

    UiItemsManager._registeredUiItemsProviders.set(providerId, {
      provider: uiProvider,
      overrides,
    });
    Logger.logInfo(
      UiFramework.loggerCategory("UiItemsManager"),
      `UiItemsProvider '${uiProvider.id}' registered as '${providerId}'`
    );

    UiItemsManager.sendRegisteredEvent({ providerId });
  }

  /** Unregisters a specific {@link UiItemsProvider}. */
  public static unregister(providerId: string): void {
    const provider = UiItemsManager.getUiItemsProvider(providerId);
    if (!provider) return;

    UiItemsManager._registeredUiItemsProviders.delete(providerId);
    if (this._abstractAdapter) {
      this._abstractAdapter.unregister(providerId);
    }

    provider.onUnregister?.();

    Logger.logInfo(
      UiFramework.loggerCategory("UiItemsManager"),
      `UiItemsProvider '${providerId}' unregistered`
    );

    // trigger a refresh of the ui
    UiItemsManager.sendRegisteredEvent({ providerId });
  }

  private static allowItemsFromProvider(
    entry: UiItemProviderEntry,
    stageId?: string,
    stageUsage?: string
  ) {
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

  /** Returns registered toolbar items configured for the standard layout that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideToolbarItems} are returned by this method.
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

  /** Returns registered toolbar items that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are not returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideToolbarItems} are not returned by this method.
   */
  public static getToolbarItems(
    stageId: string,
    stageUsage: string
  ): ReadonlyArray<ProviderItem<ToolbarItem>> {
    const items: ProviderItem<ToolbarItem>[] = [];
    // Not using `AbstractUiItemsManager`, since there's no way to check if provider items are allowed.
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      const uiProvider = entry.provider;
      const providerId = entry.overrides?.providerId ?? uiProvider.id;
      if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;

      const providerItems =
        uiProvider.getToolbarItems?.().map((item) => ({
          ...item,
          providerId,
        })) ?? [];
      items.push(...providerItems);
    });

    return getUniqueItems(items);
  }

  /** Returns registered status bar items that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideStatusBarItems} are returned by this method.
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

  /** Returns registered backstage items.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideBackstageItems} are returned by this method.
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

  /** Returns registered widgets that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are not returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideWidgets} are not returned by this method.
   */
  public static getWidgets(
    stageId: string,
    stageUsage: string
  ): ReadonlyArray<ProviderItem<Widget>>;
  /** Returns registered widgets configured for the standard layout that match the specified frontstage id and usage.
   * @note Items registered in `UiItemsManager` of `@itwin/appui-abstract` are returned by this method.
   * @note Items returned by {@link UiItemsProvider.provideWidgets} are returned by this method.
   */
  public static getWidgets(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    section?: StagePanelSection
  ): ReadonlyArray<ProviderItem<Widget>>;
  public static getWidgets(
    stageId: string,
    stageUsage: string,
    location?: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<ProviderItem<Widget>> {
    const items: ProviderItem<Widget>[] = [];

    // If location is not specified, return all registered widgets.
    if (location === undefined) {
      // Not using `AbstractUiItemsManager`, since there's no way to check if provider items are allowed.
      UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
        const uiProvider = entry.provider;
        const providerId = entry.overrides?.providerId ?? uiProvider.id;
        if (!this.allowItemsFromProvider(entry, stageId, stageUsage)) return;

        const providerItems =
          uiProvider.getWidgets?.().map((item) => ({
            ...item,
            providerId,
          })) ?? [];
        items.push(...providerItems);
      });
      return getUniqueItems(items);
    }

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
