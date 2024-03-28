var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { c as classnames, aV as SafeAreaInsetsHelpers, aW as useBackstageManager, aX as isProviderItem, aD as Icon, ai as ConditionalBooleanValue, y as ConditionalStringValue, aY as BadgeUtilities, U as UiFramework, a9 as Logger, aZ as useActiveFrontstageId, a_ as BeEvent, ak as useAvailableUiItemsProviders, am as UiItemsManager, a$ as useIsBackstageOpen, b0 as SafeAreaContext, b1 as Backstage, aJ as SyncUiEventDispatcher, b2 as ToolbarIcon, b3 as useWidgetOpacityContext, a7 as StandardContentLayouts, a8 as IModelViewportControl } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
import { r as reactExports } from "./index-DlkhCVTf.js";
import "./index-Cm_5MPU1.js";
import { A as AppUiStory, c as createFrontstageProvider } from "./AppUiStory-JB1HrQrm.js";
class BackstageSeparator extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-backstage-separator", this.props.className);
    return reactExports.createElement("li", { className, style: this.props.style, role: "separator" });
  }
}
class BackstageItem extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-backstage-item", this.props.isActive && "nz-active", this.props.isDisabled && "nz-disabled", this.props.safeAreaInsets && SafeAreaInsetsHelpers.getCssClassNames(this.props.safeAreaInsets), this.props.className);
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      reactExports.createElement(
        "li",
        { "data-item-id": this.props.itemId, "data-item-type": "backstage-item", "data-item-group-priority": this.props.groupPriority, "data-item-priority": this.props.itemPriority, "data-item-provider-id": this.props.providerId, className, onClick: this.props.onClick, style: this.props.style, role: "menuitem" },
        reactExports.createElement("div", { className: "nz-icon" }, this.props.icon),
        this.props.badge && reactExports.createElement("div", { className: "nz-badge" }, this.props.badge),
        reactExports.createElement(
          "div",
          null,
          reactExports.createElement("span", null, this.props.children),
          this.props.subtitle && reactExports.createElement("span", null, this.props.subtitle)
        )
      )
    );
  }
}
function isBackstageStageLauncher(item) {
  return "stageId" in item;
}
function BackstageComposerActionItem({ item }) {
  const manager = useBackstageManager();
  const handleClick = reactExports.useCallback(() => {
    manager.close();
    item.execute();
  }, [manager, item]);
  return reactExports.createElement(BackstageItem, { itemId: item.id, providerId: isProviderItem(item) ? item.providerId : void 0, itemPriority: item.itemPriority, groupPriority: item.groupPriority, icon: reactExports.createElement(Icon, { iconSpec: item.icon }), isActive: ConditionalBooleanValue.getValue(item.isActive), isDisabled: ConditionalBooleanValue.getValue(item.isDisabled), onClick: handleClick, subtitle: ConditionalStringValue.getValue(item.subtitle), badge: BadgeUtilities.getComponentForBadgeType(item.badge) }, ConditionalStringValue.getValue(item.label));
}
function BackstageComposerStageLauncher({ item }) {
  const manager = useBackstageManager();
  const handleClick = reactExports.useCallback(() => {
    manager.close();
    if (!UiFramework.frontstages.hasFrontstage(item.stageId))
      return Logger.logError("BackstageComposerStageLauncher", `Frontstage with id '${item.stageId}' not found`);
    void UiFramework.frontstages.setActiveFrontstage(item.stageId);
  }, [manager, item.stageId]);
  const activeFrontstageId = useActiveFrontstageId();
  const isActive = ConditionalBooleanValue.getValue(item.isActive ?? item.stageId === activeFrontstageId);
  return reactExports.createElement(BackstageItem, { itemId: item.id, providerId: isProviderItem(item) ? item.providerId : void 0, itemPriority: item.itemPriority, groupPriority: item.groupPriority, icon: reactExports.createElement(Icon, { iconSpec: item.icon }), isActive, isDisabled: ConditionalBooleanValue.getValue(item.isDisabled), onClick: handleClick, subtitle: ConditionalStringValue.getValue(item.subtitle), badge: BadgeUtilities.getComponentForBadgeType(item.badge) }, ConditionalStringValue.getValue(item.label));
}
function BackstageComposerItem({ item }) {
  if (isBackstageStageLauncher(item)) {
    return reactExports.createElement(BackstageComposerStageLauncher, { item });
  }
  return reactExports.createElement(BackstageComposerActionItem, { item });
}
class BackstageItemsManager {
  constructor(items) {
    this._items = [];
    this.onItemsChanged = new BeEvent();
    if (items)
      this.loadItemsInternal(items, true, false);
  }
  loadItemsInternal(items, processConditions, sendItemChanged) {
    if (processConditions && items) {
      const eventIds = BackstageItemsManager.getSyncIdsOfInterest(items);
      if (0 !== eventIds.length) {
        const { itemsUpdated, updatedItems } = this.internalRefreshAffectedItems(items, new Set(eventIds));
        if (itemsUpdated)
          items = updatedItems;
      }
    }
    this._items = items;
    if (sendItemChanged)
      this.onItemsChanged.raiseEvent({ items });
  }
  /** load items but do not fire onItemsChanged
   * @internal
   */
  loadItems(items) {
    this.loadItemsInternal(items, true, false);
  }
  get items() {
    return this._items;
  }
  set items(items) {
    if (items !== this._items)
      this.loadItemsInternal(items, true, true);
  }
  /** @internal */
  add(itemOrItems) {
    let itemsToAdd;
    if (!Array.isArray(itemOrItems))
      itemsToAdd = [itemOrItems];
    else {
      itemsToAdd = itemOrItems.filter((itemToAdd, index) => itemOrItems.findIndex((item) => item.id === itemToAdd.id) === index);
    }
    itemsToAdd = itemsToAdd.filter((itemToAdd) => this._items.find((item) => item.id === itemToAdd.id) === void 0);
    if (itemsToAdd.length === 0)
      return;
    const items = [...this._items, ...itemsToAdd];
    this.items = items;
  }
  /** @internal */
  remove(itemIdOrItemIds) {
    const items = this._items.filter((item) => {
      return Array.isArray(itemIdOrItemIds) ? !itemIdOrItemIds.find((itemId) => itemId === item.id) : item.id !== itemIdOrItemIds;
    });
    this.items = items;
  }
  /** @internal */
  static getSyncIdsOfInterest(items) {
    const eventIds = /* @__PURE__ */ new Set();
    items.forEach((item) => {
      for (const [, entry] of Object.entries(item)) {
        if (entry instanceof ConditionalBooleanValue) {
          entry.syncEventIds.forEach((eventId) => eventIds.add(eventId.toLowerCase()));
        } else if (entry instanceof ConditionalStringValue) {
          entry.syncEventIds.forEach((eventId) => eventIds.add(eventId.toLowerCase()));
        }
      }
    });
    return [...eventIds.values()];
  }
  internalRefreshAffectedItems(items, eventIds) {
    if (0 === eventIds.size)
      return { itemsUpdated: false, updatedItems: [] };
    let updateRequired = false;
    const newItems = [];
    for (const item of items) {
      const updatedItem = { ...item };
      for (const [, entry] of Object.entries(updatedItem)) {
        if (entry instanceof ConditionalBooleanValue) {
          if (ConditionalBooleanValue.refreshValue(entry, eventIds))
            updateRequired = true;
        } else if (entry instanceof ConditionalStringValue) {
          if (ConditionalStringValue.refreshValue(entry, eventIds))
            updateRequired = true;
        }
      }
      newItems.push(updatedItem);
    }
    return { itemsUpdated: updateRequired, updatedItems: newItems };
  }
  refreshAffectedItems(eventIds) {
    if (0 === eventIds.size)
      return;
    const { itemsUpdated, updatedItems } = this.internalRefreshAffectedItems(this.items, eventIds);
    if (itemsUpdated)
      this.loadItemsInternal(updatedItems, false, true);
  }
}
const useDefaultBackstageItems = (manager) => {
  const [items, setItems] = reactExports.useState(manager.items);
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else {
      setItems(manager.items);
    }
  }, [manager, manager.items]);
  reactExports.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
