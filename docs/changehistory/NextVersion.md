# NextVersion <!-- omit from toc -->

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Additions](#additions-1)

## @itwin/appui-react

### Changes

- Specified additional version ranges in redux related peer dependencies. `redux` version is updated from `^4.1.0` to `^4.1.0 || ^5.0.0` and `react-redux` version is updated from `^7.2.2` to `^7.2.2 || ^8.0.0 || ^9.0.0`. This enables consumers to utilize latest redux capabilities. See [redux release v5.0.0](https://github.com/reduxjs/redux/releases/tag/v5.0.0) for migration tips. [#1151](https://github.com/iTwin/appui/pull/1151)

## @itwin/components-react

### Additions

- Added a callback to `VirtualizedPropertyGrid` which determines which editors should always be visible. [#1090](https://github.com/iTwin/appui/pull/1090)

## @itwin/imodel-components-react

### Additions

- Added `ToolUtilities` namespace that contains utilities for working with iTwin.js core `Tool` class. [1150](https://github.com/iTwin/appui/pull/1150)

  - `ToolUtilities.defineIcon` function allows defining an icon for a tool type using a React element. This is a supplement for an existing `Tool.iconSpec` property that adds additional `iconElement` property to the tool type.

    ```tsx
    // Before
    export class MyTool extends Tool {
      public static iconSpec = "icon-placeholder";
    }

    // After
    class MyCoreTool extends Tool {
      public static iconSpec = "icon-placeholder";
    }
    export const MyTool = ToolUtilities.defineIcon(
      MyCoreTool,
      <SvgPlaceholder />
    );
    ```

    Alternatively, consumers can simply add an `iconElement` property of `ReactElement` type to the tool class.

    ```tsx
    export class MyTool extends Tool {
      public static iconSpec = "icon-placeholder";
      public static iconElement = (<SvgPlaceholder />);
    }
    ```

    > [!NOTE]
    > Newly defined `iconElement` property needs to be read by the consumers to display the icon in a toolbar, unless the `ToolbarItemUtilities.createForTool` helper is used when creating toolbar items.

  - `ToolUtilities.isWithIcon` function is a type guard that checks if a tool has a React icon element defined. Which is useful to read the icon element from the tool type.

    ```tsx
    if (ToolUtilities.isWithIcon(MyTool)) {
      MyTool.iconElement; // ReactElement
    }
    ```
