# @itwin/appui-react

Copyright © Bentley Systems, Incorporated. All rights reserved. See LICENSE.md for license terms and full copyright notice.

## Description

The **@itwin/appui-react** package contains application fragments for View selection, and configuration of the application UI including the Backstage, Frontstages, Widgets, etc.

The AppUI React package is a portion of the iTwin.js User Interface library. It consists of major fragments of code that combine the
functionality from the `@itwin/core-frontend` with the core-react and imodel-components packages to implement substantial
functionality that can be used within an iTwin.js application.

The package makes use of React for rendering of the user interface, and uses react-redux and its concept of the state store for
actions using reducers.

There are a number of sub-frameworks, each which has a set of components, actions, and reducers, and contributes to the overall State. Each such
sub-framework is contained in a separate folder.

## Usage

To get started with React components from the `@itwin/appui-react` package, simply import the necessary components and utilities:

```tsx
import {
  MessageCenterField,
  StatusBarItemUtilities,
  StatusBarSection,
} from "@itwin/appui-react";

function createItem() {
  const custom = StatusBarItemUtilities.createCustomItem(
    "item1",
    StatusBarSection.Left,
    10,
    <MessageCenterField />
  );

  return {
    custom1
  };
}
```

For more details, check out the [@itwin/appui-react documentation](https://www.itwinjs.org/reference/appui-react/).