const useUiItemsProviderBackstageItems = (manager) => {
  const uiItemProviderIds = useAvailableUiItemsProviders();
  const [items, setItems] = reactExports.useState(manager ? manager.items : (
    /* istanbul ignore next */
    []
  ));
  const providersRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    const uiProviders = uiItemProviderIds.join("-");
    if (providersRef.current !== uiProviders) {
      providersRef.current = uiProviders;
      const backstageItems = UiItemsManager.getBackstageItems();
      manager.loadItems(backstageItems);
      setItems(manager.items);
    }
  }, [manager, uiItemProviderIds]);
  reactExports.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
function useBackstageItemSyncEffect(itemsManager, syncIdsOfInterest) {
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      itemsManager.refreshAffectedItems(new Set(syncIdsOfInterest));
    }
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (0 === syncIdsOfInterest.length)
        return;
      if (syncIdsOfInterest.some((value) => args.eventIds.has(value.toLowerCase()))) {
        itemsManager.refreshAffectedItems(args.eventIds);
      }
    });
  }, [itemsManager, itemsManager.items, syncIdsOfInterest]);
}
function combineItems(stageItems, addonItems, hideSoloStageEntry) {
  let items = [];
  if (stageItems.length) {
    stageItems.forEach((srcItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        items.push(srcItem);
      }
    });
  }
  if (addonItems.length) {
    addonItems.forEach((srcItem) => {
      if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
        items.push(srcItem);
      }
    });
  }
  if (hideSoloStageEntry) {
    const numberOfFrontstageItems = items.reduce((accumulator, item) => accumulator + (isBackstageStageLauncher(item) ? 1 : 0), 0);
    if (1 === numberOfFrontstageItems)
      items = items.filter((item) => !isBackstageStageLauncher(item));
  }
  return items;
}
const useGroupedItems = (items) => {
  return reactExports.useMemo(() => {
    const grouped = items.reduce((acc, item) => {
      if (ConditionalBooleanValue.getValue(item.isHidden))
        return acc;
      const groupIndex = acc.findIndex((group) => group[0].groupPriority === item.groupPriority);
      if (groupIndex >= 0)
        return [
          ...acc.slice(0, groupIndex),
          [...acc[groupIndex], item],
          ...acc.slice(groupIndex + 1)
        ];
      return [...acc, [item]];
    }, []);
    const sortedGroups = grouped.reduce((acc, group) => {
      const sortedGroup = [...group].sort((a, b) => a.itemPriority - b.itemPriority);
      return [...acc, sortedGroup];
    }, []);
    return [...sortedGroups].sort((a, b) => a[0].groupPriority - b[0].groupPriority);
  }, [items]);
};
function BackstageComposer(props) {
  const [defaultItemsManager, setDefaultItemsManager] = reactExports.useState(new BackstageItemsManager(props.items));
  const initialItems = reactExports.useRef(props.items);
  reactExports.useEffect(() => {
    if (initialItems.current !== props.items) {
      initialItems.current = props.items;
      setDefaultItemsManager(new BackstageItemsManager(props.items));
    }
  }, [props.items]);
  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
  const safeAreaInsets = reactExports.useContext(SafeAreaContext);
  const handleClose = reactExports.useCallback(() => {
    manager.close();
  }, [manager]);
  const defaultItems = useDefaultBackstageItems(defaultItemsManager);
  const syncIdsOfInterest = reactExports.useMemo(() => BackstageItemsManager.getSyncIdsOfInterest(defaultItems), [defaultItems]);
  useBackstageItemSyncEffect(defaultItemsManager, syncIdsOfInterest);
  const [addonItemsManager] = reactExports.useState(new BackstageItemsManager());
  const addonItems = useUiItemsProviderBackstageItems(addonItemsManager);
  const addonSyncIdsOfInterest = reactExports.useMemo(() => BackstageItemsManager.getSyncIdsOfInterest(addonItems), [addonItems]);
  useBackstageItemSyncEffect(addonItemsManager, addonSyncIdsOfInterest);
  const combinedBackstageItems = reactExports.useMemo(() => combineItems(defaultItems, addonItems, !!props.hideSoloStageEntry), [defaultItems, addonItems, props.hideSoloStageEntry]);
  const groups = useGroupedItems(combinedBackstageItems);
  return reactExports.createElement(Backstage, { className: props.className, header: props.header, isOpen, onClose: handleClose, safeAreaInsets, showOverlay: props.showOverlay, style: props.style }, groups.map((group, groupIndex) => group.map((item, itemIndex) => {
    const composerItem = reactExports.createElement(BackstageComposerItem, { item, key: item.id });
    return itemIndex === 0 && groupIndex > 0 ? reactExports.createElement(
      reactExports.Fragment,
      { key: groupIndex },
      reactExports.createElement(BackstageSeparator, null),
      composerItem
    ) : composerItem;
  })));
}
const widgetIconSvg = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20enable-background='new%200%200%2016%2016'%3e%3cpath%20d='m2%2014.6c0%200%200%20.4.3.4.5%200%204.7%200%204.7%200v-4h2v4h4.5c.5%200%20.5-.4.5-.4v-6.1l-6-4.5-6%204.5v6.1'/%3e%3cpath%20d='m14%205.3v-3.3h-2v1.8l-4-2.8-8%205.7%201%201.3%207-5%207%205%201-1.3z'/%3e%3c/svg%3e";
class AppButton extends reactExports.PureComponent {
  render() {
    const { className, small, ...props } = this.props;
    const buttonClassName = small ? classnames("nz-toolbar-button-app-small", className) : classnames("nz-toolbar-button-app", className);
    return reactExports.createElement(
      ToolbarIcon,
      { className: buttonClassName, icon: this.props.icon, small: !!small, ...props },
      reactExports.createElement(
        "div",
        { className: "nz-bars" },
        reactExports.createElement("div", { className: "nz-bar" }),
        reactExports.createElement("div", { className: "nz-bar" }),
        reactExports.createElement("div", { className: "nz-bar" })
      )
    );
  }
}
function BackstageAppButton(props) {
  const backstageToggleCommand = reactExports.useMemo(() => UiFramework.backstage.getBackstageToggleCommand(props.icon), [props.icon]);
  const backstageLabel = reactExports.useMemo(() => props.label || backstageToggleCommand.tooltip, [backstageToggleCommand.tooltip, props.label]);
  const [icon, setIcon] = reactExports.useState(props.icon ? props.icon : widgetIconSvg);
  const isInitialMount = reactExports.useRef(true);
  const divClassName = "uifw-app-button-small";
  const { onElementRef, proximityScale } = useWidgetOpacityContext();
  const ref = reactExports.useRef(null);
  const handleClick = reactExports.useCallback(() => {
    if (props.execute)
      props.execute();
    else
      backstageToggleCommand.execute();
  }, [backstageToggleCommand, props]);
  reactExports.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onElementRef(ref);
    } else {
      setIcon(props.icon ? props.icon : widgetIconSvg);
    }
  }, [props.icon, onElementRef]);
  let buttonProximityScale;
  if ((UiFramework.visibility.useProximityOpacity || // eslint-disable-line deprecation/deprecation
  UiFramework.visibility.snapWidgetOpacity) && !UiFramework.isMobile()) {
    buttonProximityScale = proximityScale;
  }
  return reactExports.createElement(
    "div",
    { ref, className: divClassName },
    reactExports.createElement(AppButton, { small: true, mouseProximity: buttonProximityScale, onClick: handleClick, icon: reactExports.createElement(Icon, { iconSpec: icon }), title: backstageLabel })
  );
}
function HookStory() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, {
    appBackstage: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageComposer, {}),
    frontstageProviders: () => [createFrontstageProvider({
      contentGroupProps: {
        id: "ViewportContentGroup",
        layout: StandardContentLayouts.singleView,
        contents: [{
          id: "ViewportContent",
          classId: IModelViewportControl
        }]
      },
      cornerButton: /* @__PURE__ */ jsxRuntimeExports.jsx(BackstageAppButton, {
        label: "Toggle Backstage",
        icon: "icon-bentley-systems",
        execute: () => {
          UiFramework.backstage.getBackstageToggleCommand().execute();
        }
      })
    })],
    demoIModel: true,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Initialized, {})
  });
}
function Initialized() {
  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("code", {
      children: ["isOpen: ", String(isOpen)]
    })
  });
}
const meta = {
  title: "Hooks/useIsBackstageOpen",
  component: HookStory
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
const stories = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Basic,
  __namedExportsOrder,
  default: meta
}, Symbol.toStringTag, { value: "Module" }));
export {
  Basic as B,
  stories as s
};
