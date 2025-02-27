/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  ConditionalStringValue,
  Frontstage,
  FrontstageUtilities,
  isToolbarActionItem,
  StageUsage,
  StandardContentLayouts,
  SyncUiEventDispatcher,
  ToolbarItem,
  ToolbarItemLayouts,
  ToolbarItemUtilities,
  UiItemsManager,
  UiItemsProvider,
  useActiveFrontstageDef,
  Widget,
} from "@itwin/appui-react";
import {
  SvgAdd,
  SvgClose,
  SvgEdit,
  SvgImodel,
  SvgMapInfo,
  SvgWindowMaximize,
} from "@itwin/itwinui-icons-react";
import { ViewportContent } from "@itwin/appui-test-providers";
import styles from "./SpatialFrontstage.module.scss";
import {
  ButtonGroup,
  DropdownButton,
  Flex,
  Icon,
  IconButton,
  MenuItem,
  Surface,
  Text,
} from "@itwin/itwinui-react";

export function createSpatialFrontstage(): Frontstage {
  const frontstage = FrontstageUtilities.createStandardFrontstage({
    id: createSpatialFrontstage.stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    usage: StageUsage.General,
  });
  return {
    ...frontstage,
    layout: <SpatialLayout contextNavigation={<SpatialHeader />} />,
  };
}
createSpatialFrontstage.stageId = "spatial-frontstage";

export function createSpatialFrontstageProvider(): UiItemsProvider {
  return {
    id: "appui-test-app:spatial-items",
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createSpatialFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 10,
        label: "Spatial",
        icon: <SvgMapInfo />,
      }),
    ],
    getToolbarItems: () => [
      ToolbarItemUtilities.createActionItem({
        id: "add-tool",
        icon: <SvgAdd />,
        label: "Add",
        layouts: createSpatialToolbarItemLayouts({
          widgetId: "add-widget",
          location: "content-manipulation",
        }),
      }),
      ToolbarItemUtilities.createActionItem({
        id: "edit-tool",
        icon: <SvgEdit />,
        label: "Edit",
        layouts: createSpatialToolbarItemLayouts({
          widgetId: "edit-widget",
          location: "content-manipulation",
        }),
      }),
    ],
    getWidgets: () => [
      {
        id: "add-widget",
        content: <div>Widget `add` content</div>,
        label: "Add",
      },
      {
        id: "edit-widget",
        content: <div>Widget `edit` content</div>,
        label: "Edit",
      },
    ],
  };
}

// Additional spatial-layout specific meta-data for toolbar items.
interface SpatialLayoutToolbarItem {
  // Activates a widget with the given ID when specified.
  readonly widgetId?: string;
  // Specifies the location of the toolbar item.
  readonly location: "content-manipulation";
}

interface SpatialToolbarItemLayouts extends ToolbarItemLayouts {
  readonly spatial: SpatialLayoutToolbarItem;
}

function createSpatialToolbarItemLayouts(
  args: SpatialLayoutToolbarItem
): SpatialToolbarItemLayouts {
  return {
    spatial: {
      ...args,
    },
  };
}

type SpatialToolbarItem<T extends ToolbarItem> = T & {
  readonly layouts: SpatialToolbarItemLayouts;
};

function isSpatialToolbarItem<T extends ToolbarItem>(
  item: ToolbarItem
): item is SpatialToolbarItem<T> {
  return "spatial" in (item.layouts ?? {});
}

const SpatialLayoutContext = React.createContext<{
  activeWidget: string;
  setActiveWidget: (widget: string) => void;
}>({
  activeWidget: "",
  setActiveWidget: () => {},
});

interface SpatialLayoutProps {
  /** Customization of toolbars, alternative to using custom definitions like `SpatialLayoutToolbarItem`. */
  contextNavigation?: React.ReactNode;
}

function SpatialLayout(props: SpatialLayoutProps) {
  const toolbarItems = useToolbarItems();
  const contentManipulationItems = React.useMemo(() => {
    return toolbarItems.filter(
      (item): item is SpatialToolbarItem<typeof item> => {
        if (!isSpatialToolbarItem(item)) return false;
        return item.layouts.spatial.location === "content-manipulation";
      }
    );
  }, [toolbarItems]);
  const [activeWidget, setActiveWidget] = React.useState("");
  return (
    <SpatialLayoutContext.Provider
      value={React.useMemo(
        () => ({
          activeWidget,
          setActiveWidget,
        }),
        [activeWidget]
      )}
    >
      <div className={styles.spatialLayout}>
        {props.contextNavigation}
        <Surface className={styles.contentManipulation}>
          <ButtonGroup orientation="vertical">
            {contentManipulationItems.map((item) => {
              const widgetId = isSpatialToolbarItem(item)
                ? item.layouts?.spatial?.widgetId
                : undefined;
              return (
                <IconButton
                  key={item.id}
                  isActive={activeWidget === widgetId}
                  // TODO: see `useWidgetLabel` to handle ConditionalStringValue.
                  label={typeof item.label === "string" ? item.label : "Item"}
                  onClick={() => {
                    if (isToolbarActionItem(item)) {
                      item.execute();
                    }

                    // Toggle the active widget on and off.
                    setActiveWidget(
                      activeWidget === widgetId ? "" : widgetId ?? ""
                    );
                  }}
                >
                  {item.iconNode}
                </IconButton>
              );
            })}
          </ButtonGroup>
        </Surface>
        <Panel />
      </div>
    </SpatialLayoutContext.Provider>
  );
}

