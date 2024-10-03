/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

/* eslint-disable @typescript-eslint/no-deprecated, @typescript-eslint/ban-ts-comment */

import * as abstract from "@itwin/appui-abstract";
import type { BeUiEvent } from "@itwin/core-bentley";
import { assert } from "@itwin/core-bentley";
import type { IconSpec } from "@itwin/core-react";
import type { BadgeKind } from "@itwin/core-react/internal";
import { BadgeType, IconHelper } from "@itwin/core-react";
import type {
  // @ts-ignore Removed in 4.0
  BackstageItem as AbstractBackstageItem,
  // @ts-ignore Removed in 4.0
  CommonStatusBarItem as AbstractStatusBarItem,
  CommonToolbarItem as AbstractToolbarItem,
  // @ts-ignore Removed in 4.0
  UiItemsManager as AbstractUiItemsManagerType,
  // @ts-ignore Removed in 4.0
  UiItemsProvider as AbstractUiItemsProvider,
  // @ts-ignore Removed in 4.0
  AbstractWidgetProps as AbstractWidget,
} from "@itwin/appui-abstract";
import type {
  UiItemsManager,
  UiItemsProviderOverrides,
  UiItemsProviderRegisteredEventArgs,
} from "./UiItemsManager.js";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import { StagePanelSection } from "../stagepanels/StagePanelSection.js";
import type { Widget } from "../widgets/Widget.js";
import type { ProviderItem } from "./ProviderItem.js";
import type { UiItemsProvider } from "./UiItemsProvider.js";
import type {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "../toolbar/ToolbarItem.js";
import {
  isToolbarActionItem,
  isToolbarGroupItem,
} from "../toolbar/ToolbarItem.js";
import type { BackstageItem } from "../backstage/BackstageItem.js";
import type { StatusBarItem } from "../statusbar/StatusBarItem.js";
import { isStatusBarCustomItem } from "../statusbar/StatusBarItem.js";

const _abstract = abstract;

// @ts-ignore Removed in 4.0
const AbstractUiItemsManager: typeof AbstractUiItemsManagerType | undefined =
  _abstract.UiItemsManager;
// @ts-ignore Removed in 4.0
const isAbstractStatusBarCustomItem = _abstract.isAbstractStatusBarCustomItem;
// @ts-ignore Removed in 4.0
type AbstractStagePanelLocation = _abstract.StagePanelLocation;
// @ts-ignore Removed in 4.0
const AbstractStagePanelLocation = _abstract.StagePanelLocation; // eslint-disable-line @typescript-eslint/no-redeclare
// @ts-ignore Removed in 4.0
type AbstractStagePanelSection = _abstract.StagePanelSection;
// @ts-ignore Removed in 4.0
const AbstractStagePanelSection = _abstract.StagePanelSection; // eslint-disable-line @typescript-eslint/no-redeclare

const AbstractToolbarItemUtilities = abstract.ToolbarItemUtilities;

const originalDataSymbol = Symbol("originalData");

/** @internal */
export function createAbstractUiItemsManagerAdapter() {
  if (!AbstractUiItemsManager) return undefined;
  return new AbstractUiItemsManagerAdapter(AbstractUiItemsManager);
}

type Target = Pick<
  typeof UiItemsManager,
  | "getWidgets"
  | "getToolbarButtonItems"
  | "getStatusBarItems"
  | "getBackstageItems"
  | "register"
  | "getUiItemsProvider"
  | "registeredProviderIds"
  | "hasRegisteredProviders"
  | "unregister"
  | "onUiProviderRegisteredEvent"
  | "clearAllProviders"
>;

class AbstractUiItemsManagerAdapter implements Target {
  constructor(private readonly _adaptee: typeof AbstractUiItemsManagerType) {}

  public clearAllProviders(): void {
    return this._adaptee.clearAllProviders();
  }

  public get onUiProviderRegisteredEvent(): BeUiEvent<UiItemsProviderRegisteredEventArgs> {
    if (!("emit" in this._adaptee.onUiProviderRegisteredEvent)) {
      (this._adaptee.onUiProviderRegisteredEvent as any).emit = (
        args: UiItemsProviderRegisteredEventArgs
      ) => {
        this._adaptee.onUiProviderRegisteredEvent.raiseEvent(args);
      };
    }
    return this._adaptee
      .onUiProviderRegisteredEvent as BeUiEvent<UiItemsProviderRegisteredEventArgs>;
  }

  public unregister(providerId: string): void {
    return this._adaptee.unregister(providerId);
  }

  public get hasRegisteredProviders(): boolean {
    return this._adaptee.hasRegisteredProviders;
  }

  public get registeredProviderIds(): string[] {
    return this._adaptee.registeredProviderIds;
  }

  public register(
    provider: UiItemsProvider,
    overrides?: UiItemsProviderOverrides | undefined
  ): void {
    const abstractProvider = createUiItemsProviderToAbstractAdapter(provider);
    return this._adaptee.register(abstractProvider, overrides);
  }

  public getUiItemsProvider(providerId: string): UiItemsProvider | undefined {
    const abstractProvider = this._adaptee.getUiItemsProvider(providerId);
    if (!abstractProvider) return undefined;

    const provider = createAbstractToUiItemsProviderAdapter(abstractProvider);
    return provider;
  }

  public getBackstageItems(): readonly ProviderItem<BackstageItem>[] {
    const abstractItems = this._adaptee.getBackstageItems();
    // @ts-ignore Possibly 'any'
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractBackstageItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ? abstractItem.providerId : "",
      };
    });
    return items;
  }

  public getStatusBarItems(
    stageId: string,
    stageUsage: string
  ): readonly ProviderItem<StatusBarItem>[] {
    const abstractItems = this._adaptee.getStatusBarItems(stageId, stageUsage);
    // @ts-ignore Possibly 'any'
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractStatusBarItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ? abstractItem.providerId : "",
      };
    });
    return items;
  }

  public getToolbarButtonItems(
    stageId: string,
    stageUsage: string,
    usage: ToolbarUsage,
    orientation: ToolbarOrientation
  ): readonly ProviderItem<ToolbarItem>[] {
    const abstractItems = this._adaptee.getToolbarButtonItems(
      stageId,
      stageUsage,
      usage,
      orientation
    );
    // @ts-ignore Possibly 'any'
    const items = abstractItems.map((abstractItem) => {
      const item = fromAbstractToolbarItem(abstractItem);
      return {
        ...item,
        providerId: abstractItem.providerId ?? "",
      };
    });
    return items;
  }

  public getWidgets(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection | undefined
  ): readonly ProviderItem<Widget>[] {
    const abstractLocations = toAbstractStagePanelLocation(location);
    const abstractSections =
      section === undefined
        ? ([undefined] as const)
        : toAbstractStagePanelSection(section);
    const combos: [
      AbstractStagePanelLocation,
      AbstractStagePanelSection | undefined // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
    ][] = [];
    abstractLocations.forEach((abstractLocation) => {
      abstractSections.forEach((abstractSection) => {
        combos.push([abstractLocation, abstractSection]);
      });
    });
    let abstractWidgets = combos.reduce<AbstractWidget[]>(
      (acc, [abstractLocation, abstractSection]) => {
        const w = this._adaptee.getWidgets(
          stageId,
          stageUsage,
          abstractLocation,
          abstractSection
        );
        acc.push(...w);
        return acc;
      },
      []
    );
    abstractWidgets = abstractWidgets.reduce<AbstractWidget[]>(
      (acc, abstractWidget) => {
        if (-1 === acc.findIndex((w) => w.id === abstractWidget.id))
          acc.push(abstractWidget);
        return acc;
      },
      []
    );
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

function createUiItemsProviderToAbstractAdapter(
  adaptee: UiItemsProvider
): AbstractUiItemsProvider {
  const {
    id,
    onUnregister,
    provideBackstageItems,
    provideStatusBarItems,
    provideWidgets,
    ...other
  } = adaptee;
  const provider = createGetPropertyAdapter(adaptee);
  return {
    id: adaptee.id,
    onUnregister: adaptee.onUnregister,
    provideBackstageItems: () => {
      const items = provider.provideBackstageItems();
      const abstractItems = items.map((item) => toAbstractBackstageItem(item));
      return abstractItems;
    },
    provideStatusBarItems: (stageId, stageUsage, _stageAppData) => {
      const items = provider.provideStatusBarItems(stageId, stageUsage);
      const abstractItems = items.map((item) => toAbstractStatusBarItem(item));
      return abstractItems;
    },
    provideToolbarButtonItems: (
      stageId,
      stageUsage,
      usage,
      orientation,
      _stageAppData
    ) => {
      const items = provider.provideToolbarItems(
        stageId,
        stageUsage,
        usage,
        orientation
      );
      const abstractItems = items.map((item) => toAbstractToolbarItem(item));
      return abstractItems;
    },
    provideWidgets: (
      stageId,
      stageUsage,
      abstractLocation,
      abstractSection,
      _zoneLocation,
      _stageAppData
    ) => {
      const location = fromAbstractStagePanelLocation(abstractLocation);
      const section =
        abstractSection === undefined
          ? undefined
          : fromAbstractStagePanelSection(abstractSection);
      const items = provider.provideWidgets(
        stageId,
        stageUsage,
        location,
        section
      );
      const abstractWidgets = items.map((item) => toAbstractWidget(item));
      return abstractWidgets;
    },
    ...other,
  };
}

function createAbstractToUiItemsProviderAdapter(
  adaptee: AbstractUiItemsProvider
): UiItemsProvider {
  const {
    id,
    onUnregister,
    provideBackstageItems,
    provideStatusBarItems,
    provideWidgets,
    ...other
  } = adaptee;
  return {
    id: adaptee.id,
    onUnregister: adaptee.onUnregister,
    provideBackstageItems: () => {
      if (!adaptee.provideBackstageItems) return [];

      const abstractItems = adaptee.provideBackstageItems();
      // @ts-ignore Possibly 'any'
      const items = abstractItems.map((abstractItem) =>
        fromAbstractBackstageItem(abstractItem)
      );
      return items;
    },
    provideStatusBarItems: (stageId, stageUsage) => {
      if (!adaptee.provideStatusBarItems) return [];

      const abstractItems = adaptee.provideStatusBarItems(stageId, stageUsage);
      // @ts-ignore Possibly 'any'
      const items = abstractItems.map((abstractItem) =>
        fromAbstractStatusBarItem(abstractItem)
      );
      return items;
    },
    provideWidgets: (stageId, stageUsage, location, section) => {
      if (!adaptee.provideWidgets) return [];

      const abstractLocations = toAbstractStagePanelLocation(location);
      const abstractSections =
        section === undefined
          ? ([undefined] as const)
          : toAbstractStagePanelSection(section);
      const combos: [
        AbstractStagePanelLocation,
        AbstractStagePanelSection | undefined // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
      ][] = [];
      abstractLocations.forEach((abstractLocation) => {
        abstractSections.forEach((abstractSection) => {
          combos.push([abstractLocation, abstractSection]);
        });
      });
      let abstractWidgets = combos.reduce<AbstractWidget[]>(
        (acc, [abstractLocation, abstractSection]) => {
          assert(!!adaptee.provideWidgets);
          const w = adaptee.provideWidgets(
            stageId,
            stageUsage,
            abstractLocation,
            abstractSection
          );
          acc.push(...w);
          return acc;
        },
        []
      );
      abstractWidgets = abstractWidgets.reduce<AbstractWidget[]>(
        (acc, abstractWidget) => {
          if (-1 === acc.findIndex((w) => w.id === abstractWidget.id))
            acc.push(abstractWidget);
          return acc;
        },
        []
      );
      const widgets = abstractWidgets.map((abstractWidget) =>
        fromAbstractWidget(abstractWidget)
      );
      return widgets;
    },
    provideToolbarItems: (stageId, stageUsage, usage, orientation) => {
      if (!adaptee.provideToolbarButtonItems) return [];

      const abstractItems = adaptee.provideToolbarButtonItems(
        stageId,
        stageUsage,
        usage,
        orientation
      );
      // @ts-ignore Possibly 'any'
      const items = abstractItems.map((abstractItem) =>
        fromAbstractToolbarItem(abstractItem)
      );
      return items;
    },
    ...other,
  };
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
function getBadgeType(badgeKind: BadgeKind | undefined) {
  switch (badgeKind) {
    case "new":
      return BadgeType.New;
    case "technical-preview":
      return BadgeType.TechnicalPreview;
    default:
      return undefined;
  }
}

function toAbstractBackstageItem(item: BackstageItem): AbstractBackstageItem {
  let abstractItem = getOriginalData<AbstractBackstageItem>(item);
  if (abstractItem) return abstractItem;

  const internalData = new Map();
  const icon = IconHelper.getIconData(item.icon, internalData);
  abstractItem = {
    ...item,
    badgeType: getBadgeType(item.badgeKind) || item.badge,
    icon,
    internalData,
  };
  setOriginalData(abstractItem, item);
  return abstractItem;
}

function toAbstractStatusBarItem(item: StatusBarItem): AbstractStatusBarItem {
  let abstractItem = getOriginalData<AbstractStatusBarItem>(item);
  if (abstractItem) return abstractItem;

  if (isStatusBarCustomItem(item)) {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      isCustom: true,
      reactNode: item.content,
    } as AbstractStatusBarItem;
  } else {
    const internalData = new Map();
    const icon = IconHelper.getIconData(item.icon, internalData);
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      icon,
      internalData,
    };
  }
  setOriginalData(abstractItem, item);
  return abstractItem;
}

