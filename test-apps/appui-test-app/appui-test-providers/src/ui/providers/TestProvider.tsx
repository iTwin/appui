/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  StagePanelLocation,
  StagePanelSection,
  UiItemsProvider,
} from "@itwin/appui-react";
import { List, ListItem, Select } from "@itwin/itwinui-react";
import React from "react";

export const myTestProvider: UiItemsProvider = {
  id: "custom-widget-provider",
  getWidgets: () => {
    return [
      {
        id: "my-resizable-widget",
        canPopout: true,
        canFloat: {
          defaultSize: { height: 200, width: 150 },
        },
        content: <Component />,
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start,
          },
        },
      },
    ];
  },
};

function Component() {
  const [selected, setSelected] = React.useState(options[0].value);

  return (
    <>
      <Select options={options} value={selected} onChange={setSelected} />
      <List style={{ overflow: "auto" }}>
        {data.map((row, i) => (
          <ListItem key={i} style={{ textWrap: "nowrap" }}>
            {row}
          </ListItem>
        ))}
      </List>
    </>
  );
}

const options = Array(2)
  .fill(0)
  .map((_, i) => ({ value: `${i}`, label: `Option ${i}` }));

const data = Array(10)
  .fill(0)
  .map(
    (_, i) => `Some data to fill row space and add horizontal scrollbar ${i}`
  );
