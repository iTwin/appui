/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import "@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BlueButton, HollowButton } from "@bentley/bwc/lib/bwc";
import { Timer, withTimeout } from "@bentley/ui-core";
import App from "@src/app/App";
import Content from "@src/app/Content";
import AppButton from "@src/widget/tools/button/App";
import MouseTracker from "@src/context/MouseTracker";
import Footer from "@src/footer/Footer";
import MessageCenter, { MessageCenterButton } from "@src/footer/message-center/MessageCenter";
import MessageCenterIndicator from "@src/footer/message-center/Indicator";
import MessageCenterMessage from "@src/footer/message-center/Message";
import MessageCenterTab from "@src/footer/message-center/Tab";
import SnapModeDialog from "@src/footer/snap-mode/Dialog";
import SnapModeIcon from "@src/footer/snap-mode/Icon";
import SnapModeIndicator from "@src/footer/snap-mode/Indicator";
import SnapRow from "@src/footer/snap-mode/Snap";
import ToolAssistanceIndicator from "@src/footer/tool-assistance/Indicator";
import ToolAssistanceDialog from "@src/footer/tool-assistance/Dialog";
import ToolAssistanceItem from "@src/footer/tool-assistance/Item";
import ToolAssistanceSeparator from "@src/footer/tool-assistance/Separator";
import ActivityMessage from "@src/footer/message/Activity";
import StatusMessage from "@src/footer/message/content/status/Message";
import StatusLayout from "@src/footer/message/content/status/Layout";
import Status from "@src/footer/message/content/status/Status";
import MessageLabel from "@src/footer/message/content/Label";
import MessageButton from "@src/footer/message/content/Button";
import MessageProgress from "@src/footer/message/content/Progress";
import MessageHyperlink from "@src/footer/message/content/Hyperlink";
import MessageDialog from "@src/footer/message/content/dialog/Dialog";
import MessageTitleBar from "@src/footer/message/content/dialog/TitleBar";
import MessageTitle from "@src/footer/message/content/dialog/Title";
import MessageDialogButton from "@src/footer/message/content/dialog/Button";
import MessageDialogButtonsContent from "@src/footer/message/content/dialog/content/Buttons";
import MessageDialogScrollableContent from "@src/footer/message/content/dialog/content/Scrollable";
import DialogResizeHandle from "@src/footer/message/content/dialog/ResizeHandle";
import ModalMessage from "@src/footer/message/Modal";
import StickyMessage from "@src/footer/message/Sticky";
import TemporaryMessage from "@src/footer/message/Temporary";
import ToastMessage, { Stage as ToastMessageStage } from "@src/footer/message/Toast";
import NestedToolSettings from "@src/widget/tool-settings/Nested";
import ScrollableArea from "@src/widget/tool-settings/ScrollableArea";
import PopoverToggle from "@src/widget/tool-settings/Toggle";
import ToolSettings from "@src/widget/tool-settings/Settings";
import Tooltip from "@src/widget/tool-settings/Tooltip";
import ToolSettingsWidgetTab from "@src/widget/tool-settings/Tab";
import ToolSettingsWidget from "@src/widget/ToolSettings";
import ExpandableItem from "@src/toolbar/item/expandable/Expandable";
import OverflowItem from "@src/toolbar/item/Overflow";
import GroupColumn from "@src/toolbar/item/expandable/group/Column";
import GroupTool from "@src/toolbar/item/expandable/group/tool/Tool";
import ToolGroupExpander from "@src/toolbar/item/expandable/group/tool/Expander";
import { GroupWithContainIn as ToolGroupComponent } from "@src/toolbar/item/expandable/group/Group";
import { NestedWithContainIn as NestedToolGroup } from "@src/toolbar/item/expandable/group/Nested";
import HistoryIcon from "@src/toolbar/item/expandable/history/Icon";
import HistoryTray, { History, DefaultHistoryManager } from "@src/toolbar/item/expandable/history/Tray";
import ToolbarIcon from "@src/toolbar/item/Icon";
import Toolbar, { ToolbarPanelAlignment } from "@src/toolbar/Toolbar";
import ScrollableToolbar from "@src/toolbar/Scrollable";
import Direction from "@src/utilities/Direction";
import { PointProps } from "@src/utilities/Point";
import Size from "@src/utilities/Size";
import ResizeHandle from "@src/widget/rectangular/ResizeHandle";
import WidgetTab from "@src/widget/rectangular/tab/Draggable";
import TabSeparator from "@src/widget/rectangular/tab/Separator";
import WidgetTabGroup, { VisibilityMode } from "@src/widget/rectangular/tab/Group";
import { TabMode } from "@src/widget/rectangular/tab/Tab";
import StackedWidget, { HorizontalAnchor } from "@src/widget/Stacked";
import ToolsWidget from "@src/widget/tools/Tools";
import FooterZone from "@src/zones/Footer";
import NineZone, { getDefaultProps as getDefaultNineZone, NineZoneProps, WidgetZoneIndex } from "@src/zones/state/NineZone";
import NineZoneManager from "@src/zones/state/Manager";
import { WidgetProps } from "@src/zones/state/Widget";
import { TargetType } from "@src/zones/state/Target";
import { ZoneProps, DropTarget } from "@src/zones/state/Zone";
import TargetContainer from "@src/zones/target/Container";
import MergeTarget from "@src/zones/target/Merge";
import BackTarget from "@src/zones/target/Back";
import Zone from "@src/zones/Zone";
import Zones from "@src/zones/Zones";
import GhostOutline from "@src/zones/GhostOutline";
import ThemeContext from "@src/theme/Context";
import Theme, { DarkTheme, PrimaryTheme, LightTheme } from "@src/theme/Theme";
import { offsetAndContainInContainer } from "@src/popup/tooltip/Tooltip";
import "./Zones.scss";

const adjustTooltipPosition = offsetAndContainInContainer();
// tslint:disable-next-line:variable-name
const TooltipWithTimeout = withTimeout(Tooltip);

export interface State {
  tools: Tools;
  activeTab: MessageCenterActiveTab;
  isPopoverOpen: boolean;
  isNestedPopoverOpen: boolean;
  isTooltipVisible: boolean;
  visibleMessage: Message;
  mousePosition: PointProps;
  temporaryMessageX: number;
  temporaryMessageY: number;
  isTemporaryMessageVisible: boolean;
  toastMessageStage: ToastMessageStage;
  openWidget: FooterWidget;
  secondZoneContent: SecondZoneContent;
  nineZone: NineZoneProps;
  isOverflowItemOpen: boolean;
  currentTheme: Theme;
  showAllItems: boolean;
}

export enum MessageCenterActiveTab {
  AllMessages,
  Problems,
}

export enum SecondZoneContent {
  None,
  Minimized,
  ToolSettings,
}

export enum Message {
  None,
  Activity,
  Modal,
  Toast,
  Sticky,
}

export enum FooterWidget {
  None,
  ToolAssistance,
  Messages,
  SnapMode,
}

export interface HistoryItem {
  toolKey: string;
  trayKey: string;
  columnKey: string;
  itemKey: string;
}

export interface ToolGroupItem {
  icon: string;
  trayId: string | undefined;
  isDisabled?: boolean;
}

export interface ToolGroupColumn {
  items: { [key: string]: ToolGroupItem };
}

export interface ToolGroupTray {
  title: string;
  columns: { [key: string]: ToolGroupColumn };
}

export interface Tools {
  [key: string]: SimpleTool | ToolGroup;
}

export interface SimpleTool {
  icon: string;
  isDisabled?: boolean;
}

