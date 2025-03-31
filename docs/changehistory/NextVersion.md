# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
- [@itwin/imodel-components-react](#itwinimodel-components-react)
  - [Additions](#additions-1)

## @itwin/appui-react

### Fixes

- Fixed an icon size of a backstage app button when web font icon is used. [#1262](https://github.com/iTwin/appui/pull/1262)

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

## @itwin/imodel-components-react

### Additions

- Added Quantity and Weight property value editor specification using new editors system. [#1166](https://github.com/iTwin/appui/pull/1166)
