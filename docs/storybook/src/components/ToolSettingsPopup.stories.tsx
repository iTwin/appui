/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Meta, StoryObj } from "@storybook/react";
import { InitializerDecorator } from "../Decorators";
import {
  DialogItem,
  DialogItemValue,
  DialogLayoutDataProvider,
  DialogPropertyItem,
  DialogPropertySyncItem,
  PropertyChangeResult,
  PropertyChangeStatus,
  PropertyDescription,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import { UiFramework } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";
import { action } from "@storybook/addon-actions";
import { useRef } from "react";

class TestUiDataProvider extends DialogLayoutDataProvider {
  private static _sourcePropertyName = "source";
  private static _getSourceDescription = (): PropertyDescription => {
    return {
      name: TestUiDataProvider._sourcePropertyName,
      displayLabel: "Source",
      typename: StandardTypeNames.String,
    };
  };

  private _sourceValue: DialogItemValue = { value: "unknown" };
  private _onUpdate = action("onUpdate");

  public get source(): string {
    return this._sourceValue.value as string;
  }

  public set source(option: string) {
    this._sourceValue.value = option;
  }

  public override applyUiPropertyChange = (
    updatedValue: DialogPropertySyncItem
  ): void => {
    if (updatedValue.propertyName === TestUiDataProvider._sourcePropertyName) {
      this.source = updatedValue.value.value
        ? (updatedValue.value.value as string)
        : "";
      this._onUpdate();
    }
  };

  public override processChangesInUi(
    properties: DialogPropertyItem[]
  ): PropertyChangeResult {
    if (properties.length > 0) {
      for (const prop of properties) {
        this.applyUiPropertyChange(prop);
      }
    }
    return { status: PropertyChangeStatus.Success };
  }

  public override supplyDialogItems(): DialogItem[] | undefined {
    return [
      {
        value: this._sourceValue,
        property: TestUiDataProvider._getSourceDescription(),
        editorPosition: { rowPriority: 1, columnIndex: 1 },
      },
    ];
  }
}

const testDataProvider = new TestUiDataProvider();

const meta = {
  title: "Components/ToolSettingsPopup",
  component: ToolSettingsPopupComponent,
  tags: ["autodocs"],
  decorators: [InitializerDecorator],
  args: {
    dataProvider: testDataProvider,
    location: {
      x: 300,
      y: 200,
    },
    offset: {
      x: 0,
      y: 0,
    },
    placement: "top",
  },
} satisfies Meta<typeof ToolSettingsPopupComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

type OpenToolSettingsPopupProps = Parameters<
  typeof UiFramework.openToolSettingsPopup
>;
interface ToolSettingsPopupComponentProps {
  dataProvider: OpenToolSettingsPopupProps[0];
  location: OpenToolSettingsPopupProps[1];
  offset: OpenToolSettingsPopupProps[2];
  onCancel: OpenToolSettingsPopupProps[3];
  placement: OpenToolSettingsPopupProps[4];
}

function ToolSettingsPopupComponent({
  dataProvider,
  location,
  offset,
  onCancel,
  placement,
}: ToolSettingsPopupComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div id="container-ref" ref={containerRef}>
      <AppUiStory
        onInitialize={async () => {
          UiFramework.openToolSettingsPopup(
            dataProvider,
            location,
            offset,
            onCancel,
            placement,
            containerRef.current!
          );
        }}
      />
    </div>
  );
}

export const EscapeClosesPopup: Story = {
  render: (props) => (
    <ToolSettingsPopupComponent {...props} onCancel={action("onCancel")} />
  ),
};
