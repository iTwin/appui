# @itwin/appui-layout-react

Copyright © Bentley Systems, Incorporated. All rights reserved. See LICENSE.md for license terms and full copyright notice.

## Description

The __@itwin/appui-layout-react__ package contains internal React components for the AppUi-react panels, widget UI and other purposes and is not expected to be used directly by applications.

## Documentation

See the [iTwin.js](https://www.itwinjs.org/learning/ui/) documentation for more information.

### Coding Guidelines

Look at the existing code and try to keep your code similar.

* Every component class name should follow nz-path-to-component-componentName naming style.

* Every inner class name should have nz- prefix.

* Import the Sass classnames with: `import "./YourComponent.scss";`

* Every component should accept `className?: string` and `style?: React.CSSProperties` props.

* Components that accept one or a list of children should use the `children?: React.ReactNode` prop.

### Advice

* Use [classnames](https://www.npmjs.com/package/classnames) function to create className strings for the elements.

* Use `const className` inside render for the root element className value.
