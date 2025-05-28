/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { QuantityFormatStory } from "./QuantityFormatV2";

const meta = {
  title: "Components/QuantityFormatV2",
  component: QuantityFormatStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
} satisfies Meta<typeof QuantityFormatStory>;

export default meta;
type Story = StoryObj<typeof QuantityFormatStory>;

export const Imperial: Story = {
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
          "AecUnits.Angle": {
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
      }
    ]
  }
}
