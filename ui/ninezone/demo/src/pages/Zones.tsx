/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import "@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BlueButton, HollowButton } from "@bentley/bwc";
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
// import OverflowItem from "@src/toolbar/item/Overflow";
import GroupColumn from "@src/toolbar/item/expandable/group/Column";
import GroupTool from "@src/toolbar/item/expandable/group/tool/Tool";
import ToolGroupExpander from "@src/toolbar/item/expandable/group/tool/Expander";
import ToolGroupComponent from "@src/toolbar/item/expandable/group/Group";
import NestedToolGroup from "@src/toolbar/item/expandable/group/Nested";
import PanelPlaceholder from "@src/toolbar/item/expandable/group/Placeholder";
import HistoryIcon from "@src/toolbar/item/expandable/history/Icon";
import HistoryTray, { History, DefaultHistoryManager } from "@src/toolbar/item/expandable/history/Tray";
import HistoryPlaceholder from "@src/toolbar/item/expandable/history/Placeholder";
import ToolbarIcon from "@src/toolbar/item/Icon";
import Toolbar, { /*ToolbarPanelAlignment*/ } from "@src/toolbar/Toolbar";
import ScrollableToolbar from "@src/toolbar/Scrollable";
import Direction from "@src/utilities/Direction";
import { PointProps } from "@src/utilities/Point";
import Size from "@src/utilities/Size";
import ResizeHandle from "@src/widget/rectangular/ResizeHandle";
import WidgetTab from "@src/widget/rectangular/tab/Draggable";
import TabSeparator from "@src/widget/rectangular/tab/Separator";
import WidgetTabGroup, { VisibilityMode } from "@src/widget/rectangular/tab/Group";
import { TabMode } from "@src/widget/rectangular/tab/Tab";
import StackedWidget, { HorizontalAnchor, VerticalAnchor } from "@src/widget/Stacked";
import ToolsWidget from "@src/widget/tools/Tools";
import FooterZone from "@src/zones/Footer";
import NineZone, { getDefaultProps as getDefaultNineZone, NineZoneProps, WidgetZoneIndex } from "@src/zones/state/NineZone";
import NineZoneManager from "@src/zones/state/Manager";
import { WidgetProps, DraggingWidgetProps } from "@src/zones/state/Widget";
import { TargetType, TargetProps } from "@src/zones/state/Target";
import { ZoneProps, DropTarget, StatusZone } from "@src/zones/state/Zone";
import TargetContainer from "@src/zones/target/Container";
import MergeTarget from "@src/zones/target/Merge";
import BackTarget from "@src/zones/target/Back";
import Zone from "@src/zones/Zone";
import Zones from "@src/zones/Zones";
import GhostOutline from "@src/zones/GhostOutline";
import ThemeContext, { ThemeContextProps } from "@src/theme/Context";
import Theme, { DarkTheme, PrimaryTheme, LightTheme } from "@src/theme/Theme";
import { offsetAndContainInContainer } from "@src/popup/tooltip/Tooltip";
import { RectangleProps } from "@src/utilities/Rectangle";
import "./Zones.scss";
import withContainInViewport from "@src/base/WithContainInViewport";
import { OmitChildrenProp } from "@src/utilities/Props";

const adjustTooltipPosition = offsetAndContainInContainer();
// tslint:disable-next-line:variable-name
const TooltipWithTimeout = withTimeout(Tooltip);
// tslint:disable-next-line:variable-name
const ToolGroupContained = withContainInViewport(ToolGroupComponent);
// tslint:disable-next-line:variable-name
const NestedToolGroupContained = withContainInViewport(NestedToolGroup);

interface State {
  readonly isNestedPopoverOpen: boolean;
  readonly isOverflowItemOpen: boolean;
  readonly isPopoverOpen: boolean;
  readonly isTemporaryMessageVisible: number;
  readonly isTooltipVisible: boolean;
  readonly message: Message;
  readonly nineZone: NineZoneProps;
  readonly openWidget: FooterWidget;
  readonly secondZoneContent: SecondZoneContent;
  readonly tools: ZoneTools;
  readonly themeContext: ThemeContextProps;
  readonly toastMessageKey: number;
}

interface ZoneTools {
  1: DirectionTools<Zone1HorizontalTools, Zone1VerticalTools>;
  3: DirectionTools<Zone3HorizontalTools, Zone3VerticalTools>;
}

interface DirectionTools<THorizontal extends Tools = Tools, TVertical extends Tools = Tools> {
  horizontal: THorizontal;
  vertical: TVertical;
}

interface Zone1HorizontalTools extends Tools {
  d2: ToolGroup;
  toggleItems: SimpleTool;
}

interface Zone1VerticalTools extends Tools {
  cube: ToolGroup;
  disableItems: SimpleTool;
  validate: ToolGroup;
}

interface Zone3HorizontalTools extends Tools {
  overflow: SimpleTool;
  toolSettings: SimpleTool;
}

interface Zone3VerticalTools extends Tools {
  channel: ToolGroup;
  chat1: SimpleTool;
  browse: SimpleTool;
  clipboard: ToolGroup;
  calendar: ToolGroup;
  chat2: SimpleTool;
  document: SimpleTool;
}

interface ToolLocation {
  zoneKey: keyof (ZoneTools);
  directionKey: keyof (DirectionTools);
}

enum MessageCenterActiveTab {
  AllMessages,
  Problems,
}

enum SecondZoneContent {
  None,
  Minimized,
  ToolSettings,
}

enum Message {
  None,
  Activity,
  Modal,
  Toast,
  Sticky,
}

enum FooterWidget {
  None,
  ToolAssistance,
  Messages,
  SnapMode,
}

interface HistoryItem {
  toolId: string;
  trayId: string;
  columnId: string;
  itemId: string;
}

interface ToolGroupItem {
  icon: string;
  trayId: string | undefined;
  isDisabled?: boolean;
}

interface ToolGroupColumn {
  items: { [id: string]: ToolGroupItem };
}

interface ToolGroupTray {
  title: string;
  columns: { [id: string]: ToolGroupColumn };
}

interface SimpleTool {
  id: string;
  icon: string;
  isDisabled?: boolean;
}

interface ToolGroup {
  id: string;
  icon: string;
  trayId: string;
  backTrays: ReadonlyArray<string>;
  trays: { [id: string]: ToolGroupTray };
  direction: Direction;
  history: History<HistoryItem>;
  isExtended: boolean;
  isToolGroupOpen: boolean;
  isDisabled?: boolean;
}

type Tool = SimpleTool | ToolGroup;

interface Tools {
  [id: string]: Tool;
}

const isToolGroup = (toolState: Tool): toolState is ToolGroup => {
  return (toolState as ToolGroup).trays !== undefined;
};

const customTheme: Theme = {
  name: "custom",
};

interface MessageExampleProps {
  onHideMessage: () => void;
}

