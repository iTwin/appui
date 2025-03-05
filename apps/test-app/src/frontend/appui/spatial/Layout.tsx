/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import styles from "./Layout.module.scss";
import * as React from "react";
import {
  BackstageItem,
  BackstageStageLauncher,
  ConditionalStringValue,
  ContentLayout,
  isBackstageStageLauncher,
  ProviderItem,
  SyncUiEventDispatcher,
  UiFramework,
  UiItemsManager,
  useActiveFrontstageDef,
  Widget,
} from "@itwin/appui-react";
import {
  SvgClose,
  SvgImodel,
  SvgWindowMaximize,
} from "@itwin/itwinui-icons-react";
import {
  DropdownButton,
  Flex,
  Icon,
  IconButton,
  MenuItem,
  Surface,
  Text,
} from "@itwin/itwinui-react";
import {
  isSpatialToolbarItem,
  SpatialToolbarItem,
} from "../spatial/SpatialToolbarItem";
import { ToolbarGroup } from "../spatial/ToolbarGroup";

export const SpatialLayoutContext = React.createContext<{
  activeWidget: string;
  setActiveWidget: (widget: string) => void;
}>({
  activeWidget: "",
  setActiveWidget: () => {},
});

interface SpatialLayoutProps {
  /** Customization of toolbars, alternative to using custom definitions like `SpatialLayoutToolbarItem`. */
  contextNavigation?: React.ReactNode;
  viewNavigation?: React.ReactNode;
}

export function SpatialLayout(props: SpatialLayoutProps) {
  // TODO: should only take care of the layout. `panel` and `contentManipulation` should be passed in as a prop.
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
        <SpatialContent />
        {props.contextNavigation}
        {props.viewNavigation}
        <ToolbarGroup
          className={styles.contentManipulation}
          items={contentManipulationItems}
        />
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

export function SpatialHeader() {
  // I.e. this could use toolbar item definitions as well if needed.
  return (
    <Surface className={styles.contextNavigation}>
      <header className={styles.header}>
        <Icon size="medium">
          <SvgImodel />
        </Icon>
        <Text variant="subheading" as="h1" style={{ whiteSpace: "nowrap" }}>
          Layout Demo
        </Text>
        <FrontstageSelectorMenu />
      </header>
    </Surface>
  );
}

function useBackstageItems() {
  const [items] = React.useState(() => {
    return UiItemsManager.getBackstageItems();
  });
  return items;
}

function useBackstageItemLabel(item: BackstageItem | undefined) {
  if (!item) return undefined;
  return typeof item.label === "string" ? item.label : item.id;
}

function FrontstageSelectorMenu() {
  const backstageItems = useBackstageItems();
  const stageLaunchers = React.useMemo(() => {
    return backstageItems.filter(
      (item): item is ProviderItem<BackstageStageLauncher> => {
        return isBackstageStageLauncher(item);
      }
    );
  }, [backstageItems]);
  const frontstageDef = useActiveFrontstageDef();
  const activeFrontstageId = frontstageDef?.id;
  const activeStage = React.useMemo(() => {
    return stageLaunchers.find(
      (stageLauncher) => stageLauncher.stageId === activeFrontstageId
    );
  }, [stageLaunchers, activeFrontstageId]);
  const activeStageLabel = useBackstageItemLabel(activeStage);
  return (
    <DropdownButton
      style={{ border: 0 }}
      size="large"
      startIcon={<>{activeStage?.iconNode}</>}
      menuItems={(close) =>
        stageLaunchers.map((stageLauncher) => {
          const label =
            typeof stageLauncher.label === "string"
              ? stageLauncher.label
              : stageLauncher.id;
          return (
            <MenuItem
              key={stageLauncher.id}
              startIcon={<>{stageLauncher.iconNode}</>}
              onClick={() => {
                void UiFramework.frontstages.setActiveFrontstage(
                  stageLauncher.stageId
                );
                close();
              }}
            >
              {label}
            </MenuItem>
          );
        })
      }
    >
      {activeStageLabel}
    </DropdownButton>
  );
}

function SpatialContent() {
  const frontstageDef = useActiveFrontstageDef();
  if (
    !frontstageDef ||
    !frontstageDef.contentLayoutDef ||
    !frontstageDef.contentGroup
  )
    return null;
  return (
    <ContentLayout
      contentLayout={frontstageDef.contentLayoutDef}
      contentGroup={frontstageDef.contentGroup}
      className={styles.content}
    />
  );
}
