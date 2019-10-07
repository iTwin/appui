/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Frontstage */

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Logger } from "@bentley/bentleyjs-core";
import { CommonProps, Rectangle } from "@bentley/ui-core";
import { Zones as NZ_Zones, WidgetZoneId, StagePanels, StagePanelsManager, widgetZoneIds, HorizontalAnchor, ToolSettingsWidgetMode } from "@bentley/ui-ninezone";
import { ContentLayoutDef, ContentLayout } from "../content/ContentLayout";
import { ContentGroup } from "../content/ContentGroup";
import { FrontstageRuntimeProps } from "./FrontstageComposer";
import { FrontstageDef } from "./FrontstageDef";
import { ToolItemDef } from "../shared/ToolItemDef";
import { ZoneDef } from "../zones/ZoneDef";
import { Zone, ZoneProps, ZoneRuntimeProps, ZoneLocation, isToolSettingsWidgetManagerProps } from "../zones/Zone";
import { UiFramework, UiVisibilityEventArgs } from "../UiFramework";
import { StagePanelProps, StagePanel, StagePanelLocation, StagePanelRuntimeProps, getNestedStagePanelKey } from "../stagepanels/StagePanel";
import { StagePanelDef } from "../stagepanels/StagePanelDef";
import { UiShowHideManager } from "../utils/UiShowHideManager";
import { WidgetDef, WidgetStateChangedEventArgs, WidgetState } from "../widgets/WidgetDef";
import { FrontstageManager } from "./FrontstageManager";
import { ToolSettingsContent } from "../widgets/ToolSettingsContent";

/** Properties for a [[Frontstage]] component.
 * @public
 */
export interface FrontstageProps extends CommonProps {
  /** Id for the Frontstage */
  id: string;
  /** Tool that is started once the Frontstage is activated */
  defaultTool: ToolItemDef;
  /** The default Content Layout used */
  defaultLayout: string | ContentLayoutDef;
  /** The Content Group providing the Content Views */
  contentGroup: string | ContentGroup;
  /** Id of the Content View to be activated initially */
  defaultContentId?: string;
  /** Indicated whether the StatusBar is in footer mode or widget mode. Defaults to true. */
  isInFooterMode?: boolean;                     // Default - true
  /** Any application data to attach to this Frontstage. */
  applicationData?: any;

  /** The Zone in the top-left corner. */
  topLeft?: React.ReactElement<ZoneProps>;
  /** The Zone along the top-center edge. */
  topCenter?: React.ReactElement<ZoneProps>;
  /** The Zone in the top-right corner. */
  topRight?: React.ReactElement<ZoneProps>;
  /** The Zone along the center-left edge. */
  centerLeft?: React.ReactElement<ZoneProps>;
  /** The Zone along the center-right edge. */
  centerRight?: React.ReactElement<ZoneProps>;
  /** The Zone in the bottom-left corner. */
  bottomLeft?: React.ReactElement<ZoneProps>;
  /** The Zone along the bottom-center edge. */
  bottomCenter?: React.ReactElement<ZoneProps>;
  /** The Zone in the bottom-right corner. */
  bottomRight?: React.ReactElement<ZoneProps>;

  /** The StagePanel on the top of the 9-zone area. @alpha */
  topPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the very top across the full width. @alpha  */
  topMostPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the left. @alpha  */
  leftPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the right. @alpha  */
  rightPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the bottom of the 9-zone area. @alpha  */
  bottomPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the very bottom across the full width. @alpha  */
  bottomMostPanel?: React.ReactElement<StagePanelProps>;

  /** @internal */
  runtimeProps?: FrontstageRuntimeProps;
}

interface FrontstageState {
  isUiVisible: boolean;
  widgetIdToContent: Partial<{ [id in WidgetZoneId]: HTMLDivElement | undefined }>;
}

/** Frontstage React component.
 * A Frontstage is a full-screen configuration designed to enable the user to accomplish a task.
 * @public
 */
