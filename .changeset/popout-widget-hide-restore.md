---
"@itwin/appui-react": patch
---

Fixed a popped-out (child window) widget docking back to its panel instead of remaining popped out after it was hidden (`WidgetState.Hidden`) and then shown again.

Also enforced a minimum popout window size (200x200), matching the existing minimum used for floating widgets, to prevent popout windows from progressively shrinking to an unusably small size across repeated pop-out/dock cycles.
