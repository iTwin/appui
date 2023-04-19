/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

/* eslint-disable deprecation/deprecation */

import * as abstract from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import { IconHelper, IconSpec } from "@itwin/core-react";
import type {
  // @ts-ignore Removed in 4.0
  UiItemsManager as AbstractUiItemsManagerType,
  // @ts-ignore Removed in 4.0
  UiItemsProvider as AbstractUiItemsProvider,
  // @ts-ignore Removed in 4.0
  AbstractWidgetProps as AbstractWidget,
  // @ts-ignore Removed in 4.0
  CommonStatusBarItem as AbstractStatusBarItem,
  // @ts-ignore Removed in 4.0
  BackstageItem as AbstractBackstageItem,
  // @ts-ignore Removed in 4.0
  CommonToolbarItem as AbstractToolbarItem,
} from "@itwin/appui-abstract";
import type { UiItemsManager, UiItemsProviderOverrides } from "./UiItemsManager";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { Widget } from "../widgets/Widget";
import { ProviderItem } from "./ProviderItem";
import { UiItemsProvider } from "./UiItemsProvider";
import { ToolbarUsage, ToolbarOrientation, ToolbarItem, isToolbarActionItem, isToolbarGroupItem } from "../toolbar/ToolbarItem";
import { BackstageItem } from "../backstage/BackstageItem";
import { StatusBarItem, isStatusBarCustomItem } from "../statusbar/StatusBarItem";

// @ts-ignore Removed in 4.0
const AbstractUiItemsManager: typeof AbstractUiItemsManagerType | undefined = abstract.UiItemsManager;
// @ts-ignore Removed in 4.0
const isAbstractStatusBarCustomItem = abstract.isAbstractStatusBarCustomItem;
// @ts-ignore Removed in 4.0
type AbstractStagePanelLocation = abstract.StagePanelLocation;
// @ts-ignore Removed in 4.0
const AbstractStagePanelLocation = abstract.StagePanelLocation;
// @ts-ignore Removed in 4.0
type AbstractStagePanelSection = abstract.StagePanelSection;
// @ts-ignore Removed in 4.0
const AbstractStagePanelSection = abstract.StagePanelSection;

const AbstractToolbarItemUtilities = abstract.ToolbarItemUtilities;

const originalDataSymbol = Symbol("originalData");

/** @internal */
export function createAbstractUiItemsManagerAdapter() {
  if (!AbstractUiItemsManager)
    return undefined;
  return new AbstractUiItemsManagerAdapter(AbstractUiItemsManager);
}

type Target = Pick<typeof UiItemsManager, "getWidgets" | "getToolbarButtonItems" | "getStatusBarItems" | "getBackstageItems" | "register" | "getUiItemsProvider">;

class AbstractUiItemsManagerAdapter implements Target {
  constructor(private readonly _adaptee: typeof AbstractUiItemsManagerType) {
  }

  public register(provider: UiItemsProvider, overrides?: UiItemsProviderOverrides | undefined): void {
    let abstractProvider = getOriginalData<AbstractUiItemsProvider>(provider);
    if (!abstractProvider) {
      abstractProvider = {
        ...provider,
        provideBackstageItems: toProvideAbstractBackstageItems(provider.provideBackstageItems),
        provideStatusBarItems: toProvideAbstractStatusBarItems(provider.provideStatusBarItems),
        provideToolbarButtonItems: toProvideAbstractToolbarItems(provider.provideToolbarItems),
        provideWidgets: toProvideAbstractWidgets(provider.provideWidgets),
      };
      setOriginalData(abstractProvider, provider);
    }

    return this._adaptee.register(abstractProvider, overrides);
  }

  public getUiItemsProvider(providerId: string): UiItemsProvider | undefined {
    const abstractProvider = this._adaptee.getUiItemsProvider(providerId);
    if (!abstractProvider)
      return undefined;

    let provider = getOriginalData<UiItemsProvider>(abstractProvider);
    if (!provider) {
      provider = {
        ...abstractProvider,
        provideBackstageItems: fromProvideAbstractBackstageItems(abstractProvider.provideBackstageItems),
        provideStatusBarItems: fromProvideAbstractStatusBarItems(abstractProvider.provideStatusBarItems),
        provideToolbarItems: fromProvideAbstractToolbarItems(abstractProvider.provideToolbarButtonItems),
        provideWidgets: fromProvideAbstractWidgets(abstractProvider.provideWidgets),
      };
      setOriginalData(provider, abstractProvider);
    }

    return provider;
  }

