---
"@itwin/components-react": minor
---

## Deprecated legacy editors system

Deprecated the legacy editor system in favor of the new `EditorSpec`-based system. The following APIs are deprecated:

- `EditorContainer` - use `PropertyRecordEditor` or `EditorRenderer` instead.
- `PropertyEditorBase`, `TypeEditor`, `PropertyEditorProps` - use `EditorSpec` / `createEditorSpec` to define custom editors.
- `PropertyEditorManager` - use `EditorsRegistryProvider` to register custom editors.
- `DataControllerBase`, `DataController`, `AsyncErrorMessage`, `AsyncValueProcessingResult` - no longer needed in the new system.

Deprecated individual editor components. Use `EditorRenderer` to render editors based on metadata instead of using these directly:

- `BasicPropertyEditor`, `BooleanEditor`, `BooleanPropertyEditor`
- `TextEditor`, `TextareaEditor`, `TextareaPropertyEditor`
- `EnumEditor`, `EnumPropertyEditor`, `EnumButtonGroupEditor`, `EnumPropertyButtonGroupEditor`
- `NumericInputEditor`, `NumericInputPropertyEditor`
- `SliderEditor`, `SliderPropertyEditor`
- `ToggleEditor`, `TogglePropertyEditor`
- `ImageCheckBoxEditor`, `ImageCheckBoxPropertyEditor`
- `IconEditor`, `IconPropertyEditor`
- `CustomNumberEditor`, `CustomNumberPropertyEditor`

## Added `PropertyRecordEditorMetadata` and `isPropertyRecordEditorMetadata`

Promoted `PropertyRecordEditorMetadata` interface and `isPropertyRecordEditorMetadata` type guard to `@beta`. These allow custom editors to access legacy `PropertyRecord` metadata (e.g. `typename`, `params`, `enum`, `extendedData`) when used with the new editor system.

## Migration

Migrate from `EditorContainer` to the new system using `PropertyRecordEditor`:

```tsx
// before
<EditorContainer
  propertyRecord={propertyRecord}
  onCommit={onCommit}
  onCancel={onCancel}
/>

// after
<PropertyRecordEditor
  propertyRecord={propertyRecord}
  onCommit={onCommit}
  onCancel={onCancel}
  editorSystem="new"
/>
```

Migrate custom editors from `PropertyEditorBase` to `EditorSpec`:

**Before**

```tsx
const CustomBooleanEditor = React.forwardRef<TypeEditor, PropertyEditorProps>(
  (props, ref) => {
    const currentValue =
      props.propertyRecord?.value.valueFormat === PropertyValueFormat.Primitive
        ? (props.propertyRecord.value.value as boolean)
        : false;

    React.useImperativeHandle(ref, () => ({
      getPropertyValue: async () => ({
        valueFormat: PropertyValueFormat.Primitive,
        value: currentValue,
        displayValue: "",
      }),
      htmlElement: null,
      hasFocus: false,
    }));

    return (
      <ToggleSwitch
        checked={currentValue}
        onChange={(e) => {
          props.onCommit?.({
            propertyRecord: props.propertyRecord!,
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

**After**

```tsx
export const CustomBoolEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is ValueMetadata =>
    metadata.type === "bool",
  isValueSupported: ValueUtilities.isBoolean,
  Editor: CustomBooleanEditor,
});

function CustomBooleanEditor(props: EditorProps<ValueMetadata, BooleanValue>) {
  const currentValue = props.value?.value ?? false;
  return (
    <ToggleSwitch
      checked={currentValue}
      onChange={(e) => {
        props.onChange({ value: e.target.checked });
        props.commit?.();
      }}
    />
  );
}
```
