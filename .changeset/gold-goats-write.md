---
"@itwin/appui-react": minor
---

Added `iconElement` property to `ToolAssistanceInstruction` interface of `@itwin/core-frontend` package (using TypeScript declaration merging) to allow using custom SVG icons in tool assistance instructions.

```tsx
const instruction = ToolAssistance.createInstruction(
  ToolAssistanceImage.LeftClick, // empty string or a fallback icon (preferred)
  "Custom instruction"
);
instruction.iconElement = <SvgPlaceholder />;
```