  public getBackstageItems(): readonly ProviderItem<BackstageItem>[] {
    const abstractItems = this._adaptee.getBackstageItems();
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractBackstageItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ? abstractItem.providerId : "",
      };
    });
    return items;
  }

  public getStatusBarItems(stageId: string, stageUsage: string): readonly ProviderItem<StatusBarItem>[] {
    const abstractItems = this._adaptee.getStatusBarItems(stageId, stageUsage);
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractStatusBarItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ? abstractItem.providerId : "",
      };
    });
    return items;
  }

  public getToolbarButtonItems(stageId: string, stageUsage: string, usage: ToolbarUsage, orientation: ToolbarOrientation): readonly ProviderItem<ToolbarItem>[] {
    const abstractItems = this._adaptee.getToolbarButtonItems(stageId, stageUsage, usage, orientation);
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractToolbarItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ?? "",
      };
    });
    return items;
  }

  public getWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection | undefined): readonly ProviderItem<Widget>[] {
    const abstractWidgets = this._adaptee.getWidgets(stageId, stageUsage, location, section);
    const widgets = abstractWidgets
      // @ts-ignore Possibly 'any'
      .map((abstractWidget) => {
        const widget = fromAbstractWidget(abstractWidget);
        return {
          ...widget,
          providerId: abstractWidget.providerId ?? "",
        };
      });
    return widgets;
  }
}

function toAbstractBackstageItem(item: BackstageItem): AbstractBackstageItem {
  let abstractItem = getOriginalData<AbstractBackstageItem>(item);
  if (abstractItem)
    return abstractItem;

  const internalData = new Map();
  const icon = IconHelper.getIconData(item.icon, internalData);
  abstractItem = {
    ...item,
    badgeType: item.badge,
    icon,
    internalData,
  };
  setOriginalData(abstractItem, item);
  return abstractItem;
}

function toAbstractStatusBarItem(item: StatusBarItem): AbstractStatusBarItem {
  let abstractItem = getOriginalData<AbstractStatusBarItem>(item);
  if (abstractItem)
    return abstractItem;

  if (isStatusBarCustomItem(item)) {
    abstractItem = {
      ...item,
      badgeType: item.badge,
      isCustom: true,
      reactNode: item.content,
    } as AbstractStatusBarItem;
  } else {
    const internalData = new Map();
    const icon = IconHelper.getIconData(item.icon, internalData);
    abstractItem = {
      ...item,
      badgeType: item.badge,
      icon,
      internalData,
    };
  }
  setOriginalData(abstractItem, item);
  return abstractItem;
}

function toAbstractToolbarItem(item: ToolbarItem): AbstractToolbarItem {
  let abstractItem = getOriginalData<AbstractToolbarItem>(item);
  if (abstractItem)
    return abstractItem;

  const internalData = new Map();
  const icon = IconHelper.getIconData(item.icon, internalData);
  if (isToolbarActionItem(item)) {
    abstractItem = {
      ...item,
      badgeType: item.badge,
      icon,
      internalData,
      parentToolGroupId: item.parentGroupItemId,
    };
  } else if (isToolbarGroupItem(item)) {
    abstractItem = {
      ...item,
      badgeType: item.badge,
      icon,
      internalData,
      parentToolGroupId: item.parentGroupItemId,
      items: item.items.map((i) => toAbstractToolbarItem(i)) as any,
    };
  } else {
    abstractItem = {
      ...item,
      badgeType: item.badge,
      isCustom: true,
      icon,
      internalData,
    };
  }
  setOriginalData(abstractItem, item);
  return abstractItem;
}

function toAbstractWidget(widget: Widget): AbstractWidget {
  let abstractWidget = getOriginalData<AbstractWidget>(widget);
  if (abstractWidget)
    return abstractWidget;

  const allowedPanelTargets = widget.allowedPanels
    // @ts-ignore Possibly 'any'
    ?.map((location) => {
      const map = {
        [StagePanelLocation.Top]: "top" as const,
        [StagePanelLocation.Left]: "left" as const,
        [StagePanelLocation.Right]: "right" as const,
        [StagePanelLocation.Bottom]: "bottom" as const,
      };
      // @ts-ignore Possibly 'any'
      return map[location];
    });
  const internalData = new Map();
  const icon = IconHelper.getIconData(widget.icon, internalData);
  abstractWidget = {
    ...widget,
    id: widget.id ?? "",
    getWidgetContent: () => widget.content,
    allowedPanelTargets,
    badgeType: widget.badge,
    defaultFloatingPosition: typeof widget.canFloat === "object" ? widget.canFloat.defaultPosition : undefined,
    defaultFloatingSize: typeof widget.canFloat === "object" ? widget.canFloat.defaultSize : undefined,
    floatingContainerId: typeof widget.canFloat === "object" ? widget.canFloat.containerId : undefined,
    hideWithUiWhenFloating: typeof widget.canFloat === "object" ? widget.canFloat.hideWithUi : undefined,
    isFloatingStateSupported: !!widget.canFloat,
    isFloatingStateWindowResizable: typeof widget.canFloat === "object" ? widget.canFloat.isResizable : undefined,
    icon,
    internalData,
  };
  setOriginalData(abstractWidget, widget);
  return abstractWidget;
}

