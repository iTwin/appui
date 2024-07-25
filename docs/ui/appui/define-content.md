---
tableRowAnchors: true
jotform: true
---

# Define Content

The content area in AppUI is where the main interactive element of your applications exists. It is displayed in the back of your application, under the widgets, toolbars, and other UI elements.

To define what is displayed in your applications content area you will have to use [Content](#content), [Content Layout](#content-layout) and [Content Group](#content-group) concepts.

## Content

iTwin.js application typically will use a viewport to display the 2d or 3d data, and AppUI provides an IModel Viewport component to display such information. All you need to do is tell the framework that you want a specific component with an object satisfying the `ContentProps` interface:

```tsx
function ViewportContent() {
  const [iModel] = React.useState(UiFramework.getIModelConnection());
  const [viewState] = React.useState(UiFramework.getDefaultViewState());
  return <ViewportComponent viewState={viewState} imodel={iModel} />;
}

const content = {
  id: `viewport-1`,
  classId: "", // This is required for backwards compatibility reasons. It will be removed in the future.
  content: <ViewportContent />,
} satisfies ContentProps;
```

> Content Control **(deprecated)**
>
> In legacy applications, [Content](#content) can be defined with **deprecated** content control APIs. You never instantiate a content control directly, it will be instantiated by the framework when it is needed. In the end it will map to a React component that will be rendered in the content area.
>
> ```ts
> {
>  id: "main-imodel-view",
>  classId: IModelViewportControl
>  applicationData: {
>    viewState: () => {/* some function that return a viewstate*/},
>    iModelConnection: UiFramework.getIModelConnection(),
>  }
> }
> ```
>
> Note however that you have the possibility to subclass the `IModelViewportControl` if you need a more fine grained control over the display, or you can even subclass > the `ContentControl` directly, where you can actually show any react component as the base of your application.
>
> ```ts
> interface MyTableControlOptions {
>   data: {}[];
> }
>
> class MyTableControl extends ContentControl {
>   constructor(info: ConfigurableCreateInfo, options: MyTableControlOptions) {
>     super(info, options);
>     this.reactNode = <Table data={options.data} />;
>   }
> }
> ```
>
> You would then use this component just like the `IModelViewportControl`:
>
> ```ts
> const mainTableContent = {
>   id: "main-table-content",
>   classId: MyTableControl
>   applicationData: {
>     data: [
>       {iTwinName: "My iTwin", iModelName: "My iModel"},
>       {iTwinName: "Another iTwin", iModelName: "A different iModel"},
>     ],
>   }
> }
> ```

## Content Layout

Multiple contents can be displayed at the same time by an application, to determine how these content are organized on the screen, you need to provide a layout.

AppUI provides 8 layouts out of the box that you can refer simply by name in the `StandardContentLayouts` object:

```ts
class StandardContentLayouts {
  static readonly singleView: ContentLayoutProps;
  static readonly fourQuadrants: ContentLayoutProps;
  static readonly twoVerticalSplit: ContentLayoutProps;
  static readonly twoHorizontalSplit: ContentLayoutProps;
  static readonly threeViewsTwoOnLeft: ContentLayoutProps;
  static readonly threeViewsTwoOnRight: ContentLayoutProps;
  static readonly threeViewsTwoOnBottom: ContentLayoutProps;
  static readonly threeViewsTwoOnTop: ContentLayoutProps;
}
```

However you can build these views completely by yourself using the same interface, which gives you complete control over that layout.

```ts
const myOwnLayout = {
  id: "myOwnLayout",
  description: "A 3 row content, the top row size is locked",
  horizontalSplit: {
    id: "myOwnLayout:1-23",
    percentage: 0.33,
    locked: true,
    top: 0,
    bottom: {
      horizontalSplit: {
        id: "myOwnLayout:2-3",
        percentage: 0.5,
        locked: false,
        top: 1,
        bottom: 2,
      },
    },
  },
};
```

## Content Group

Multiple content components can be displayed at the same time by an application, so the content definitions are organized in content groups (even if there is only one displayed!)

A content group consists of an id, a default layout, and a list of content definitions. When the group is displayed, the layout will be filled with components specified by the content definitions. If there are more content definitions than places in the layouts, the remaining content components will simply not be rendered.

```ts
new ContentGroup({
  id: "my-content-group",
  layout: myOwnLayout,
  contents: [
    mainTableContent,
    mainViewportContent,
    {
      id: "alternate-imodel-view",
      classId: "",
      content: <ViewportContent />,
    },
  ],
});
```

## Next Steps

Now that you know how to define content, you can learn how to display it in the [configure frontstage](./configure-frontstage.md) section.
