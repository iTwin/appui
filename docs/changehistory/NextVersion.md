# NextVersion <!-- omit from toc -->

- [@itwin/appui-react](#itwinappui-react)
  - [AccuDraw Fixes](#accudraw-fixes)
  - [AccuDraw Additions](#accudraw-additions)

## @itwin/appui-react

### AccuDraw Fixes

- When moving the mouse, the focus change between X or Y, in rectangular mode only.
- Removed the delay after typing in the input field, so the visual update is immediate.
- Input fields are automatically focused when the AccuDrawFieldContainer appears and the the compass mode changes.

### AccuDraw Additions

- Rectangular inputs no longer have colors.
- We can enter letters in the Bearing angle input field. `N, S, E, W` for North, South, East and West.
- Bearing angle input field automatically adds special characters `° ' "` to facilitate entering bearing angles.
- The Focus is now trapped in Accudraw input fields. To focus out of these fields, the user must press Escape.
