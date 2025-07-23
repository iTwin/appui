---
"@itwin/imodel-components-react": minor
---

Introduce **QuantityFormatPanelV2**, a redesigned version of QuantityFormatPanel with improved user experience and simplified developer API.

**Key improvements:**

- Properties are logically grouped with commonly used options displayed first
- Complex properties are organized under an expandable "Advanced Options" section to reduce cognitive load
- New preview component focuses on unit display formatting rather than unit conversions
- Streamlined props - developers no longer need to manage `persistenceUnit` manually
- Modern accessibility patterns with proper semantic HTML and keyboard navigation

**Usage:**

```tsx
import { QuantityFormatPanelV2 } from "@itwin/imodel-components-react";
import type { FormatProps } from "@itwin/core-quantity";
import { IModelApp } from "@itwin/core-frontend";

function MyFormatPanel() {
 const [formatDefinition, setFormatDefinition] = useState<FormatProps>({
  precision: 4,
  type: "Decimal",
  composite: {
   units: [{ name: "Units.M", label: "m" }],
  },
 });

 const handleFormatChange = (newFormat: FormatProps) => {
  setFormatDefinition(newFormat);
 };

 return <QuantityFormatPanelV2 formatDefinition={formatDefinition} unitsProvider={IModelApp.quantityFormatter.unitsProvider} onFormatChange={handleFormatChange} initialMagnitude={100} />;
}
```

For advanced use cases where you need full control over persistence units and unit conversions, you can use the lower-level `FormatPanelV2` component directly. This is useful when integrating with custom unit management systems or when previewing unit conversions is important.

```tsx
import { FormatPanelV2 } from "@itwin/imodel-components-react";
import type { FormatProps, UnitProps } from "@itwin/core-quantity";
import { IModelApp } from "@itwin/core-frontend";

function CustomFormatPanel() {
 const [formatProps, setFormatProps] = useState<FormatProps>({
  type: "Scientific",
  precision: 6,
  scientificType: "normalized",
 });

 const persistenceUnit: UnitProps = {
  name: "Units.M",
  label: "meter",
  phenomenon: "Units.LENGTH",
 };

 return <FormatPanelV2 formatProps={formatProps} unitsProvider={IModelApp.quantityFormatter.unitsProvider} onFormatChange={setFormatProps} persistenceUnit={persistenceUnit} />;
}
```
