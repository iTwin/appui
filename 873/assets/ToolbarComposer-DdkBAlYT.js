import { aH as ActionButtonItemDef, d as IModelApp, aI as useAvailableUiItemsProviders, aJ as useActiveStageId, U as UiFramework, aK as UiItemsManager, aA as ToolbarOrientation, aL as Orientation, aM as Direction, aB as ToolbarUsage, aN as ToolbarPanelAlignment, aO as ToolbarDragInteractionContext, aP as Toolbar, aQ as ProcessDetector, aR as ToolbarOpacitySetting, az as isToolbarGroupItem, ay as isToolbarActionItem } from "./DefaultToolSettingsProvider-BJ7jnI_c.js";
import { L as Logger } from "./Key.enum-DfmWeVAv.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
class ToolItemDef extends ActionButtonItemDef {
  constructor(toolItemProps, onItemExecuted) {
    super(toolItemProps, onItemExecuted);
    this.toolId = "";
    if (toolItemProps.execute) {
      this._commandHandler = {
        execute: toolItemProps.execute,
        parameters: toolItemProps.parameters,
        getCommandArgs: toolItemProps.getCommandArgs
      };
    }
    this.toolId = toolItemProps.toolId;
  }
  get id() {
    return this.toolId;
  }
  /** Create a ToolItemDef that will run a registered tool. */
  static getItemDefForTool(tool, icon, ...args) {
    return new ToolItemDef({
      toolId: tool.toolId,
      icon: icon ? icon : tool.iconSpec && tool.iconSpec.length > 0 ? tool.iconSpec : void 0,
      label: () => tool.flyover,
      description: () => tool.description,
      execute: async () => IModelApp.tools.run(tool.toolId, ...args)
    });
  }
}
function mustRefresh(items, toolId) {
  return items.some((item) => {
    if ("items" in item) {
      return mustRefresh(item.items, toolId);
    }
    return item.isActive && item.id !== toolId || !item.isActive && item.id === toolId;
  });
}
function refreshItems(items, toolId) {
  return items.map((item) => "items" in item ? {
    ...item,
    isActive: item.id === toolId,
    items: refreshItems(item.items, toolId)
  } : {
    ...item,
    isActive: item.id === toolId
  });
}
function useActiveToolIdSynchedItems(itemsToSynch, syncHost) {
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setItems(refreshItems(itemsToSynch, syncHost.activeToolId));
    return syncHost.onToolActivatedEvent.addListener(({ toolId }) => {
      setItems((current) => mustRefresh(current, toolId) ? refreshItems(current, toolId) : current);
    });
  }, [itemsToSynch, syncHost.activeToolId, syncHost.onToolActivatedEvent]);
  return items;
}
const useActiveStageProvidedToolbarItems = (toolbarUsage, toolbarOrientation) => {
  const uiItemsProviderIds = useAvailableUiItemsProviders();
  const stageId = useActiveStageId();
  const [items, setItems] = reactExports.useState([]);
  const providersRef = reactExports.useRef("");
  const currentStageRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    const uiProviders = uiItemsProviderIds.join("-");
    if (providersRef.current !== uiProviders || currentStageRef.current !== stageId) {
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (frontstageDef) {
        const usage = frontstageDef.usage;
        currentStageRef.current = stageId;
        providersRef.current = uiProviders;
        const toolbarItems = UiItemsManager.getToolbarButtonItems(stageId, usage, toolbarUsage, toolbarOrientation);
        setItems(toolbarItems);
      }
    }
  }, [uiItemsProviderIds, stageId, toolbarUsage, toolbarOrientation]);
  return items;
};
function addItemToSpecifiedParentGroup(items, groupChildren) {
  const outItems = [];
  for (const toolbarItem of items) {
    if (!isToolbarGroupItem(toolbarItem)) {
      outItems.push(toolbarItem);
      continue;
    }
    const newChildren = addItemToSpecifiedParentGroup(toolbarItem.items, groupChildren);
    const foundIndices = [];
    groupChildren.forEach((entry, index) => {
      if (entry.parentGroupItemId === toolbarItem.id) {
        foundIndices.push(index);
      }
    });
    if (foundIndices.length) {
      foundIndices.sort((a, b) => a - b).reverse().forEach((foundIndex) => {
        newChildren.push(groupChildren[foundIndex]);
        groupChildren.splice(foundIndex);
      });
    }
    outItems.push({ ...toolbarItem, items: newChildren });
  }
  return outItems;
}
function cloneGroup(inGroup) {
  const childItems = [];
  inGroup.items.forEach((item) => {
    if (isToolbarGroupItem(item))
      childItems.push(cloneGroup(item));
    else
      childItems.push(item);
  });
  const clonedGroup = { ...inGroup, items: childItems };
  return clonedGroup;
}
function getItemSortValue(item) {
  const groupValue = void 0 === item.groupPriority ? 0 : item.groupPriority;
  return groupValue * 1e4 + item.itemPriority;
}
function sortItems(items) {
  return [...items].sort((a, b) => getItemSortValue(a) - getItemSortValue(b)).map((i) => {
    if (isToolbarGroupItem(i)) {
      return { ...i, items: sortItems(i.items) };
    }
    return i;
  });
}
function addIfNotDuplicate(items, groupChildren) {
  return (srcItem) => {
    if (-1 === items.findIndex((item) => item.id === srcItem.id)) {
      const toolbarItem = isToolbarGroupItem(srcItem) ? cloneGroup(srcItem) : srcItem;
      if ((isToolbarGroupItem(toolbarItem) || isToolbarActionItem(toolbarItem)) && toolbarItem.parentGroupItemId)
        groupChildren.push(toolbarItem);
      else
        items.push(toolbarItem);
    }
  };
}
function combineItems(defaultItems, addonItems) {
  let items = [];
  const groupChildren = [];
  defaultItems.forEach(addIfNotDuplicate(items, groupChildren));
  addonItems.forEach(addIfNotDuplicate(items, groupChildren));
  if (groupChildren.length) {
    items = addItemToSpecifiedParentGroup(items, groupChildren);
    groupChildren.forEach((toolbarItem) => {
      Logger.logWarning("ToolbarComposer", `Requested Parent Group [${toolbarItem.parentGroupItemId}] not found, so item [${toolbarItem.id}] is added directly to toolbar.`);
      items.push(toolbarItem);
    });
  }
  return sortItems(items);
}
const useProximityOpacitySetting = () => {
  const [proximityOpacity, setProximityOpacity] = reactExports.useState(
    UiFramework.visibility.useProximityOpacity
    // eslint-disable-line deprecation/deprecation
  );
  reactExports.useEffect(() => {
    UiFramework.onUiVisibilityChanged.addListener(
      () => setProximityOpacity(UiFramework.visibility.useProximityOpacity)
      // eslint-disable-line deprecation/deprecation
    );
  }, []);
  return proximityOpacity;
};
const useSnapWidgetOpacitySetting = () => {
  const [snapWidgetOpacity, setSnapWidgetOpacity] = reactExports.useState(UiFramework.visibility.snapWidgetOpacity);
  reactExports.useEffect(() => {
    UiFramework.onUiVisibilityChanged.addListener(() => setSnapWidgetOpacity(UiFramework.visibility.snapWidgetOpacity));
  }, []);
  return snapWidgetOpacity;
};
function ToolbarComposer(props) {
  const { usage, orientation } = props;
  const addonItems = useActiveStageProvidedToolbarItems(usage, orientation);
  const allItems = reactExports.useMemo(() => {
    return combineItems(props.items, addonItems);
  }, [props.items, addonItems]);
  const items = useActiveToolIdSynchedItems(allItems, UiFramework.frontstages);
  const toolbarOrientation = orientation === ToolbarOrientation.Horizontal ? Orientation.Horizontal : Orientation.Vertical;
  const expandsTo = toolbarOrientation === Orientation.Horizontal ? Direction.Bottom : usage === ToolbarUsage.ViewNavigation ? Direction.Left : Direction.Right;
  const panelAlignment = toolbarOrientation === Orientation.Horizontal && usage === ToolbarUsage.ViewNavigation ? ToolbarPanelAlignment.End : ToolbarPanelAlignment.Start;
  const isDragEnabled = reactExports.useContext(ToolbarDragInteractionContext);
  const useProximityOpacity = useProximityOpacitySetting();
  const snapWidgetOpacity = useSnapWidgetOpacitySetting();
  return reactExports.createElement(Toolbar, { enableOverflow: true, expandsTo, panelAlignment, items, useDragInteraction: isDragEnabled, toolbarOpacitySetting: (useProximityOpacity || snapWidgetOpacity) && !ProcessDetector.isMobileBrowser ? ToolbarOpacitySetting.Proximity : ToolbarOpacitySetting.Defaults });
}
export {
  ToolItemDef as T,
  ToolbarComposer as a
};