function toAbstractToolbarItem(item: ToolbarItem): AbstractToolbarItem {
  let abstractItem = getOriginalData<AbstractToolbarItem>(item);
  if (abstractItem) return abstractItem;

  const internalData = new Map();
  const icon = IconHelper.getIconData(item.icon, internalData);
  if (isToolbarActionItem(item)) {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      icon,
      internalData,
      parentToolGroupId: item.parentGroupItemId,
    };
  } else if (isToolbarGroupItem(item)) {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
      icon,
      internalData,
      parentToolGroupId: item.parentGroupItemId,
      items: item.items.map((i) => toAbstractToolbarItem(i)) as any,
    };
  } else {
    abstractItem = {
      ...item,
      badgeType: getBadgeType(item.badgeKind) || item.badge,
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
  if (abstractWidget) return abstractWidget;

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
    badgeType: getBadgeType(widget.badgeKind) || widget.badge,
    defaultFloatingPosition:
      typeof widget.canFloat === "object"
        ? widget.canFloat.defaultPosition
        : undefined,
    defaultFloatingSize:
      typeof widget.canFloat === "object"
        ? widget.canFloat.defaultSize
        : undefined,
    floatingContainerId:
      typeof widget.canFloat === "object"
        ? widget.canFloat.containerId
        : undefined,
    hideWithUiWhenFloating:
      typeof widget.canFloat === "object"
        ? widget.canFloat.hideWithUi
        : undefined,
    isFloatingStateSupported: !!widget.canFloat,
    isFloatingStateWindowResizable:
      typeof widget.canFloat === "object"
        ? widget.canFloat.isResizable
        : undefined,
    icon,
    internalData,
  };
  setOriginalData(abstractWidget, widget);
  return abstractWidget;
}

