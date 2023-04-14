/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as Abstract from "@itwin/appui-abstract";
import { UiItemsProviderRegisteredEventArgs } from "./UiItemsManager";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";

/* eslint-disable deprecation/deprecation */

/**
 * Class that connects to the `appui-abstract` UiItemsManager if it exists.
 * Everything is explicitly cast as `any` to prevent all type checks if the
 * UiItemsManager is eventually removed from abstract (it should keep working...)
 * The expected types are in the function headers for validation at dev time.
 */
export class AbstractUiItemsManagerHook {
  /** Simple alias for abstract UiItemsManager (casting the module as any to prevent type error) */
  private _abstract? = (Abstract as any).UiItemsManager;
  constructor(listener: (ev: UiItemsProviderRegisteredEventArgs) => void) {
    this._abstract?.onUiProviderRegisteredEvent.addListener(listener);
  }

  public clearAllProviders() {
    this._abstract?.clearAllProviders();
  }
  public get registeredProviderIds(): string[] {
    return this._abstract?.registeredProviderIds ?? [];
  }
  public get hasRegisteredProviders(): boolean {
    return !!this._abstract?.hasRegisteredProviders;
  }
  public getUiItemsProvider(id: string): any {
    return fromAbstractUiProvider(this._abstract?.getUiItemsProvider(id));
  }
  public getToolbarButtonItems(stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation): any[] {
    return this._abstract?.getToolbarButtonItems(stageId, stageUsage, toolbarUsage, toolbarOrientation) ?? [];
  }
  public getStatusBarItems(stageId: string, stageUsage: string): any[] {
    return this._abstract?.getStatusBarItems(stageId, stageUsage).map(toStatusBarItem) ?? [];
  }
  public getBackstageItems(): any[] {
    return this._abstract?.getBackstageItems() ?? [];
  }
  public getWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection): any[] {
    // TODO: Should we query with TopMost (when Top) and BottomMost (when Bottom), and with Middle (when Start)
    return this._abstract?.getWidgets(stageId, stageUsage, location, section).map(toWidget) ?? [];
  }
}

/**
 * Convert a single abstract statusbar item
 * item: Abstract.CommonStatusBarItem,
 * return: StatusBarItem
 */
function toStatusBarItem(item: any) {// eslint-disable-line deprecation/deprecation
  return {
    providerId: item.providerId!,
    id: item.id,
    badge: item.badgeType,
    isHidden: item.isHidden,
    isDisabled: item.isDisabled,
    itemPriority: item.itemPriority,
    section: item.section,
    ...(Abstract as any)?.isAbstractStatusBarActionItem(item) ? {
      execute: item.execute,
      icon: item.icon,
      label: item.label,
      tooltip: item.tooltip,
    } : (Abstract as any)?.isAbstractStatusBarLabelItem(item) ? {
      icon: item.icon,
      label: item.label,
      labelSide: item.labelSide,
    } :
      {
        content: item.reactNode,
      },
  };
}

/**
 * Wrap `getStatusBarItems` abstract provider method to return `appui-react` status bar items.
 * provide: Abstract.UiItemsProvider["provideStatusBarItems"]
 * return: UiItemsProvider["provideStatusBarItems"]
 */
function fromAbstractStatusBarItems(provide: any): any {
  return provide ? (stageId: string, stageUsage: string) => {
    return provide(stageId, stageUsage)?.map(toStatusBarItem);
  } : undefined;
}

/**
 * Convert a single abstract widget
 * item: Abstract.AbstractWidgetProps
 * return: Widget
 */
function toWidget(item: any) {
  return {
    providerId: item.providerId!,
    id: item.id ?? item.getWidgetContent.toString(), // Not sure about that...
    allowedPanels: item.allowedPanelTargets?.map((target: string) => ({top: StagePanelLocation.Top, left: StagePanelLocation.Left, right: StagePanelLocation.Right, bottom: StagePanelLocation.Bottom}[target])),
    badge: item.badgeType,
    canFloat: item.isFloatingStateSupported && {
      containerId: item.floatingContainerId,
      defaultPosition: item.defaultFloatingPosition,
      defaultSize: item.defaultFloatingSize,
      hideWithUi: item.hideWithUiWhenFloating,
      isResizable: item.isFloatingStateWindowResizable,
    },
    canPopout: item.canPopout,
    content: item.getWidgetContent(),
    defaultState: item.defaultState,
    icon: item.icon,
    label: item.label,
    priority: item.priority,
    tooltip: item.tooltip,
  };
}

/**
 * Wrap `getWidgets` abstract provider method to return `appui-react` widgets.
 * provide: Abstract.UiItemsProvider["provideWidgets"]
 * return: UiItemsProvider["provideWidgets"]
 */
function fromAbstractWidgets(provide: any): any {
  return provide ? (stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection | undefined) => {
    return provide(stageId, stageUsage, location, section).map(toWidget);
  } : undefined;
}

/**
 * Convert abstract UiProviders on the fly when requested via react.
 * provider: Abstract.UiItemsProvider | undefined
 * return: UiItemsProvider | undefined
 */
function fromAbstractUiProvider(provider: any): any {
  return provider ? {
    id: provider.id,
    onUnregister: provider.onUnregister,
    provideBackstageItems: provider.provideBackstageItems,
    provideStatusBarItems: fromAbstractStatusBarItems(provider.provideStatusBarItems),
    provideToolbarItems: provider.provideToolbarButtonItems,
    provideWidgets: fromAbstractWidgets(provider.provideWidgets),
  } : undefined;
}
/* eslint-enable deprecation/deprecation */
