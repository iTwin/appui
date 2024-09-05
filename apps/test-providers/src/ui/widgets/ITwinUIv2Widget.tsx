/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  IconButton,
  MenuItem,
  Radio,
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
      <Checkbox label="Checkbox" />
      <Radio label="Radio" />
      <DropdownMenu
        menuItems={(close) =>
          [...Array(6)].map((_, index) => (
            <MenuItem key={index + 1} onClick={close}>
              Item {index + 1}
            </MenuItem>
          ))
        }
      >
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </div>
  );
}
