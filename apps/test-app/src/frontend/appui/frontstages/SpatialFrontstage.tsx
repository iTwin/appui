/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import styles from "./SpatialFrontstage.module.scss";
import * as React from "react";
import {
  BackstageItemUtilities,
  BackstageStageLauncher,
  ContentGroup,
  ContentLayout,
  Frontstage,
  isBackstageStageLauncher,
  isToolbarActionItem,
  ProviderItem,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  ToolbarItem,
  ToolbarItemLayouts,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
  useActiveFrontstageDef,
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
  return {
    id: createSpatialFrontstage.stageId,
    usage: StageUsage.General,
    version: 1,
    contentGroup: new ContentGroup({
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    }),
    layout: <SpatialLayout contextNavigation={<SpatialHeader />} />,
  };
}
createSpatialFrontstage.stageId = "spatial";

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
        layouts: {
          // TODO: should not be necessary to specify the standard layout.
          standard: {
            usage: ToolbarUsage.ContentManipulation,
            orientation: ToolbarOrientation.Vertical,
          },
          ...createSpatialToolbarItemLayouts({
            widgetId: "add-widget",
            location: "content-manipulation",
          }),
        },
      }),
      ToolbarItemUtilities.createActionItem({
        id: "edit-tool",
        icon: <SvgEdit />,
        label: "Edit",
        layouts: {
          standard: {
            usage: ToolbarUsage.ContentManipulation,
            orientation: ToolbarOrientation.Vertical,
          },
          ...createSpatialToolbarItemLayouts({
            widgetId: "edit-widget",
            location: "content-manipulation",
          }),
        },
      }),
    ],
    getWidgets: () => [
      {
        id: "add-widget",
        content: <div>Widget `add` content</div>,
        label: "Add",
        layouts: {
          // TODO: should not be necessary to specify the standard layout.
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.End,
          },
        },
      },
      {
        id: "edit-widget",
        content: <div>Widget `edit` content</div>,
        label: "Edit",
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.End,
          },
        },
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
  viewNavigation?: React.ReactNode;
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
        <SpatialContent />
        {props.contextNavigation}
        {props.viewNavigation}
        <Surface
          as={ButtonGroup}
          className={styles.contentManipulation}
          orientation="vertical"
        >
          {contentManipulationItems.map((item) => {
            const widgetId = isSpatialToolbarItem(item)
              ? item.layouts?.spatial?.widgetId
              : undefined;
            return (
              <IconButton
                size="large"
                key={item.id}
                isActive={activeWidget === widgetId}
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
  const label =
    typeof widget?.label === "string" ? widget.label : widget?.id ?? "Widget";

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

// Similar to internal `useActiveStageProvidedToolbarItems`
function useToolbarItems() {
  const frontstageDef = useActiveFrontstageDef();
  return React.useMemo(() => {
    if (!frontstageDef) {
      return [];
    }
    return UiItemsManager.getToolbarButtonItems(
      frontstageDef.id,
      frontstageDef.usage,
      ToolbarUsage.ContentManipulation,
      ToolbarOrientation.Vertical
    );
  }, [frontstageDef]);
}

function useWidgets() {
  const frontstageDef = useActiveFrontstageDef();
  return React.useMemo(() => {
    if (!frontstageDef) {
      return [];
    }
    return UiItemsManager.getWidgets(
      frontstageDef.id,
      frontstageDef.usage,
      StagePanelLocation.Right,
      StagePanelSection.End
    );
  }, [frontstageDef]);
}

function SpatialHeader() {
  // I.e. this could use toolbar item definitions as well if needed.
  return (
    <Surface className={styles.contextNavigation}>
      <header className={styles.header}>
        <Icon size="medium">
          <SvgImodel />
        </Icon>
        <Text variant="subheading" as="h1" style={{ whiteSpace: "nowrap" }}>
          AppUI Test App
        </Text>
        <FrontstageSelectorMenu />
      </header>
    </Surface>
  );
}

function FrontstageSelectorMenu() {
  const [backstageItems] = React.useState(() => {
    return UiItemsManager.getBackstageItems();
  });
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
  const activeStageLabel =
    typeof activeStage?.label === "string"
      ? activeStage.label
      : activeStage?.id;
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
