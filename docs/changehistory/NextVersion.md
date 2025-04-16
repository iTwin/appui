# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Additions](#additions-2)

## @itwin/appui-react

### Deprecations

- Deprecated `iconRight` property of `CursorMenuItemProps` interface. Consumers should use newly added `iconRightNode` instead. [#1265](https://github.com/iTwin/appui/pull/1265)

  ```tsx
  // Before
  const item: CursorMenuItemProps = {
    iconRight: "icon-placeholder",
  };

  // After
  const item: CursorMenuItemProps = {
    iconRightNode: <SvgPlaceholder />,
  };
  ```

### Additions

- Added `iconRightNode` property to `CursorMenuItemProps` which replaces deprecated web font icon specific `iconRight` property. [#1265](https://github.com/iTwin/appui/pull/1265)
- Added `visibleToolSettings` prop to `StandardLayout` component which when enabled keeps the tool settings visible to the end user. This is especially useful when the tool settings is undocked as a regular widget as changing a tool or it's tool settings will show the tool settings widget via the `WidgetDef.show()` API. [#1266](https://github.com/iTwin/appui/pull/1266)

  ```tsx
  UiFramework.frontstages.addFrontstage({
    // ...
    layout: <StandardLayout visibleToolSettings />,
  });
  ```

- Added `cursorDocument` getter to `CursorInformation` class. Added `targetDocument` optional argument to `updatePosition`, `update` and `open` methods of `CursorPopupManager` class. Added `targetDocument` property to `CursorPopupInfo` interface. These additions are used to support cursor based functionality in child windows and popout widgets by specifying a window document. [#1277](https://github.com/iTwin/appui/pull/1277)
- Added `handleContentMouseLeave` property to `FrameworkVisibility` interface available via `UiFramework.visibility`. This new method together with existing `handleContentMouseMove` allows consumers to mark when cursor is interacting with the main content of the application - usually a viewport. These APIs are currently used by UI auto hide feature and `promptAtContent` feature of `ToolAssistanceField` component. [#1277](https://github.com/iTwin/appui/pull/1277)

  By default content mouse events are handled by:

  - `ContentOverlay` component
  - `FloatingViewportContentWrapper` component
  - When using `contentGroup` APIs of `Frontstage`

  Consumers that want to display tool assistance cursor prompt in a widget or a widget popout should render `ContentOverlay` component:

  ```tsx
  function MyWidget() {
    return (
      <ContentOverlay>
        <Viewport />
      </ContentOverlay>
    );
  }
  ```

  Alternatively, to handle content mouse events manually:

  ```tsx
  function MyWidget() {
    return (
      <div
        onMouseMove={UiFramework.visibility.handleContentMouseMove}
        onMouseLeave={UiFramework.visibility.handleContentMouseLeave}
      >
        <Viewport />
      </div>
    );
  }
  ```

- Added `toolSettings.defaultLocation` prop to the `StandardLayout` component which allows consumers to specify the initial tool settings location as a docked widget. [#1268](https://github.com/iTwin/appui/pull/1268)

  ```tsx
  <StandardLayout
    toolSettings={{
      defaultLocation: {
        location: StagePanelLocation.Right,
        section: StagePanelSection.Start,
      },
    }}
  />
  ```

### Changes

- Converted `CursorPopupRenderer` from a class component to a functional component. [#1277](https://github.com/iTwin/appui/pull/1277)
- Converted `ToolAssistanceField` from a class component to a functional component to resolve timing issues with prompt fade-out. Additionally, the tool assistance cursor prompt is no longer displayed when dragging a widget container or widget tab if `promptAtContent` is enabled. [#1283](https://github.com/iTwin/appui/pull/1283)
- Inlined all `.svg` icons as React components to avoid usage of `<svg-loader>` which is prone to issues if bundler is misconfigured. [#1284](https://github.com/iTwin/appui/pull/1284)

### Fixes

- Fixed an icon size of a backstage app button when web font icon is used. [#1262](https://github.com/iTwin/appui/pull/1262)
- Simplify grid template definitions of standard layout to avoid CSS issues in `RsBuild` production build. [#1263](https://github.com/iTwin/appui/pull/1263)
- Fixed `onItemExecuted` prop of the `Toolbar` component which was omitted from the initial implementation of the updated toolbar. [#1264](https://github.com/iTwin/appui/pull/1264)
- Fixed `iconNode` property rendering of `CursorMenuItemProps` interface in `CursorPopupMenu` component. [#1265](https://github.com/iTwin/appui/pull/1265)
- Fixed tool assistance cursor prompt stacking to correctly rendered above floating widgets. [#1283](https://github.com/iTwin/appui/pull/1283)

## @itwin/components-react

### Additions

- Added new system for rendering property value editing components. [#1166](https://github.com/iTwin/appui/pull/1166)

  **API overview**

  - `EditorsRegistryProvider` - adds supplied editors to the registry held in `React` context. It supports nesting multiple `EditorsRegistryProvider` to allow registering custom editors specific for some component that have higher priority than the ones registered near the root of the application.
  - `useEditor` - hook to get the editor that should be used to edit the supplied value. First it looks for applicable editor in EditorsRegistry and if none was found it fallbacks to the default editors.
  - `EditorRenderer` - wrapper around EditorRegistry that provides a convenient way to render editors for specific value.
  - `useCommittableValue` - custom React hooks that provides a convenient way to add `cancel/commit` actions on `Esc`/`Enter` key click to the editor.
  - `Value` - type for all values that are supported by editors.
  - `ValueMetadata` - type for additional metadata that can be supplied to editors alongside value itself. It can be extended when implementing custom editors. (E.g. passing available choices and icons to the enum editor that is rendered as button group)
  - `createEditorSpec` - an utility function to that provides a convenient way to defined editor spec for typed editors.
  - `PropertyRecordEditor` - React component that allows to use existing `PropertyRecord` type with the new editors system.

  **Rendering editor and registering custom editors**

  Defining component that renders value editor:

  ```tsx
  function EditingComponent(props: { value: Value; metadata: ValueMetadata }) {
    const onChange = (newValue: Value) => {
      // handle value change
    };
    return (
      <EditorRenderer
        value={value}
        metadata={metadata}
        onChange={onChange}
        size="small"
      />
    );
  }
  ```

  Defining component that renders value editor with `Commit`/`Cancel` actions:

  ```tsx
  function EditingComponent(props: {
    initialValue: Value;
    metadata: ValueMetadata;
    onCommit: (committedValue: Value) => void;
    onCancel: () => void;
  }) {
    // `onKeydown` callback returned by `useCommittableValue` will invoke `onCommit` with current value when `ENTER` is pressed or
    // `onCancel` when `ESC` key is pressed.
    // Additionally `commit` or `cancel` callback can be invoked to do commit or cancel manually.
    const { value, onChange, onKeydown, commit, cancel } = useCommittableValue({
      initialValue,
      onCommit,
      onCancel,
    });

    return (
      // cancel edit when editor is blurred
      <span onKeydown={onKeydown} onBlur={cancel}>
        <EditorRenderer
          value={value}
          metadata={metadata}
          onChange={onChange}
          commit={commit}
          cancel={cancel}
        />
      </span>
    );
  }
  ```

  Registering custom editors to be available through out all application:

  ```tsx
  import {
    CustomBooleanEditorSpec,
    CustomNumericEditorSpec,
  } from "./customEditors";

  const rootEditors: EditorSpec[] = [
    CustomBooleanEditorSpec,
    CustomNumericEditorSpec,
  ];

  function App() {
    return (
      <EditorsRegistryProvider editors={rootEditors}>
        {/* Render whole application components tree. Components down the tree will be able to use custom editors */}
      </EditorsRegistryProvider>
    );
  }
  ```

  Registering custom editors that should be available only for specific component:

  ```tsx
  // setup custom editors for whole application
  import {
    CustomBooleanEditorSpec,
    CustomNumericEditorSpec,
  } from "./customEditors";

  const rootEditors: EditorSpec[] = [
    CustomBooleanEditorSpec,
    CustomNumericEditorSpec,
  ];

  function App() {
    return (
      <EditorsRegistryProvider editors={rootEditors}>
        <EditingComponent />
      </EditorsRegistryProvider>
    );
  }
  ```

  ```tsx
  // setup custom editors for specific component
  import { SpecialNumericEditorSpec } from "./specialEditors";

  const customEditors: EditorSpec[] = [SpecialNumericEditorSpec];

  function EditingComponent(props: EditingComponentProps) {
    return (
      <EditorsRegistryProvider editors={customEditors}>
        {/* SpecialNumericEditorSpec has higher priority than CustomBooleanEditorSpec and CustomNumericEditorSpec registered at the root of application */}
        <EditorRenderer {...props} />
      </EditorsRegistryProvider>
    );
  }
  ```

  **Defining custom editors**

  The goal of the new editors system is to remove the need for static editor registration and provide more convenient API for implementing custom editors. Current API has quite a lot optional properties that do not make sense (`propertyRecord` is optional but if it is `undefined` there is no way to figure out what to render):

  **Custom editor using old system and react functional components**

  ```tsx
  const CustomBooleanEditor = React.forwardRef<TypeEditor, PropertyEditorProps>(
    (props, ref) => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const getCurrentValue = () => {
        if (
          props.propertyRecord &&
          props.propertyRecord.value.valueFormat ===
            PropertyValueFormat.Primitive
        ) {
          return props.propertyRecord.value.value as boolean;
        }
        return false;
      };
      const currentValue = getCurrentValue();

      React.useImperativeHandle(
        ref,
        () => ({
          getPropertyValue: async () => {
            let propertyValue: PropertyValue | undefined;
            if (
              props.propertyRecord &&
              props.propertyRecord.value.valueFormat ===
                PropertyValueFormat.Primitive
            ) {
              propertyValue = {
                valueFormat: PropertyValueFormat.Primitive,
                value: currentValue,
                displayValue: "",
              };
            }
            return propertyValue;
          },
          htmlElement: inputRef.current,
          hasFocus: document.activeElement === inputRef.current,
        }),
        [currentValue, props.propertyRecord]
      );

      return (
        <ToggleSwitch
          ref={inputRef}
          checked={currentValue}
          onChange={(e) => {
            if (!props.propertyRecord || !props.onCommit) return;
            props.onCommit({
              propertyRecord: props.propertyRecord,
              newValue: {
                valueFormat: PropertyValueFormat.Primitive,
                value: e.target.checked,
                displayValue: "",
              },
            });
          }}
        />
      );
    }
  );

  export class CustomBooleanPropertyEditor extends PropertyEditorBase {
    public get reactNode(): React.ReactNode {
      return <CustomBooleanEditor />;
    }
  }
  ```

  **Custom boolean editor using new system**

  ```tsx
  export const CustomBoolEditorSpec: EditorSpec = createEditorSpec({
    isMetadataSupported: (metadata): metadata is ValueMetadata =>
      metadata.type === "bool",
    isValueSupported: ValueUtilities.isBoolean,
    Editor: CustomBooleanEditor,
  });

  export function CustomBooleanEditor(
    props: EditorProps<ValueMetadata, BooleanValue>
  ) {
    const currentValue = props.value?.value ?? false;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = { value: e.target.checked };
      props.onChange(newValue);
      props.commit && props.commit();
    };

    return <ToggleSwitch checked={currentValue} onChange={handleChange} />;
  }
  ```

  The new system removes all the code that was associated with class components and accessing values through editor `ref`. It is not clear if that was used/useful so the chosen approach is to add something similar later if that is still needed. Majority of that was used by `EditorContainer` that is replaced by `useCommittableValue` hook in the new system.

- `useCommittableValue`: Avoid invoking `commit` if value is the same as the initial. [#1267](https://github.com/iTwin/appui/pull/1267)

## @itwin/imodel-components-react

### Additions

- Added Quantity and Weight property value editor specification using new editors system. [#1166](https://github.com/iTwin/appui/pull/1166)
