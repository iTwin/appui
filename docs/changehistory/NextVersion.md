# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Deprecations](#deprecations)
  - [Additions](#additions)
  - [Fixes](#fixes)

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
