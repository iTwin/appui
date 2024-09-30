# @itwin/components-react

Copyright © Bentley Systems, Incorporated. All rights reserved. See LICENSE.md for license terms and full copyright notice.

## Description

The **@itwin/components-react** package contains React components that are data-oriented, such as PropertyGrid and Tree.

## Usage

To get started with the `@itwin/components-react` package, simply import the necessary components and utilities:

```tsx
import { PropertyDescription, StandardTypeNames } from "@itwin/appui-abstract";
import {
  PropertyFilterRuleGroupOperator,
  PropertyFilter,
} from "@itwin/components-react";

function createProperties(): PropertyDescription {
  return new PropertyDescription({
    name: "string-prop",
    displayLabel: "String Property",
    typename: StandardTypeNames.String,
  });
}

function createInitialFilter(): PropertyFilter {
  const property = createProperty();
  return {
    operator: PropertyFilterRuleGroupOperator.Or,
    rules: [
      {
        property: property,
        operator: "like",
      },
    ],
  };
}
```

For more details, check out the [@itwin/components-react documentation](https://www.itwinjs.org/reference/components-react/).
