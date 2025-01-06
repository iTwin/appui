# NextVersion <!-- omit from toc -->

- [@itwin/appui-react](#itwinappui-react)
  - [Additions](#additions)
  - [Changes](#changes)

## @itwin/appui-react

### Additions

- Added property `activeToolEmptyNode` to `FrontstageConfig.toolSettings`, which allows to use custom node if tool settings is empty. [#1137](https://github.com/iTwin/appui/pull/1137)

### Changes

- AccuDraw interaction changes. [#1157](https://github.com/iTwin/appui/pull/1157)
  - When moving the mouse, the focus changes between `X` and `Y` input fields, in rectangular mode only.
  - Removed the delay after typing in the input field, so the visual update is immediate.
  - The first input field is automatically focused when the `AccuDrawFieldContainer` appears.
  - The first input field is automatically focused when the compass mode is changed.
  - Removed colors from rectangular inputs.
  - `N`, `S`, `E`, `W` letters, which correspond to North, South, East, and West, can be entered in the bearing angle input field.
  - The bearing angle input field automatically adds special characters `°`, `'`, and `"` to facilitate entering the bearing angle.
  - The focus is now trapped in AccuDraw input fields. To focus out of these fields, the end user can press the `Escape` key.
