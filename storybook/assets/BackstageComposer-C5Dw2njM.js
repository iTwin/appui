import { K as Key_enumExports, L as Logger, a as BeEvent } from "./Key.enum-CnwI7CFN.js";
import { bH as SafeAreaInsetsHelpers, x as useBackstageManager, U as UiFramework, Q as useActiveFrontstageId, bj as ConditionalBooleanValue, aX as ConditionalStringValue, bI as Badge, bJ as isProviderItem, i as Icon, H as Icon$1, bK as useAvailableUiItemsProviders, L as UiItemsManager, y as useIsBackstageOpen, bL as SafeAreaContext, n as SyncUiEventDispatcher } from "./appui-react-CEufDDhs.js";
import { r as reactExports, c as classnames } from "./iframe-BENp4d1r.js";
class Backstage extends reactExports.PureComponent {
  static defaultProps = {
    showOverlay: true
  };
  componentDidMount() {
    document.addEventListener("keydown", this._onEsc, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this._onEsc, false);
  }
  render() {
    const overlayClassName = classnames("nz-backstage-backstage_overlay", this.props.isOpen && "nz-open", this.props.showOverlay && "nz-overlay");
    const backstageClassName = classnames("nz-backstage-backstage", this.props.isOpen && "nz-open", this.props.safeAreaInsets && SafeAreaInsetsHelpers.getCssClassNames(this.props.safeAreaInsets), this.props.className);
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement("div", { className: overlayClassName, onClick: this._onClose, role: "presentation" }),
      reactExports.createElement(
        "div",
        { className: backstageClassName, style: this.props.style },
        this.props.header && reactExports.createElement("div", { className: "nz-header" }, this.props.header),
        reactExports.createElement("ul", { role: "menu" }, this.props.children),
        this.props.footer && reactExports.createElement("div", { className: "nz-footer" }, this.props.footer)
      )
    );
  }
  _onClose = () => {
    this.props.onClose && this.props.onClose();
  };
  _onEsc = (event) => {
    if (this.props.isOpen && event.key === Key_enumExports.Key.Escape.valueOf()) {
      this._onClose();
    }
  };
}
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
  return reactExports.createElement(BackstageItem, {
    itemId: item.id,
    providerId: isProviderItem(item) ? item.providerId : void 0,
    itemPriority: item.itemPriority,
    groupPriority: item.groupPriority,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    icon: reactExports.createElement(ItemIcon, { iconNode: item.iconNode, icon: item.icon }),
    isActive: ConditionalBooleanValue.getValue(item.isActive),
    isDisabled: ConditionalBooleanValue.getValue(item.isDisabled),
    onClick: handleClick,
    subtitle: ConditionalStringValue.getValue(item.subtitle),
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    badge: reactExports.createElement(Badge, { type: item.badgeKind || item.badge })
  }, ConditionalStringValue.getValue(item.label));
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
  return reactExports.createElement(BackstageItem, {
    itemId: item.id,
    providerId: isProviderItem(item) ? item.providerId : void 0,
    itemPriority: item.itemPriority,
    groupPriority: item.groupPriority,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    icon: reactExports.createElement(ItemIcon, { iconNode: item.iconNode, icon: item.icon }),
    isActive,
    isDisabled: ConditionalBooleanValue.getValue(item.isDisabled),
    onClick: handleClick,
    subtitle: ConditionalStringValue.getValue(item.subtitle),
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    badge: reactExports.createElement(Badge, { type: item.badgeKind || item.badge })
  }, ConditionalStringValue.getValue(item.label));
}
function BackstageComposerItem({ item }) {
  if (isBackstageStageLauncher(item)) {
    return reactExports.createElement(BackstageComposerStageLauncher, { item });
  }
  return reactExports.createElement(BackstageComposerActionItem, { item });
}
function ItemIcon({ icon, iconNode }) {
  if (iconNode) {
    return reactExports.createElement(Icon, null, iconNode);
  }
  return reactExports.createElement(Icon$1, { iconSpec: icon });
}
class BackstageItemsManager {
  _items = [];
  constructor(items) {
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
  /** Event raised when backstage items are changed.
   * @internal
   */
  onItemsChanged = new BeEvent();
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
  const [items, setItems] = reactExports.useState(manager ? manager.items : []);
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
export {
  BackstageComposer as B
};
