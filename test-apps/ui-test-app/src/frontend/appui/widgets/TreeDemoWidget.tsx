/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { DEPRECATED_Tree, DEPRECATED_withTreeDragDrop, TreeProps } from "@bentley/ui-components";
import { ConfigurableCreateInfo, DragDropLayerManager, UiFramework, WidgetControl } from "@bentley/ui-framework";
import { TableDragTypes } from "./demodataproviders/demoTableDataProvider";
import {
  demoMutableTreeDataProvider, DemoTreeDragDropType, treeDragProps, TreeDragTypes, treeDropProps,
} from "./demodataproviders/demoTreeDataProvider";
import { ChildDragLayer } from "./draglayers/ChildDragLayer";
import { ParentDragLayer } from "./draglayers/ParentDragLayer";

// tslint:disable-next-line:variable-name
const DragDropTree = DEPRECATED_withTreeDragDrop<TreeProps, DemoTreeDragDropType>(DEPRECATED_Tree);

export class TreeDemoWidgetControl extends WidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    if (UiFramework.getIModelConnection())
      this.reactNode = <TreeDemoWidget iModelConnection={UiFramework.getIModelConnection()} />;
    else
      this.reactNode = null;
  }
}

interface Props {
  iModelConnection?: IModelConnection;
}

interface State {
  checked: boolean;
}

class TreeDemoWidget extends React.Component<Props, State> {
  public readonly state: State = {
    checked: false,
  };
  public render() {
    DragDropLayerManager.registerTypeLayer(TreeDragTypes.Parent, ParentDragLayer);
    DragDropLayerManager.registerTypeLayer(TreeDragTypes.Child, ChildDragLayer);

    let objectTypes: Array<string | symbol> = [];
    if (treeDropProps.objectTypes) {
      if (typeof treeDropProps.objectTypes !== "function")
        objectTypes = treeDropProps.objectTypes;
      else
        objectTypes = treeDropProps.objectTypes();
    }
    if (this.state.checked)
      objectTypes.push(TableDragTypes.Row);

    const dragProps = treeDragProps;
    const dropProps = {
      ...treeDropProps,
      objectTypes,
    };

    return (
      <div style={{ height: "100%" }}>
        <label htmlFor="receives_row">Can accept rows: </label>
        <input id="receives_row" type="checkbox" onChange={(event) => {
          this.setState({ checked: event.target.checked });
        }} />
        <div style={{ height: "calc(100% - 20px)" }}>
          <DragDropTree
            dataProvider={demoMutableTreeDataProvider}
            dragProps={dragProps}
            dropProps={dropProps}
          />
        </div>
      </div>
    );
  }
}