export interface ToolGroup {
  icon: string;
  trayId: string;
  backTrays: ReadonlyArray<string>;
  trays: { [key: string]: ToolGroupTray };
  direction: Direction;
  history: History<HistoryItem>;
  isExtended: boolean;
  isToolGroupOpen: boolean;
  isDisabled?: boolean;
}

const isToolGroup = (toolState: SimpleTool | ToolGroup): toolState is ToolGroup => {
  return (toolState as ToolGroup).trays !== undefined;
};

export default class ZonesExample extends React.Component<{}, State> {
  private _temporaryMessageTimer = new Timer(2000);
  private _zones: React.RefObject<Zones>;
  private _app: React.RefObject<App>;
  private _footerMessages: React.RefObject<MessageCenterIndicator>;
  private _dialogContainer: HTMLDivElement;

  public readonly state: Readonly<State>;

  public constructor(p: {}) {
    super(p);

    this._app = React.createRef();
    this._zones = React.createRef();
    this._footerMessages = React.createRef();

    this._dialogContainer = document.createElement("div");

    const nineZone =
      NineZoneManager.mergeZone(9, 6,
        NineZoneManager.setAllowsMerging(4, false,
          getDefaultNineZone(),
        ),
      );

    this.state = {
      isNestedPopoverOpen: false,
      isPopoverOpen: false,
      isTemporaryMessageVisible: false,
      isTooltipVisible: false,
      nineZone,
      activeTab: MessageCenterActiveTab.AllMessages,
      openWidget: FooterWidget.None,
      secondZoneContent: SecondZoneContent.None,
      temporaryMessageX: 0,
      temporaryMessageY: 0,
      toastMessageStage: ToastMessageStage.Visible,
      tools: {
        "2d": {
          trayId: "3d",
          backTrays: [],
          trays: {
            "3d": {
              title: "3D Tools",
              columns: {
                0: {
                  items: {
                    "3D#1": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                    "3D#2": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
          },
          direction: Direction.Bottom,
          history: [],
          isExtended: false,
          isToolGroupOpen: false,
          icon: "icon-placeholder",
        } as ToolGroup,
        "angle": {
          icon: "icon-app-1",
        } as SimpleTool,
        "attach": {
          icon: "icon-placeholder",
        } as SimpleTool,
        "browse": {
          icon: "icon-placeholder",
        } as SimpleTool,
        "calendar": {
          trayId: "tray1",
          backTrays: [],
          trays: {
            tray1: {
              title: "3D Tools",
              columns: {
                0: {
                  items: {
                    "3D#1": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                    "3D#2": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
          },
          direction: Direction.Left,
          history: [],
          icon: "icon-placeholder",
          isExtended: false,
          isToolGroupOpen: false,
        } as ToolGroup,
        "channel": {
          icon: "icon-placeholder",
          trayId: "tray1",
          backTrays: [],
          trays: {
            tray1: {
              title: "Tools",
              columns: {
                0: {
                  items: {
                    Test1: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
          },
          direction: Direction.Left,
          history: [],
          isExtended: false,
          isToolGroupOpen: false,
        } as ToolGroup,
        "chat": {
          icon: "icon-placeholder",
        } as SimpleTool,
        "clipboard": {
          trayId: "tray1",
          backTrays: [],
          trays: {
            tray1: {
              title: "Tools",
              columns: {
                0: {
                  items: {
                    "3D#1": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                    "3D#2": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
          },
          direction: Direction.Left,
          history: [],
          icon: "icon-placeholder",
          isExtended: false,
          isToolGroupOpen: false,
        } as ToolGroup,
        "cube": {
          icon: "icon-placeholder",
          trayId: "tray1",
          backTrays: [],
          trays: {
            tray1: {
              title: "Tools",
              columns: {
                0: {
                  items: {
                    Test1: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                    Test2123123: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                      isDisabled: true,
                    },
                    Test3: {
                      icon: "icon-placeholder",
                      trayId: "tray2",
                    },
                    Test4: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                    Test5: {
                      icon: "icon-placeholder",
                      trayId: "disabled",
                      isDisabled: true,
                    },
                    Test6: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                    Test7: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
                1: {
                  items: {
                    Test5: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
                2: {
                  items: {
                    ":)": {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
            tray2: {
              title: "Test3",
              columns: {
                0: {
                  items: {
                    Test1: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
          },
          direction: Direction.Right,
          history: [],
          isExtended: false,
          isToolGroupOpen: false,
        } as ToolGroup,
        "document": {
          icon: "icon-document",
        } as SimpleTool,
        "validate": {
          trayId: "tray1",
          backTrays: [],
          trays: {
            tray1: {
              title: "Tools",
              columns: {
                0: {
                  items: {
                    Validate: {
                      icon: "icon-placeholder",
                      trayId: undefined,
                    },
                  },
                },
              },
            },
          },
          direction: Direction.Right,
          history: [],
          icon: "icon-placeholder",
          isExtended: false,
          isToolGroupOpen: false,
        } as ToolGroup,
        "chat1": {
          icon: "icon-placeholder",
        } as SimpleTool,
      },
      visibleMessage: Message.None,
      mousePosition: {
        x: 0,
        y: 0,
      },
      isOverflowItemOpen: false,
      currentTheme: PrimaryTheme,
      showAllItems: true,
    };
  }

  public componentDidMount(): void {
    this.layout();

    if (this._app.current) {
      const node = ReactDOM.findDOMNode(this._app.current);
      if (node && (node instanceof HTMLElement))
        node.appendChild(this._dialogContainer);
    }

    window.addEventListener("resize", this._handleWindowResize, true);
    this._temporaryMessageTimer.setOnExecute(() => {
      this.setState(() => {
        return {
          isTemporaryMessageVisible: false,
        };
      });
    });
  }

  public componentWillUnmount(): void {
    document.removeEventListener("resize", this._handleWindowResize, true);
    this._temporaryMessageTimer.stop();
  }

  private getZones() {
    const zones = Object.keys(this.state.nineZone.zones)
      .map((key) => Number(key) as WidgetZoneIndex)
      .sort((id1, id2) => {
        const z1 = this.state.nineZone.zones[id1];
        const z2 = this.state.nineZone.zones[id2];
        if (!z1.floating && !z2.floating)
          return z1.id - z2.id;

        if (!z1.floating)
          return -1;

        if (!z2.floating)
          return 1;

        return z1.floating.stackId - z2.floating.stackId;
      });
    return (
      <Zones ref={this._zones}>
        <MouseTracker onPositionChange={this._handlePositionChange} />
        {this.state.isTooltipVisible && (
          <TooltipWithTimeout
            stepString="Start Point"
            timeout={2000}
            onTimeout={this._handleTooltipTimeout}
            position={this.state.mousePosition}
            adjustPosition={adjustTooltipPosition}
          >
            <i className="icon icon-placeholder" />
          </TooltipWithTimeout>
        )}
        <TemporaryMessage
          style={{
            display: this.state.isTemporaryMessageVisible ? "block" : "none",
            left: this.state.temporaryMessageX,
            top: this.state.temporaryMessageY,
          }}
        >
          Text element required.
        </TemporaryMessage>
        {zones.map((z) => this.getZone(z))}
      </Zones>
    );
  }

  private getBackstage() {
    return undefined;
  }

  private getContent() {
    return (
      <Content
        onClick={this._handleContentClick}
      >
        <iframe
          // tslint:disable-next-line:max-line-length
          src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2306.95083449288!2d25.264306416368!3d54.67529368027896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd946df3a90077%3A0x9d89f71caeeef028!2sBentley+Systems+Europe+B.V.+Lithuanian+Branch!5e0!3m2!1sen!2slt!4v1523433316117"}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        >
        </iframe>
      </Content>
    );
  }

  public render() {
    return (
      <ThemeContext.Provider value={{
        name: this.state.currentTheme.name,
        change: (newTheme) => {
          this.setState((prevState) => {
            return {
              ...prevState,
              currentTheme: newTheme,
            };
          });
        },
      }}>
        <App
          className={"nzdemo-pages-zones"}
          ref={this._app}
        >
          {this.getZones()}
          {this.getBackstage()}
          {this.getContent()}
        </App>
      </ThemeContext.Provider>
    );
  }

  private _handlePositionChange = (mousePosition: PointProps) => {
    this.setState(() => ({
      mousePosition,
    }));
  }

  private _handleContentClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget)
      return;

    this._temporaryMessageTimer.start();
    this.setState((prevState) => {
      return {
        isTemporaryMessageVisible: true,
        temporaryMessageX: prevState.mousePosition.x,
        temporaryMessageY: prevState.mousePosition.y,
      };
    });
  }

  private _handleTooltipTimeout = () => {
    this.setState(() => {
      return {
        isTooltipVisible: false,
      };
    });
  }

  private _handleOnExpandableItemClick = (toolKey: string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        tools: {
          ...Object.keys(prevState.tools).reduce<Tools>((previous, current) => {
            const tool = prevState.tools[current];
            if (isToolGroup(tool)) {
              previous[current] = {
                ...tool,
                isToolGroupOpen: (toolKey === current) ? !tool.isToolGroupOpen : false,
              };
            } else {
              previous[current] = { ...tool };
            }
            return previous;
          }, {}),
        },
      };
    });
  }

  private _handleOnIsHistoryExtendedChange = (isExtended: boolean, toolKey: string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        tools: {
          ...prevState.tools,
          [toolKey]: {
            ...prevState.tools[toolKey],
            isExtended,
          },
        },
      };
    });
  }

  private handleToolGroupItemClicked(toolKey: string, trayKey: string, columnKey: string, itemKey: string) {
    this.setState((prevState) => {
      const tool = prevState.tools[toolKey];
      if (!isToolGroup(tool))
        return prevState;

      const key = columnKey + "-" + itemKey;
      const item = { toolKey, trayKey, columnKey, itemKey };
      return {
        ...prevState,
        tools: {
          ...prevState.tools,
          [toolKey]: {
            ...prevState.tools[toolKey],
            isExtended: false,
            isToolGroupOpen: false,
            history: DefaultHistoryManager.addItem(key, item, tool.history),
          },
        },
      };
    });
  }

  private _handleOnHistoryItemClick = (item: HistoryItem) => {
    this.setState((prevState) => {
      const tool = prevState.tools[item.toolKey];
      if (!isToolGroup(tool))
        return prevState;
      return {
        ...prevState,
        tools: {
          ...prevState.tools,
          [item.toolKey]: {
            ...prevState.tools[item.toolKey],
            isExtended: false,
            history: DefaultHistoryManager.addItem(item.columnKey + "-" + item.itemKey, item, tool.history),
          },
        },
      };
    });
  }

  private _handleOnScrollableToolbarScroll = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        tools:
          Object.keys(prevState.tools).reduce<Tools>((previous, current) => {
            const tool = prevState.tools[current];
            if (isToolGroup(tool)) {
              previous[current] = {
                ...tool,
                isToolGroupOpen: false,
              };
            } else {
              previous[current] = { ...tool };
            }
            return previous;
          }, {}),
      };
    });
  }

  private _handleMessageIndicatorIsDialogOpenChange = () => {
    this.setState((prevState) => {
      const openWidget = prevState.openWidget === FooterWidget.Messages ? FooterWidget.None : FooterWidget.Messages;
      return {
        openWidget,
      };
    });
  }

  private _handleToolAssistanceIndicatorIsDialogOpenChange = () => {
    this.setState((prevState) => {
      const openWidget = prevState.openWidget === FooterWidget.ToolAssistance ? FooterWidget.None : FooterWidget.ToolAssistance;
      return {
        openWidget,
      };
    });
  }

  private _handleSnapModeIndicatorIsDialogOpenChange = () => {
    this.setState((prevState) => {
      const openWidget = prevState.openWidget === FooterWidget.SnapMode ? FooterWidget.None : FooterWidget.SnapMode;
      return {
        openWidget,
      };
    });
  }

  private _handlePopoverToggleClick = () => {
    this.setState((prevState) => {
      return {
        isNestedPopoverOpen: false,
        isPopoverOpen: !prevState.isPopoverOpen,
      };
    });
  }

  private _handleNestedPopoverToggleClick = () => {
    this.setState((prevState) => {
      return {
        isNestedPopoverOpen: !prevState.isNestedPopoverOpen,
      };
    });
  }

  private _handleNestedToolSettingsBackButtonClick = () => {
    this.setState(() => {
      return {
        isNestedPopoverOpen: false,
      };
    });
  }

  private _handleWindowResize = () => {
    this.layout();
  }

  private layout() {
    this.setState((prevState) => {
      const element = ReactDOM.findDOMNode(this);
      const nineZone = NineZoneManager.layout(new Size((element! as any).clientWidth, (element! as any).clientHeight), prevState.nineZone);
      return {
        nineZone,
      };
    });
  }

  private _handleWidgetTabClick = (widgetId: number, tabIndex: number) => {
    this.setState((prevState) => {
      const nineZone = NineZoneManager.handleTabClick(widgetId, tabIndex, prevState.nineZone);
      return {
        nineZone,
      };
    });
  }

  private _handleOnWidgetResize = (zoneId: WidgetZoneIndex, x: number, y: number, handle: ResizeHandle, filledHeightDiff: number) => {
    this.setState((prevState) => {
      const nineZone = NineZoneManager.handleResize(zoneId, x, y, handle, filledHeightDiff, prevState.nineZone);
      return {
        nineZone,
      };
    });
  }

  private _handleWidgetTabDragStart = (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, offset: PointProps) => {
    this.setState((prevState) => {
      const nineZone = NineZoneManager.handleWidgetTabDragStart(widgetId, tabId, initialPosition, offset, prevState.nineZone);
      return {
        nineZone,
      };
    });
  }

  private _handleWidgetTabDragEnd = () => {
    this.setState((prevState) => {
      const nineZone = NineZoneManager.handleWidgetTabDragEnd(prevState.nineZone);
      return {
        nineZone,
      };
    });
  }

  private _handleWidgetTabDrag = (dragged: PointProps) => {
    this.setState((prevState) => {
      const nineZone = NineZoneManager.handleWidgetTabDrag(dragged, prevState.nineZone);
      return {
        nineZone,
      };
    });
  }

  private _handleTargetChanged = (zoneId: WidgetZoneIndex, type: TargetType, isTargeted: boolean) => {
    this.setState((prevState) => {
      const nineZone = isTargeted ? NineZoneManager.handleTargetChanged({ zoneId, type }, prevState.nineZone) :
        NineZoneManager.handleTargetChanged(undefined, prevState.nineZone);

      return {
        nineZone,
      };
    });
  }

  private _handleOnAllMessagesTabClick = () => {
    this.changeTab(MessageCenterActiveTab.AllMessages);
  }

  private _handleOnProblemsTabClick = () => {
    this.changeTab(MessageCenterActiveTab.Problems);
  }

  private _handleDisableItemsClick = () => {
    this.setState((prevState) => {
      return {
        tools: {
          ...prevState.tools,
          cube: {
            ...prevState.tools.cube,
            isDisabled: !prevState.tools.cube.isDisabled,
            isToolGroupOpen: false,
          },
          validate: {
            ...prevState.tools.validate,
            isDisabled: !prevState.tools.validate.isDisabled,
            isToolGroupOpen: false,
          },
          channel: {
            ...prevState.tools.channel,
            isDisabled: !prevState.tools.channel.isDisabled,
            isToolGroupOpen: false,
          },
          chat: {
            ...prevState.tools.chat,
            isDisabled: !prevState.tools.chat.isDisabled,
            isToolGroupOpen: false,
          },
          browse: {
            ...prevState.tools.browse,
            isDisabled: !prevState.tools.browse.isDisabled,
            isToolGroupOpen: false,
          },
          chat1: {
            ...prevState.tools.chat1,
            isDisabled: !prevState.tools.chat1.isDisabled,
            isToolGroupOpen: false,
          },
        },
      };
    });
  }

  private changeTab(newTab: MessageCenterActiveTab) {
    this.setState((prevState) => ({
      ...prevState,
      activeTab: newTab,
    }));
  }

  private _hideMessages = () => {
    this.setVisibleMessage(Message.None);
  }

  private setVisibleMessage(visibleMessage: Message) {
    this.setState(() => {
      return {
        visibleMessage,
      };
    });
  }

  private getHistoryTray(toolKey: string): React.ReactNode {
    const tool = this.state.tools[toolKey] as ToolGroup;
    if (tool.isToolGroupOpen)
      return undefined;
    if (tool.history.length <= 0)
      return undefined;

    return (
      <HistoryTray
        direction={tool.direction}
        isExtended={tool.isExtended}
        items={
          tool.history.map((entry) => {
            const tray = tool.trays[entry.item.trayKey];
            return (
              <HistoryIcon
                key={entry.key}
                onClick={() => this._handleOnHistoryItemClick(entry.item)}
              >
                <i className={`icon ${tray.columns[entry.item.columnKey].items[entry.item.itemKey].icon}`} />
              </HistoryIcon>
            );
          })
        }
      />
    );
  }

  private getMessagesCenterMessages() {
    if (this.state.activeTab === MessageCenterActiveTab.AllMessages)
      return (
        <>
          <MessageCenterMessage
            icon={<i className={"icon icon-status-success nzdemo-success"} />}
            content={"Document saved successfully."}
          />
          <MessageCenterMessage
            icon={<i className={"icon icon-clock nzdemo-progress"} />}
            content={
              <>
                <span>Downloading required assets.</span>
                <br />
                <i><small>75% complete</small></i>
              </>
            }
          />
          <MessageCenterMessage
            icon={<i className={"icon icon-status-rejected nzdemo-error"} />}
            content={
              <>
                <span>Cannot attach reference.</span>
                <br />
                <i><u><small>Details...</small></u></i>
              </>
            }
          />
          <MessageCenterMessage
            icon={<i className={"icon icon-status-warning nzdemo-warning"} />}
            content={"Missing 10 fonts. Replaces with Arial."}
          />
          <MessageCenterMessage
            icon={<i className={"icon icon-star nzdemo-favorite"} />}
            content={"Your document has been favorited by 5 people in the..."}
          />
          <MessageCenterMessage
            icon={<i className={"icon icon-status-success nzdemo-success"} />}
            content={"Navigator has successfully updated"}
          />
        </>
      );

    return (
      <>
        <MessageCenterMessage
          icon={<i className={"icon icon-status-rejected"} style={{ color: "red" }} />}
          content={"Missing 10 fonts. Replaced with Arial."}
        />
        <MessageCenterMessage
          content={"Cannot attach reference"}
        />
        <MessageCenterMessage
          content={"Problem1"}
        />
        <MessageCenterMessage
          content={"Problem2"}
        />
        <MessageCenterMessage
          content={"Problem3"}
        />
        <MessageCenterMessage
          content={"Problem4"}
        />
        <MessageCenterMessage
          content={"Problem5"}
        />
        <MessageCenterMessage
          content={"Problem6"}
        />
      </>
    );
  }

  private getToolbarItem(toolKey: string) {
    const tool = this.state.tools[toolKey];
    if (isToolGroup(tool)) {
      return (
        <ExpandableItem
          history={this.getHistoryTray(toolKey)}
          key={toolKey}
          onIsHistoryExtendedChange={(isExtended) => this._handleOnIsHistoryExtendedChange(isExtended, toolKey)}
          panel={this.getToolGroup(toolKey)}
          isDisabled={tool.isDisabled}
        >
          <ToolbarIcon
            icon={
              <i className={`icon ${tool.icon}`} />
            }
            onClick={() => this._handleOnExpandableItemClick(toolKey)}
            isDisabled={tool.isDisabled}
          />
        </ExpandableItem>
      );
    }

    return (
      <ToolbarIcon
        key={toolKey}
        icon={
          <i className={`icon ${tool.icon}`} />
        }
        isDisabled={tool.isDisabled}
      />
    );
  }

  private getToolbarItemWithToolSettings(toolKey: string) {
    const tool = this.state.tools[toolKey];
    return (
      <ToolbarIcon
        key={toolKey}
        isActive={this.state.secondZoneContent !== SecondZoneContent.None}
        icon={
          <i className={`icon ${tool.icon}`} />
        }
        onClick={() => this.setState((prevState) => {
          let secondZoneContent = SecondZoneContent.None;
          if (prevState.secondZoneContent === SecondZoneContent.None)
            secondZoneContent = SecondZoneContent.ToolSettings;
          return {
            secondZoneContent,
          };
        })}
      />
    );
  }

  private getToolGroup(toolKey: string) {
    const tool = this.state.tools[toolKey] as ToolGroup;
    if (!tool.isToolGroupOpen)
      return undefined;

    const tray = tool.trays[tool.trayId];
    const columns = (
      Object.keys(tray.columns).map((columnKey) => {
        const column = tray.columns[columnKey];
        return (
          <GroupColumn key={columnKey}>
            {Object.keys(column.items).map((itemKey) => {
              const item = column.items[itemKey];
              const trayId = item.trayId;
              if (trayId)
                return (
                  <ToolGroupExpander
                    key={itemKey}
                    ref={itemKey}
                    label={itemKey}
                    icon={
                      <i className={`icon ${item.icon}`} />
                    }
                    onClick={() => this.setState((prevState) => {
                      const toolGroup = prevState.tools[toolKey] as ToolGroup;
                      return {
                        ...prevState,
                        tools: {
                          ...prevState.tools,
                          [toolKey]: {
                            ...prevState.tools[toolKey],
                            trayId,
                            backTrays: [...toolGroup.backTrays, toolGroup.trayId],
                          },
                        },
                      };
                    })}
                    isDisabled={item.isDisabled}
                  />
                );
              return (
                <GroupTool
                  key={itemKey}
                  ref={itemKey}
                  label={itemKey}
                  onClick={() => this.handleToolGroupItemClicked(toolKey, tool.trayId, columnKey, itemKey)}
                  icon={
                    <i className={`icon ${item.icon}`} />
                  }
                  isDisabled={item.isDisabled}
                />
              );
            })}
          </GroupColumn>
        );
      })
    );

    if (tool.backTrays.length > 0)
      return (
        <NestedToolGroup
          title={tray.title}
          container={this._zones}
          columns={columns}
          onBack={() => this.setState((prevState) => {
            const t = prevState.tools[toolKey] as ToolGroup;
            let trayId = tool.trayId;
            if (t.backTrays.length > 0)
              trayId = tool.backTrays[t.backTrays.length - 1];

            const backTrays = tool.backTrays.slice(0, -1);
            return {
              ...prevState,
              tools: {
                ...prevState.tools,
                [toolKey]: {
                  ...prevState.tools[toolKey],
                  trayId,
                  backTrays,
                },
              },
            };
          })}
        />
      );

    return (
      <ToolGroupComponent
        title={tray.title}
        container={this._zones}
        columns={columns}
      />
    );
  }

  private getToolSettingsWidget() {
    const tab = (
      <ToolSettingsWidgetTab
        isActive={this.state.secondZoneContent === SecondZoneContent.ToolSettings}
        onClick={
          () => {
            this.setState((prevState) => {
              let secondZoneContent = SecondZoneContent.Minimized;
              if (prevState.secondZoneContent === SecondZoneContent.Minimized)
                secondZoneContent = SecondZoneContent.ToolSettings;
              return {
                secondZoneContent,
              };
            });
          }
        }
      >
        <i className="icon icon-tools" />
      </ToolSettingsWidgetTab>
    );
    switch (this.state.secondZoneContent) {
      case SecondZoneContent.Minimized: {
        return (
          <ToolSettingsWidget
            tab={tab}
          />
        );
      }
      case SecondZoneContent.ToolSettings: {
        return (
          <ToolSettingsWidget
            tab={tab}
            content={
              <ToolSettings>
                <PopoverToggle
                  content={"Toggle"}
                  onClick={this._handlePopoverToggleClick}
                  popoverContent={
                    !this.state.isPopoverOpen ? undefined :
                      <ToolSettings>
                        <PopoverToggle
                          content={"Toggle for nested popover"}
                          onClick={this._handleNestedPopoverToggleClick}
                          popoverContent={
                            !this.state.isNestedPopoverOpen ? undefined :
                              <NestedToolSettings
                                label="Nested"
                                backButton={
                                  <HollowButton
                                    onClick={this._handleNestedToolSettingsBackButtonClick}
                                    style={{ padding: "5px", lineHeight: "0" }}
                                  >
                                    <i className="icon icon-progress-backward-2" />
                                  </HollowButton>
                                }
                              >
                                <ScrollableArea>
                                  1. Settings
                                  2. SettingsSettingsSettings
                                  3. Settings
                                  4. Settings
                                  5. Settings
                                  6. Settings
                                  7. Settings
                                  8. Settings
                                  9. Settings
                                  10. Settings
                                  11. Settings
                                  12. Settings
                                  13. Settings
                                  14. Settings
                                  15. Settings
                                  16. Settings
                                  17. Settings
                                  18. Settings
                                  19. Settings
                                </ScrollableArea>
                              </NestedToolSettings>
                          }
                        />
                      </ToolSettings>
                  }
                />
              </ToolSettings>
            }
          />
        );
      }
    }
    return undefined;
  }

  private getFooterMessage() {
    switch (this.state.visibleMessage) {
      case (Message.Activity): {
        return (
          <ActivityMessage>
            <StatusMessage
              status={Status.Information}
              icon={
                <i className="icon icon-activity" />
              }
            >
              <StatusLayout
                label={
                  <MessageLabel text="Rendering 'big-image.png'" />
                }
                buttons={
                  <MessageHyperlink
                    onClick={this._hideMessages}
                    text="Ok"
                  />
                }
                progress={
                  <MessageProgress status={Status.Information} progress={33.33} />
                }
              />
            </StatusMessage>
          </ActivityMessage>
        );
      }
      case (Message.Modal): {
        return (
          <ModalMessage
            renderTo={() => this._dialogContainer}
            dialog={
              <MessageDialog
                titleBar={
                  <MessageTitleBar
                    title={
                      <MessageTitle text="Dialog" />
                    }
                    buttons={
                      <MessageDialogButton onClick={this._hideMessages}>
                        <i className="icon icon-close" />
                      </MessageDialogButton>
                    }
                  />
                }
                content={
                  <MessageDialogButtonsContent
                    buttons={
                      <>
                        <BlueButton
                          onClick={this._hideMessages}
                        >
                          Yes
                        </BlueButton>
                        <HollowButton
                          onClick={this._hideMessages}
                        >
                          No
                        </HollowButton>
                      </>
                    }
                    content={
                      <MessageDialogScrollableContent
                        content={
                          <>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Integer vehicula viverra ante a finibus.Suspendisse tristique neque volutpat ex auctor, a consectetur nunc convallis.Nullam condimentum imperdiet elit vitae vulputate.Praesent ornare tellus luctus sem cursus, sed porta ligula pulvinar.In fringilla tellus sem, id sollicitudin leo condimentum sed.Quisque tempor sed risus gravida tincidunt.Nulla id hendrerit sapien.
                          <br />
                            <br />
                            In vestibulum ipsum lorem.Aliquam accumsan tortor sit amet facilisis lacinia.Nam quis lacus a urna eleifend finibus.Donec id purus id turpis viverra faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed finibus dui ut efficitur interdum.Donec a congue mauris.Praesent ornare egestas accumsan.Pellentesque malesuada diam nisl, a elementum turpis commodo quis.Suspendisse vitae diam accumsan, ullamcorper ante in, porttitor turpis.Phasellus scelerisque tristique imperdiet.
                          <br />
                            <br />
                            Aenean interdum nulla ex, sed molestie lectus pulvinar ac.Mauris sagittis tempor justo ac imperdiet.Fusce iaculis cursus lectus sit amet semper.Quisque at volutpat magna, vitae lacinia nunc.Suspendisse a ipsum orci.Duis in mi sit amet purus blandit mattis porttitor mollis enim.Curabitur dictum nisi massa, eu luctus sapien viverra quis.
                          <br />
                            <br />
                            Ut sed pellentesque diam.Integer non pretium nibh.Nulla scelerisque ipsum ac porttitor lobortis.Suspendisse eu egestas felis, sit amet facilisis neque.In sit amet fermentum nisl.Proin volutpat ex et ligula auctor, id cursus elit fringilla.Nulla facilisi.Proin dictum a lectus a elementum.Mauris ultricies dapibus libero ut interdum.
                          <br />
                            <br />
                            Suspendisse blandit mauris metus, in accumsan magna venenatis pretium.Ut ante odio, tempor non quam at, scelerisque pulvinar dui.Duis in magna ut leo fermentum pellentesque venenatis vitae sapien.Suspendisse potenti.Nunc quis ex ac mi porttitor euismod.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Nunc tincidunt nunc id sem varius imperdiet.Phasellus congue orci vitae lorem malesuada, vel tempor tortor molestie.Nullam gravida tempus ornare.
                        </>
                        }
                      />
                    }
                  />
                }
                resizeHandle={< DialogResizeHandle />}
              />
            }
          />
        );
      }
      case (Message.Toast): {
        return (
          <ToastMessage
            stage={this.state.toastMessageStage}
            animateOutTo={this._footerMessages.current || undefined}
            onAnimatedOut={() => this._hideMessages()}
            timeout={2500}
            onStageChange={(stage) => {
              this.setState(() => {
                return {
                  toastMessageStage: stage,
                };
              });
            }}
            content={
              <StatusMessage
                status={Status.Success}
                icon={
                  <i className="icon icon-status-success-hollow" />
                }
              >
                <StatusLayout
                  label={
                    <MessageLabel text="Image 'big.png' saved." />
                  }
                />
              </StatusMessage>
            }
          />
        );
      }
      case (Message.Sticky): {
        return (
          <StickyMessage>
            <StatusMessage
              status={Status.Error}
              icon={
                <i className="icon icon-status-error-hollow" />
              }
            >
              <StatusLayout
                label={
                  <MessageLabel text="Unable to load 3 fonts, replaced with Arial." />
                }
                buttons={
                  <MessageButton onClick={this._hideMessages}>
                    <i className="icon icon-close" />
                  </MessageButton>
                }
              />
            </StatusMessage>
          </StickyMessage>
        );
      }
    }

    return undefined;
  }

  private getTarget(zoneId: WidgetZoneIndex) {
    const zone = new NineZone(this.state.nineZone).getWidgetZone(zoneId);
    const dropTarget = zone.getDropTarget();
    return (
      <TargetContainer>
        {dropTarget === DropTarget.Merge ? (
          <MergeTarget
            onTargetChanged={(isTargeted) => this._handleTargetChanged(zoneId, TargetType.Merge, isTargeted)}
          />
        ) : undefined}
        {dropTarget === DropTarget.Back ? (
          <BackTarget
            onTargetChanged={(isTargeted) => this._handleTargetChanged(zoneId, TargetType.Back, isTargeted)}
            zoneIndex={zoneId}
          />
        ) : undefined}
      </TargetContainer>
    );
  }

  private getTabHandleMode(zone: ZoneProps, widget: WidgetProps) {
    const draggingWidget = this.state.nineZone.draggingWidget;
    if (draggingWidget && draggingWidget.id === widget.id && draggingWidget.isUnmerge)
      return VisibilityMode.Visible;

    if (zone.widgets.length > 1)
      return VisibilityMode.OnHover;

    return VisibilityMode.Timeout;
  }

  private getWidgetTabs(zone: ZoneProps, widget: WidgetProps, isOpen: boolean, anchor: HorizontalAnchor) {
    const draggingWidget = this.state.nineZone.draggingWidget;
    const lastPosition = draggingWidget && draggingWidget.id === widget.id ?
      draggingWidget.lastPosition : undefined;
    const tabIndex = draggingWidget ? draggingWidget.tabIndex : -1;
    const mode1 = !isOpen ? TabMode.Closed : widget.tabIndex === 1 ? TabMode.Active : TabMode.Open;
    const mode2 = !isOpen ? TabMode.Closed : widget.tabIndex === 2 ? TabMode.Active : TabMode.Open;
    const handleMode = this.getTabHandleMode(zone, widget);
    switch (widget.id) {
      case 3: {
        return (
          <WidgetTab
            key="3_1"
            mode={mode1}
            onClick={() => this._handleWidgetTabClick(widget.id, 1)}
            lastPosition={tabIndex === 1 ? lastPosition : undefined}
            onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 1, initialPosition, offset)}
            onDragEnd={this._handleWidgetTabDragEnd}
            onDrag={this._handleWidgetTabDrag}
            anchor={anchor}
          >
            <i className="icon icon-tools" />
          </WidgetTab>
        );
      }
      case 4: {
        return (
          <WidgetTabGroup
            key="4"
            anchor={anchor}
            handleMode={handleMode}
          >
            <WidgetTab
              mode={mode1}
              onClick={() => this._handleWidgetTabClick(widget.id, 1)}
              lastPosition={tabIndex === 1 ? lastPosition : undefined}
              onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 1, initialPosition, offset)}
              onDragEnd={this._handleWidgetTabDragEnd}
              onDrag={this._handleWidgetTabDrag}
              anchor={anchor}
            >
              <i className="icon icon-settings" />
            </WidgetTab>
            <WidgetTab
              mode={mode2}
              onClick={() => this._handleWidgetTabClick(widget.id, 2)}
              lastPosition={tabIndex === 2 ? lastPosition : undefined}
              onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 2, initialPosition, offset)}
              onDragEnd={this._handleWidgetTabDragEnd}
              onDrag={this._handleWidgetTabDrag}
              anchor={anchor}
            >
              <i className="icon icon-help" />
            </WidgetTab>
          </WidgetTabGroup >
        );
      }
      case 6: {
        return (
          <WidgetTab
            key="6_1"
            mode={mode1}
            onClick={() => this._handleWidgetTabClick(widget.id, 1)}
            lastPosition={tabIndex === 1 ? lastPosition : undefined}
            onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 1, initialPosition, offset)}
            onDragEnd={this._handleWidgetTabDragEnd}
            onDrag={this._handleWidgetTabDrag}
            anchor={anchor}
          >
            <i className="icon icon-placeholder" />
          </WidgetTab>
        );
      }
      case 7: {
        return (
          <WidgetTab
            key="7_1"
            mode={mode1}
            onClick={() => this._handleWidgetTabClick(widget.id, 1)}
            lastPosition={tabIndex === 1 ? lastPosition : undefined}
            onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 1, initialPosition, offset)}
            onDragEnd={this._handleWidgetTabDragEnd}
            onDrag={this._handleWidgetTabDrag}
            anchor={anchor}
          >
            <i className="icon icon-placeholder" />
          </WidgetTab>
        );
      }
      case 8: {
        return (
          <WidgetTab
            key="8_1"
            mode={mode1}
            onClick={() => this._handleWidgetTabClick(widget.id, 1)}
            lastPosition={tabIndex === 1 ? lastPosition : undefined}
            onDragStart={(initialPosition, offset) => {
              this._handleWidgetTabDragStart(widget.id, 1, initialPosition, offset);
              this._handleWidgetTabDragEnd();
            }}
            onDragEnd={this._handleWidgetTabDragEnd}
            onDrag={this._handleWidgetTabDrag}
            anchor={anchor}
          >
            <i className="icon icon-placeholder" />
          </WidgetTab>
        );
      }
      case 9: {
        return (
          <WidgetTabGroup
            key="9"
            anchor={anchor}
            handleMode={handleMode}
          >
            <WidgetTab
              mode={mode1}
              onClick={() => this._handleWidgetTabClick(widget.id, 1)}
              lastPosition={tabIndex === 1 ? lastPosition : undefined}
              onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 1, initialPosition, offset)}
              onDragEnd={this._handleWidgetTabDragEnd}
              onDrag={this._handleWidgetTabDrag}
              anchor={anchor}
            >
              <i className="icon icon-settings" />
            </WidgetTab>
            <WidgetTab
              mode={mode2}
              onClick={() => this._handleWidgetTabClick(widget.id, 2)}
              lastPosition={tabIndex === 2 ? lastPosition : undefined}
              onDragStart={(initialPosition, offset) => this._handleWidgetTabDragStart(widget.id, 2, initialPosition, offset)}
              onDragEnd={this._handleWidgetTabDragEnd}
              onDrag={this._handleWidgetTabDrag}
              anchor={anchor}
            >
              <i className="icon icon-help" />
            </WidgetTab>
          </WidgetTabGroup>
        );
      }
    }
    return undefined;
  }

  private getWidgetContent(widgetId: number, tabIndex: number) {
    switch (widgetId) {
      case 3: {
        return (
          <Toolbar
            items={
              <>
                {this.getToolbarItem("document")}
                {this.getToolbarItem("browse")}
                {this.getToolbarItem("channel")}
                {this.getToolbarItem("chat")}
                {this.getToolbarItem("clipboard")}
                {this.getToolbarItem("calendar")}
              </>
            }
            panelAlignment={ToolbarPanelAlignment.End}
          />
        );
      }
      case 4: {
        return `Hello world from zone4! (${tabIndex})`;
      }
      case 6: {
        return (
          <ThemeContext.Consumer>
            {
              (theme) => (
                <BlueButton
                  onClick={() => {
                    switch (theme.name) {
                      case PrimaryTheme.name: {
                        theme.change && theme.change(LightTheme);
                        break;
                      }
                      case LightTheme.name: {
                        theme.change && theme.change(DarkTheme);
                        break;
                      }
                      case DarkTheme.name: {
                        theme.change && theme.change({ name: "custom" });
                        break;
                      }
                      case "custom": {
                        theme.change && theme.change(PrimaryTheme);
                        break;
                      }
                    }
                  }}
                >
                  Theme: {theme.name}
                </BlueButton>
              )
            }
          </ThemeContext.Consumer>
        );
      }
      case 7: {
        return (
          <>
            <BlueButton
              onClick={() => this.setVisibleMessage(Message.Activity)}
            >
              Show Activity Message
            </BlueButton>
            <span style={{ background: "#cebbbb", width: "800px", height: "50px", display: "block" }}></span>
            <br />
            <BlueButton
              onClick={() => this.setVisibleMessage(Message.Modal)}
            >
              Show Modal Message
            </BlueButton>
            <br />
            <BlueButton
              onClick={() => {
                this.setVisibleMessage(Message.Toast);
                this.setState(() => {
                  return {
                    toastMessageStage: ToastMessageStage.Visible,
                  };
                });
              }}
            >
              Show Toast Message
            </BlueButton>
            <br />
            <BlueButton
              onClick={() => this.setVisibleMessage(Message.Sticky)}
            >
              Show Sticky Message
            </BlueButton>
            <br />
            <br />
            <BlueButton
              onClick={() => {
                this.setState(() => {
                  return {
                    isTooltipVisible: true,
                  };
                });
              }}
            >
              Show Tooltip
            </BlueButton>
            <br />
            <br />
            <BlueButton
              onClick={() => {
                this.setState((prevState) => {
                  const nineZone = NineZoneManager.setIsInFooterMode(!prevState.nineZone.zones[8].isInFooterMode, prevState.nineZone);
                  return {
                    nineZone,
                    openWidget: FooterWidget.None,
                  };
                });
              }}
            >
              Change Footer Mode
            </BlueButton>
          </>
        );
      }
      case 8: {
        return "Footer :)";
      }
      case 9: {
        switch (tabIndex) {
          case 1: {
            return (
              <>
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                <span style={{ background: "#cebbbb", width: "800px", height: "50px", display: "block" }}></span>
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
                Hello world 1!
                <br />
              </>
            );
          }
          case 2: {
            return "Hello world 2!";
          }
        }
      }
    }
    return undefined;
  }

  private getTabs(zoneId: WidgetZoneIndex, isOpen: boolean, anchor: HorizontalAnchor) {
    const tabs: JSX.Element[] = [];
    let i = -1;

    const zone = this.state.nineZone.zones[zoneId];
    for (const widget of zone.widgets) {
      i++;
      const widgetTabs = this.getWidgetTabs(zone, widget, isOpen, anchor);
      if (!widgetTabs)
        continue;

      if (i !== 0)
        tabs.push(<TabSeparator key={i} />);
      tabs.push(widgetTabs);
    }

    return tabs;
  }

  private getZoneContent(zoneId: WidgetZoneIndex) {
    const zone = this.state.nineZone.zones[zoneId];
    const activeWidget = zone.widgets.find((widget) => widget.tabIndex !== -1);

    if (activeWidget)
      return this.getWidgetContent(activeWidget.id, activeWidget.tabIndex);

    return undefined;
  }

  private getWidget(zoneId: WidgetZoneIndex) {
    const zone = new NineZone(this.state.nineZone).getWidgetZone(zoneId);
    if (zone.props.widgets.length === 0)
      return undefined;

    const isOpen = zone.props.widgets.some((w) => w.tabIndex !== -1);
    const isDragged = this.state.nineZone.draggingWidget && this.state.nineZone.draggingWidget.id === zoneId;
    return (
      <StackedWidget
        content={this.getZoneContent(zoneId)}
        fillZone={zone.props.isLayoutChanged}
        horizontalAnchor={zone.horizontalAnchor}
        isDragged={isDragged}
        isFloating={zone.props.floating ? true : false}
        isOpen={isOpen}
        onResize={(x, y, handle, diff) => {
          this._handleOnWidgetResize(zoneId, x, y, handle, diff);
        }}
        tabs={this.getTabs(zoneId, isOpen, zone.horizontalAnchor)}
        verticalAnchor={zone.verticalAnchor}
      />
    );
  }

  private getZone(zoneId: WidgetZoneIndex) {
    switch (zoneId) {
      case 1:
        return this.getZone1();
      case 2:
        return this.getZone2();
      case 3:
        return this.getZone3();
      case 8:
        return this.getStatusZone();
      default:
        return this.getFloatingZone(zoneId);
    }
  }

  private getFloatingZone(zoneId: WidgetZoneIndex) {
    const zone = new NineZone(this.state.nineZone).getWidgetZone(zoneId);
    const outlineBounds = zone.getGhostOutlineBounds();
    return (
      <React.Fragment key={zoneId}>
        <Zone bounds={zone.props.floating ? zone.props.floating.bounds : zone.props.bounds}>
          {this.getWidget(zoneId)}
        </Zone>
        <Zone bounds={zone.props.bounds}>
          {this.getTarget(zoneId)}
        </Zone>
        {!outlineBounds ? undefined :
          <GhostOutline bounds={outlineBounds} />
        }
      </React.Fragment>
    );
  }

  private getZone1() {
    return (
      <Zone
        bounds={this.state.nineZone.zones[1].bounds}
        key={1}
      >
        <ToolsWidget
          button={
            <AppButton
              icon={
                <i className="icon icon-home" />
              }
            />
          }
          horizontalToolbar={
            <Toolbar
              items={
                <>
                  {this.state.showAllItems && this.getToolbarItem("2d")}
                  <ToolbarIcon
                    isActive={this.state.showAllItems}
                    key={"angle"}
                    icon={
                      <i className={`icon ${this.state.tools.angle.icon}`} />
                    }
                    onClick={() => this.setState((prevState) => ({ showAllItems: !prevState.showAllItems }))}
                  />
                </>
              }
            />
          }
          verticalToolbar={
            <Toolbar
              expandsTo={Direction.Right}
              items={
                <>
                  {this.state.showAllItems && this.getToolbarItem("cube")}
                  <ToolbarIcon
                    key={"attach"}
                    icon={
                      <i className={`icon ${this.state.tools.attach.icon}`} />
                    }
                    onClick={this._handleDisableItemsClick}
                  />
                  {this.state.showAllItems && this.getToolbarItem("validate")}
                </>
              }
            />
          }
        />
      </Zone>
    );
  }

  private getZone2() {
    return (
      <Zone
        bounds={this.state.nineZone.zones[2].bounds}
        key={2}
      >
        {this.getToolSettingsWidget()}
      </Zone>
    );
  }

  private getZone3() {
    const zoneId = 3;
    const isRectangular = this.state.nineZone.zones[zoneId].widgets.length !== 1 ||
      this.state.nineZone.zones[zoneId].widgets[0].id !== zoneId;

    if (isRectangular)
      return this.getFloatingZone(zoneId);

    const zone = new NineZone(this.state.nineZone).getWidgetZone(zoneId);
    const outlineBounds = zone.getGhostOutlineBounds();
    return (
      <React.Fragment key={zoneId}>
        <Zone
          bounds={zone.props.floating ? zone.props.floating.bounds : this.state.nineZone.zones[zoneId].bounds}
        >
          <ToolsWidget
            isNavigation
            preserveSpace
            horizontalToolbar={
              <Toolbar
                items={
                  <>
                    {this.state.showAllItems &&
                      <OverflowItem
                        key="0"
                        onClick={() => this.setState((prevState) => ({
                          ...prevState,
                          isOverflowItemOpen: !prevState.isOverflowItemOpen,
                        }))}
                        panel={
                          !this.state.isOverflowItemOpen ? undefined :
                            (
                              <ToolGroupComponent
                                title={"Overflow Button"}
                                container={this._zones}
                                columns={
                                  <GroupColumn>
                                    <GroupTool
                                      onClick={() => this.setState((prevState) => ({
                                        ...prevState,
                                        isOverflowItemOpen: !prevState.isOverflowItemOpen,
                                      }))}
                                    >
                                      Tool1
                                </GroupTool>
                                  </GroupColumn>
                                }
                              />
                            )

                        }
                      />
                    }
                    {this.getToolbarItemWithToolSettings("chat")}
                  </>
                }
                panelAlignment={ToolbarPanelAlignment.End}
              />
            }
            verticalToolbar={
              <ScrollableToolbar
                expandsTo={Direction.Left}
                onScroll={this._handleOnScrollableToolbarScroll}
                items={
                  <>
                    {this.state.showAllItems && this.getToolbarItem("channel")}
                    {this.getToolbarItem("chat")}
                    {this.state.showAllItems && this.getToolbarItem("browse")}
                    {this.getToolbarItem("clipboard")}
                    {this.state.showAllItems && this.getToolbarItem("calendar")}
                    {this.getToolbarItem("chat1")}
                    {this.getToolbarItem("document")}
                  </>
                }
              />
            }
          />
        </Zone>
        <Zone bounds={this.state.nineZone.zones[zoneId].bounds}>
          {this.getTarget(zoneId)}
        </Zone>
        {!outlineBounds ? undefined :
          <GhostOutline bounds={outlineBounds} />
        }
      </React.Fragment>
    );
  }

  private getStatusZone() {
    const statusZone = new NineZone(this.state.nineZone).getStatusZone();
    const outlineBounds = statusZone.getGhostOutlineBounds();

    if (statusZone.props.widgets.length === 1 && statusZone.props.widgets[0].id === 8)
      return (
        <React.Fragment key={statusZone.id}>
          <FooterZone
            isInFooterMode={statusZone.props.isInFooterMode}
            bounds={statusZone.props.bounds}
          >
            <Footer
              isInWidgetMode={!statusZone.props.isInFooterMode}
              message={this.getFooterMessage()}
              indicators={
                <>
                  <ToolAssistanceIndicator
                    dialog={
                      this.state.openWidget !== FooterWidget.ToolAssistance ? undefined :
                        <ToolAssistanceDialog
                          title="Trim Multiple - Tool Assistance"
                          items={
                            <>
                              <ToolAssistanceItem>
                                <i className="icon icon-cursor" />
                                Identify piece to trim
                            </ToolAssistanceItem>
                              <ToolAssistanceSeparator label="Inputs" />
                              <ToolAssistanceItem>
                                <i className="icon icon-cursor-click" />
                                Clink on element
                            </ToolAssistanceItem>
                              <ToolAssistanceItem>
                                <i className="icon  icon-placeholder" />
                                Drag across elements
                            </ToolAssistanceItem>
                              <ToolAssistanceSeparator />
                              <ToolAssistanceItem>
                                <input type="checkbox" />
                                Show prompt @ cursor
                            </ToolAssistanceItem>
                            </>
                          }
                        />
                    }
                    icons={
                      <>
                        <i className="icon icon-cursor" />
                        <i className="icon icon-add" />
                      </>
                    }
                    isStepStringVisible={this.state.nineZone.zones[8].isInFooterMode}
                    onClick={this._handleToolAssistanceIndicatorIsDialogOpenChange}
                    stepString="Start Point"
                  />
                  <MessageCenterIndicator
                    ref={this._footerMessages}
                    label="Message(s):"
                    isLabelVisible={this.state.nineZone.zones[8].isInFooterMode}
                    balloonLabel="9+"
                    onClick={this._handleMessageIndicatorIsDialogOpenChange}
                    dialog={
                      this.state.openWidget !== FooterWidget.Messages ? undefined :
                        <MessageCenter
                          title="Messages"
                          buttons={
                            <>
                              <MessageCenterButton>
                                <i className={"icon icon-placeholder"} />
                              </MessageCenterButton>
                              <MessageCenterButton onClick={() => {
                                this.setState((prevState) => ({
                                  ...prevState,
                                  openWidget: FooterWidget.None,
                                }));
                              }}>
                                <i className={"icon icon-close"} />
                              </MessageCenterButton>
                            </>
                          }
                          tabs={
                            <>
                              <MessageCenterTab
                                isOpen={this.state.activeTab === MessageCenterActiveTab.AllMessages}
                                onClick={this._handleOnAllMessagesTabClick}
                              >
                                All
                          </MessageCenterTab>
                              <MessageCenterTab
                                isOpen={this.state.activeTab === MessageCenterActiveTab.Problems}
                                onClick={this._handleOnProblemsTabClick}
                              >
                                Problems
                          </MessageCenterTab>
                            </>
                          }
                          messages={this.getMessagesCenterMessages()}
                          prompt="No messages."
                        />
                    }
                  />
                  <SnapModeIndicator
                    label="Snap Mode"
                    isLabelVisible={this.state.nineZone.zones[8].isInFooterMode}
                    onClick={this._handleSnapModeIndicatorIsDialogOpenChange}
                    icon={
                      <SnapModeIcon text="k" />
                    }
                    dialog={
                      this.state.openWidget !== FooterWidget.SnapMode ? undefined :
                        <SnapModeDialog
                          title="Snap Mode"
                          snaps={
                            <>
                              <SnapRow
                                key="1"
                                isActive
                                label="Keypoint"
                                icon={
                                  <SnapModeIcon isActive text="k" />
                                }
                              />
                              <SnapRow
                                key="2"
                                label="Intersection"
                                icon={
                                  <SnapModeIcon text="i" />
                                }
                              />
                              <SnapRow
                                key="3"
                                label="Center"
                                icon={
                                  <SnapModeIcon text="c" />
                                }
                              />
                              <SnapRow
                                key="4"
                                label="Nearest"
                                icon={
                                  <SnapModeIcon text="n" />
                                }
                              />
                            </>
                          }
                        />
                    }
                  />
                </>
              }
            />
          </FooterZone>
          <Zone bounds={statusZone.props.bounds}>
            {this.getTarget(statusZone.id)}
          </Zone>
          {!outlineBounds ? undefined :
            <GhostOutline bounds={outlineBounds} />
          }
        </React.Fragment>
      );

    return (
      <React.Fragment key={statusZone.id}>
        <Zone bounds={statusZone.props.floating ? statusZone.props.floating.bounds : statusZone.props.bounds}>
          {this.getWidget(statusZone.id)}
        </Zone>
        <Zone bounds={statusZone.props.bounds}>
          {this.getTarget(statusZone.id)}
        </Zone>
        {!outlineBounds ? undefined :
          <GhostOutline bounds={outlineBounds} />
        }
      </React.Fragment>
    );
  }
}