export class Frontstage extends React.Component<FrontstageProps, FrontstageState> {
  private _contentRefs = new Map<WidgetZoneId, React.Ref<HTMLDivElement>>();
  private _zonesMeasurer = React.createRef<HTMLDivElement>();
  private static _zoneIds: ReadonlyArray<WidgetZoneId> = widgetZoneIds.filter((z) => z !== 8);

  /** @internal */
  constructor(props: FrontstageProps) {
    super(props);

    this.state = {
      isUiVisible: UiFramework.getIsUiVisible(),
      widgetIdToContent: {},
    };
  }

  /** React lifecycle method.
   * Added listener for UiFramework.onUiVisibilityChanged.
   * @internal
   */
  public async componentDidMount() {
    UiFramework.onUiVisibilityChanged.addListener(this._uiVisibilityChanged);
  }

  public componentDidUpdate() {
    if (!this._zonesMeasurer.current || !this.props.runtimeProps)
      return;
    const bounds = Rectangle.create(this._zonesMeasurer.current.getBoundingClientRect());
    this.props.runtimeProps.nineZoneChangeHandler.handleZonesBoundsChange(bounds);
  }

  /** React lifecycle method.
   * Removed listener for UiFramework.onUiVisibilityChanged.
   * @internal
   */
  public componentWillUnmount() {
    UiFramework.onUiVisibilityChanged.removeListener(this._uiVisibilityChanged);
  }

  private _uiVisibilityChanged = (args: UiVisibilityEventArgs): void => {
    this.setState({ isUiVisible: args.visible });
  }

  /** Initializes a FrontstageDef from FrontstageProps */
  public static initializeFrontstageDef(frontstageDef: FrontstageDef, props: FrontstageProps): void {
    frontstageDef.id = props.id;

    frontstageDef.defaultTool = props.defaultTool;

    if (props.defaultContentId !== undefined)
      frontstageDef.defaultContentId = props.defaultContentId;

    if (typeof props.defaultLayout === "string")
      frontstageDef.defaultLayoutId = props.defaultLayout;
    else
      frontstageDef.defaultLayout = props.defaultLayout;

    if (typeof props.contentGroup === "string")
      frontstageDef.contentGroupId = props.contentGroup;
    else
      frontstageDef.contentGroup = props.contentGroup;

    if (props.isInFooterMode !== undefined)
      frontstageDef.isInFooterMode = props.isInFooterMode;
    if (props.applicationData !== undefined)
      frontstageDef.applicationData = props.applicationData;

    frontstageDef.topLeft = Frontstage.createZoneDef(props.topLeft, ZoneLocation.TopLeft, props);
    frontstageDef.topCenter = Frontstage.createZoneDef(props.topCenter, ZoneLocation.TopCenter, props);
    frontstageDef.topRight = Frontstage.createZoneDef(props.topRight, ZoneLocation.TopRight, props);
    frontstageDef.centerLeft = Frontstage.createZoneDef(props.centerLeft, ZoneLocation.CenterLeft, props);
    frontstageDef.centerRight = Frontstage.createZoneDef(props.centerRight, ZoneLocation.CenterRight, props);
    frontstageDef.bottomLeft = Frontstage.createZoneDef(props.bottomLeft, ZoneLocation.BottomLeft, props);
    frontstageDef.bottomCenter = Frontstage.createZoneDef(props.bottomCenter, ZoneLocation.BottomCenter, props);
    frontstageDef.bottomRight = Frontstage.createZoneDef(props.bottomRight, ZoneLocation.BottomRight, props);

    frontstageDef.topPanel = Frontstage.createStagePanelDef(props.topPanel, StagePanelLocation.Top, props);
    frontstageDef.topMostPanel = Frontstage.createStagePanelDef(props.topMostPanel, StagePanelLocation.TopMost, props);
    frontstageDef.leftPanel = Frontstage.createStagePanelDef(props.leftPanel, StagePanelLocation.Left, props);
    frontstageDef.rightPanel = Frontstage.createStagePanelDef(props.rightPanel, StagePanelLocation.Right, props);
    frontstageDef.bottomPanel = Frontstage.createStagePanelDef(props.bottomPanel, StagePanelLocation.Bottom, props);
    frontstageDef.bottomMostPanel = Frontstage.createStagePanelDef(props.bottomMostPanel, StagePanelLocation.BottomMost, props);
  }

