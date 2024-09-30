# @itwin/core-react

Copyright © Bentley Systems, Incorporated. All rights reserved. See LICENSE.md for license terms and full copyright notice.

## Description

The **@itwin/core-react** package contains general purpose React components, such as Dialog, MessageBox, SearchBox, RadialMenu.

## Usage

To get started with the `@itwin/core-react` package, simply import the necessary components and utilities:

```tsx
import {
  ContextMenu,
  ContextMenuItem,
  ContextSubMenu,
} from "@itwin/core-react";

export const Basic: Story = {
  render: (props) => {
    return (
      <ContextMenu {...props}>
        <ContextSubMenu label="Label 1" id="1">
          <ContextMenuItem>Label 1</ContextMenuItem>
        </ContextSubMenu>
      </ContextMenu>
    );
  },
};
```

For more details, check out the [@itwin/core-react documentation](https://www.itwinjs.org/reference/core-react/).
