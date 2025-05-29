/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { QuantityFormatStory } from "./QuantityFormatV2";
import { UiFramework } from "@itwin/appui-react";
import { AppUiStory } from "src/AppUiStory";
import { createFrontstage } from "src/Utils";


const StoryDecorator: Decorator = (Story) => {
  return (
    <AppUiStory
      onInitialize={async () => {
        UiFramework.hideToolbar();
      }}
      frontstages={[
        createFrontstage({
          content: (
            <Story />
          ),
        }),
      ]}
    />
  );
};

const meta = {
  title: "Components/QuantityFormatV2",
  component: QuantityFormatStory,
  tags: ["autodocs"],
  decorators: [StoryDecorator],
} satisfies Meta<typeof QuantityFormatStory>;

export default meta;
type Story = StoryObj<typeof QuantityFormatStory>;

export const Default: Story = {
  args: {
    formatSets: [
      {
        name: "imperial",
        label: "Imperial",
        formats: {
          "AecUnits.LENGTH": {
            composite: {
              includeZero: true,
              spacer: "",
              units: [{ "label": "'", "name": "Units.FT" }, { "label": "\"", "name": "Units.IN" }]},
            formatTraits: ["keepSingleZero", "showUnitLabel"],
            precision: 4,
            type: "Decimal",
          },
          "AecUnits.ANGLE": {
            description: "degrees minutes seconds (labeled) 0 decimal places",
            composite: {
              includeZero: true,
              spacer: "",
              units: [{ "label": "°", "name": "Units.ARC_DEG" }, { "label": "'", "name": "Units.ARC_MINUTE" }, { "label": "\"", "name": "Units.ARC_SECOND" }]
            },
            formatTraits: ["keepSingleZero", "showUnitLabel"],
            precision: 2,
            type: "Decimal",
            uomSeparator: ""
          }
        }
      },
      {
        name: "metric",
        label: "Metric",
        formats: {
          "AecUnits.LENGTH": {
            composite: {
              includeZero: true,
              spacer: "",
              units: [{ "label": "m", "name": "Units.M" }]
            },
            formatTraits: ["keepSingleZero", "showUnitLabel"],
            precision: 4,
            type: "Decimal",
            decimalSeparator: "."
          },
          "AecUnits.ANGLE": {
            description: "degrees (labeled) 2 decimal places",
            composite: {
              includeZero: true,
              spacer: "",
              units: [{ "label": "°", "name": "Units.ARC_DEG" }]
            },
            formatTraits: ["keepSingleZero", "showUnitLabel"],
            precision: 2,
            type: "Decimal",
            uomSeparator: ""
          }
        }
      }
    ]
  }
}
