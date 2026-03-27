import { r as reactExports, j as jsxRuntimeExports } from "./iframe-BnF7kxuI.js";
import { aK as useReduxFrameworkState, U as UiFramework, aL as ListItemType, j as IModelApp, aM as ViewUtilities, aN as FuzzySearch, aO as ListPicker, aP as debounce, H as Icon, aQ as UiEvent, I as IModelViewportControl } from "./appui-react-B7iNJbV5.js";
import { P as Page, A as AppUiStory } from "./AppUiStory-C8_Xb5kX.js";
import { c as createFrontstage, S as StandardContentLayouts } from "./Utils-IR3EMk7M.js";
import { h as BeUiEvent, L as Logger, i as assert } from "./Key.enum-B3pThNWo.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-DYbOg5lC.js";
import "./index-CptIXb7J.js";
import "./blocks-BPELq9PS.js";
function SvgSavedView() {
  return reactExports.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
    reactExports.createElement("path", { d: "M15 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1m0 11-4 4H5l-4-4V5l4-4h6l4 4Z" }),
    reactExports.createElement("path", { d: "m2 10.5 2.5-3 2.5 3m.77-.64.53.64H14l-4.5-6-2.94 3.91M2 11h12l-1 1H3Z" })
  );
}
class ViewSelectorChangedEvent extends UiEvent {
}
class ViewSelector extends reactExports.Component {
  static _onViewSelectorShowUpdateEvent = new BeUiEvent();
  _removeShowUpdateListener;
  _isMounted = false;
  _searchInput = "";
  static defaultProps = {
    showSpatials: true,
    showDrawings: true,
    showSheets: true,
    showUnknown: true
  };
  /** Gets the [[ViewSelectorChangedEvent]].
   * @deprecated in 4.16.0. Use {@link ViewSelectorProps.onViewSelected} prop instead.
   */
  static onViewSelectorChangedEvent = new ViewSelectorChangedEvent();
  // eslint-disable-line @typescript-eslint/no-deprecated
  /** Updates the ViewSelector show settings.
   */
  static updateShowSettings(showSpatials, showDrawings, showSheets, showUnknown) {
    ViewSelector._onViewSelectorShowUpdateEvent.emit({
      showSpatials,
      showDrawings,
      showSheets,
      showUnknown
    });
  }
  /** Creates a ViewSelector */
  constructor(props) {
    super(props);
    this.state = {
      items: new Array(),
      title: UiFramework.translate("viewTypes.views"),
      initialized: false,
      showSpatials: props.showSpatials,
      showDrawings: props.showDrawings,
      showSheets: props.showSheets,
      showUnknown: props.showUnknown,
      searchBox: props.searchBox ? props.searchBox : true,
      panelOnly: props.panelOnly ? props.panelOnly : false,
      expand: false
    };
  }
  async componentDidMount() {
    this._isMounted = true;
    if (this.props.listenForShowUpdates)
      this._removeShowUpdateListener = ViewSelector._onViewSelectorShowUpdateEvent.addListener(this._handleViewSelectorShowUpdateEvent);
    await this.loadViews();
  }
  /** @internal */
  async componentDidUpdate(prevProps) {
    if (this.props.imodel !== prevProps.imodel) {
      await this.loadViews();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    if (this._removeShowUpdateListener)
      this._removeShowUpdateListener();
  }
  _handleViewSelectorShowUpdateEvent = (args) => {
    if (!this._isMounted)
      return;
    this.setState(args, async () => this.loadViews());
  };
  setStateContainers(views3d, views2d, sheets, unknown, views3dFiltered, views2dFiltered, sheetsFiltered, unknownFiltered) {
    const views3dContainer = {
      key: "views3dContainer",
      name: UiFramework.translate("viewTypes.spatialViews"),
      enabled: false,
      type: ListItemType.Container,
      children: views3dFiltered ? views3dFiltered : views3d
    };
    const views2dContainer = {
      key: "views2dContainer",
      name: UiFramework.translate("viewTypes.drawings"),
      enabled: false,
      type: ListItemType.Container,
      children: views2dFiltered ? views2dFiltered : views2d
    };
    const sheetContainer = {
      key: "sheetContainer",
      name: UiFramework.translate("viewTypes.sheets"),
      enabled: false,
      type: ListItemType.Container,
      children: sheetsFiltered ? sheetsFiltered : sheets
    };
    const containers = [views3dContainer, views2dContainer, sheetContainer];
    if (unknown && unknown.length > 0) {
      const unknownContainer = {
        key: "unknownContainer",
        name: UiFramework.translate("viewTypes.others"),
        enabled: false,
        type: ListItemType.Container,
        children: unknownFiltered ? unknownFiltered : unknown
      };
      if (unknown.length !== 0)
        containers.push(unknownContainer);
    }
    if (!this._isMounted)
      return;
    this.setState({
      items: containers,
      title: UiFramework.translate("viewTypes.views"),
      initialized: true
    });
  }
  /**
   * Query the views and set the initial state with the iModel's views.
   */
  async loadViews() {
    const views3d = [];
    const views2d = [];
    const sheets = [];
    const unknown = [];
    let views3dFiltered;
    let views2dFiltered;
    let sheetsFiltered;
    let unknownFiltered;
    const fuzzy = new FuzzySearch();
    if (this.props.imodel && this.props.imodel.views.getViewList) {
      const query = { wantPrivate: false };
      const specs = await this.props.imodel.views.getViewList(query);
      specs.forEach((spec) => {
        const viewItem = {
          key: spec.id,
          name: spec.name,
          enabled: spec.id === IModelApp.viewManager.selectedView?.view.id ? true : false,
          type: ListItemType.Item
        };
        const className = ViewUtilities.getBisBaseClass(spec.class);
        if (ViewUtilities.isSpatial(className) && this.state.showSpatials)
          views3d.push(viewItem);
        else if (ViewUtilities.isDrawing(className) && this.state.showDrawings)
          views2d.push(viewItem);
        else if (ViewUtilities.isSheet(className) && this.state.showSheets)
          sheets.push(viewItem);
        else if (this.state.showUnknown)
          unknown.push(viewItem);
      });
      if (this._searchInput.length > 0) {
        const views3dFuzzySearchResults = fuzzy.search(views3d, ["name"], this._searchInput).results;
        const views2dFuzzySearchResults = fuzzy.search(views2d, ["name"], this._searchInput).results;
        const sheetsFuzzySearchResults = fuzzy.search(sheets, ["name"], this._searchInput).results;
        const unknownFuzzySearchResults = fuzzy.search(unknown, ["name"], this._searchInput).results;
        views3dFiltered = [];
        views2dFiltered = [];
        sheetsFiltered = [];
        unknownFiltered = [];
        views3dFuzzySearchResults.forEach(function(result) {
          views3dFiltered?.push(result.item);
        });
        views2dFuzzySearchResults.forEach(function(result) {
          views2dFiltered?.push(result.item);
        });
        sheetsFuzzySearchResults.forEach(function(result) {
          sheetsFiltered?.push(result.item);
        });
        unknownFuzzySearchResults.forEach(function(result) {
          unknownFiltered?.push(result.item);
        });
      }
    }
    this.setStateContainers(views3d, views2d, sheets, unknown, views3dFiltered, views2dFiltered, sheetsFiltered, unknownFiltered);
  }
  /**
   * Update state of the entries in the widget.
   * @param viewId Identifier for the relevant view
   */
  async updateState(viewId) {
    if (!this.state.initialized)
      return;
    const views3d = this.state.items[0].children;
    const views2d = this.state.items[1].children;
    const sheets = this.state.items[2].children;
    const unknown = this.state.items.length > 3 ? this.state.items[3].children : [];
    const updateChildren = (item) => {
      if (item.key === viewId)
        return { ...item, enabled: true };
      else
        return { ...item, enabled: false };
    };
    this.setStateContainers(views3d.map(updateChildren), views2d.map(updateChildren), sheets.map(updateChildren), unknown.map(updateChildren));
  }
  // enable/disable the models
  _setEnabled = async (item, _enabled) => {
    const activeContentControl = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      UiFramework.content.getActiveContentControl()
    );
    if (!this.props.onViewSelected && (!activeContentControl || !activeContentControl.supportsViewSelectorChange)) {
      Logger.logError(UiFramework.loggerCategory("ViewSelector"), `No active ContentControl for ViewSelector change`);
      return;
    }
    if (_enabled && item.type !== ListItemType.Container) {
      const itemMapper = (tempItem) => {
        if (tempItem.type === ListItemType.Container) {
          return { ...tempItem, children: tempItem.children.map(itemMapper) };
        } else if (tempItem.key === item.key) {
          return { ...tempItem, enabled: true };
        } else {
          return { ...tempItem, enabled: false };
        }
      };
      const itemsWithEnabled = this.state.items.map(itemMapper);
      if (!this._isMounted)
        return;
      this.setState({ items: itemsWithEnabled });
    }
    assert(!!this.props.imodel);
    assert(!!item.name);
    const viewState = await this.props.imodel.views.load(item.key);
    if (this.props.onViewSelected) {
      this.props.onViewSelected({
        iModelConnection: this.props.imodel,
        viewDefinitionId: item.key,
        viewState,
        name: item.name
      });
    } else if (activeContentControl) {
      await activeContentControl.processViewSelectorChange(this.props.imodel, item.key, viewState, item.name);
      ViewSelector.onViewSelectorChangedEvent.emit({
        iModelConnection: this.props.imodel,
        viewDefinitionId: item.key,
        viewState,
        name: item.name
      });
    }
    void this.updateState(item.key);
  };
  // Hook on the category selector being expanded so that we may initialize if needed
  _onExpanded = (expand) => {
    if (expand)
      void this.updateState(IModelApp.viewManager.selectedView ? IModelApp.viewManager.selectedView.view.id : void 0);
  };
  /**
   *  Renders ViewSelector component
   */
  render() {
    const { imodel, ...props } = this.props;
    return reactExports.createElement(ListPicker, {
      ...props,
      title: this.state.title,
      setEnabled: this._setEnabled,
      items: this.state.items,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      icon: reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgSavedView, null) }),
      onExpanded: this._onExpanded,
      searchBox: this.state.searchBox,
      onSearchValueChange: debounce((search) => {
        this._searchInput = search;
        if (this._isMounted && this.state.expand === false && this._searchInput.length > 0)
          this.setState({ expand: true });
        void this.loadViews();
      }, 300),
      panelOnly: this.state.panelOnly,
      expanded: this.state.expand
    });
  }
}
function IModelConnectedViewSelector(props) {
  const iModel = useReduxFrameworkState(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    (state) => state?.sessionState.iModelConnection
  );
  return reactExports.createElement(ViewSelector, { imodel: iModel, ...props });
}
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { layout: "fullscreen", demoIModel: {
    default: "blank"
  }, onInitialize: async () => {
    UiFramework.visibility.autoHideUi = false;
  }, frontstages: [createFrontstage({
    contentGroupProps: {
      id: "ViewportContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [{
        id: "ViewportContent",
        classId: IModelViewportControl
      }]
    },
    contentManipulation: {
      id: "content-manipulation",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        pointerEvents: "all",
        width: 50,
        height: 50,
        background: "var(--iui-color-background)",
        zIndex: 1
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })
    }
  })] });
};
const meta = {
  title: "Components/ViewSelector",
  component: IModelConnectedViewSelector,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  }
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