class ActivityMessageExample extends React.PureComponent<MessageExampleProps> {
  public render() {
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
                onClick={this.props.onHideMessage}
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
}

interface ModalMessageExampleProps extends MessageExampleProps {
  renderTo: () => HTMLElement;
}

class ModalMessageExample extends React.PureComponent<ModalMessageExampleProps> {
  public render() {
    return (
      <ModalMessage
        renderTo={this.props.renderTo}
        dialog={
          <MessageDialog
            titleBar={
              <MessageTitleBar
                title={
                  <MessageTitle text="Dialog" />
                }
                buttons={
                  <MessageDialogButton onClick={this.props.onHideMessage}>
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
                      onClick={this.props.onHideMessage}
                    >
                      Yes
                        </BlueButton>
                    <HollowButton
                      onClick={this.props.onHideMessage}
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
}

class StickyMessageExample extends React.PureComponent<MessageExampleProps> {
  public render() {
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
              <MessageButton onClick={this.props.onHideMessage}>
                <i className="icon icon-close" />
              </MessageButton>
            }
          />
        </StatusMessage>
      </StickyMessage>
    );
  }
}

interface ToastMessageExampleProps extends MessageExampleProps {
  animateOutTo: React.ReactInstance | undefined;
}

interface ToastMessageExampleState {
  stage: ToastMessageStage;
}

class ToastMessageExample extends React.PureComponent<ToastMessageExampleProps, ToastMessageExampleState> {
  public constructor(props: ToastMessageExampleProps) {
    super(props);

    this.state = {
      stage: ToastMessageStage.Visible,
    };
  }

  public render() {
    return (
      <ToastMessage
        animateOutTo={this.props.animateOutTo}
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
        onAnimatedOut={this.props.onHideMessage}
        onStageChange={this._handleToastStageChange}
        stage={this.state.stage}
        timeout={2500}
      />
    );
  }

  private _handleToastStageChange = (stage: ToastMessageStage) => {
    this.setState(() => ({
      stage,
    }));
  }
}

interface FooterMessageExampleProps {
  readonly toastMessageKey: React.Key;
  readonly message: Message;
  readonly renderModalMessageTo: () => HTMLElement;
  readonly animateToastMessageTo: React.ReactInstance | undefined;
  readonly onHideMessage: () => void;
}

class FooterMessageExample extends React.PureComponent<FooterMessageExampleProps> {
  public render() {
    switch (this.props.message) {
      case (Message.Activity): {
        return (
          <ActivityMessageExample
            onHideMessage={this.props.onHideMessage}
          />
        );
      }
      case (Message.Modal): {
        return (
          <ModalMessageExample
            onHideMessage={this.props.onHideMessage}
            renderTo={this.props.renderModalMessageTo}
          />
        );
      }
      case (Message.Toast): {
        return (
          <ToastMessageExample
            key={this.props.toastMessageKey}
            onHideMessage={this.props.onHideMessage}
            animateOutTo={this.props.animateToastMessageTo}
          />
        );
      }
      case (Message.Sticky): {
        return (
          <StickyMessageExample
            onHideMessage={this.props.onHideMessage}
          />
        );
      }
    }
    return null;
  }
}

interface StatusZoneExampleProps extends MessageExampleProps {
  readonly bounds: RectangleProps;
  readonly dropTarget: DropTarget;
  readonly isInWidgetMode: boolean;
  readonly message: Message;
  readonly onHideMessage: () => void;
  readonly onTargetChanged: TargetChangedHandler;
  readonly onWidgetChange: (widget: FooterWidget) => void;
  readonly openWidget: FooterWidget;
  readonly outlineBounds: RectangleProps | undefined;
  readonly renderModalMessageTo: () => HTMLElement;
  readonly targetBounds: RectangleProps;
  readonly toastMessageKey: React.Key;
}

interface StatusZoneExampleState {
  messageCenterTab: MessageCenterActiveTab;
}

class StatusZoneExample extends React.PureComponent<StatusZoneExampleProps, StatusZoneExampleState> {
  private _footerMessages = React.createRef<MessageCenterIndicator>();

  public constructor(props: StatusZoneExampleProps) {
    super(props);

    this.state = {
      messageCenterTab: MessageCenterActiveTab.AllMessages,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <FooterZone
          isInFooterMode={!this.props.isInWidgetMode}
          bounds={this.props.bounds}
        >
          <Footer
            isInWidgetMode={this.props.isInWidgetMode}
            message={
              <FooterMessageExample
                toastMessageKey={this.props.toastMessageKey}
                animateToastMessageTo={this._footerMessages.current || undefined}
                onHideMessage={this.props.onHideMessage}
                message={this.props.message}
                renderModalMessageTo={this.props.renderModalMessageTo}
              />
            }
            indicators={
              <>
                <ToolAssistanceIndicator
                  dialog={
                    this.props.openWidget !== FooterWidget.ToolAssistance ? undefined :
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
                  isStepStringVisible={!this.props.isInWidgetMode}
                  onClick={this._handleToggleToolAssistanceDialog}
                  stepString="Start Point"
                />
                <MessageCenterIndicator
                  ref={this._footerMessages}
                  label="Message(s):"
                  isLabelVisible={!this.props.isInWidgetMode}
                  balloonLabel="9+"
                  onClick={this._handleToggleMessageCenterDialog}
                  dialog={
                    this.props.openWidget !== FooterWidget.Messages ? undefined :
                      <MessageCenter
                        title="Messages"
                        buttons={
                          <>
                            <MessageCenterButton>
                              <i className={"icon icon-placeholder"} />
                            </MessageCenterButton>
                            <MessageCenterButton onClick={this._handleCloseMessageCenter}>
                              <i className={"icon icon-close"} />
                            </MessageCenterButton>
                          </>
                        }
                        tabs={
                          <>
                            <MessageCenterTab
                              isOpen={this.state.messageCenterTab === MessageCenterActiveTab.AllMessages}
                              onClick={this._handleAllMessagesTabClick}
                            >
                              All
                          </MessageCenterTab>
                            <MessageCenterTab
                              isOpen={this.state.messageCenterTab === MessageCenterActiveTab.Problems}
                              onClick={this._handleProblemsTabClick}
                            >
                              Problems
                          </MessageCenterTab>
                          </>
                        }
                        messages={this.state.messageCenterTab === MessageCenterActiveTab.AllMessages ?
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
                          </> :
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
                        }
                        prompt="No messages."
                      />
                  }
                />
                <SnapModeIndicator
                  label="Snap Mode"
                  isLabelVisible={!this.props.isInWidgetMode}
                  onClick={this._handleToggleSnapModeDialog}
                  icon={
                    <SnapModeIcon text="k" />
                  }
                  dialog={
                    this.props.openWidget !== FooterWidget.SnapMode ? undefined :
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
        <Zone bounds={this.props.targetBounds}>
          <TargetExample
            zoneIndex={StatusZone.id}
            dropTarget={this.props.dropTarget}
            onTargetChanged={this.props.onTargetChanged}
          />
        </Zone>
        {!this.props.outlineBounds ? undefined :
          <GhostOutline bounds={this.props.outlineBounds} />
        }
      </React.Fragment>
    );
  }

  private _handleAllMessagesTabClick = () => {
    this.setState(() => ({
      messageCenterTab: MessageCenterActiveTab.AllMessages,
    }));
  }

  private _handleProblemsTabClick = () => {
    this.setState(() => ({
      messageCenterTab: MessageCenterActiveTab.Problems,
    }));
  }

  private _handleCloseMessageCenter = () => {
    this.props.onWidgetChange(FooterWidget.None);
  }

  private _handleToggleMessageCenterDialog = () => {
    this.props.onWidgetChange(this.props.openWidget === FooterWidget.Messages ? FooterWidget.None : FooterWidget.Messages);
  }

  private _handleToggleToolAssistanceDialog = () => {
    this.props.onWidgetChange(this.props.openWidget === FooterWidget.ToolAssistance ? FooterWidget.None : FooterWidget.ToolAssistance);
  }

  private _handleToggleSnapModeDialog = () => {
    this.props.onWidgetChange(this.props.openWidget === FooterWidget.SnapMode ? FooterWidget.None : FooterWidget.SnapMode);
  }
}

interface FloatingZoneProps extends Widget6Tab1ContentProps, Widget7Tab1ContentProps {
  bounds: RectangleProps;
  draggingWidget: DraggingWidgetProps | undefined;
  dropTarget: DropTarget;
  horizontalAnchor: HorizontalAnchor;
  onResize: (zoneId: WidgetZoneIndex, x: number, y: number, handle: ResizeHandle, filledHeightDiff: number) => void;
  onTabClick: (widgetId: WidgetZoneIndex, tabId: number) => void;
  onTabDragStart: (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, widgetOffset: PointProps) => void;
  onTabDragEnd: () => void;
  onTabDrag: (dragged: PointProps) => void;
  onTargetChanged: TargetChangedHandler;
  outlineBounds: RectangleProps | undefined;
  targetBounds: RectangleProps;
  verticalAnchor: VerticalAnchor;
  zone: ZoneProps;
}

class FloatingZone extends React.PureComponent<FloatingZoneProps> {
  public render() {
    return (
      <>
        <Zone bounds={this.props.bounds}>
          {this.props.zone.widgets.length > 0 &&
            <FloatingZoneWidget
              draggingWidget={this.props.draggingWidget}
              horizontalAnchor={this.props.horizontalAnchor}
              onChangeTheme={this.props.onChangeTheme}
              onResize={this.props.onResize}
              onOpenActivityMessage={this.props.onOpenActivityMessage}
              onOpenModalMessage={this.props.onOpenModalMessage}
              onOpenToastMessage={this.props.onOpenToastMessage}
              onOpenStickyMessage={this.props.onOpenStickyMessage}
              onShowTooltip={this.props.onShowTooltip}
              onToggleFooterMode={this.props.onToggleFooterMode}
              onTabClick={this.props.onTabClick}
              onTabDragStart={this.props.onTabDragStart}
              onTabDragEnd={this.props.onTabDragEnd}
              onTabDrag={this.props.onTabDrag}
              verticalAnchor={this.props.verticalAnchor}
              zone={this.props.zone}
            />
          }
        </Zone>
        <Zone bounds={this.props.targetBounds}>
          <TargetExample
            dropTarget={this.props.dropTarget}
            zoneIndex={this.props.zone.id}
            onTargetChanged={this.props.onTargetChanged}
          />
        </Zone>
        {this.props.outlineBounds &&
          <GhostOutline bounds={this.props.outlineBounds} />
        }
      </>
    );
  }
}

interface FloatingZoneWidgetProps extends Widget6Tab1ContentProps, Widget7Tab1ContentProps {
  draggingWidget: DraggingWidgetProps | undefined;
  horizontalAnchor: HorizontalAnchor;
  onResize: (zoneId: WidgetZoneIndex, x: number, y: number, handle: ResizeHandle, filledHeightDiff: number) => void;
  onTabClick: (widgetId: WidgetZoneIndex, tabId: number) => void;
  onTabDragStart: (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, widgetOffset: PointProps) => void;
  onTabDragEnd: () => void;
  onTabDrag: (dragged: PointProps) => void;
  verticalAnchor: VerticalAnchor;
  zone: ZoneProps;
}

class FloatingZoneWidget extends React.PureComponent<FloatingZoneWidgetProps> {
  public render() {
    const isOpen = this.props.zone.widgets.some((w) => w.tabIndex !== -1);
    const activeWidget = this.props.zone.widgets.find((widget) => widget.tabIndex !== -1);
    const isDragged = this.props.draggingWidget && this.props.draggingWidget.id === this.props.zone.id;
    return (
      <StackedWidget
        content={
          activeWidget &&
          <WidgetContent
            widgetId={activeWidget.id}
            tabIndex={activeWidget.tabIndex}
            onChangeTheme={this.props.onChangeTheme}
            onOpenActivityMessage={this.props.onOpenActivityMessage}
            onOpenModalMessage={this.props.onOpenModalMessage}
            onOpenToastMessage={this.props.onOpenToastMessage}
            onOpenStickyMessage={this.props.onOpenStickyMessage}
            onShowTooltip={this.props.onShowTooltip}
            onToggleFooterMode={this.props.onToggleFooterMode}
          />
        }
        fillZone={this.props.zone.isLayoutChanged}
        horizontalAnchor={this.props.horizontalAnchor}
        isDragged={isDragged}
        isFloating={this.props.zone.floating ? true : false}
        isOpen={isOpen}
        onResize={this._handleWidgetResize}
        tabs={
          <FloatingZoneTabs
            anchor={this.props.horizontalAnchor}
            draggingWidget={this.props.draggingWidget}
            isOpen={isOpen}
            onTabClick={this.props.onTabClick}
            onTabDragStart={this.props.onTabDragStart}
            onTabDragEnd={this.props.onTabDragEnd}
            onTabDrag={this.props.onTabDrag}
            zone={this.props.zone}
          />
        }
        verticalAnchor={this.props.verticalAnchor}
      />
    );
  }

  private _handleWidgetResize = (x: number, y: number, handle: ResizeHandle, filledHeightDiff: number) => {
    this.props.onResize(this.props.zone.id, x, y, handle, filledHeightDiff);
  }
}

interface FloatingZoneTabsProps {
  anchor: HorizontalAnchor;
  draggingWidget: DraggingWidgetProps | undefined;
  isOpen: boolean;
  onTabClick: (widgetId: WidgetZoneIndex, tabId: number) => void;
  onTabDragStart: (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, widgetOffset: PointProps) => void;
  onTabDragEnd: () => void;
  onTabDrag: (dragged: PointProps) => void;
  zone: ZoneProps;
}

class FloatingZoneTabs extends React.PureComponent<FloatingZoneTabsProps> {
  public render() {
    const tabs: JSX.Element[] = [];
    let i = -1;

    for (const widget of this.props.zone.widgets) {
      i++;
      const widgetTabs = (
        <FloatingZoneWidgetTabs
          key={widget.id}
          anchor={this.props.anchor}
          draggingWidget={this.props.draggingWidget}
          isOpen={this.props.isOpen}
          isStacked={this.props.zone.widgets.length > 1}
          onTabClick={this.props.onTabClick}
          onTabDragStart={this.props.onTabDragStart}
          onTabDragEnd={this.props.onTabDragEnd}
          onTabDrag={this.props.onTabDrag}
          widget={widget}
        />
      );

      if (i !== 0)
        tabs.push(<TabSeparator key={`separator_${i}`} />);
      tabs.push(widgetTabs);
    }

    return tabs;
  }
}

interface FloatingZoneWidgetTabsProps {
  anchor: HorizontalAnchor;
  draggingWidget: DraggingWidgetProps | undefined;
  isOpen: boolean;
  isStacked: boolean;
  onTabClick: (widgetId: WidgetZoneIndex, tabId: number) => void;
  onTabDragStart: (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, widgetOffset: PointProps) => void;
  onTabDragEnd: () => void;
  onTabDrag: (dragged: PointProps) => void;
  widget: WidgetProps;
}

class FloatingZoneWidgetTabs extends React.PureComponent<FloatingZoneWidgetTabsProps> {
  private getTabHandleMode() {
    if (this.props.draggingWidget && this.props.draggingWidget.id === this.props.widget.id && this.props.draggingWidget.isUnmerge)
      return VisibilityMode.Visible;

    if (this.props.isStacked)
      return VisibilityMode.OnHover;

    return VisibilityMode.Timeout;
  }

  private getTab(tabId: number, icon: string, mode: TabMode, lastPosition: PointProps | undefined) {
    return (
      <FloatingZoneWidgetTab
        anchor={this.props.anchor}
        icon={icon}
        lastPosition={lastPosition}
        mode={mode}
        onClick={this.props.onTabClick}
        onDragStart={this.props.onTabDragStart}
        onDragEnd={this.props.onTabDragEnd}
        onDrag={this.props.onTabDrag}
        tabId={tabId}
        widgetId={this.props.widget.id}
      />
    );
  }

  public render() {
    const lastPosition = this.props.draggingWidget && this.props.draggingWidget.id === this.props.widget.id ?
      this.props.draggingWidget.lastPosition : undefined;
    const tabIndex = this.props.draggingWidget ? this.props.draggingWidget.tabIndex : -1;
    const mode1 = !this.props.isOpen ? TabMode.Closed : this.props.widget.tabIndex === 1 ? TabMode.Active : TabMode.Open;
    const mode2 = !this.props.isOpen ? TabMode.Closed : this.props.widget.tabIndex === 2 ? TabMode.Active : TabMode.Open;
    const lastPosition1 = tabIndex === 1 ? lastPosition : undefined;
    const lastPosition2 = tabIndex === 2 ? lastPosition : undefined;
    const handleMode = this.getTabHandleMode();
    switch (this.props.widget.id) {
      case 4: {
        return (
          <WidgetTabGroup
            anchor={this.props.anchor}
            handleMode={handleMode}
          >
            {this.getTab(1, "icon-settings", mode1, lastPosition1)}
            {this.getTab(2, "icon-help", mode2, lastPosition2)}
          </WidgetTabGroup >
        );
      }
      case 6: {
        return this.getTab(1, "icon-placeholder", mode1, lastPosition1);
      }
      case 7: {
        return this.getTab(1, "icon-placeholder", mode1, lastPosition1);
      }
      case 8: {
        return this.getTab(1, "icon-placeholder", mode1, lastPosition1);
      }
      case 9: {
        return (
          <WidgetTabGroup
            anchor={this.props.anchor}
            handleMode={handleMode}
          >
            {this.getTab(1, "icon-settings", mode1, lastPosition1)}
            {this.getTab(2, "icon-help", mode2, lastPosition2)}
          </WidgetTabGroup>
        );
      }
    }
    return null;
  }
}

interface FloatingZoneWidgetTabProps {
  anchor: HorizontalAnchor;
  icon: string;
  lastPosition: PointProps | undefined;
  mode: TabMode;
  onClick: (widgetId: WidgetZoneIndex, tabId: number) => void;
  onDragStart: (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, widgetOffset: PointProps) => void;
  onDragEnd: () => void;
  onDrag: (dragged: PointProps) => void;
  tabId: number;
  widgetId: WidgetZoneIndex;
}

class FloatingZoneWidgetTab extends React.PureComponent<FloatingZoneWidgetTabProps> {
  public render() {
    return (
      <WidgetTab
        key="3_1"
        mode={this.props.mode}
        onClick={this._handleOnClick}
        lastPosition={this.props.lastPosition}
        onDragStart={this._handleOnDragStart}
        onDragEnd={this.props.onDragEnd}
        onDrag={this.props.onDrag}
        anchor={this.props.anchor}
      >
        <i className={`icon ${this.props.icon}`} />
      </WidgetTab>
    );
  }

  private _handleOnClick = () => {
    this.props.onClick(this.props.widgetId, this.props.tabId);
  }

  private _handleOnDragStart = (initialPosition: PointProps, widgetOffset: PointProps) => {
    this.props.onDragStart(this.props.widgetId, this.props.tabId, initialPosition, widgetOffset);
  }
}

type TargetChangedHandler = (target: TargetProps | undefined) => void;

interface TargetExampleProps {
  dropTarget: DropTarget;
  zoneIndex: WidgetZoneIndex;
  onTargetChanged: TargetChangedHandler;
}

class TargetExample extends React.PureComponent<TargetExampleProps> {
  public render() {
    return (
      <TargetContainer>
        {this.props.dropTarget === DropTarget.Merge &&
          <MergeTarget
            onTargetChanged={this._handleMergeTargetChanged}
          />
        }
        {this.props.dropTarget === DropTarget.Back &&
          <BackTarget
            onTargetChanged={this._handleBackTargetChanged}
            zoneIndex={this.props.zoneIndex}
          />
        }
      </TargetContainer>
    );
  }

  private _handleMergeTargetChanged = (isTargeted: boolean) => {
    this.onTargetChanged(isTargeted, TargetType.Merge);
  }

  private _handleBackTargetChanged = (isTargeted: boolean) => {
    this.onTargetChanged(isTargeted, TargetType.Back);
  }

  private onTargetChanged(isTargeted: boolean, type: TargetType) {
    isTargeted ?
      this.props.onTargetChanged({
        zoneId: this.props.zoneIndex,
        type,
      }) :
      this.props.onTargetChanged(undefined);
  }
}

interface TooltipExampleProps {
  readonly isTooltipVisible: boolean;
  readonly isTemporaryMessageVisible: number;
  readonly onMessageHidden: () => void;
  readonly onTooltipTimeout: () => void;
}

interface TooltipExampleState {
  readonly mousePosition: PointProps;
  readonly temporaryMessageStyle: React.CSSProperties;
}

class TooltipExample extends React.PureComponent<TooltipExampleProps, TooltipExampleState> {
  private _temporaryMessageTimer = new Timer(2000);

  public componentDidMount(): void {
    this._temporaryMessageTimer.setOnExecute(this.props.onMessageHidden);

    if (this.props.isTemporaryMessageVisible !== 0)
      this._temporaryMessageTimer.start();
  }

  public componentWillUnmount(): void {
    this._temporaryMessageTimer.stop();
  }

  public componentDidUpdate(prevProps: TooltipExampleProps): void {
    if (this.props.isTemporaryMessageVisible !== 0 && this.props.isTemporaryMessageVisible !== prevProps.isTemporaryMessageVisible) {
      this._temporaryMessageTimer.start();
      this.setState((prevState) => ({
        temporaryMessageStyle: {
          left: prevState.mousePosition.x,
          top: prevState.mousePosition.y,
        },
      }));
    }
  }

  public constructor(props: TooltipExampleProps) {
    super(props);

    this.state = {
      mousePosition: {
        x: 0,
        y: 0,
      },
      temporaryMessageStyle: {},
    };
  }

  public render() {
    return (
      <>
        <MouseTracker onPositionChange={this._handlePositionChange} />
        {
          this.props.isTooltipVisible && (
            <TooltipWithTimeout
              stepString="Start Point"
              timeout={2000}
              onTimeout={this.props.onTooltipTimeout}
              position={this.state.mousePosition}
              adjustPosition={adjustTooltipPosition}
            >
              <i className="icon icon-placeholder" />
            </TooltipWithTimeout>
          )
        }
        {this.props.isTemporaryMessageVisible !== 0 &&
          <TemporaryMessage>
            Text element required.
          </TemporaryMessage>
        }
      </>
    );
  }

  private _handlePositionChange = (mousePosition: PointProps) => {
    this.setState(() => ({
      mousePosition,
    }));
  }
}

interface ContentExampleProps {
  onClick: () => void;
}

class ContentExample extends React.PureComponent<ContentExampleProps> {
  private _canvas = React.createRef<HTMLCanvasElement>();
  private _ctx?: CanvasRenderingContext2D;

  public componentDidMount() {
    if (!this._canvas.current)
      return;

    const ctx = this._canvas.current.getContext("2d");
    if (!ctx)
      return;

    this._canvas.current.width = window.innerWidth;
    this._canvas.current.height = window.innerHeight;
    this.drawRandomCircles(ctx, this._canvas.current.width, this._canvas.current.height);

    this._ctx = ctx;
    window.addEventListener("resize", this._handleWindowResize);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this._handleWindowResize, true);
  }

  public render() {
    return (
      <canvas
        className="content"
        ref={this._canvas}
        onClick={this.props.onClick}
      />
    );
  }

  private drawRandomCircles(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.fillStyle = "#333333DD";
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const radius = Math.floor(Math.random() * 50) + 10;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  private _handleWindowResize = () => {
    if (!this._canvas.current)
      return;

    if (!this._ctx)
      return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    this._canvas.current.width = width;
    this._canvas.current.height = height;
    this.drawRandomCircles(this._ctx, width, height);
  }
}

interface Widget6Tab1ContentProps {
  onChangeTheme: (themeContext: ThemeContextProps) => void;
}

class Widget6Tab1Content extends React.PureComponent<Widget6Tab1ContentProps> {
  public render() {
    return (
      <ThemeContext.Consumer>
        {
          (context) => (
            <BlueButton
              onClick={this._handleButtonClick(context)}
            >
              Theme: {context.theme.name}
            </BlueButton>
          )
        }
      </ThemeContext.Consumer>
    );
  }

  private _handleButtonClick = (context: ThemeContextProps) => () => {
    this.props.onChangeTheme(context);
  }
}

interface Widget7Tab1ContentProps {
  onOpenActivityMessage: () => void;
  onOpenModalMessage: () => void;
  onOpenToastMessage: () => void;
  onOpenStickyMessage: () => void;
  onShowTooltip: () => void;
  onToggleFooterMode: () => void;
}

class Widget7Tab1Content extends React.PureComponent<Widget7Tab1ContentProps> {
  public render() {
    return (
      <>
        <BlueButton onClick={this.props.onOpenActivityMessage}>
          Show Activity Message
        </BlueButton>
        <span style={{ background: "#cebbbb", width: "800px", height: "50px", display: "block" }}></span>
        <br />
        <BlueButton onClick={this.props.onOpenModalMessage}>
          Show Modal Message
            </BlueButton>
        <br />
        <BlueButton onClick={this.props.onOpenToastMessage}>
          Show Toast Message
        </BlueButton>
        <br />
        <BlueButton onClick={this.props.onOpenStickyMessage}>
          Show Sticky Message
        </BlueButton>
        <br />
        <br />
        <BlueButton
          onClick={this.props.onShowTooltip}
        >
          Show Tooltip
        </BlueButton>
        <br />
        <br />
        <BlueButton
          onClick={this.props.onToggleFooterMode}
        >
          Change Footer Mode
        </BlueButton>
      </>
    );
  }
}

class Widget9Tab1Content extends React.PureComponent {
  public render() {
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
        <span style={{ background: "#cebbbb", width: "800px", height: "50px", display: "block" }} />
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
}

interface WidgetContentProps extends Widget6Tab1ContentProps, Widget7Tab1ContentProps {
  widgetId: WidgetZoneIndex;
  tabIndex: number;
}

class WidgetContent extends React.PureComponent<WidgetContentProps> {
  public render() {
    switch (this.props.widgetId) {
      case 4: {
        return `Hello world from zone4! (${this.props.tabIndex})`;
      }
      case 6: {
        return (
          <Widget6Tab1Content
            onChangeTheme={this.props.onChangeTheme} />
        );
      }
      case 7: {
        return (
          <Widget7Tab1Content
            onOpenActivityMessage={this.props.onOpenActivityMessage}
            onOpenModalMessage={this.props.onOpenModalMessage}
            onOpenStickyMessage={this.props.onOpenStickyMessage}
            onOpenToastMessage={this.props.onOpenToastMessage}
            onShowTooltip={this.props.onShowTooltip}
            onToggleFooterMode={this.props.onToggleFooterMode} />
        );
      }
      case 8: {
        return "Footer :)";
      }
      case 9: {
        switch (this.props.tabIndex) {
          case 1: {
            return (
              <Widget9Tab1Content />
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
}

interface ToolbarItemProps {
  onClick: (toolId: string) => void;
  onIsHistoryExtendedChange: (toolId: string, isExtended: boolean) => void;
  tool: Tool;
}

class ToolbarItem extends React.PureComponent<ToolbarItemProps> {
  public render() {
    if (isToolGroup(this.props.tool)) {
      return (
        <ExpandableItem
          onIsHistoryExtendedChange={this._handleOnIsHistoryExtendedChange}
          isDisabled={this.props.tool.isDisabled}
        >
          <ToolbarIcon
            icon={
              <i className={`icon ${this.props.tool.icon}`} />
            }
            onClick={this._handleOnClick}
            isDisabled={this.props.tool.isDisabled}
          />
        </ExpandableItem>
      );
    }

    return (
      <ToolbarIcon
        icon={
          <i className={`icon ${this.props.tool.icon}`} />
        }
        isDisabled={this.props.tool.isDisabled}
        onClick={this._handleOnClick}
      />
    );
  }

  private _handleOnClick = () => {
    this.props.onClick(this.props.tool.id);
  }

  private _handleOnIsHistoryExtendedChange = (isExtended: boolean) => {
    this.props.onIsHistoryExtendedChange(this.props.tool.id, isExtended);
  }
}

interface ToolbarItemHistoryTrayProps {
  onHistoryItemClick: (item: HistoryItem) => void;
  onIsHistoryExtendedChange: (toolId: string, isExtended: boolean) => void;
  tool: ToolGroup;
}

class ToolbarItemHistoryTray extends React.PureComponent<ToolbarItemHistoryTrayProps> {
  public render() {
    return (
      <HistoryPlaceholder>
        <HistoryTray
          direction={this.props.tool.direction}
          isExtended={this.props.tool.isExtended}
          onIsHistoryExtendedChange={this._handleOnIsHistoryExtendedChange}
          items={
            this.props.tool.history.map((entry) => {
              const tray = this.props.tool.trays[entry.item.trayId];
              return (
                <ToolbarItemHistoryItem
                  history={entry.item}
                  icon={tray.columns[entry.item.columnId].items[entry.item.itemId].icon}
                  key={entry.key}
                  onClick={this._handleOnHistoryItemClick}
                />
              );
            })
          }
        />
      </HistoryPlaceholder>
    );
  }

  private _handleOnHistoryItemClick = (item: HistoryItem) => {
    this.props.onHistoryItemClick(item);
  }

  private _handleOnIsHistoryExtendedChange = (isExtended: boolean) => {
    this.props.onIsHistoryExtendedChange(this.props.tool.id, isExtended);
  }
}

interface ToolbarItemHistoryItemProps {
  history: HistoryItem;
  icon: string;
  onClick: (history: HistoryItem) => void;
}

class ToolbarItemHistoryItem extends React.PureComponent<ToolbarItemHistoryItemProps> {
  public render() {
    return (
      <HistoryIcon
        onClick={this._handleOnClick}
      >
        <i className={`icon ${this.props.icon}`} />
      </HistoryIcon>
    );
  }

  private _handleOnClick = () => {
    this.props.onClick(this.props.history);
  }
}

interface ToolbarItemPanelProps {
  onExpandGroup: (toolId: string, trayId: string | undefined) => void;
  onToolClick: (args: ToolbarItemGroupToolClickArgs) => void;
  onBack: (toolId: string) => void;
  tool: ToolGroup;
}

interface ToolbarItemGroupToolClickArgs extends GroupColumnToolClickArgs {
  toolId: string;
}

class ToolbarItemPanel extends React.PureComponent<ToolbarItemPanelProps> {
  public render() {
    const tray = this.props.tool.trays[this.props.tool.trayId];
    const columns = (
      Object.keys(tray.columns).map((columnId) => {
        const column = tray.columns[columnId];
        return (
          <GroupColumn key={columnId}>
            {Object.keys(column.items).map((itemId) => {
              const item = column.items[itemId];
              if (item.trayId)
                return (
                  <GroupColumnExpander
                    key={itemId}
                    icon={item.icon}
                    isDisabled={item.isDisabled || false}
                    label={itemId}
                    onClick={this._handleExpanderClick}
                    trayId={item.trayId}
                  />
                );
              return (
                <GroupColumnTool
                  columnId={columnId}
                  icon={item.icon}
                  isDisabled={item.isDisabled || false}
                  itemId={itemId}
                  key={itemId}
                  label={itemId}
                  onClick={this._handleGroupColumnToolClick}
                  trayId={(this.props.tool as ToolGroup).trayId}
                />
              );
            })}
          </GroupColumn>
        );
      })
    );

    if (this.props.tool.backTrays.length > 0)
      return (
        <PanelPlaceholder>
          <NestedToolGroupContained
            title={tray.title}
            columns={columns}
            onBack={this._handleOnBack}
          />
        </PanelPlaceholder>
      );

    return (
      <PanelPlaceholder>
        <ToolGroupContained
          title={tray.title}
          columns={columns}
        />
      </PanelPlaceholder>
    );
  }

  private _handleOnBack = () => {
    this.props.onBack(this.props.tool.id);
  }

  private _handleGroupColumnToolClick = (args: GroupColumnToolClickArgs) => {
    this.props.onToolClick({ ...args, toolId: this.props.tool.id });
  }

  private _handleExpanderClick = (trayId: string) => {
    this.props.onExpandGroup(this.props.tool.id, trayId);
  }
}

interface GroupColumnExpanderProps {
  icon: string;
  isDisabled: boolean;
  label: string;
  onClick: (trayId: string) => void;
  trayId: string;
}

class GroupColumnExpander extends React.PureComponent<GroupColumnExpanderProps> {
  public render() {
    return (
      <ToolGroupExpander
        label={this.props.label}
        icon={
          <i className={`icon ${this.props.icon}`} />
        }
        onClick={this._handleOnClick}
        isDisabled={this.props.isDisabled}
      />
    );
  }

  private _handleOnClick = () => {
    this.props.onClick(this.props.trayId);
  }
}

interface GroupColumnToolProps {
  columnId: string;
  icon: string;
  isDisabled: boolean;
  itemId: string;
  label: string;
  onClick: (args: GroupColumnToolClickArgs) => void;
  trayId: string;
}

interface GroupColumnToolClickArgs {
  columnId: string;
  itemId: string;
  trayId: string;
}

class GroupColumnTool extends React.PureComponent<GroupColumnToolProps> {
  public render() {
    return (
      <GroupTool
        label={this.props.label}
        onClick={this._handleOnClick}
        icon={
          <i className={`icon ${this.props.icon}`} />
        }
        isDisabled={this.props.isDisabled}
      />
    );
  }

  private _handleOnClick = () => {
    const args: GroupColumnToolClickArgs = {
      columnId: this.props.columnId,
      itemId: this.props.itemId,
      trayId: this.props.trayId,
    };
    this.props.onClick(args);
  }
}

interface Zone1Props {
  bounds: RectangleProps;
  horizontalTools: Tools;
  onHistoryItemClick: (item: HistoryItem) => void;
  onIsHistoryExtendedChange: (toolId: string, isExtended: boolean) => void;
  onOpenPanelGroup: (toolId: string, trayId: string | undefined) => void;
  onPanelBack: (toolId: string) => void;
  onPanelToolClick: (args: ToolbarItemGroupToolClickArgs) => void;
  onToolClick: (toolId: string) => void;
  verticalTools: Tools;
}

class Zone1 extends React.PureComponent<Zone1Props> {
  private _appButton = (
    <AppButton
      icon={
        <i className="icon icon-home" />
      }
    />
  );

  public render() {
    return (
      <Zone
        bounds={this.props.bounds}
      >
        <ToolsWidget
          button={this._appButton}
          horizontalToolbar={
            <ToolZoneToolbar
              expandsTo={Direction.Bottom}
              onHistoryItemClick={this.props.onHistoryItemClick}
              onIsHistoryExtendedChange={this.props.onIsHistoryExtendedChange}
              onOpenPanelGroup={this.props.onOpenPanelGroup}
              onPanelBack={this.props.onPanelBack}
              onPanelToolClick={this.props.onPanelToolClick}
              onToolClick={this.props.onToolClick}
              tools={this.props.horizontalTools}
            />
          }
          verticalToolbar={
            <ToolZoneToolbar
              expandsTo={Direction.Right}
              onHistoryItemClick={this.props.onHistoryItemClick}
              onIsHistoryExtendedChange={this.props.onIsHistoryExtendedChange}
              onOpenPanelGroup={this.props.onOpenPanelGroup}
              onPanelBack={this.props.onPanelBack}
              onPanelToolClick={this.props.onPanelToolClick}
              onToolClick={this.props.onToolClick}
              tools={this.props.verticalTools}
            />
          }
        />
      </Zone>
    );
  }
}

interface Zone3Props extends Zone1Props {
  onToolbarScroll: () => void;
}

class Zone3 extends React.PureComponent<Zone3Props> {
  public render() {
    return (
      <Zone
        bounds={this.props.bounds}
      >
        <ToolsWidget
          isNavigation
          preserveSpace
          horizontalToolbar={
            <ToolZoneToolbar
              expandsTo={Direction.Bottom}
              onHistoryItemClick={this.props.onHistoryItemClick}
              onIsHistoryExtendedChange={this.props.onIsHistoryExtendedChange}
              onOpenPanelGroup={this.props.onOpenPanelGroup}
              onPanelBack={this.props.onPanelBack}
              onPanelToolClick={this.props.onPanelToolClick}
              onToolClick={this.props.onToolClick}
              tools={this.props.horizontalTools}
            />
          }
          verticalToolbar={
            <ToolZoneScrollableToolbar
              expandsTo={Direction.Left}
              onHistoryItemClick={this.props.onHistoryItemClick}
              onIsHistoryExtendedChange={this.props.onIsHistoryExtendedChange}
              onOpenPanelGroup={this.props.onOpenPanelGroup}
              onPanelBack={this.props.onPanelBack}
              onPanelToolClick={this.props.onPanelToolClick}
              onScroll={this.props.onToolbarScroll}
              onToolClick={this.props.onToolClick}
              tools={this.props.verticalTools}
            />
          }
        />
      </Zone>
    );
    /*
    <ToolsWidget
      panelAlignment={ToolbarPanelAlignment.End}
      panels={
        this.state.isOverflowItemOpen &&
        <ToolGroupContained
          title={"Overflow Button"}
          columns={
            <GroupColumn>
              <GroupTool
                onClick={this._handleToggleOverflowItemOpen}
              >
                Tool1
              </GroupTool>
            </GroupColumn>
          }
        />
      }
      horizontalToolbar={
        <Toolbar
          items={
            <>
              {this.state.showAllItems &&
                <OverflowItem
                  key="0"
                  onClick={this._handleToggleOverflowItemOpen}
                />
              }
              {this.getToolbarItemWithToolSettings("chat")}
            </>
          }
    />
    */
  }
}

interface ToolZoneToolbarProps {
  children: (items: React.ReactNode, panels: React.ReactNode, histories: React.ReactNode) => React.ReactNode;
  expandsTo: Direction;
  onHistoryItemClick: (item: HistoryItem) => void;
  onIsHistoryExtendedChange: (toolId: string, isExtended: boolean) => void;
  onOpenPanelGroup: (toolId: string, trayId: string | undefined) => void;
  onPanelBack: (toolId: string) => void;
  onPanelToolClick: (args: ToolbarItemGroupToolClickArgs) => void;
  onToolClick: (toolId: string) => void;
  tools: Tools;
}

class ToolZoneToolbar extends React.PureComponent<ToolZoneToolbarProps> {
  public static readonly defaultProps: Partial<ToolZoneToolbarProps> = {
    // tslint:disable-next-line:space-before-function-paren object-literal-shorthand
    children: function(this: ToolZoneToolbarProps,
      items: React.ReactNode, panels: React.ReactNode, histories: React.ReactNode) {
      return (
        <Toolbar
          expandsTo={this.expandsTo}
          items={items}
          panels={panels}
          histories={histories}
        />
      );
    },
  };

  public render() {
    const iph = Object.keys(this.props.tools).reduce((acc, toolId) => {
      const tool = this.props.tools[toolId];

      const item = (
        <ToolbarItem
          tool={tool}
          onClick={this.props.onToolClick}
          onIsHistoryExtendedChange={this.props.onIsHistoryExtendedChange}
        />
      );

      const panel = isToolGroup(tool) && tool.isToolGroupOpen ? (
        <ToolbarItemPanel
          onExpandGroup={this.props.onOpenPanelGroup}
          onToolClick={this.props.onPanelToolClick}
          onBack={this.props.onPanelBack}
          tool={tool}
        />
      ) : <PanelPlaceholder />;

      const history = isToolGroup(tool) &&
        !tool.isToolGroupOpen &&
        tool.history.length > 0 ? (
          <ToolbarItemHistoryTray
            onHistoryItemClick={this.props.onHistoryItemClick}
            onIsHistoryExtendedChange={this.props.onIsHistoryExtendedChange}
            tool={tool}
          />
        ) : <HistoryPlaceholder />;

      acc.items.push(item);
      acc.panels.push(panel);
      acc.histories.push(history);
      return acc;
    }, {
        items: new Array<React.ReactNode>(),
        panels: new Array<React.ReactNode>(),
        histories: new Array<React.ReactNode>(),
      },
    );
    return this.props.children(iph.items, iph.panels, iph.histories);
  }
}

interface ScrollableToolbarProps extends OmitChildrenProp<ToolZoneToolbarProps> {
  onScroll: () => void;
}

class ToolZoneScrollableToolbar extends React.PureComponent<ScrollableToolbarProps> {
  public render() {
    const { expandsTo, ...props } = this.props;
    return (
      <ToolZoneToolbar
        {...props}
      >
        {this._renderScrollableToolbar}
      </ToolZoneToolbar>
    );
  }

  private _renderScrollableToolbar = (items: React.ReactNode, panels: React.ReactNode, histories: React.ReactNode): React.ReactNode => {
    return (
      <ScrollableToolbar
        expandsTo={this.props.expandsTo}
        onScroll={this.props.onScroll}
        items={items}
        panels={panels}
        histories={histories}
      />
    );
  }
}

export default class ZonesExample extends React.PureComponent<{}, State> {
  private _app = React.createRef<App>();
  private _dialogContainer = document.createElement("div");

  public readonly state: Readonly<State>;

  public constructor(p: {}) {
    super(p);

    const nineZone =
      NineZoneManager.mergeZone(9, 6,
        NineZoneManager.setAllowsMerging(4, false,
          getDefaultNineZone(),
        ),
      );

    this.state = {
      isNestedPopoverOpen: false,
      isPopoverOpen: false,
      isTemporaryMessageVisible: 0,
      isTooltipVisible: false,
      toastMessageKey: 0,
      nineZone,
      openWidget: FooterWidget.None,
      secondZoneContent: SecondZoneContent.None,
      message: Message.None,
      tools: {
        1: {
          horizontal: {
            d2: {
              id: "d2",
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
            toggleItems: {
              id: "toggleItems",
              icon: "icon-placeholder",
            } as SimpleTool,
          },
          vertical: {
            cube: {
              id: "cube",
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
            disableItems: {
              id: "disableItems",
              icon: "icon-placeholder",
            } as SimpleTool,
            validate: {
              id: "validate",
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
          },
        },
        3: {
          horizontal: {
            overflow: {
              id: "overflow",
              icon: "icon-placeholder",
            },
            toolSettings: {
              id: "toolSettings",
              icon: "icon-placeholder",
            },
          },
          vertical: {
            channel: {
              id: "channel",
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
            chat1: {
              id: "chat1",
              icon: "icon-placeholder",
            },
            browse: {
              id: "browse",
              icon: "icon-placeholder",
            },
            clipboard: {
              id: "clipboard",
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
            calendar: {
              id: "calendar",
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
            chat2: {
              id: "chat2",
              icon: "icon-placeholder",
            },
            document: {
              id: "document",
              icon: "icon-document",
            },
          },
        },
      },
      isOverflowItemOpen: false,
      themeContext: {
        theme: PrimaryTheme,
        change: (theme: Theme) => {
          this.setState((prevProps) => {
            return {
              themeContext: {
                ...prevProps.themeContext,
                theme,
              },
            };
          });
        },
      },
    };
  }

  public componentDidMount(): void {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.layout(new Size(document.body.clientWidth, document.body.clientHeight), prevState.nineZone),
    }));

    if (this._app.current) {
      const node = ReactDOM.findDOMNode(this._app.current);
      if (node && (node instanceof HTMLElement))
        node.appendChild(this._dialogContainer);
    }

    window.addEventListener("resize", this._handleWindowResize, true);
  }

  public componentWillUnmount(): void {
    document.removeEventListener("resize", this._handleWindowResize, true);
  }

  public render() {
    return (
      <ThemeContext.Provider value={this.state.themeContext}>
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
      <Zones>
        <TooltipExample
          isTemporaryMessageVisible={this.state.isTemporaryMessageVisible}
          isTooltipVisible={this.state.isTooltipVisible}
          onMessageHidden={this._handleTemporaryMessageHidden}
          onTooltipTimeout={this._handleTooltipTimeout}
        />
        {zones.map((z) => this.getZone(z))}
      </Zones>
    );
  }

  private getBackstage() {
    return undefined;
  }

  private getContent() {
    return (
      <Content>
        <ContentExample
          onClick={this._handleContentClick}
        />
      </Content>
    );
  }

  /*
  private getToolbarItemWithToolSettings(toolId: string) {
    const tool = this.state.tools[toolId];
    return (
      <ToolbarIcon
        key={toolId}
        isActive={this.state.secondZoneContent !== SecondZoneContent.None}
        icon={
          <i className={`icon ${tool.icon}`} />
        }
        onClick={this._handleToggleToolSettings}
      />
    );
  }
  */

  private getToolSettingsWidget() {
    const tab = (
      <ToolSettingsWidgetTab
        isActive={this.state.secondZoneContent === SecondZoneContent.ToolSettings}
        onClick={
          () => {
            this.setState((prevState) => ({
              secondZoneContent: prevState.secondZoneContent === SecondZoneContent.Minimized ? SecondZoneContent.ToolSettings : SecondZoneContent.Minimized,
            }));
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

  /*
  private getToolbarItem(toolId: string) {
    const tool = this.state.tools[toolId];
    return (
      <ToolbarItem
        tool={tool}
        onClick={this._handleOnToolbarItemClick}
        onIsHistoryExtendedChange={this._handleOnIsHistoryExtendedChange}
      />
    );
  }
*/
  private getZone(zoneId: WidgetZoneIndex) {
    switch (zoneId) {
      case 1:
        return this.getZone1();
      case 2:
        return this.getZone2();
      case 3:
        return this.getZone3();
      case 8: {
        return this.getStatusZone();
      }
      default:
        return this.getFloatingZone(zoneId);
    }
  }

  private getZone1() {
    const zoneId = 1;
    return (
      <Zone1
        bounds={this.state.nineZone.zones[zoneId].bounds}
        horizontalTools={this.state.tools[zoneId].horizontal}
        key={zoneId}
        onHistoryItemClick={this._handleOnHistoryItemClick}
        onIsHistoryExtendedChange={this._handleOnIsToolHistoryExtendedChange}
        onOpenPanelGroup={this._handleOnExpandPanelGroup}
        onPanelBack={this._handleOnPanelBack}
        onPanelToolClick={this._handlePanelToolClick}
        onToolClick={this._handleOnToolClick}
        verticalTools={this.state.tools[zoneId].vertical}
      />
    );
  }

  private getZone2() {
    const zoneId = 2;
    return (
      <Zone
        bounds={this.state.nineZone.zones[zoneId].bounds}
        key={zoneId}
      >
        {this.getToolSettingsWidget()}
      </Zone>
    );
  }

  private getZone3() {
    const zoneId = 3;
    return (
      <Zone3
        bounds={this.state.nineZone.zones[zoneId].bounds}
        horizontalTools={this.state.tools[zoneId].horizontal}
        key={zoneId}
        onHistoryItemClick={this._handleOnHistoryItemClick}
        onIsHistoryExtendedChange={this._handleOnIsToolHistoryExtendedChange}
        onOpenPanelGroup={this._handleOnExpandPanelGroup}
        onPanelBack={this._handleOnPanelBack}
        onPanelToolClick={this._handlePanelToolClick}
        onToolbarScroll={this._handleOnToolbarScroll}
        onToolClick={this._handleOnToolClick}
        verticalTools={this.state.tools[zoneId].vertical}
      />
    );
  }

  private getFloatingZone(zoneId: WidgetZoneIndex) {
    const nineZone = new NineZone(this.state.nineZone);
    const zone = nineZone.getWidgetZone(zoneId);
    const bounds = zone.props.floating ? zone.props.floating.bounds : zone.props.bounds;
    const outlineBounds = zone.getGhostOutlineBounds();
    const dropTarget = zone.getDropTarget();
    const draggingWidget = nineZone.draggingWidget && nineZone.draggingWidget.zone.id === zone.id ? nineZone.draggingWidget.props : undefined;
    return (
      <FloatingZone
        draggingWidget={draggingWidget}
        dropTarget={dropTarget}
        horizontalAnchor={zone.horizontalAnchor}
        key={zoneId}
        bounds={bounds}
        outlineBounds={outlineBounds}
        targetBounds={zone.props.bounds}
        onChangeTheme={this._handleChangeTheme}
        onOpenActivityMessage={this._handleOpenActivityMessage}
        onOpenModalMessage={this._handleOpenModalMessage}
        onOpenToastMessage={this._handleOpenToastMessage}
        onOpenStickyMessage={this._handleOpenStickyMessage}
        onResize={this._handleWidgetResize}
        onShowTooltip={this._handleShowTooltip}
        onTabClick={this._handleWidgetTabClick}
        onTabDragStart={this._handleWidgetTabDragStart}
        onTabDragEnd={this._handleWidgetTabDragEnd}
        onTabDrag={this._handleWidgetTabDrag}
        onTargetChanged={this._handleTargetChanged}
        onToggleFooterMode={this._handleToggleFooterMode}
        verticalAnchor={zone.verticalAnchor}
        zone={zone.props}
      />
    );
  }

  private getStatusZone() {
    const zoneId = StatusZone.id;
    const nineZone = new NineZone(this.state.nineZone);
    const statusZone = nineZone.getStatusZone();
    const isRectangularWidget = statusZone.props.widgets.length > 1;
    if (isRectangularWidget)
      return this.getFloatingZone(zoneId);

    const outlineBounds = statusZone.getGhostOutlineBounds();
    const dropTarget = statusZone.getDropTarget();
    const bounds = statusZone.props.floating ? statusZone.props.floating.bounds : statusZone.props.bounds;

    return (
      <StatusZoneExample
        bounds={bounds}
        dropTarget={dropTarget}
        isInWidgetMode={!statusZone.props.isInFooterMode}
        key={zoneId}
        onTargetChanged={this._handleTargetChanged}
        outlineBounds={outlineBounds}
        renderModalMessageTo={this._handleRenderModalMessageTo}
        message={this.state.message}
        onHideMessage={this._handleHideMessage}
        onWidgetChange={this._handleWidgetChange}
        openWidget={this.state.openWidget}
        targetBounds={statusZone.props.bounds}
        toastMessageKey={this.state.toastMessageKey}
      />
    );
  }

  private findTool(toolId: string, state: State): ToolLocation {
    const zoneKeys: Array<keyof ZoneTools> = [1, 3];
    const directionKeys: Array<keyof DirectionTools> = ["horizontal", "vertical"];
    for (const zoneKey of zoneKeys) {
      for (const directionKey of directionKeys) {
        const tools = state.tools[zoneKey][directionKey];
        if (Object.keys(tools).some((id) => id === toolId))
          return {
            zoneKey,
            directionKey,
          };
      }
    }
    throw new Error();
  }

  private toggleToolSettings() {
    this.setState((prevState) => ({
      secondZoneContent: prevState.secondZoneContent === SecondZoneContent.None ? SecondZoneContent.ToolSettings : SecondZoneContent.None,
    }));
  }

  private _handleContentClick = () => {
    this.setState((prevState) => ({
      isTemporaryMessageVisible: prevState.isTemporaryMessageVisible + 1,
    }));
  }

  private _handleTemporaryMessageHidden = () => {
    this.setState(() => ({
      isTemporaryMessageVisible: 0,
    }));
  }

  private _handleTooltipTimeout = () => {
    this.setState(() => ({
      isTooltipVisible: false,
    }));
  }

  private _handleOnToolClick = (toolId: string) => {
    if (toolId === "toolSettings")
      return this.toggleToolSettings();

    this.setState((prevState) => {
      const location = this.findTool(toolId, prevState);
      const prevDirections = prevState.tools[location.zoneKey];
      const prevTools = prevDirections[location.directionKey];
      return {
        tools: {
          ...prevState.tools,
          [location.zoneKey]: {
            ...prevDirections,
            [location.directionKey]: {
              ...Object.keys(prevTools).reduce<Tools>((previous, prevToolId) => {
                const prevTool = prevTools[prevToolId];
                if (isToolGroup(prevTool)) {
                  previous[prevToolId] = {
                    ...prevTool,
                    isToolGroupOpen: (prevToolId === toolId) ? !prevTool.isToolGroupOpen : false,
                  };
                } else {
                  previous[prevToolId] = prevTool;
                }
                return previous;
              }, {}),
            },
          },
        },
      };
    });
  }

  private _handleOnIsToolHistoryExtendedChange = (toolId: string, isExtended: boolean) => {
    this.setState((prevState) => {
      const location = this.findTool(toolId, prevState);
      const prevDirections = prevState.tools[location.zoneKey];
      const prevTools = prevDirections[location.directionKey];
      return {
        tools: {
          ...prevState.tools,
          [location.zoneKey]: {
            ...prevDirections,
            [location.directionKey]: {
              ...prevTools,
              [toolId]: {
                ...prevTools[toolId],
                isExtended,
              },
            },
          },
        },
      };
    });
  }

  private _handlePanelToolClick = ({ toolId, trayId, columnId, itemId }: ToolbarItemGroupToolClickArgs) => {
    this.setState((prevState) => {
      const location = this.findTool(toolId, prevState);
      const prevDirections = prevState.tools[location.zoneKey];
      const prevTools = prevDirections[location.directionKey];
      const tool = prevTools[toolId];
      if (!isToolGroup(tool))
        throw new TypeError();

      const key = columnId + "-" + itemId;
      const item: HistoryItem = { toolId, trayId, columnId, itemId };
      return {
        tools: {
          ...prevState.tools,
          [location.zoneKey]: {
            ...prevDirections,
            [location.directionKey]: {
              ...prevTools,
              [toolId]: {
                ...prevTools[toolId],
                isExtended: false,
                isToolGroupOpen: false,
                history: DefaultHistoryManager.addItem(key, item, tool.history),
              },
            },
          },
        },
      };
    });
  }

  private _handleOnHistoryItemClick = (item: HistoryItem) => {
    this.setState((prevState) => {
      const location = this.findTool(item.toolId, prevState);
      const prevDirections = prevState.tools[location.zoneKey];
      const prevTools = prevDirections[location.directionKey];
      const tool = prevTools[item.toolId];
      if (!isToolGroup(tool))
        throw new TypeError();

      return {
        tools: {
          ...prevState.tools,
          [location.zoneKey]: {
            ...prevDirections,
            [location.directionKey]: {
              ...prevTools,
              [item.toolId]: {
                ...prevTools[item.toolId],
                isExtended: false,
                history: DefaultHistoryManager.addItem(item.columnId + "-" + item.toolId, item, tool.history),
              },
            },
          },
        },
      };
    });
  }

  private _handleOnToolbarScroll = () => {
    this.setState((prevState) => {
      const newZoneTools: ZoneTools = {
        1: {
          horizontal: {} as Zone1HorizontalTools,
          vertical: {} as Zone1VerticalTools,
        },
        3: {
          horizontal: {} as Zone3HorizontalTools,
          vertical: {} as Zone3VerticalTools,
        },
      };
      return {
        tools: Object.keys(prevState.tools).reduce<ZoneTools>((zoneAcc, zoneKeyStr) => {
          const zoneKey = Number(zoneKeyStr) as keyof ZoneTools;
          const prevDirections = prevState.tools[zoneKey];
          (zoneAcc[zoneKey] as DirectionTools) = Object.keys(prevDirections).reduce<DirectionTools>((directionAcc, directionKeyStr) => {
            const directionKey = directionKeyStr as keyof DirectionTools;
            const prevTools = prevDirections[directionKey];
            (zoneAcc[zoneKey][directionKey] as Tools) = Object.keys(prevTools).reduce<Tools>((toolsAcc, toolId) => {
              const prevTool = prevTools[toolId];
              if (isToolGroup(prevTool)) {
                toolsAcc[toolId] = {
                  ...prevTool,
                  isToolGroupOpen: false,
                };
              } else {
                toolsAcc[toolId] = prevTool;
              }
              return toolsAcc;
            }, newZoneTools[zoneKey][directionKey]);
            return directionAcc;
          }, newZoneTools[zoneKey]);
          return zoneAcc;
        }, newZoneTools),
      };
    });
  }

  private _handlePopoverToggleClick = () => {
    this.setState((prevState) => ({
      isNestedPopoverOpen: false,
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  }

  private _handleNestedPopoverToggleClick = () => {
    this.setState((prevState) => ({
      isNestedPopoverOpen: !prevState.isNestedPopoverOpen,
    }));
  }

  private _handleNestedToolSettingsBackButtonClick = () => {
    this.setState(() => ({
      isNestedPopoverOpen: false,
    }));
  }

  private _handleWindowResize = () => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.layout(new Size(document.body.clientWidth, document.body.clientHeight), prevState.nineZone),
    }));
  }

  private _handleWidgetTabClick = (widgetId: WidgetZoneIndex, tabIndex: number) => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.handleTabClick(widgetId, tabIndex, prevState.nineZone),
    }));
  }

  private _handleWidgetResize = (zoneId: WidgetZoneIndex, x: number, y: number, handle: ResizeHandle, filledHeightDiff: number) => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.handleResize(zoneId, x, y, handle, filledHeightDiff, prevState.nineZone),
    }));
  }

  private _handleWidgetTabDragStart = (widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, offset: PointProps) => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.handleWidgetTabDragStart(widgetId, tabId, initialPosition, offset, prevState.nineZone),
    }));

    if (widgetId === StatusZone.id)
      this._handleWidgetTabDragEnd();
  }

  private _handleWidgetTabDragEnd = () => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.handleWidgetTabDragEnd(prevState.nineZone),
    }));
  }

  private _handleWidgetTabDrag = (dragged: PointProps) => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.handleWidgetTabDrag(dragged, prevState.nineZone),
    }));
  }

