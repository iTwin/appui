# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)

## @itwin/appui-react

### Additions

- Added a `layout` property to the `Frontstage` interface to allow specifying a custom layout component that overrides the standard widget layout. [#1243](https://github.com/iTwin/appui/pull/1243)

  ```tsx
  // Specify a custom layout for a frontstage.
  UiFramework.frontstages.addFrontstage({
    id: "custom-layout-frontstage",
    layout: <CustomLayout />,
    ...
  });

  // Simplified implementation of a custom layout that displays registered backstage items.
  function CustomLayout() {
    const [backstageItems] = React.useState(() => {
      return UiItemsManager.getBackstageItems();
    });
    return (
      <>
        <h1>Custom layout</h1>
        {backstageItems.map((item) => (
          <div key={item.id}>
            {typeof item.label === "string" ? item.label : item.id}
          </div>
        ))}
      </>
    );
  }
  ```

- Added the `StandardLayout` component, which can be used in the `layout` property of a `Frontstage`. The intended use case of this component, instead of simply omitting the layout property, is to add additional configuration to the standard layout or to add additional wrapper components. [#1243](https://github.com/iTwin/appui/pull/1243)

  ```tsx
  UiFramework.frontstages.addFrontstage({
    id: "standard-layout-frontstage",
    layout: (
      <CustomProvider>
        <StandardLayout />
      </CustomProvider>
    ),
    ...
  });
  ```

- Added `widgetActions` prop to `StandardLayout` component which when combined with newly added `WidgetActions` and `WidgetAction` components allows customizing the default widget actions. [#1245](https://github.com/iTwin/appui/pull/1245)

  To add a custom action to the left of the default widget actions:

  ```tsx
  // Define a custom action.
  function CustomAction() {
    return (
      <WidgetAction
        label="Custom action"
        icon={<SvgPlaceholder />}
        onClick={console.log}
      />
    );
  }

  // Add the custom action to the default widget actions.
  <StandardLayout
    widgetActions={
      <WidgetActions
        modifyActions={(defaultActions) => [
          {
            id: "custom-action",
            action: CustomAction,
          },
          ...defaultActions,
        ]}
      />
    }
  />;
  ```

  The definition used by `defaultActions` argument of the `modifyActions` function includes an `id` property, which can be used to target specific actions. The `id` is defined as a string literal union type, allowing actions to be added or removed in the future.
  For example, to remove all widget actions except the `popout`:

  ```tsx
  modifyActions={(defaultActions) =>
    defaultActions.filter((action) => action.id === "popout")
  }
  ```
