# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Deprecations](#deprecations)
  - [Fixes](#fixes)

## @itwin/appui-react

### Additions

- `StagePanelDef.sizeSpec` allows specifying stage panel size as pixels or a percentage value.
- `StagePanelConfig.maxSizeSpec`, `StagePanelConfig.minSizeSpec` and `StagePanelConfig.sizeSpec` allow specifying stage panel size as pixels or a percentage value.

### Deprecations

- Deprecated `StagePanelDef.size`. Please use `StagePanelDef.sizeSpec` instead.
- Deprecated `StagePanelConfig.maxSize`, `StagePanelConfig.minSize` and `StagePanelConfig.size`. Please use `StagePanelConfig.maxSizeSpec`, `StagePanelConfig.minSizeSpec` and `StagePanelConfig.sizeSpec` instead.
- Deprecated `StagePanelMaxSizeSpec`. Please use `StagePanelSizeSpec` instead.

### Fixes

- Replace `process.env.NODE_ENV === "development"` check used in combination with `console.warn` by preview features with `Logger.logWarning()`. Logger APIs can be used instead to disable/enable this warning message. [#783](https://github.com/iTwin/appui/pull/783)