function fromAbstractBackstageItem(abstractItem: AbstractBackstageItem): BackstageItem {
  let item = getOriginalData<BackstageItem>(abstractItem);
  if (item)
    return item;

  const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
  item = {
    ...abstractItem,
    badge: abstractItem.badgeType,
    icon,
  };
  setOriginalData(item, abstractItem);
  return item;
}

function fromAbstractStatusBarItem(abstractItem: AbstractStatusBarItem): StatusBarItem {
  let item = getOriginalData<StatusBarItem>(abstractItem);
  if (item)
    return item;

  if (isAbstractStatusBarCustomItem(abstractItem)) {
    const content: React.ReactNode | undefined = (abstractItem as any).reactNode;
    return {
      ...abstractItem,
      badge: abstractItem.badgeType,
      content,
    };
  } else {
    const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
    item = {
      ...abstractItem,
      badge: abstractItem.badgeType,
      icon,
    };
  }
  assert(!!item);
  setOriginalData(item, abstractItem);
  return item;
}

function fromAbstractToolbarItem(abstractItem: AbstractToolbarItem): ToolbarItem {
  let item = getOriginalData<ToolbarItem>(abstractItem);
  if (item)
    return item;

  const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
  if (AbstractToolbarItemUtilities.isCustomDefinition(abstractItem)) {
    item = {
      ...abstractItem,
      badge: abstractItem.badgeType,
      icon,
    };
  } else {
    item = {
      ...abstractItem,
      badge: abstractItem.badgeType,
      parentGroupItemId: abstractItem.parentToolGroupId,
      icon,
    };
  }
  setOriginalData(item, abstractItem);
  return item;
}

function fromAbstractWidget(abstractWidget: AbstractWidget): Widget {
  let widget = getOriginalData<Widget>(abstractWidget);
  if (widget)
    return widget;

  const allowedPanels = abstractWidget.allowedPanelTargets
    // @ts-ignore Possibly 'any'
    ?.map((target) => {
      const map = {
        top: StagePanelLocation.Top,
        left: StagePanelLocation.Left,
        right: StagePanelLocation.Right,
        bottom: StagePanelLocation.Bottom,
      };
      // @ts-ignore Possibly 'any'
      return map[target];
    });
  const icon = fromAbstractIcon(abstractWidget.icon, abstractWidget.internalData);
  widget = {
    ...abstractWidget,
    id: abstractWidget.id ?? "",
    content: abstractWidget.getWidgetContent(),
    allowedPanels,
    badge: abstractWidget.badgeType,
    canFloat: abstractWidget.isFloatingStateSupported && {
      containerId: abstractWidget.floatingContainerId,
      defaultPosition: abstractWidget.defaultFloatingPosition,
      defaultSize: abstractWidget.defaultFloatingSize,
      hideWithUi: abstractWidget.hideWithUiWhenFloating,
      isResizable: abstractWidget.isFloatingStateWindowResizable,
    },
    icon,
  };
  setOriginalData(widget, abstractWidget);
  return widget;
}

function toProvideAbstractBackstageItems(provideItems: UiItemsProvider["provideBackstageItems"]): AbstractUiItemsProvider["provideBackstageItems"] {
  if (!provideItems)
    return undefined;
  return () => {
    const items = provideItems();
    const abstractItems = items.map((item) => toAbstractBackstageItem(item));
    return abstractItems;
  };
}

function toProvideAbstractStatusBarItems(provideItems: UiItemsProvider["provideStatusBarItems"]): AbstractUiItemsProvider["provideStatusBarItems"] {
  if (!provideItems)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage) => {
    const items = provideItems(stageId, stageUsage);
    const abstractItems = items.map((item) => toAbstractStatusBarItem(item));
    return abstractItems;
  };
}

function toProvideAbstractToolbarItems(provideItems: UiItemsProvider["provideToolbarItems"]): AbstractUiItemsProvider["provideToolbarButtonItems"] {
  if (!provideItems)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage, usage, orientation, _appData) => {
    const items = provideItems(stageId, stageUsage, usage, orientation);
    const abstractItems = items.map((item) => toAbstractToolbarItem(item));
    return abstractItems;
  };
}

