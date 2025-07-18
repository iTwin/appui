/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormatType } from "@itwin/core-quantity";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { QuantityFormatPanelV2Story } from "./QuantityFormatPanelV2";

const meta = {
  title: "Components/QuantityFormatPanelV2",
  component: QuantityFormatPanelV2Story,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "A new V2 Format Panel with primary and secondary children structure. Primary children are always visible, secondary children are expandable (default hidden).",
      },
    },
  },
  args: {
    formatProps: {
      type: FormatType.Decimal,
      precision: 4,
      showSignOption: "onlyNegative",
      decimalSeparator: ".",
      thousandSeparator: ",",
      uomSeparator: " ",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
    initialMagnitude: 123.456789,
  },
  argTypes: {
    formatProps: {
      control: { type: "object" },
      description: "Format properties object",
    },
    initialMagnitude: {
      control: { type: "number", step: 0.1 },
      description: "Test magnitude to preview formatting",
    },
  },
} satisfies Meta<typeof QuantityFormatPanelV2Story>;

export default meta;
type Story = StoryObj<typeof QuantityFormatPanelV2Story>;

export const Default: Story = {
  args: {
    formatProps: {
      type: FormatType.Decimal,
      precision: 4,
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
  },
};

export const Decimal: Story = {
  args: {
    formatProps: {
      type: FormatType.Decimal,
      precision: 2,
      thousandSeparator: ",",
      decimalSeparator: ".",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
    initialMagnitude: 12345.6789,
  },
};

export const Scientific: Story = {
  args: {
    formatProps: {
      type: FormatType.Scientific,
      precision: 3,
      scientificType: "normalized",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
    initialMagnitude: 0.000123456,
  },
};

export const ScientificZeroNormalized: Story = {
  args: {
    formatProps: {
      type: FormatType.Scientific,
      precision: 2,
      scientificType: "zeroNormalized",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
    initialMagnitude: 123456.789,
  },
};

export const Fractional: Story = {
  args: {
    formatProps: {
      type: FormatType.Fractional,
      precision: 8, // For fractional, this represents denominator power
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
    initialMagnitude: 12.375, // Should show as 12 3/8
  },
};

export const Station: Story = {
  args: {
    formatProps: {
      type: FormatType.Station,
      precision: 2,
      stationOffsetSize: 2,
      stationSeparator: "+",
      composite: {
        includeZero: true,
        spacer: "",
        units: [{ label: "m", name: "Units.M" }],
      },
    },
    initialMagnitude: 12345.67,
  },
};
