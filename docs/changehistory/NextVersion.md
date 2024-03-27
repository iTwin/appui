# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Fixes](#fixes)
- [@itwin/core-react](#itwincore-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Changes](#changes)

## @itwin/appui-react

### Deprecations

- Deprecated `StagePanelDef.size`. Please use `StagePanelDef.sizeSpec` instead. [#784](https://github.com/iTwin/appui/pull/784)
- Deprecated `StagePanelConfig.maxSize`, `StagePanelConfig.minSize` and `StagePanelConfig.size`. Please use `StagePanelConfig.maxSizeSpec`, `StagePanelConfig.minSizeSpec` and `StagePanelConfig.sizeSpec` instead. [#784](https://github.com/iTwin/appui/pull/784)
- Deprecated `StagePanelMaxSizeSpec`. Please use `StagePanelSizeSpec` instead. [#784](https://github.com/iTwin/appui/pull/784)

### Additions

- `StagePanelDef.sizeSpec` allows specifying stage panel size as pixels or a percentage value. [#784](https://github.com/iTwin/appui/pull/784)
- `StagePanelConfig.maxSizeSpec`, `StagePanelConfig.minSizeSpec` and `StagePanelConfig.sizeSpec` allow specifying stage panel size as pixels or a percentage value. [#784](https://github.com/iTwin/appui/pull/784)

### Fixes

- Replace `process.env.NODE_ENV === "development"` check used in combination with `console.warn` by preview features with `Logger.logWarning()`. Logger APIs can be used instead to disable/enable this warning message. [#783](https://github.com/iTwin/appui/pull/783)

## @itwin/core-react

### Deprecations

- Static `Dialog.getFooterButtons()`. Use [iTwinUI buttons](https://itwinui.bentley.com/docs/button) instead. [#782](https://github.com/iTwin/appui/pull/782)

### Additions

- Added `LocalizationProvider` tagged as `@alpha` which should eventually replace static package initialization.
  This is a shared provider used by all AppUI packages. Provided localization interface is a subset of `@itwin/core-common` `Localization` and is expected to handle namespaces. [#782](https://github.com/iTwin/appui/pull/782)

  Usage example:

  ```ts
  // Before
  await UiCore.initialize(IModelApp.localization);
  ReactDOM.render(<App />, element);

  // After
  <LocalizationProvider localization={IModelApp.localization}>
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

  Applications might still want to initialize the localization namespaces before rendering the components to avoid rendering of default translations.

  ```tsx
  await localization.registerNamespace(UiCore.localizationNamespace)

  <LocalizationProvider localization={localization} />
  ```

### Changes

- Components will use english localization strings by default if `LocalizationProvider` is used without static package initializer. [#782](https://github.com/iTwin/appui/pull/782)