function toProvideAbstractWidgets(provideWidgets: UiItemsProvider["provideWidgets"]): AbstractUiItemsProvider["provideWidgets"] {
  if (!provideWidgets)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage, abstractLocation, abstractSection, _zoneLocation, _appData) => {
    const location = fromAbstractStagePanelLocation(abstractLocation);
    const section = abstractSection === undefined ? undefined : fromAbstractStagePanelSection(abstractSection);
    const widgets = provideWidgets(stageId, stageUsage, location, section);
    const abstractWidgets = widgets.map((widget) => toAbstractWidget(widget));
    return abstractWidgets;
  };
}

function fromProvideAbstractBackstageItems(provideItems: AbstractUiItemsProvider["provideBackstageItems"]): UiItemsProvider["provideBackstageItems"] {
  if (!provideItems)
    return undefined;

  return () => {
    const abstractItems = provideItems();
    const items = abstractItems.map((abstractItem) => fromAbstractBackstageItem(abstractItem));
    return items;
  };
}

function fromProvideAbstractStatusBarItems(provideItems: AbstractUiItemsProvider["provideStatusBarItems"]): UiItemsProvider["provideStatusBarItems"] {
  if (!provideItems)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage) => {
    const abstractItems = provideItems(stageId, stageUsage);
    const items = abstractItems.map((abstractItem) => fromAbstractStatusBarItem(abstractItem));
    return items;
  };
}

function fromProvideAbstractToolbarItems(provideItems: AbstractUiItemsProvider["provideToolbarButtonItems"]): UiItemsProvider["provideToolbarItems"] {
  if (!provideItems)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage, usage, orientation) => {
    const abstractItems = provideItems(stageId, stageUsage, usage, orientation);
    const items = abstractItems.map((abstractItem) => fromAbstractToolbarItem(abstractItem));
    return items;
  };
}

function fromProvideAbstractWidgets(provideWidgets: AbstractUiItemsProvider["provideWidgets"]): UiItemsProvider["provideWidgets"] {
  if (!provideWidgets)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage, location, section) => {
    const abstractLocation = toAbstractStagePanelLocation(location);
    const abstractSection = section === undefined ? undefined : toAbstractStagePanelSection(section);
    const abstractWidgets = provideWidgets(stageId, stageUsage, abstractLocation, abstractSection);
    const widgets = abstractWidgets.map((abstractWidget) => fromAbstractWidget(abstractWidget));
    return widgets;
  };
}

function fromAbstractStagePanelLocation(location: AbstractStagePanelLocation): StagePanelLocation {
  switch (location) {
    case AbstractStagePanelLocation.Left:
      return StagePanelLocation.Left;
    case AbstractStagePanelLocation.Top:
      return StagePanelLocation.Top;
    case AbstractStagePanelLocation.TopMost:
      return StagePanelLocation.Top;
    case AbstractStagePanelLocation.Bottom:
      return StagePanelLocation.Bottom;
    case AbstractStagePanelLocation.BottomMost:
      return StagePanelLocation.Bottom;
  }
  return StagePanelLocation.Right;
}

function toAbstractStagePanelLocation(location: StagePanelLocation): AbstractStagePanelLocation {
  switch (location) {
    case StagePanelLocation.Left:
      return AbstractStagePanelLocation.Left;
    case StagePanelLocation.Top:
      return AbstractStagePanelLocation.Top;
    case StagePanelLocation.Bottom:
      return AbstractStagePanelLocation.Bottom;
  }
  return AbstractStagePanelLocation.Right;
}

function fromAbstractStagePanelSection(section: AbstractStagePanelSection): StagePanelSection {
  switch (section) {
    case AbstractStagePanelSection.End:
      return StagePanelSection.End;
  }
  return StagePanelSection.Start;
}

function toAbstractStagePanelSection(section: StagePanelSection): AbstractStagePanelSection {
  switch (section) {
    case StagePanelSection.End:
      return AbstractStagePanelSection.End;
  }
  return AbstractStagePanelSection.Start;
}

function fromAbstractIcon(icon: string | abstract.ConditionalStringValue | undefined, internalData: Map<string, any> | undefined): IconSpec {
  if (!icon)
    return undefined;
  const iconString = abstract.ConditionalStringValue.getValue(icon);
  if (!iconString)
    return undefined;
  if (iconString === IconHelper.reactIconKey && internalData)
    return internalData.get(IconHelper.reactIconKey) as React.ReactNode;
  return iconString;
}

function getOriginalData<TData>(obj: Object): TData | undefined {
  const originalData = (obj as any)[originalDataSymbol];
  if (!originalData)
    return undefined;
  return originalData;
}

function setOriginalData<TData>(obj: Object, data: TData) {
  (obj as any)[originalDataSymbol] = data;
}
