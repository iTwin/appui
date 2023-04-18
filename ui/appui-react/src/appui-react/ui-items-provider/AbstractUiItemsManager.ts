/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

/* eslint-disable deprecation/deprecation */

import type { UiItemsManager, UiItemsProviderOverrides } from "./UiItemsManager";
import * as abstract from "@itwin/appui-abstract";
import type {
  // @ts-ignore Removed in 4.0
  UiItemsManager as AbstractUiItemsManagerType,
  // @ts-ignore Removed in 4.0
  UiItemsProvider as AbstractUiItemsProvider,
  // @ts-ignore Removed in 4.0
  AbstractWidgetProps as AbstractWidget,
  // @ts-ignore Removed in 4.0
  StagePanelLocation as AbstractStagePanelLocation,
  // @ts-ignore Removed in 4.0
  StagePanelSection as AbstractStagePanelSection,
} from "@itwin/appui-abstract";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { Widget } from "../widgets/Widget";
import { ProviderItem } from "./ProviderItem";
import { UiItemsProvider } from "./UiItemsProvider";
import { ToolbarUsage, ToolbarOrientation, ToolbarItem } from "../toolbar/ToolbarItem";
import { toUIAToolbarItem } from "../toolbar/toUIAToolbarItem";

// @ts-ignore Removed in 4.0
const AbstractUiItemsManager: typeof AbstractUiItemsManagerType | undefined = abstract.UiItemsManager;
// @ts-ignore Removed in 4.0
const AbstractStagePanelLocation = abstract.StagePanelLocation;
// @ts-ignore Removed in 4.0
const AbstractStagePanelSection = abstract.StagePanelSection;

/** @internal */
export function createAbstractUiItemsManagerAdapter() {
  if (!AbstractUiItemsManager)
    return undefined;
  return new AbstractUiItemsManagerAdapter(AbstractUiItemsManager);
}

type Target = Pick<typeof UiItemsManager, "getWidgets" | "getToolbarButtonItems" | "register" | "getUiItemsProvider">;

class AbstractUiItemsManagerAdapter implements Target {
  constructor(private readonly _adaptee: typeof AbstractUiItemsManagerType) {
  }

  public register(provider: UiItemsProvider, overrides?: UiItemsProviderOverrides | undefined): void {
    const abstractProvider: AbstractUiItemsProvider = {
      id: provider.id,
      onUnregister: provider.onUnregister,
      // provideBackstageItems: provider.provideBackstageItems,
      // provideStatusBarItems: provider.provideStatusBarItems,
      provideToolbarButtonItems: toAbstractProvideToolbarItems(provider.provideToolbarItems),
      provideWidgets: toAbstractProvideWidgets(provider.provideWidgets),
    };
    return this._adaptee.register(abstractProvider, overrides);
  }

  public getUiItemsProvider(providerId: string): UiItemsProvider | undefined {
    const abstractProvider = this._adaptee.getUiItemsProvider(providerId);
    if (!abstractProvider)
      return undefined;

    return {
      id: abstractProvider.id,
      onUnregister: abstractProvider.onUnregister,
      // provideBackstageItems: provider.provideBackstageItems,
      // provideStatusBarItems: provider.provideStatusBarItems,
      provideToolbarItems: fromAbstractProvideToolbarItems(abstractProvider.provideToolbarButtonItems),
      provideWidgets: fromAbstractProvideWidgets(abstractProvider.provideWidgets),
    };
  }

  public getToolbarButtonItems(stageId: string, stageUsage: string, usage: ToolbarUsage, orientation: ToolbarOrientation): readonly ProviderItem<ToolbarItem>[] {
    const abstractWidgets = this._adaptee.getToolbarButtonItems(stageId, stageUsage, usage, orientation);
    const widgets = abstractWidgets.map((abstractWidget) => {
      return {
        ...abstractWidget,
        providerId: abstractWidget.providerId || "",
      };
    });
    return widgets;
  }

  public getWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection | undefined): readonly ProviderItem<Widget>[] {
    const abstractWidgets = this._adaptee.getWidgets(stageId, stageUsage, location, section);
    const widgets = abstractWidgets
      // @ts-ignore Possibly 'any'
      .map((abstractWidget) => {
        const widget = fromAbstractWidget(abstractWidget);
        return {
          providerId: abstractWidget.providerId ?? "",
          ...widget,
        };
      });
    return widgets;
  }
}

function fromAbstractWidget(widget: AbstractWidget): Widget {
  const allowedPanels = widget.allowedPanelTargets
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
  return {
    id: widget.id ?? "",
    content: widget.getWidgetContent(),
    allowedPanels,
    badge: widget.badgeType,
    canFloat: widget.isFloatingStateSupported && {
      containerId: widget.floatingContainerId,
      defaultPosition: widget.defaultFloatingPosition,
      defaultSize: widget.defaultFloatingSize,
      hideWithUi: widget.hideWithUiWhenFloating,
      isResizable: widget.isFloatingStateWindowResizable,
    },
    canPopout: widget.canPopout,
    defaultState: widget.defaultState,
    icon: widget.icon,
    label: widget.label,
    priority: widget.priority,
    tooltip: widget.tooltip,
  };
}

function toAbstractWidget(widget: Widget): AbstractWidget {
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
  return {
    id: widget.id ?? "",
    getWidgetContent: () => widget.content,
    allowedPanelTargets,
    badgeType: widget.badge,
    canPopout: widget.canPopout,
    defaultFloatingPosition: typeof widget.canFloat === "object" ? widget.canFloat.defaultPosition : undefined,
    defaultFloatingSize: typeof widget.canFloat === "object" ? widget.canFloat.defaultSize : undefined,
    defaultState: widget.defaultState,
    floatingContainerId: typeof widget.canFloat === "object" ? widget.canFloat.containerId : undefined,
    hideWithUiWhenFloating: typeof widget.canFloat === "object" ? widget.canFloat.hideWithUi : undefined,
    icon: widget.icon as any, // TODO:
    isFloatingStateSupported: !!widget.canFloat,
    isFloatingStateWindowResizable: typeof widget.canFloat === "object" ? widget.canFloat.isResizable : undefined,
    label: widget.label,
    priority: widget.priority,
    tooltip: widget.tooltip,
  };
}

function toAbstractProvideToolbarItems(provideItems: UiItemsProvider["provideToolbarItems"]): AbstractUiItemsProvider["provideToolbarButtonItems"] {
  if (!provideItems)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage, usage, orientation, _appData) => {
    const items = provideItems(stageId, stageUsage, usage, orientation);
    const abstractItems = items.map((item) => toUIAToolbarItem(item));
    return abstractItems;
  };
}

function fromAbstractProvideToolbarItems(provideItems: AbstractUiItemsProvider["provideToolbarButtonItems"]): UiItemsProvider["provideToolbarItems"] {
  if (!provideItems)
    return undefined;
  // @ts-ignore Possibly 'any'
  return (stageId, stageUsage, usage, orientation) => {
    const abstractItems = provideItems(stageId, stageUsage, usage, orientation);
    return abstractItems;
  };
}

function toAbstractProvideWidgets(provideWidgets: UiItemsProvider["provideWidgets"]): AbstractUiItemsProvider["provideWidgets"] {
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

function fromAbstractProvideWidgets(provideWidgets: AbstractUiItemsProvider["provideWidgets"]): UiItemsProvider["provideWidgets"] {
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
