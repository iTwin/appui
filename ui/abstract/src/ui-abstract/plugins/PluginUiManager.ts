/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Plugins */

import { Logger, BeEvent } from "@bentley/bentleyjs-core";
import { ToolbarItemInsertSpec } from "./PluginUi";
import { CommonStatusBarItem } from "../statusbar/StatusBarItem";
import { StageUsage } from "../stage/Stage";

const loggerCategory = "imodeljs-frontend.Plugin";

/** Describes the methods and properties that a plugin can provide if it want ui items added to the running ImodelApp.
 * @alpha
 */
export interface PluginUiProvider {
  /** id of provider */
  readonly id: string;
  /** PluginUiManager calls following method to augment base toolbars */
  provideToolbarItems?: (toolBarId: string) => ToolbarItemInsertSpec[];
  /** PluginUiManager calls following method to augment base statusbar for stages that allow it. */
  provideStatusbarItems?: (stageId: string, stageUsage: StageUsage) => CommonStatusBarItem[];
  // ============ Future Functionality =================
  //  // uiAdmin calls following to augment base toolbars
  //  provideWidgets?: (zoneOrPanelId: string, isPanel: boolean, currentWidgetIds: string[]) => WidgetInsertSpec[];
  //  // Called when addProvider method is called to register any control constructors that are needed to create widgets, status fields, and possibly stages.
  //  registerControls?: ();
  // ===================================================
}

/** UIProvider Registered Event Args interface.
 * @alpha
 */
export interface UiProviderRegisteredEventArgs {
  providerId: string;
}

/**
 * Controls registering of PluginUiProviders and calls the provider's methods when populating different parts of the User Interface.
 * @alpha
 */
export class PluginUiManager {
  private static _registeredPluginUiProviders: Map<string, PluginUiProvider> = new Map<string, PluginUiProvider>();

  /** Event raised any time a UiProvider is registered or unregistered. */
  public static readonly onUiProviderRegisteredEvent = new BeEvent<(ev: UiProviderRegisteredEventArgs) => void>();

  /** Return number of registered UiProvider. */
  public static get registeredProviderIds() {
    const ids = [...PluginUiManager._registeredPluginUiProviders.keys()];
    return ids;
  }

  /** Return true if there is any registered UiProvider. */
  public static get hasRegisteredProviders(): boolean {
    return this._registeredPluginUiProviders.size > 0;
  }

  /**
   * Retrieves a previously loaded PluginUiProvider.
   * @param providerId
   */
  public static getPluginUiProvider(providerId: string): PluginUiProvider | undefined {
    return PluginUiManager._registeredPluginUiProviders.get(providerId);
  }

  private static sendRegisteredEvent(ev: UiProviderRegisteredEventArgs) {
    PluginUiManager.onUiProviderRegisteredEvent.raiseEvent(ev);
  }

  /**
   * Registers a PluginUiProvider with the PluginUiManager. This method should be called by the Plugin when it is first loaded via the
   * Plugin's onLoad method. (@see [[Plugin]]).
   * @param plugin a newly instantiated subclass of Plugin.
   * @returns an array of error messages. The array will be empty if the load is successful, otherwise it is a list of one or more problems.
   */
  public static register(uiProvider: PluginUiProvider): void {
    if (PluginUiManager.getPluginUiProvider(uiProvider.id)) {
      Logger.logInfo(loggerCategory, `PluginUiProvider (${uiProvider.id}) is already loaded`);
    } else {
      PluginUiManager._registeredPluginUiProviders.set(uiProvider.id, uiProvider);
      Logger.logInfo(loggerCategory, `PluginUiProvider (${uiProvider.id}) loaded`);

      PluginUiManager.sendRegisteredEvent({ providerId: uiProvider.id } as UiProviderRegisteredEventArgs);
    }
  }

  /** Remove a specific PluginUiProvider from the list of available providers. */
  public static unregister(uiProviderId: string): void {
    if (!PluginUiManager.getPluginUiProvider(uiProviderId))
      return;

    PluginUiManager._registeredPluginUiProviders.delete(uiProviderId);
    Logger.logInfo(loggerCategory, `PluginUiProvider (${uiProviderId}) unloaded`);

    // trigger a refresh of the ui
    PluginUiManager.sendRegisteredEvent({ providerId: uiProviderId } as UiProviderRegisteredEventArgs);
  }

  /** Called when the application is populating a toolbar so that any registered PluginUiProvider can add tool buttons that either either execute
   * an action or specify a registered ToolId into toolbar.
   * @param toolBarId a string identifier that describes the toolbar being populated.
   * @param itemIds provides hierarchy of item Ids of the items that comprise the 'base' toolbar. This allows the caller to determine a relative position for buttons the provider provides.
   * @returns an array of error messages. The array will be empty if the load is successful, otherwise it is a list of one or more problems.
   */
  public static getToolbarItems(toolBarId: string): ToolbarItemInsertSpec[] {
    const insertSpecs: ToolbarItemInsertSpec[] = [];
    if (0 === PluginUiManager._registeredPluginUiProviders.size)
      return insertSpecs;

    PluginUiManager._registeredPluginUiProviders.forEach((uiProvider: PluginUiProvider) => {
      // istanbul ignore else
      if (uiProvider.provideToolbarItems) {
        uiProvider.provideToolbarItems(toolBarId).forEach((spec: ToolbarItemInsertSpec) => insertSpecs.push(spec));
      }
    });

    return insertSpecs;
  }

  /** Called when the application is populating thw statusbar so that any registered PluginUiProvider can add status fields
   * @param stageId a string identifier the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @returns An array of CommonStatusBarItem that will be used to create controls for the status bar.
   */
  public static getStatusbarItems(stageId: string, stageUsage: StageUsage): CommonStatusBarItem[] {
    const statusBarItems: CommonStatusBarItem[] = [];

    if (0 === PluginUiManager._registeredPluginUiProviders.size)
      return statusBarItems;

    PluginUiManager._registeredPluginUiProviders.forEach((uiProvider: PluginUiProvider) => {
      // istanbul ignore else
      if (uiProvider.provideStatusbarItems) {
        uiProvider.provideStatusbarItems(stageId, stageUsage).forEach((item: CommonStatusBarItem) => statusBarItems.push(item));
      }
    });
    return statusBarItems;
  }
}
