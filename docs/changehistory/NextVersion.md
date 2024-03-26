# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Fixes](#fixes)

## @itwin/appui-react

### Fixes

- Replace `process.env.NODE_ENV === "development"` check used in combination with `console.warn` by preview features with `Logger.logWarning()`. Logger APIs can be used instead to disable/enable this warning message. [#783](https://github.com/iTwin/appui/pull/783)