  private static createZoneDef(zoneNode: React.ReactElement<ZoneProps> | undefined, zoneLocation: ZoneLocation, props: FrontstageProps): ZoneDef | undefined {
    if (zoneNode) {
      const zoneDef = new ZoneDef();
      const zoneElement = Frontstage.getZoneElement(zoneLocation, props);

      // istanbul ignore else
      if (zoneElement && React.isValidElement(zoneElement)) {
        Zone.initializeZoneDef(zoneDef, zoneElement.props);
        return zoneDef;
      }
    }

    return undefined;
  }

  private static getZoneElement(zoneId: WidgetZoneId, props: FrontstageProps): React.ReactElement<ZoneProps> | undefined {
    let zoneElement: React.ReactElement<ZoneProps> | undefined;

    switch (zoneId) {
      case ZoneLocation.TopLeft:
        zoneElement = props.topLeft;
        break;
      case ZoneLocation.TopCenter:
        zoneElement = props.topCenter;
        break;
      case ZoneLocation.TopRight:
        zoneElement = props.topRight;
        break;
      case ZoneLocation.CenterLeft:
        zoneElement = props.centerLeft;
        break;
      case ZoneLocation.CenterRight:
        zoneElement = props.centerRight;
        break;
      case ZoneLocation.BottomLeft:
        zoneElement = props.bottomLeft;
        break;
      case ZoneLocation.BottomCenter:
        zoneElement = props.bottomCenter;
        break;
      case ZoneLocation.BottomRight:
        zoneElement = props.bottomRight;
        break;
      // istanbul ignore next
      default:
        throw new RangeError();
    }

    // Zones can be undefined in a Frontstage

    return zoneElement;
  }

  private static createStagePanelDef(panelNode: React.ReactElement<StagePanelProps> | undefined, panelLocation: StagePanelLocation, props: FrontstageProps): StagePanelDef | undefined {
    if (panelNode) {
      const panelDef = new StagePanelDef();
      const panelElement = Frontstage.getStagePanelElement(panelLocation, props);

      // istanbul ignore else
      if (panelElement && React.isValidElement(panelElement)) {
        StagePanel.initializeStagePanelDef(panelDef, panelElement.props, panelLocation);
        panelDef.location = panelLocation;
        return panelDef;
      }
    }

    return undefined;
  }

  private static getStagePanelElement(location: StagePanelLocation, props: FrontstageProps): React.ReactElement<StagePanelProps> | undefined {
    let panelElement: React.ReactElement<StagePanelProps> | undefined;

    switch (location) {
      case StagePanelLocation.Top:
        panelElement = props.topPanel;
        break;
      case StagePanelLocation.TopMost:
        panelElement = props.topMostPanel;
        break;
      case StagePanelLocation.Left:
        panelElement = props.leftPanel;
        break;
      case StagePanelLocation.Right:
        panelElement = props.rightPanel;
        break;
      case StagePanelLocation.Bottom:
        panelElement = props.bottomPanel;
        break;
      case StagePanelLocation.BottomMost:
        panelElement = props.bottomMostPanel;
        break;
      // istanbul ignore next
      default:
        throw new RangeError();
    }

    // Panels can be undefined in a Frontstage

    return panelElement;
  }

  private _getContentRef = (widget: WidgetZoneId) => {
    const ref = this._contentRefs.get(widget);
    if (ref)
      return ref;
    const newRef = (el: HTMLDivElement | null) => {
      this.setState((prevState) => ({
        widgetIdToContent: {
          ...prevState.widgetIdToContent,
          [widget]: el === null ? undefined : el,
        },
      }));
    };
    this._contentRefs.set(widget, newRef);
    return newRef;
  }

