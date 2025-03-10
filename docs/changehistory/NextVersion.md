# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)

## @itwin/appui-react

### Additions

- Added a `layout` property to the `Frontstage` interface to allow specifying a custom layout component that overrides the standard widget layout.

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

- Added the `StandardLayout` component, which can be used in the `layout` property of a `Frontstage`. The intended use case of this component, instead of simply omitting the layout property, is to add additional configuration to the standard layout or to add additional wrapper components.

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
