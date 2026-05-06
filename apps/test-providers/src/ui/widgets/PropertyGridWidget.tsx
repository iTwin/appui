/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import {
  IPropertyDataProvider,
  PropertyData,
  PropertyDataChangeEvent,
  VirtualizedPropertyGridWithDataProvider,
} from "@itwin/components-react";

function createPrimitiveRecord(
  name: string,
  label: string,
  value: string | number | boolean
): PropertyRecord {
  const typename =
    typeof value === "number"
      ? "double"
      : typeof value === "boolean"
      ? "boolean"
      : "string";
  return new PropertyRecord(
    { valueFormat: PropertyValueFormat.Primitive, value },
    { typename, name, displayLabel: label }
  );
}

function createPropertyData(): PropertyData {
  return {
    label: createPrimitiveRecord("label", "Label", "Test Property Grid"),
    description: "Sample property data for testing",
    categories: [
      { name: "general", label: "General", expand: true },
      { name: "dimensions", label: "Dimensions", expand: true },
      { name: "metadata", label: "Metadata", expand: false },
    ],
    records: {
      general: [
        createPrimitiveRecord("name", "Name", "Widget A"),
        createPrimitiveRecord("description", "Description", "A test widget"),
        createPrimitiveRecord("active", "Active", true),
      ],
      dimensions: [
        createPrimitiveRecord("width", "Width", 100.5),
        createPrimitiveRecord("height", "Height", 200.75),
        createPrimitiveRecord("depth", "Depth", 50.0),
      ],
      metadata: [
        createPrimitiveRecord("id", "ID", "abc-123"),
        createPrimitiveRecord("created", "Created", "2026-01-15"),
        createPrimitiveRecord("version", "Version", 3),
      ],
    },
  };
}

class PropertyDataProvider implements IPropertyDataProvider {
  private _data: PropertyData;
  public onDataChanged: PropertyDataChangeEvent = new PropertyDataChangeEvent();

  constructor() {
    this._data = createPropertyData();
  }

  public async getData(): Promise<PropertyData> {
    return this._data;
  }
}

export function PropertyGridWidgetComponent() {
  const [dataProvider] = React.useState(() => new PropertyDataProvider());

  return (
    <VirtualizedPropertyGridWithDataProvider
      dataProvider={dataProvider}
      width={300}
      height={300}
    />
  );
}