  // This uses ConfigurableUi to render the content
  private doContentLayoutRender(): React.ReactNode {
    let contentLayout: React.ReactNode;

    // istanbul ignore else
    if (this.props.runtimeProps && this.props.runtimeProps.frontstageDef) {
      const frontstageDef = this.props.runtimeProps.frontstageDef;

      // istanbul ignore else
      if (frontstageDef.contentLayoutDef && frontstageDef.contentGroup)
        contentLayout = (
          <ContentLayout
            contentLayout={frontstageDef.contentLayoutDef}
            contentGroup={frontstageDef.contentGroup}
            isInFooterMode={frontstageDef.isInFooterMode}
          />
        );
      else
        Logger.logError(UiFramework.loggerCategory(this), `FrontstageDef.contentLayoutDef and FrontstageDef.contentGroup are required for <ContentLayout> component`);
    }

    return contentLayout;
  }

  private cloneStagePanelElement(panelDef: StagePanelDef | undefined, runtimeProps: FrontstageRuntimeProps): React.ReactNode {
    if (!this.state.isUiVisible && UiShowHideManager.showHidePanels)
      return null;

    if (panelDef) {
      const { location } = panelDef;
      const panelElement = Frontstage.getStagePanelElement(location, this.props);

      // istanbul ignore else
      if (panelElement && React.isValidElement(panelElement)) {
        const panelKey = getNestedStagePanelKey(panelDef.location);
        const panels = runtimeProps.nineZone.nested.panels[panelKey.id];
        const panel = StagePanelsManager.getPanel(panelKey.type, panels);
        const draggedWidget = runtimeProps.nineZone.zones.draggedWidget;

        const panelRuntimeProps: StagePanelRuntimeProps = {
          draggedWidgetId: draggedWidget ? draggedWidget.id : undefined,
          getWidgetContentRef: this._getContentRef,
          isInFooterMode: runtimeProps.nineZone.zones.isInFooterMode,
          isTargeted: !!runtimeProps.nineZone.zones.target,
          panel,
          panelDef,
          stagePanelChangeHandler: runtimeProps.stagePanelChangeHandler,
          widgetChangeHandler: runtimeProps.widgetChangeHandler,
          widgets: runtimeProps.nineZone.zones.widgets,
          widgetTabs: runtimeProps.widgetTabs,
          zoneDefProvider: runtimeProps.zoneDefProvider,
        };

        return React.cloneElement(panelElement, { runtimeProps: panelRuntimeProps });
      }
    }

    return null;
  }

