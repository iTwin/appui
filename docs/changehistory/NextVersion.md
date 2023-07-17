---
publish: false
---

# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/appui-react](#itwinappui-react)
  - [Changes](#changes)
  - [Fixes](#fixes)
- [@itwin/components-react](#itwincomponents-react)
  - [Additions](#additions)
- [@itwin/core-react](#itwincore-react)
  - [Changes](#changes-1)

## @itwin/appui-react

### Changes

- Changed the tool settings message that is displayed when a tool does not specify any tool settings. Previously negative message **No settings for this tool** is replaced with a positive dynamic message i.e. **Measure Distance does not have tool settings.** The new message is composed of a pre-string (`noToolSettingsStart` translation key), the tool name (uses `noToolSettingsPlaceholderName` translation key if tool name is not specified), and a post-string (`noToolSettingsEnd` translation key) to allow translation into languages with different grammatical structures.
- Removed the leftover usage of the telemetry APIs. The suggested way for the applications to handle the feature tracking moving forward is to listen to various AppUI events (i.e. widget state change events) or other observable state like React hooks. This allows the application to decide how to handle the events.

### Fixes

- Fixed an issue which caused popout widgets to throw an error when `StateManager` is not initialized and Redux store is configured via `UiFramework.initialize` instead.

## @itwin/components-react

### Additions

- Added `useControlledTreeLayoutStorage` and `useVirtualizedPropertyGridLayoutStorage` hooks. These hooks can be used with `useTransientState` to persist scroll position when `VirtualizePropertyGrid` or `ControlledTree` is used in `Widget`. Example:

```typescript
import { useTransientState } from "@itwin/appui-react";
import {
  ControlledTree,
  useControlledTreeLayoutStorage,
} from "@itwin/components-react";

function ControlledTreeWidget() {
  const { ref, persist, restore } =
    useControlledTreeLayoutStorage<HTMLDivElement>();
  useTransientState(persist, restore);

  return (
    <div ref={ref}>
      <ControlledTree />
    </div>
  );
}
```

## @itwin/core-react

### Changes

- `Dialog` from core-react now has iTwinUI `Dialog` as a base component so it should look and act similar to iTwinUI `Dialog`. The overhead features and dialog resizing of core-react `Dialog` are kept.
