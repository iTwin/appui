/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Picker
 */

import * as React from "react";
import type { Id64String } from "@itwin/core-bentley";
import { BeUiEvent, Logger } from "@itwin/core-bentley";
import type { IModelConnection, ViewState } from "@itwin/core-frontend";
import { FuzzySearch, IModelApp } from "@itwin/core-frontend";
import type { SupportsViewSelectorChange } from "../content/ContentControl";
import { connectIModelConnection } from "../redux/connectIModel";
import { UiFramework } from "../UiFramework";
import { ViewUtilities } from "../utils/ViewUtilities";
import type { ListItem } from "./ListPicker";
import { ListItemType, ListPicker } from "./ListPicker";
import { debounce } from "lodash";
import svgSavedView from "@bentley/icons-generic/icons/saved-view.svg";

// cSpell:ignore Spatials

/** [[ViewSelectorChangedEvent]] Args interface.
 * @beta
 */
export interface ViewSelectorChangedEventArgs {
  iModelConnection: IModelConnection;
  viewDefinitionId: Id64String;
  viewState: ViewState;
  name: string;
}

/** ViewSelector Changed Event class.
 * @beta
 */
export class ViewSelectorChangedEvent extends BeUiEvent<ViewSelectorChangedEventArgs> {}

/** Properties for the [[ViewSelector]] component
 * @beta
 */
export interface ViewSelectorProps {
  imodel?: IModelConnection;
  listenForShowUpdates?: boolean;

  showSpatials: boolean;
  showDrawings: boolean;
  showSheets: boolean;
  showUnknown: boolean;
  searchBox?: boolean;
  panelOnly?: boolean;
}

/** State for the [[ViewSelector]] component
 * @beta
 */
interface ViewSelectorState {
  items: ListItem[];
  title: string;
  initialized: boolean;
  showSpatials: boolean;
  showDrawings: boolean;
  showSheets: boolean;
  showUnknown: boolean;
  searchBox: boolean;
  panelOnly: boolean;
  expand: boolean;
}

/** Default properties of [[ViewSelector]] component.
 * @beta
 */
export type ViewSelectorDefaultProps = Pick<
  ViewSelectorProps,
  "showSpatials" | "showDrawings" | "showSheets" | "showUnknown"
>;

/** ViewSelector Show Update Event Args interface.
 */
interface ViewSelectorShowUpdateEventArgs {
  showSpatials: boolean;
  showDrawings: boolean;
  showSheets: boolean;
  showUnknown: boolean;
}

/** ViewSelector Show Update Event class.
 */
class ViewSelectorShowUpdateEvent extends BeUiEvent<ViewSelectorShowUpdateEventArgs> {}

/** View Selector React component
 * @beta
 */
export class ViewSelector extends React.Component<
  ViewSelectorProps,
  ViewSelectorState
