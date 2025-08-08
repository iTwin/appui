---
"@itwin/imodel-components-react": minor
---

Enhanced **QuantityFormatPanel** with a redesigned V2 implementation and smart factory method for improved user experience and simplified developer API.

**Key improvements:**

- **Smart Factory Method**: `QuantityFormatPanel` now automatically detects props type and returns the appropriate implementation (V1 legacy or V2 modern)
- **Full Backward Compatibility**: Existing V1 usage continues to work unchanged
- Properties are logically grouped with commonly used options displayed first
- Complex properties are organized under an expandable "Advanced Options" section to reduce cognitive load
- New preview component focuses on unit display formatting rather than unit conversions
- Streamlined props - developers no longer need to manage `persistenceUnit` manually
- Modern accessibility patterns with proper semantic HTML and keyboard navigation

**Usage:**

```tsx
import { QuantityFormatPanel } from "@itwin/imodel-components-react";
import type { FormatProps } from "@itwin/core-quantity";
import { IModelApp } from "@itwin/core-frontend";

// V2 usage (modern) - automatically detected based on props
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

 return <QuantityFormatPanel formatDefinition={formatDefinition} unitsProvider={IModelApp.quantityFormatter.unitsProvider} onFormatChange={handleFormatChange} initialMagnitude={100} />;
}

// V1 usage (legacy) - automatically detected based on props
function LegacyFormatPanel() {
 return <QuantityFormatPanel quantityType="Length" onFormatChange={handleChange} />;
}
```

**V2 QuantityFormatPanel:**

The V2 implementation brings significant improvements to the quantity formatting experience:

**🎨 Enhanced User Interface:**

- **Logical Grouping**: Properties are organized into intuitive sections for better discoverability
- **Progressive Disclosure**: Advanced options are tucked away under an expandable "Advanced Options" section
- **Visual Hierarchy**: Clear visual separation between primary and secondary controls
- **Responsive Layout**: Better layout handling for different container sizes

**⚡ Improved Developer Experience:**

- **Simplified Props**: No need to manually manage `persistenceUnit` - it's handled automatically
- **Better Type Safety**: More precise TypeScript definitions for different format types
- **Cleaner API**: Reduced prop drilling and more intuitive prop names
- **Format-Specific Controls**: UI dynamically adapts based on the selected format type

**♿ Accessibility & Usability:**

- **Semantic HTML**: Proper use of form elements and ARIA attributes
- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Screen Reader Support**: Comprehensive labeling and descriptions
- **Focus Management**: Better focus handling when toggling between sections
