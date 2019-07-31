/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";

import {
  ConfigurableCreateInfo,
  WidgetControl,
  DragDropLayerManager,
  UiFramework,
} from "@bentley/ui-framework";
import {
  Table,
  TableProps,
  withTableDragDrop,
} from "@bentley/ui-components";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { demoMutableTableDataProvider, tableDragProps, tableDropProps, TableDragTypes, DemoTableDragDropType } from "./demodataproviders/demoTableDataProvider";
import { TreeDragTypes } from "./demodataproviders/demoTreeDataProvider";
import { RowDragLayer } from "./draglayers/RowDragLayer";

export class TableDemoWidgetControl extends WidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    if (UiFramework.getIModelConnection())
      this.reactElement = <TableDemoWidget iModelConnection={UiFramework.getIModelConnection()} />;
    else
      this.reactElement = null;
  }
}

const DragDropTable = withTableDragDrop<TableProps, DemoTableDragDropType>(Table); // tslint:disable-line:variable-name

interface Props {
  iModelConnection?: IModelConnection;
}

interface State {
  checked: boolean;
}

export class TableDemoWidget extends React.Component<Props, State> {
  public readonly state: State = {
    checked: false,
  };
  public render() {
    DragDropLayerManager.registerTypeLayer(TableDragTypes.Row, RowDragLayer);

    let objectTypes: Array<string | symbol> = [];
    if (tableDropProps.objectTypes) {
      if (typeof tableDropProps.objectTypes !== "function")
        objectTypes = tableDropProps.objectTypes;
      else
        objectTypes = tableDropProps.objectTypes();
    }
    if (this.state.checked)
      objectTypes.push(TreeDragTypes.Parent, TreeDragTypes.Child);

    const dragProps = tableDragProps;
    const dropProps = {
      ...tableDropProps,
      objectTypes,
    };

    return (
      <div style={{ height: "100%" }}>
        <label htmlFor="receives_tree">Can accept tree nodes: </label>
        <input id="receives_tree" type="checkbox" onChange={(event) => {
          this.setState({ checked: event.target.checked });
        }} />
        <div style={{ height: "calc(100% - 20px)" }}>
          <DragDropTable
            dataProvider={demoMutableTableDataProvider}
            dragProps={dragProps}
            dropProps={dropProps}
            reorderableColumns={true}
            showHideColumns={true}
            settingsIdentifier="Test"
          />
        </div>
      </div >
    );
  }
}
