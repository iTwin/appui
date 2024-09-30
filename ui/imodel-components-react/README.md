# @itwin/imodel-components-react

Copyright © Bentley Systems, Incorporated. All rights reserved. See LICENSE.md for license terms and full copyright notice.

## Description

The **@itwin/imodel-components-react** package contains React components that depend on the @itwin/core-frontend, @itwin/core-common or @itwin/core-quantity packages.

## Usage

To get started with the `@itwin/imodel-components-react` package, simply import the necessary components and utilities:

```tsx
import * as React from "react";
import { TimelineComponent } from "@itwin/imodel-components-react";

export function GetTimelineComponent() {
  return (
    <TimelineComponent
      startDate={new Date(1, 1, 1)}
      endDate={new Date(2, 2, 2)}
    />
  );
}
```

For more details, check out the [@itwin/imodel-components-react documentation](https://www.itwinjs.org/reference/imodel-components-react/).
