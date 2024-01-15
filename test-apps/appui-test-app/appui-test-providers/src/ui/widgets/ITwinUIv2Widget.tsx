/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  Button,
  DropdownMenu,
  IconButton,
  MenuItem,
  Text,
} from "@itwin/itwinui-react-v2";
import { SvgMore } from "@itwin/itwinui-icons-react";

/** @internal */
export function ITwinUIv2Widget() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <Text>iTwinUI v2 content</Text>
      <Button
        onClick={() => {
          setCount((prev) => ++prev);
        }}
      >
        {count}++
      </Button>
      <DropdownMenu
        menuItems={(close) => [
          <MenuItem key={1} onClick={close}>
            Item 1
          </MenuItem>,
          <MenuItem key={2} onClick={close}>
            Item 2
          </MenuItem>,
        ]}
      >
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
}