function Panel() {
  const { activeWidget, setActiveWidget } =
    React.useContext(SpatialLayoutContext);
  const [panelSize, setPanelSize] = React.useState(300);
  const widgets = useWidgets();
  const widget = React.useMemo(() => {
    if (!widgets) return undefined;
    return widgets.find((w) => w.id === activeWidget);
  }, [widgets, activeWidget]);
  const label = useWidgetLabel(widget?.label);

  if (!widget) return null;
  return (
    <Surface
      className={styles.panel}
      elevation={4}
      style={{
        width: panelSize,
      }}
    >
      <Surface.Header as={Flex} justifyContent="space-between">
        <Text variant="subheading" as="h2">
          {label}
        </Text>
        <div>
          <IconButton
            size="small"
            styleType="borderless"
            onClick={() => {
              if (panelSize === 300) setPanelSize(500);
              else setPanelSize(300);
            }}
            aria-label="Expand"
          >
            <SvgWindowMaximize />
          </IconButton>
          <IconButton
            size="small"
            styleType="borderless"
            onClick={() => {
              setActiveWidget("");
            }}
            aria-label="Close"
          >
            <SvgClose />
          </IconButton>
        </div>
      </Surface.Header>
      <Surface.Body isPadded={true}>{widget.content}</Surface.Body>
    </Surface>
  );
}

// Similar to internal `useConditionalProp`.
function useWidgetLabel(label: Widget["label"]) {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (!(label instanceof ConditionalStringValue)) {
        return () => {};
      }
      return SyncUiEventDispatcher.onSyncUiEvent.addListener(({ eventIds }) => {
        if (
          !SyncUiEventDispatcher.hasEventOfInterest(
            eventIds,
            label.syncEventIds
          )
        )
          return;
        if (!label.refresh()) return;
        onStoreChange();
      });
    },
    [label]
  );
  const getSnapshot = React.useCallback(() => {
    if (label instanceof ConditionalStringValue) return label.value;
    return label;
  }, [label]);
  return React.useSyncExternalStore(subscribe, getSnapshot);
}

// Similar to internal `useActiveStageProvidedToolbarItems`
function useWidgets() {
  const frontstageDef = useActiveFrontstageDef();
  const getWidgets = React.useCallback(() => {
    if (!frontstageDef) {
      return [];
    }
    // TODO: how about widgets from frontstage definition?
    return UiItemsManager.getFrontstageWidgets(
      frontstageDef.id,
      frontstageDef.usage
    );
  }, [frontstageDef]);
  const [widgets, setWidgets] = React.useState(() => {
    return getWidgets();
  });
  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setWidgets(getWidgets());
    });
  }, [getWidgets]);

  return widgets;
}

function useToolbarItems() {
  const frontstageDef = useActiveFrontstageDef();
  const getItems = React.useCallback(() => {
    if (!frontstageDef) {
      return [];
    }
    // TODO: how about widgets from frontstage definition?
    return UiItemsManager.getFrontstageToolbarItems(
      frontstageDef.id,
      frontstageDef.usage
    );
  }, [frontstageDef]);
  const [items, setItems] = React.useState(() => {
    return getItems();
  });
  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setItems(getItems());
    });
  }, [getItems]);

  return items;
}

function SpatialHeader() {
  // I.e. this could use toolbar item definitions as well if needed.
  const [views] = React.useState([
    "Selected view #1",
    "Selected view #2",
    "Selected view #3",
  ]);
  const [selectedView, setSelectedView] = React.useState(views[0]);
  return (
    <Surface className={styles.contextNavigation}>
      <header className={styles.header}>
        <Icon size="large">
          <SvgImodel />
        </Icon>
        <Text variant="title">Spatial Layout</Text>
        <DropdownButton // TODO: `Select` is not styled correctly in the `ButtonGroup`
          menuItems={(close) =>
            views.map((view) => (
              <MenuItem
                key={view}
                onClick={() => {
                  setSelectedView(view);
                  close();
                }}
              >
                {view}
              </MenuItem>
            ))
          }
        >
          {selectedView}
        </DropdownButton>
      </header>
    </Surface>
  );
}