  private cloneZoneElements(zoneIds: ReadonlyArray<WidgetZoneId>, runtimeProps: FrontstageRuntimeProps): React.ReactNode[] {
    return zoneIds.map((zoneId: WidgetZoneId) => {
      const zoneElement = Frontstage.getZoneElement(zoneId, this.props) as React.ReactElement<ZoneProps>;
      if (!zoneElement || !React.isValidElement(zoneElement))
        return null;

      const zoneDef = runtimeProps.zoneDefProvider.getZoneDef(zoneId);

      // istanbul ignore if
      if (!zoneDef)
        return null;

      const nestedPanelsManager = FrontstageManager.NineZoneManager.getNestedPanelsManager();
      const panelsManager = nestedPanelsManager.getPanelsManager("inner");
      const type = panelsManager.findWidget(zoneId, runtimeProps.nineZone.nested.panels.inner);
      // istanbul ignore if
      if (type !== undefined)
        return null;

      const zonesManager = FrontstageManager.NineZoneManager.getZonesManager();
      const zones = runtimeProps.nineZone.zones;
      const ghostOutline = zonesManager.getGhostOutlineBounds(zoneId, zones);
      const dropTarget = zonesManager.getDropTarget(zoneId, zones);
      const zone = zones.zones[zoneId];
      const widget = zone.widgets.length > 0 ? zones.widgets[zone.widgets[0]] : undefined;
      const openWidgetId = zone.widgets.find((wId) => zones.widgets[wId].tabIndex >= 0);
      const activeTabIndex = openWidgetId ? zones.widgets[openWidgetId].tabIndex : 0;
      const draggedWidget = runtimeProps.nineZone.zones.draggedWidget;
      const zoneRuntimeProps: ZoneRuntimeProps = {
        activeTabIndex,
        draggedWidget: draggedWidget && draggedWidget.id === zoneId ? draggedWidget : undefined,
        dropTarget,
        getWidgetContentRef: this._getContentRef,
        ghostOutline,
        isHidden: (zoneDef.isStatusBar && this.props.isInFooterMode && (this.state.isUiVisible || !UiShowHideManager.showHideFooter)) ? false : !this.state.isUiVisible,
        isInFooterMode: runtimeProps.nineZone.zones.isInFooterMode,
        openWidgetId,
        targetChangeHandler: runtimeProps.targetChangeHandler,
        widgetChangeHandler: runtimeProps.widgetChangeHandler,
        widgetTabs: runtimeProps.widgetTabs,
        widget,
        zoneDef,
        zoneDefProvider: runtimeProps.zoneDefProvider,
        zone: runtimeProps.nineZone.zones.zones[zoneId],
      };
      return React.cloneElement(zoneElement, { key: zoneId, runtimeProps: zoneRuntimeProps });
    });
  }

  private cloneWidgetContentElements(zones: ReadonlyArray<WidgetZoneId>, runtimeProps: FrontstageRuntimeProps): React.ReactNode[] {
    const widgets = zones.reduce<Array<{ id: WidgetZoneId, def: WidgetDef, tabIndex: number }>>((prev, zoneId) => {
      const zoneDef = runtimeProps.zoneDefProvider.getZoneDef(zoneId);

      // istanbul ignore if
      if (!zoneDef)
        return prev;

      const widgetDefs = zoneDef.widgetDefs.filter((widgetDef: WidgetDef) => {
        if (zoneId === 2)
          return widgetDef.isVisible;
        return widgetDef.isVisible && !widgetDef.isFloating;
      });

      for (let i = 0; i < widgetDefs.length; i++) {
        prev.push({
          id: zoneId,
          def: widgetDefs[i],
          tabIndex: i,
        });
      }

      return prev;
    }, []);
    return widgets.map((widget) => {
      const nzWidget = runtimeProps.nineZone.zones.widgets[widget.id];
      return (
        <WidgetContentRenderer
          anchor={nzWidget.horizontalAnchor}
          isHidden={nzWidget.tabIndex !== widget.tabIndex}
          key={`${widget.id}_${widget.tabIndex}`}
          renderTo={this.state.widgetIdToContent[widget.id]}
          toolSettingsMode={isToolSettingsWidgetManagerProps(nzWidget) ? nzWidget.mode : undefined}
          widget={widget.def}
        />
      );
    });
  }

