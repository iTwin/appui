import { r as reactExports, c as classnames } from "./iframe-B3XUloxp.js";
import { L as Logger, a as BeEvent } from "./Key.enum-xIiRVwX2.js";
import { a5 as List, a1 as ConditionalBooleanValue, z as ConditionalStringValue, a6 as ListItem, a7 as Badge, w as Icon, j as Icon$1 } from "./components-react-B80bIHbV.js";
import { z as useTranslation, u as useBackstageManager, U as UiFramework, v as useActiveFrontstageId, aG as Divider, aH as isProviderItem, aI as useAvailableUiItemsProviders, t as UiItemsManager, q as useIsBackstageOpen, k as SyncUiEventDispatcher } from "./appui-react-D3IO1OPE.js";
import { D as Dialog$1 } from "./Dialog-DNSDpcXN.js";
function Backstage(props) {
  const { isOpen, onClose, showOverlay, ...rest } = props;
  const { translate } = useTranslation();
  return reactExports.createElement(
    Dialog$1,
    { className: "uifw-backstage-backstage_wrapper", placement: "top-left", isOpen, onClose, closeOnExternalClick: true, preventDocumentScroll: true, trapFocus: true, setFocus: false },
    reactExports.createElement(Dialog$1.Backdrop, { className: classnames("uifw-backstage-backstage_backdrop", !showOverlay && "uifw-transparent") }),
    reactExports.createElement(
      Dialog$1.Main,
      { "aria-label": translate("backstage.label"), ...rest, className: classnames("uifw-backstage-backstage", props.className) },
      reactExports.createElement(Dialog$1.Content, { className: "uifw-backstage-backstage_content" }, props.children)
    )
  );
}
function BackstageDivider() {
  return reactExports.createElement(Divider, { className: "uifw-backstage-backstage_divider" });
}
function BackstageGroup(props) {
  const { index, ...rest } = props;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    index > 0 ? reactExports.createElement(BackstageDivider, null) : null,
    reactExports.createElement(List, { ...rest }, props.children)
  );
}
function ItemIcon({ icon, iconNode }) {
  if (iconNode) {
    return reactExports.createElement(Icon, { "aria-hidden": "true" }, iconNode);
  }
  return reactExports.createElement(Icon$1, { iconSpec: icon });
}
function BackstageItem(props) {
  const { item, active, onClick, autoFocus, ...rest } = props;
  const descriptionId = reactExports.useId();
  const description = ConditionalStringValue.getValue(item.subtitle);
  const label = ConditionalStringValue.getValue(item.label);
  const disabled = ConditionalBooleanValue.getValue(item.isDisabled);
  return reactExports.createElement(
    ListItem,
    { "data-item-id": item.id, "data-item-type": "backstage-item", "data-item-group-priority": item.groupPriority, "data-item-priority": item.itemPriority, "data-item-provider-id": isProviderItem(item) ? item.providerId : void 0, disabled, size: "large", active, actionable: true, ...rest },
    reactExports.createElement(
      "div",
      { className: "uifw-backstage-backstage_badge" },
      reactExports.createElement(Badge, { type: item.badgeKind || item.badge })
    ),
    reactExports.createElement(
      ListItem.Icon,
      null,
      reactExports.createElement(ItemIcon, { iconNode: item.iconNode, icon: item.icon })
    ),
    reactExports.createElement(
      ListItem.Content,
      null,
      reactExports.createElement(ListItem.Action, {
        onClick,
        "aria-describedby": descriptionId,
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus,
        "aria-current": active ? "true" : void 0
      }, label),
      reactExports.createElement(ListItem.Description, { id: descriptionId }, description)
    )
  );
}
function BackstageActionItem(props) {
  const { item, ...rest } = props;
  const manager = useBackstageManager();
  const handleClick = reactExports.useCallback(() => {
    manager.close();
    item.execute();
  }, [manager, item]);
  return reactExports.createElement(BackstageItem, { item, onClick: handleClick, ...rest });
}
function BackstageStageLauncher(props) {
  const { item, ...rest } = props;
  const manager = useBackstageManager();
  const handleClick = reactExports.useCallback(() => {
    manager.close();
    if (!UiFramework.frontstages.hasFrontstage(item.stageId))
      return Logger.logError("BackstageStageLauncher", `Frontstage with id '${item.stageId}' not found`);
    void UiFramework.frontstages.setActiveFrontstage(item.stageId);
  }, [manager, item.stageId]);
  const activeFrontstageId = useActiveFrontstageId();
  const isActive = ConditionalBooleanValue.getValue(item.isActive ?? item.stageId === activeFrontstageId);
  return reactExports.createElement(BackstageItem, { item, active: isActive, onClick: handleClick, ...rest });
}
function isBackstageStageLauncher(item) {
  return "stageId" in item;
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
  const { header, showOverlay = true, items, hideSoloStageEntry, itemId, ...rest } = props;
  const [defaultItemsManager, setDefaultItemsManager] = reactExports.useState(new BackstageItemsManager(items));
  const initialItems = reactExports.useRef(items);
  reactExports.useEffect(() => {
    if (initialItems.current !== items) {
      initialItems.current = items;
      setDefaultItemsManager(new BackstageItemsManager(items));
    }
  }, [items]);
  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
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
  const combinedBackstageItems = reactExports.useMemo(() => combineItems(defaultItems, addonItems, !!hideSoloStageEntry), [defaultItems, addonItems, hideSoloStageEntry]);
  const groups = useGroupedItems(combinedBackstageItems);
  return reactExports.createElement(
    Backstage,
    { isOpen, onClose: handleClose, showOverlay, ...rest },
    header,
    groups.map((groupItems, groupIndex) => {
      return reactExports.createElement(BackstageGroup, { key: groupIndex, index: groupIndex }, groupItems.map((item, itemIndex) => {
        const autoFocus = groupIndex === 0 && itemIndex === 0;
        if (isBackstageStageLauncher(item)) {
          return reactExports.createElement(BackstageStageLauncher, {
            key: item.id,
            item,
            // eslint-disable-next-line jsx-a11y/no-autofocus -- autoFocus first item in the dialog
            autoFocus
          });
        }
        return reactExports.createElement(BackstageActionItem, {
          key: item.id,
          item,
          // eslint-disable-next-line jsx-a11y/no-autofocus -- autoFocus first item in the dialog
          autoFocus
        });
      }));
    })
  );
}
export {
  BackstageComposer as B
};