function fromAbstractBackstageItem(
  abstractItem: AbstractBackstageItem
): BackstageItem {
  let item = getOriginalData<BackstageItem>(abstractItem);
  if (item) return item;

  const icon = fromAbstractIcon(abstractItem.icon, abstractItem.internalData);
  item = {
    ...abstractItem,
    badge: abstractItem.badgeType,
    icon,
  };
  assert(!!item);
  setOriginalData(item, abstractItem);
  return item;
}

function fromAbstractStatusBarItem(
  abstractItem: AbstractStatusBarItem
): StatusBarItem {
  let item = getOriginalData<StatusBarItem>(abstractItem);
  if (item) return item;

  if (isAbstractStatusBarCustomItem(abstractItem)) {
    const content: React.ReactNode | undefined = (abstractItem as any)
      .reactNode;
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

function fromAbstractToolbarItem(
  abstractItem: AbstractToolbarItem
): ToolbarItem {
  let item = getOriginalData<ToolbarItem>(abstractItem);
  if (item) return item;

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
  if (widget) return widget;

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
  const icon = fromAbstractIcon(
    abstractWidget.icon,
    abstractWidget.internalData
  );
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
  assert(!!widget);
  setOriginalData(widget, abstractWidget);
  return widget;
}

function fromAbstractStagePanelLocation(
  location: AbstractStagePanelLocation
): StagePanelLocation {
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

function toAbstractStagePanelLocation(
  location: StagePanelLocation
): AbstractStagePanelLocation[] {
  switch (location) {
    case StagePanelLocation.Left:
      return [AbstractStagePanelLocation.Left];
    case StagePanelLocation.Top:
      return [
        AbstractStagePanelLocation.Top,
        AbstractStagePanelLocation.TopMost,
      ];
    case StagePanelLocation.Bottom:
      return [
        AbstractStagePanelLocation.Bottom,
        AbstractStagePanelLocation.BottomMost,
      ];
  }
  return [AbstractStagePanelLocation.Right];
}

function fromAbstractStagePanelSection(
  section: AbstractStagePanelSection
): StagePanelSection {
  switch (section) {
    case AbstractStagePanelSection.End:
      return StagePanelSection.End;
  }
  return StagePanelSection.Start;
}

function toAbstractStagePanelSection(
  section: StagePanelSection
): AbstractStagePanelSection[] {
  switch (section) {
    case StagePanelSection.End:
      return [AbstractStagePanelSection.End];
  }
  return [AbstractStagePanelSection.Start, AbstractStagePanelSection.Middle];
}

function fromAbstractIcon(
  icon: string | abstract.ConditionalStringValue | undefined,
  internalData: Map<string, any> | undefined
): IconSpec {
  if (!icon) return undefined;
  const iconString = abstract.ConditionalStringValue.getValue(icon);
  if (!iconString) return undefined;
  if (iconString === IconHelper.reactIconKey && internalData)
    return internalData.get(IconHelper.reactIconKey) as React.ReactNode;
  return iconString;
}

function getOriginalData<TData>(obj: Object): TData | undefined {
  const originalData = (obj as any)[originalDataSymbol];
  if (!originalData) return undefined;
  return originalData;
}

function setOriginalData<TData>(obj: Object, data: TData) {
  (obj as any)[originalDataSymbol] = data;
}

/** Maps items of existing `get` properties to `provide` properties, otherwise uses `provide` properties.
 * @internal
 */
export function createGetPropertyAdapter(provider: UiItemsProvider) {
  return {
    ...provider,
    provideBackstageItems: () => {
      return (
        provider.getBackstageItems?.() ??
        provider.provideBackstageItems?.() ??
        []
      );
    },
    provideStatusBarItems: (stageId, stageUsage) => {
      return (
        provider.getStatusBarItems?.() ??
        provider.provideStatusBarItems?.(stageId, stageUsage) ??
        []
      );
    },
    provideToolbarItems: (stageId, stageUsage, usage, orientation) => {
      if (provider.getToolbarItems) {
        return provider.getToolbarItems().filter((item) => {
          const layout = item.layouts?.standard;
          if (!layout) return false;
          return layout.usage === usage && layout.orientation === orientation;
        });
      }
      return (
        provider.provideToolbarItems?.(
          stageId,
          stageUsage,
          usage,
          orientation
        ) ?? []
      );
    },
    provideWidgets: (stageId, stageUsage, location, section) => {
      if (provider.getWidgets) {
        return provider.getWidgets().filter((item) => {
          const layout = item.layouts?.standard;
          if (!layout) return false;
          return layout.location === location && layout.section === section;
        });
      }
      return (
        provider.provideWidgets?.(stageId, stageUsage, location, section) ?? []
      );
    },
  } satisfies UiItemsProvider;
}
