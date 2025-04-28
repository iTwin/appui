# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions-1)

## @itwin/appui-react

### Additions

- Added `toolSettingsNewEditors` preview feature for enabling new editors system in tool settings. [#1289](https://github.com/iTwin/appui/pull/1289)

## @itwin/components-react

### Additions

- Added ability to opt in to using new editors system in `FilterBuilder` component. [#1288](https://github.com/iTwin/appui/pull/1288)

  ```tsx
  return (
    <FilterBuilder
      {...props}
      ruleValueRenderer={React.useCallback(
        (valueProps) => (
          <PropertyFilterBuilderRuleValue {...valueProps} editorSystem="new" />
        ),
        []
      )}
    />
  );
  ```

- Added ability to render status message in `EditorRenderer`. [#1288](https://github.com/iTwin/appui/pull/1288)

  ```tsx
  return <EditorRenderer {...props} statusMessage="Negative status message" />;
  ```

  ```tsx
  return (
    <EditorRenderer
      {...props}
      statusMessage={
        <StatusMessage status="positive">Custom status message</StatusMessage>
      }
    />
  );
  ```