> {
  private static readonly _onViewSelectorShowUpdateEvent =
    new ViewSelectorShowUpdateEvent();
  private _removeShowUpdateListener?: () => void;
  private _isMounted = false;
  private _searchInput = "";

  public static readonly defaultProps: ViewSelectorDefaultProps = {
    showSpatials: true,
    showDrawings: true,
    showSheets: true,
    showUnknown: true,
  };

  /** Gets the [[ViewSelectorChangedEvent]] */
  public static readonly onViewSelectorChangedEvent =
    new ViewSelectorChangedEvent();

  /** Updates the ViewSelector show settings.
   */
  public static updateShowSettings(
    showSpatials: boolean,
    showDrawings: boolean,
    showSheets: boolean,
    showUnknown: boolean
  ): void {
    ViewSelector._onViewSelectorShowUpdateEvent.emit({
      showSpatials,
      showDrawings,
      showSheets,
      showUnknown,
    });
  }

  /** Creates a ViewSelector */
  constructor(props: ViewSelectorProps) {
    super(props);

    this.state = {
      items: new Array<ListItem>(),
      title: UiFramework.translate("viewTypes.views"),
      initialized: false,
      showSpatials: props.showSpatials,
      showDrawings: props.showDrawings,
      showSheets: props.showSheets,
      showUnknown: props.showUnknown,
      searchBox: props.searchBox ? props.searchBox : true,
      panelOnly: props.panelOnly ? props.panelOnly : false,
      expand: false,
    };
  }

  public override async componentDidMount() {
    this._isMounted = true;
    if (this.props.listenForShowUpdates)
      this._removeShowUpdateListener =
        ViewSelector._onViewSelectorShowUpdateEvent.addListener(
          this._handleViewSelectorShowUpdateEvent
        );

    await this.loadViews();
  }

  public override async componentDidUpdate(prevProps: ViewSelectorProps) {
    if (this.props.imodel !== prevProps.imodel) {
      await this.loadViews();
    }
  }

  public override componentWillUnmount() {
    this._isMounted = false;
    // istanbul ignore else
    if (this._removeShowUpdateListener) this._removeShowUpdateListener();
  }

  private _handleViewSelectorShowUpdateEvent = (
    args: ViewSelectorShowUpdateEventArgs
  ): void => {
    // istanbul ignore next
    if (!this._isMounted) return;

    this.setState(args, async () => this.loadViews());
  };

  private setStateContainers(
    views3d: ListItem[],
    views2d: ListItem[],
    sheets: ListItem[],
    unknown?: ListItem[],
    views3dFiltered?: ListItem[],
    views2dFiltered?: ListItem[],
    sheetsFiltered?: ListItem[],
    unknownFiltered?: ListItem[]
  ) {
    const views3dContainer: ListItem = {
      key: "views3dContainer",
      name: UiFramework.translate("viewTypes.spatialViews"),
      enabled: false,
      type: ListItemType.Container,
      children: views3dFiltered ? views3dFiltered : views3d,
    };

    const views2dContainer: ListItem = {
      key: "views2dContainer",
      name: UiFramework.translate("viewTypes.drawings"),
      enabled: false,
      type: ListItemType.Container,
      children: views2dFiltered ? views2dFiltered : views2d,
    };

    const sheetContainer: ListItem = {
      key: "sheetContainer",
      name: UiFramework.translate("viewTypes.sheets"),
      enabled: false,
      type: ListItemType.Container,
      children: sheetsFiltered ? sheetsFiltered : sheets,
    };

    const containers = [views3dContainer, views2dContainer, sheetContainer];

    // istanbul ignore if
    if (unknown && unknown.length > 0) {
      // This should never show, but just in case we missed a type of view state
      const unknownContainer: ListItem = {
        key: "unknownContainer",
        name: UiFramework.translate("viewTypes.others"),
        enabled: false,
        type: ListItemType.Container,
        children: unknownFiltered ? unknownFiltered : unknown,
      };

      if (unknown.length !== 0) containers.push(unknownContainer);
    }

    // istanbul ignore next
    if (!this._isMounted) return;

    this.setState({
      items: containers,
      title: UiFramework.translate("viewTypes.views"),
      initialized: true,
    });
  }
  /**
   * Query the views and set the initial state with the iModel's views.
   */
  public async loadViews(): Promise<void> {
    // Query views and add them to state
    const views3d: ListItem[] = [];
    const views2d: ListItem[] = [];
    const sheets: ListItem[] = [];
    const unknown: ListItem[] = [];
    let views3dFiltered: ListItem[] | undefined;
    let views2dFiltered: ListItem[] | undefined;
    let sheetsFiltered: ListItem[] | undefined;
    let unknownFiltered: ListItem[] | undefined;
    const fuzzy = new FuzzySearch<ListItem>();

    if (this.props.imodel && this.props.imodel.views.getViewList) {
      const query = { wantPrivate: false };
      const specs = await this.props.imodel.views.getViewList(query);

      specs.forEach((spec: IModelConnection.ViewSpec) => {
        const viewItem: ListItem = {
          key: spec.id,
          name: spec.name,
          enabled:
            spec.id === IModelApp.viewManager.selectedView?.view.id
              ? true
              : false,
          type: ListItemType.Item,
        };

        const className = ViewUtilities.getBisBaseClass(spec.class);

        if (ViewUtilities.isSpatial(className) && this.state.showSpatials)
          views3d.push(viewItem);
        else if (ViewUtilities.isDrawing(className) && this.state.showDrawings)
          views2d.push(viewItem);
        else if (ViewUtilities.isSheet(className) && this.state.showSheets)
          sheets.push(viewItem);
        else if (this.state.showUnknown) unknown.push(viewItem);
      });

      if (this._searchInput.length > 0) {
        const views3dFuzzySearchResults = fuzzy.search(
          views3d,
          ["name"],
          this._searchInput
        ).results as ListItem[];
        const views2dFuzzySearchResults = fuzzy.search(
          views2d,
          ["name"],
          this._searchInput
        ).results as ListItem[];
        const sheetsFuzzySearchResults = fuzzy.search(
          sheets,
          ["name"],
          this._searchInput
        ).results as ListItem[];
        const unknownFuzzySearchResults = fuzzy.search(
          unknown,
          ["name"],
          this._searchInput
        ).results as ListItem[];
        views3dFiltered = [];
        views2dFiltered = [];
        sheetsFiltered = [];
        unknownFiltered = [];
        views3dFuzzySearchResults.forEach(function (result) {
          views3dFiltered?.push(result.item);
        });
        views2dFuzzySearchResults.forEach(function (result) {
          views2dFiltered?.push(result.item);
        });
        sheetsFuzzySearchResults.forEach(function (result) {
          sheetsFiltered?.push(result.item);
        });
        unknownFuzzySearchResults.forEach(function (result) {
          unknownFiltered?.push(result.item);
        });
      }
    }

    this.setStateContainers(
      views3d,
      views2d,
      sheets,
      unknown,
      views3dFiltered,
      views2dFiltered,
      sheetsFiltered,
      unknownFiltered
    );
  }

  /**
   * Update state of the entries in the widget.
   * @param viewId Identifier for the relevant view
   */
  // istanbul ignore next
  public async updateState(viewId?: any): Promise<void> {
    // Wait for initialization finished
    if (!this.state.initialized) return;

    // Query views and add them to state
    const views3d: ListItem[] = this.state.items[0].children!;
    const views2d: ListItem[] = this.state.items[1].children!;
    const sheets: ListItem[] = this.state.items[2].children!;
    const unknown: ListItem[] =
      this.state.items.length > 3 ? this.state.items[3].children! : [];

    const updateChildren = (item: ListItem) => {
      if (item.key === viewId) return { ...item, enabled: true };
      else return { ...item, enabled: false };
    };

    this.setStateContainers(
      views3d.map(updateChildren),
      views2d.map(updateChildren),
      sheets.map(updateChildren),
      unknown.map(updateChildren)
    );
  }

  // enable/disable the models
  // istanbul ignore next
  private _setEnabled = async (item: ListItem, _enabled: boolean) => {
    const activeContentControl =
      UiFramework.content.getActiveContentControl() as unknown as SupportsViewSelectorChange;
    if (
      !activeContentControl ||
      !activeContentControl.supportsViewSelectorChange
    ) {
      Logger.logError(
        UiFramework.loggerCategory(this),
        `No active ContentControl for ViewSelector change`
      );
      return;
    }

    // Enable the item temporarily to let user see that their click was registered
    // while we query for view state and change the current view which may take a bit
    if (_enabled && item.type !== ListItemType.Container) {
      // This itemMapper simply looks through all the list items and their nested children and enables the one
      // that we have registered to enable
      // Also disable all other items
      const itemMapper: (tempItem: ListItem) => ListItem = (
        tempItem: ListItem
      ) => {
        if (tempItem.type === ListItemType.Container) {
          return { ...tempItem, children: tempItem.children!.map(itemMapper) };
        } else if (tempItem.key === item.key) {
          return { ...tempItem, enabled: true };
        } else {
          return { ...tempItem, enabled: false };
        }
      };

      // Create the new array with the current item enabled
      const itemsWithEnabled = this.state.items.map(itemMapper);

      // istanbul ignore next
      if (!this._isMounted) return;

      // Update the state so that we show the user it was enabled while we work in the background
      this.setState({ items: itemsWithEnabled });
    }

    // Load the view state using the viewSpec's ID
    const viewState = await this.props.imodel!.views.load(item.key);

    // Let activeContentControl process the ViewSelector change
    await activeContentControl.processViewSelectorChange(
      this.props.imodel!,
      item.key,
      viewState,
      item.name!
    );

    // Emit a change event
    ViewSelector.onViewSelectorChangedEvent.emit({
      iModelConnection: this.props.imodel!,
      viewDefinitionId: item.key,
      viewState,
      name: item.name!,
    });

    // Set state to show enabled the view that got selected
    void this.updateState(item.key);
  };

  // Hook on the category selector being expanded so that we may initialize if needed
  // istanbul ignore next
  private _onExpanded = (expand: boolean) => {
    if (expand)
      void this.updateState(
        IModelApp.viewManager.selectedView
          ? IModelApp.viewManager.selectedView.view.id
          : undefined
      );
  };

  /**
   *  Renders ViewSelector component
   */
  public override render() {
    const { imodel, ...props } = this.props;

    return (
      <ListPicker
        {...props}
        title={this.state.title}
        setEnabled={this._setEnabled}
        items={this.state.items}
        iconSpec={svgSavedView}
        onExpanded={this._onExpanded}
        searchBox={this.state.searchBox}
        onSearchValueChange={debounce((search: string) => {
          this._searchInput = search;
          if (
            this._isMounted &&
            this.state.expand === false &&
            this._searchInput.length > 0
          )
            this.setState({ expand: true });
          void this.loadViews();
        }, 300)}
        panelOnly={this.state.panelOnly}
        expanded={this.state.expand}
      />
    );
  }
}

/** ViewSelector that is connected to the IModelConnection property in the Redux store. The application must set up the Redux store and include the FrameworkReducer.
 * @beta
 */
export const IModelConnectedViewSelector = connectIModelConnection(
  null,
  null
)(ViewSelector);
