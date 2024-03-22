# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/core-react](#itwincore-react)
  - [Additions](#additions)
  - [Changes](#changes)

## @itwin/core-react

### Additions

- Added `LocalizationProvider` tagged as `@alpha` which should eventually replace static package initialization.
  This is a shared provider used by all AppUI packages. Provided localization interface is a subset of `@itwin/core-common` `Localization` and is expected to handle namespaces.

  Usage example:

  ```ts
  // Before
  await UiCore.initialize();
  ReactDOM.render(<App />, element);

  // After
  <LocalizationProvider localization={localization}>
    <App />
  </LocalizationProvider>;
  ```

  Additionally, localized components will now re-render correctly after a different localization instance is provided, which is needed when i.e. a language is changed.

  ```tsx
  const [localization, setLocalization] = React.useState<
    Pick<Localization, "getLocalizedString" | "registerNamespace">
  >(IModelApp.localization);

  const onChange = async (language) => {
    await IModelApp.localization.changeLanguage(language);
    setLocalization({
      getLocalizedString: (...args) =>
        IModelApp.localization.getLocalizedString(...args),
      registerNamespace: async (...args) =>
        IModelApp.localization.registerNamespace(...args),
    });
  };

  <LocalizationProvider localization={localization}>
    <App />
  </LocalizationProvider>;
  ```

### Changes

- Components will use english localization strings by default if `LocalizationProvider` is not used and static package initializer is not used.
