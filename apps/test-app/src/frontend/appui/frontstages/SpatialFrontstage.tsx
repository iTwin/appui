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
  StageUsage,
  StandardContentLayouts,
  SyncUiEventDispatcher,
  UiItemsManager,
  UiItemsProvider,
  useActiveFrontstageDef,
  Widget,
} from "@itwin/appui-react";
import {
  SvgClose,
  SvgMapInfo,
  SvgPlaceholder,
  SvgWindowMaximize,
} from "@itwin/itwinui-icons-react";
import { ViewportContent } from "@itwin/appui-test-providers";
import styles from "./SpatialFrontstage.module.scss";
import {
  ButtonGroup,
  Flex,
  IconButton,
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
    layout: <SpatialLayout />,
  };
}
createSpatialFrontstage.stageId = "appui-test-app:spatial-frontstage";

export function createSpatialFrontstageProvider(): UiItemsProvider {
  const id = "appui-test-app:spatial-items";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createSpatialFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 10,
        label: "Spatial",
        icon: <SvgMapInfo />,
      }),
    ],
    getWidgets: () => [
      {
        id: "add",
        content: <div>Widget `add` content</div>,
        label: "Add",
      },
      {
        id: "edit",
        content: <div>Widget `edit` content</div>,
        label: "Edit",
      },
    ],
  };
}

const SpatialLayoutContext = React.createContext<{
  activeWidget: string;
  setActiveWidget: (widget: string) => void;
}>({
  activeWidget: "",
  setActiveWidget: () => {},
});

function SpatialLayout() {
  const tools = React.useMemo(() => ["Add", "Edit"], []);
  const [activeWidget, setActiveWidget] = React.useState("add");
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
        <div className={styles.toolbar}>
          <ButtonGroup>
            {tools.map((tool) => {
              const toolId = tool.toLowerCase();
              return (
                <IconButton
                  key={tool}
                  isActive={activeWidget === toolId}
                  label={tool}
                  onClick={() => {
                    setActiveWidget(toolId);
                  }}
                >
                  <SvgPlaceholder />
                </IconButton>
              );
            })}
          </ButtonGroup>
        </div>
        <Panel />
      </div>
    </SpatialLayoutContext.Provider>
  );
}

function Panel() {
  const { activeWidget, setActiveWidget } =
    React.useContext(SpatialLayoutContext);
  const [panelSize, setPanelSize] = React.useState(300);
  const frontstageDef = useActiveFrontstageDef();
  const widgets = React.useMemo(() => {
    if (!frontstageDef) return undefined;
    // TODO: new provider might be registered
    return UiItemsManager.getFrontstageWidgets(
      frontstageDef.id,
      frontstageDef.usage
    );
  }, [frontstageDef]);
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
