/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Table } from "@itwin/itwinui-react";
import { useActiveIModelConnection } from "@itwin/appui-react";
import { getViewDefinitions } from "./ViewDefinitionSelector";
import type { Column } from "@itwin/itwinui-react/react-table";
interface ViewDataItem {
  id: string;
  class: string;
  label: string;
}
export function ViewsTable() {
  const activeIModelConnection = useActiveIModelConnection();
  const [iModelViews, setIModelViews] = React.useState<ViewDataItem[]>([]);

  React.useEffect(() => {
    if (activeIModelConnection) {
      void getViewDefinitions(activeIModelConnection).then((result) => {
        setIModelViews(result);
      });
    }
  }, [activeIModelConnection]);

  const viewData = React.useMemo(() => {
    return iModelViews.map((spec) => ({
      id: spec.id,
      class: spec.class,
      label: spec.label,
    }));
  }, [iModelViews]);

  const columns = React.useMemo(
    (): Column<Record<string, unknown>>[] => [
      {
        Header: "View Id",
        accessor: "id",
      },
      {
        Header: "Class Name",
        accessor: "class",
      },
      {
        Header: "Label",
        accessor: "label",
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={viewData}
      emptyTableContent="No views to display."
    />
  );
}