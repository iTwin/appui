/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Picker */

import * as React from "react";
import { ViewUtilities } from "../utils/ViewUtilities";
import ListPicker, { ListItem, ListItemType } from "./ListPicker";
import { IModelApp, Viewport, ViewState, IModelConnection } from "@bentley/imodeljs-frontend/lib/frontend";
import { ViewQueryParams } from "@bentley/imodeljs-common/lib/ViewProps";
import { UiFramework } from "../UiFramework";
import { ViewDefinitionProps, IModelReadRpcInterface } from "@bentley/imodeljs-common";

/** Properties for the [[ViewSelector]] component */
export interface ViewSelectorProps {
  imodel?: IModelConnection;
}

/** Properties for the [[ViewSelector]] component */
export interface ViewSelectorState {
  items: ListItem[];
  selectedViewId: string | null;
  title: string;
  initialized: boolean;
}

/** View Selector React component */
export class ViewSelector extends React.Component<ViewSelectorProps, ViewSelectorState> {
  /** Creates a ViewSelector */
  constructor(props: ViewSelectorProps) {
    super(props);

    this.state = {
      items: new Array<ListItem>(),
      selectedViewId: null,
      title: UiFramework.i18n.translate("UiFramework:savedViews.views"),
      initialized: false,
    };

    this.loadViews(); // tslint:disable-line:no-floating-promises
  }

  private setStateContainers(views3d: ListItem[], views2d: ListItem[], sheets: ListItem[], unknown?: ListItem[]) {
    const views3dContainer: ListItem = {
      key: "views3dContainer",
      name: UiFramework.i18n.translate("UiFramework:savedViews.spatialViews"),
      enabled: false,
      type: ListItemType.Container,
      children: views3d,
    };

    const views2dContainer: ListItem = {
      key: "views2dContainer",
      name: UiFramework.i18n.translate("UiFramework:savedViews.drawings"),
      enabled: false,
      type: ListItemType.Container,
      children: views2d,
    };

    const sheetContainer: ListItem = {
      key: "sheetContainer",
      name: UiFramework.i18n.translate("UiFramework:savedViews.sheets"),
      enabled: false,
      type: ListItemType.Container,
      children: sheets,
    };

    const containers = [views3dContainer, views2dContainer, sheetContainer];

    if (unknown && unknown.length > 0) {
      // This should never show, but just in case we missed a type of view state
      const unknownContainer: ListItem = {
        key: "unknownContainer",
        name: UiFramework.i18n.translate("UiFramework:savedViews.others"),
        enabled: false,
        type: ListItemType.Container,
        children: unknown,
      };

      if (unknown.length !== 0)
        containers.push(unknownContainer);
    }

    this.setState({
      items: containers,
      selectedViewId: null,
      title: UiFramework.i18n.translate("UiFramework:savedViews.views"),
      initialized: true,
    });
  }

  /**
   * Fetches ViewDefinitionProps for a model.
   * @param imodel Model to query from props
   */
  public async queryViewProps(imodel: IModelConnection): Promise<ViewDefinitionProps[]> {
    const params: ViewQueryParams = {};
    params.from = ViewState.sqlName; // use "BisCore.ViewDefinition" as default class name
    params.where = "";
    const viewProps = await this._getViewProps(imodel, params);
    return viewProps;
  }

  /**
   * Gets props for specified imodel.
   * @param imodel Model to query for props
   * @param params Parameters for view query
   */
  private async _getViewProps(imodel: IModelConnection, params: ViewQueryParams): Promise<ViewDefinitionProps[]> {
    try {
      const viewProps = await IModelReadRpcInterface.getClient().queryElementProps(imodel.iModelToken, params);
      return viewProps as ViewDefinitionProps[];
    } catch {
      return [] as ViewDefinitionProps[];
    }
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
    const viewDefProps = await this.queryViewProps(this.props.imodel!);
    viewDefProps.forEach((viewProp: ViewDefinitionProps) => {
      const viewItem: ListItem = {
        key: viewProp.id!,
        name: viewProp.userLabel ? viewProp.userLabel : viewProp.code!.value!,
        enabled: false,
        type: ListItemType.Item,
      };
      if (ViewUtilities.isSpatial(viewProp.bisBaseClass!))
        views3d.push(viewItem);
      else if (ViewUtilities.isDrawing(viewProp.bisBaseClass!))
        views2d.push(viewItem);
      else if (ViewUtilities.isSheet(viewProp.bisBaseClass!))
        sheets.push(viewItem);
      else
        unknown.push(viewItem);
    });

    this.setStateContainers(views3d, views2d, sheets, unknown);
  }

  /**
   * Update state of the entries in the widget.
   * @param viewId Identifier for the relevant view
   */
  public async updateState(viewId?: any): Promise<void> {
    // Wait for initialization finished
    if (!this.state.initialized)
      return;

    // Query views and add them to state
    const views3d: ListItem[] = this.state.items[0].children!;
    const views2d: ListItem[] = this.state.items[1].children!;
    const sheets: ListItem[] = this.state.items[2].children!;
    const unknown: ListItem[] = this.state.items.length > 3 ? this.state.items[3].children! : [];

    const updateChildren = (item: ListItem) => {
      if (item.key === viewId)
        return { ...item, enabled: true };
      else
        return { ...item, enabled: false };
    };

    this.setStateContainers(views3d.map(updateChildren), views2d.map(updateChildren), sheets.map(updateChildren), unknown.map(updateChildren));
  }

  /**
   *  Renders ViewSelector component
   */
  public render() {
    if (!this.state.initialized)
      this.updateState(this.state.selectedViewId); // tslint:disable-line:no-floating-promises

    // enable/disable the models
    const setEnabled = async (item: ListItem, _enabled: boolean) => {
      const vp: Viewport | undefined = IModelApp.viewManager.selectedView;
      if (!vp)
        return;

      // Enable the item temporarily to let user see that their click was registered
      // while we query for view state and change the current view which may take a bit
      if (_enabled && item.type !== ListItemType.Container) {
        // This itemMapper simply looks through all the list items and their nested children and enables the one
        // that we have registered to enable
        // Also disable all other items
        let itemMapper: (tempItem: ListItem) => ListItem;
        itemMapper = (tempItem: ListItem) => {
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
        // Update the state so that we show the user it was enabled while we work in the background
        this.setState(Object.assign({}, this.state, { items: itemsWithEnabled }));
      }

      // Load the view state using the viewSpec's ID
      const viewState = await this.props.imodel!.views.load(item.key);
      vp.changeView(viewState);
      // Set state to show enabled the view that got selected
      this.updateState(item.key); // tslint:disable-line:no-floating-promises
    };

    // Hook on the category selector being expanded so that we may initialize if needed
    const onExpanded = (_expand: boolean) => {
      this.updateState(this.state.selectedViewId); // tslint:disable-line:no-floating-promises
    };

    return (
      <ListPicker
        {...this.props}
        title={this.state.title}
        setEnabled={setEnabled}
        items={this.state.items}
        iconSpec={"icon-saved-view"}
        onExpanded={onExpanded}
      />
    );
  }
}

export default ViewSelector;