  /** React render method
   * @internal
   */
  public render(): React.ReactNode {
    const { runtimeProps } = this.props;

    if (runtimeProps === undefined)
      return null;

    /** For Nine-zone area; includes ContentLayout */
    const ninezoneStyle: React.CSSProperties = {
      position: "relative",
      height: "100%",
    };

    /** For Zones area within the Nine-zone area; excludes */
    const zonesStyle: React.CSSProperties = {
      pointerEvents: "none",
      display: "flex",
      flexFlow: "column",
    };

    const frontstageDef = runtimeProps.frontstageDef;

    return (
      <div style={ninezoneStyle} id="uifw-ninezone-area" className={this.props.className}>
        <NZ_Zones style={zonesStyle} >
          <StagePanels
            bottomPanel={this.cloneStagePanelElement(frontstageDef.bottomMostPanel, runtimeProps)}
            topPanel={this.cloneStagePanelElement(frontstageDef.topMostPanel, runtimeProps)}
          >
            <StagePanels
              bottomPanel={this.cloneStagePanelElement(frontstageDef.bottomPanel, runtimeProps)}
              leftPanel={this.cloneStagePanelElement(frontstageDef.leftPanel, runtimeProps)}
              rightPanel={this.cloneStagePanelElement(frontstageDef.rightPanel, runtimeProps)}
              topPanel={this.cloneStagePanelElement(frontstageDef.topPanel, runtimeProps)}
            >
              <div
                id="uifw-ninezone-zones-area"
                ref={this._zonesMeasurer}
                style={{
                  height: "100%",
                  position: "relative",
                }}
              >
                {this.doContentLayoutRender()}
                {this.cloneZoneElements(Frontstage._zoneIds, runtimeProps)}
              </div>
            </StagePanels>
          </StagePanels>
          {this.cloneZoneElements([8], runtimeProps)}
        </NZ_Zones>
        {this.cloneWidgetContentElements(Frontstage._zoneIds, runtimeProps)}
      </div>
    );
  }
}

interface WidgetContentRendererProps {
  anchor: HorizontalAnchor;
  isHidden: boolean;
  renderTo: HTMLDivElement | undefined;
  toolSettingsMode: ToolSettingsWidgetMode | undefined;
  widget: WidgetDef;
}

interface WidgetContentRendererState {
  widgetKey: number;
}

class WidgetContentRenderer extends React.PureComponent<WidgetContentRendererProps, WidgetContentRendererState> {
  private _content = document.createElement("span");

  public constructor(props: WidgetContentRendererProps) {
    super(props);

    this.state = {
      widgetKey: 0,
    };
  }

  public componentDidMount() {
    FrontstageManager.onWidgetStateChangedEvent.addListener(this._handleWidgetStateChangedEvent);
    FrontstageManager.onToolActivatedEvent.addListener(this._handleToolActivatedEvent);

    this._content.style.display = this.props.isHidden ? "none" : null;
    if (!this.props.renderTo)
      return;
    this.props.renderTo.appendChild(this._content);
  }

  public componentDidUpdate(prevProps: WidgetContentRendererProps) {
    if (this.props.isHidden !== prevProps.isHidden) {
      this._content.style.display = this.props.isHidden ? "none" : null;
    }

    if (!this.props.renderTo || prevProps.renderTo === this.props.renderTo)
      return;

    this.props.widget.widgetControl && this.props.widget.widgetControl.saveTransientState();
    this.props.renderTo.appendChild(this._content);

    const shouldRemount = this.props.widget.widgetControl ? !this.props.widget.widgetControl.restoreTransientState() : true;
    shouldRemount && this.setState((prevState) => ({ widgetKey: prevState.widgetKey + 1 }));
  }

  public componentWillUnmount() {
    FrontstageManager.onWidgetStateChangedEvent.removeListener(this._handleWidgetStateChangedEvent);
    FrontstageManager.onToolActivatedEvent.removeListener(this._handleToolActivatedEvent);
  }

  public render() {
    if (this.props.toolSettingsMode !== undefined) {
      return ReactDOM.createPortal((
        <ToolSettingsContent
          anchor={this.props.anchor}
          key={this.state.widgetKey}
          mode={this.props.toolSettingsMode}
        >
          {FrontstageManager.activeToolSettingsNode}
        </ToolSettingsContent>
      ), this._content);
    }

    if (this.props.widget.state === WidgetState.Unloaded)
      return null;
    return ReactDOM.createPortal((
      <React.Fragment
        key={this.state.widgetKey}
      >
        {this.props.widget.reactElement}
      </React.Fragment>
    ), this._content);
  }

  private _handleWidgetStateChangedEvent = (args: WidgetStateChangedEventArgs) => {
    if (this.props.widget !== args.widgetDef)
      return;
    this.forceUpdate();
  }

  private _handleToolActivatedEvent = () => {
    if (this.props.toolSettingsMode === undefined)
      return;
    this.forceUpdate();
  }
}
