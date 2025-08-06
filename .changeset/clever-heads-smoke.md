---
"@itwin/appui-react": minor
---

Added `activeItemIds` prop to `ToolbarComposer` component. When specified, it overrides the default behavior where the active toolbar item is determined by the active `Tool`.

This change enables the toolbars to display the items without the `Tool` system and to display multiple items as active:

```tsx
<ToolbarComposer
  items={[
    ToolbarItemUtilities.createActionItem({ id: "item1" }),
    ToolbarItemUtilities.createActionItem({ id: "item2" }),
    ToolbarItemUtilities.createActionItem({ id: "item3" }),
  ]}
  activeItemIds={["item1", "item3"]}
/>
```

To continue using the default behavior where the `Tool` determines the active toolbar item, but still display additional toolbar items as active, you can combine the `activeItemIds` prop with the `useActiveToolId` hook.

```tsx
const activeToolId = useActiveToolId();

// Filter our undefined values and ensure type safety.
const activeItemIds = [activeToolId, "item1"].filter(
  (id): id is string => id !== undefined
);

<ToolbarComposer
  items={[
    ToolbarItemUtilities.createActionItem({ id: "item1" }),
    ToolbarItemUtilities.createForTool(SelectionTool),
  ]}
  activeItemIds={activeItemIds}
/>;
```

`ToolbarComposer` component might be used indirectly, since it is rendered by `BasicNavigationWidget`, `BasicToolWidget`, `ContentToolWidgetComposer` and `ViewToolWidgetComposer` components. In that case use the underlying `ToolWidgetComposer` or `NavigationWidgetComposer` component to compose and configure the toolbars.

```tsx
// Before
<ContentToolWidgetComposer cornerButton={props.cornerButton} />;

// After
const activeItemIds = ["item1", "item2"];
<ToolWidgetComposer
  cornerItem={props.cornerButton}
  horizontalToolbar={
    <ToolbarComposer
      items={[]}
      usage={ToolbarUsage.ContentManipulation}
      orientation={ToolbarOrientation.Horizontal}
      activeItemIds={activeItemIds}
    />
  }
  verticalToolbar={
    <ToolbarComposer
      items={[]}
      usage={ToolbarUsage.ContentManipulation}
      orientation={ToolbarOrientation.Vertical}
      activeItemIds={activeItemIds}
    />
  }
/>;
```

Similarly, the `contentManipulation` and `viewNavigation` widgets might need to be configured when the `FrontstageUtilities` is used to create a standard `Frontstage`.

```tsx
function ContentManipulationWidget() {
  return (
    <ToolWidgetComposer
      // ...
      activeItemIds={["item1", "item3"]}
    />
  );
}

const frontstage: Frontstage = {
  ...FrontstageUtilities.createStandardFrontstage({
    // ...
  }),
  contentManipulation: {
    id: "content-manipulation",
    content: <ContentManipulationWidget />,
  },
};
```