  private _handleTargetChanged = (target: TargetProps | undefined) => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.handleTargetChanged(target, prevState.nineZone),
    }));
  }

  /*private _handleDisableToolsClick = () => {
    this.setState((prevState) => ({
      tools: {
        ...prevState.tools,
        1: {
          ...prevState.tools[1],
          vertical: {
            ...prevState.tools[1].vertical,
            cube: {
              ...prevState.tools[1].vertical.cube,
              isDisabled: !prevState.tools[1].vertical.cube.isDisabled,
              isToolGroupOpen: false,
            },
            validate: {
              ...prevState.tools[1].vertical.validate,
              isDisabled: !prevState.tools[1].vertical.validate.isDisabled,
              isToolGroupOpen: false,
            },
          },
        },
        3: {
          ...prevState.tools[3],
          horizontal: {
            ...prevState.tools[3].horizontal,
            chat: {
              ...prevState.tools[3].horizontal.chat,
              isDisabled: !prevState.tools[3].horizontal.chat.isDisabled,
              isToolGroupOpen: false,
            },

          },
          vertical: {
            ...prevState.tools[3].vertical,
            browse: {
              ...prevState.tools[3].vertical.browse,
              isDisabled: !prevState.tools[3].vertical.browse.isDisabled,
              isToolGroupOpen: false,
            },
            chat1: {
              ...prevState.tools[3].vertical.chat1,
              isDisabled: !prevState.tools[3].vertical.chat1.isDisabled,
              isToolGroupOpen: false,
            },
          },
        },
      },
    }));
  }*/

  private _handleShowTooltip = () => {
    this.setState(() => ({
      isTooltipVisible: true,
    }));
  }

  private _handleOnExpandPanelGroup = (toolId: string, trayId: string | undefined) => {
    this.setState((prevState) => {
      const location = this.findTool(toolId, prevState);
      const prevDirections = prevState.tools[location.zoneKey];
      const prevTools = prevDirections[location.directionKey];
      const tool = prevTools[toolId];
      if (!isToolGroup(tool))
        throw new TypeError();

      return {
        tools: {
          ...prevState.tools,
          [location.zoneKey]: {
            ...prevState.tools[location.zoneKey],
            [location.directionKey]: {
              ...prevState.tools[location.zoneKey][location.directionKey],
              [toolId]: {
                ...prevState.tools[location.zoneKey][location.directionKey][toolId],
                trayId,
                backTrays: [...tool.backTrays, tool.trayId],
              },
            },
          },
        },
      };
    });
  }

  private _handleOnPanelBack = (toolId: string) => {
    this.setState((prevState) => {
      const location = this.findTool(toolId, prevState);
      const prevDirections = prevState.tools[location.zoneKey];
      const prevTools = prevDirections[location.directionKey];
      const tool = prevTools[toolId];
      if (!isToolGroup(tool))
        throw new TypeError();

      let trayId = tool.trayId;
      if (tool.backTrays.length > 0)
        trayId = tool.backTrays[tool.backTrays.length - 1];

      const backTrays = tool.backTrays.slice(0, -1);
      return {
        tools: {
          ...prevState.tools,
          [location.zoneKey]: {
            ...prevState.tools[location.zoneKey],
            [location.directionKey]: {
              ...prevState.tools[location.zoneKey][location.directionKey],
              [toolId]: {
                ...prevState.tools[location.zoneKey][location.directionKey][toolId],
                trayId,
                backTrays,
              },
            },
          },
        },
      };
    });
  }

  private _handleRenderModalMessageTo = () => this._dialogContainer;

  private _handleChangeTheme = ({ theme, change }: ThemeContextProps) => {
    switch (theme) {
      case PrimaryTheme: {
        change && change(LightTheme);
        break;
      }
      case LightTheme: {
        change && change(DarkTheme);
        break;
      }
      case DarkTheme: {
        change && change(customTheme);
        break;
      }
      case customTheme: {
        change && change(PrimaryTheme);
        break;
      }
    }
  }

  private _handleToggleFooterMode = () => {
    this.setState((prevState) => ({
      nineZone: NineZoneManager.setIsInFooterMode(!prevState.nineZone.zones[StatusZone.id].isInFooterMode, prevState.nineZone),
      openWidget: FooterWidget.None,
    }));
  }

  /*private _handleToggleOverflowItemOpen = () => {
    this.setState((prevState) => ({
      isOverflowItemOpen: !prevState.isOverflowItemOpen,
    }));
  }*/

  private _handleHideMessage = () => {
    this.setState(() => ({
      message: Message.None,
    }));
  }

  private _handleOpenActivityMessage = () => {
    this.setState(() => ({
      message: Message.Activity,
    }));
  }

  private _handleOpenModalMessage = () => {
    this.setState(() => ({
      message: Message.Modal,
    }));
  }

  private _handleOpenToastMessage = () => {
    this.setState((prevState) => ({
      message: Message.Toast,
      toastMessageKey: prevState.toastMessageKey + 1,
    }));
  }

  private _handleOpenStickyMessage = () => {
    this.setState(() => ({
      message: Message.Sticky,
    }));
  }

  private _handleWidgetChange = (openWidget: FooterWidget) => {
    this.setState(() => ({
      openWidget,
    }));
  }
}
