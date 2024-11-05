/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Key } from "ts-key-enum";
import type { PrimitiveValue } from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "../../components-react/editors/EditorContainer.js";
import { EditorContainer } from "../../components-react/editors/EditorContainer.js";
import { EnumButtonGroupEditor } from "../../components-react/editors/EnumButtonGroupEditor.js";
import TestUtils, { MineDataController } from "../TestUtils.js";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager.js";

describe("<EnumButtonGroupEditor />", () => {
  it("should render", () => {
    const renderedComponent = render(<EnumButtonGroupEditor setFocus={true} />);
    expect(renderedComponent).toBeTruthy();
  });

  it("editor with buttons renders correctly", async () => {
    const record1 = TestUtils.createEnumProperty("Test", 1);
    const record2 = TestUtils.createEnumProperty("Test", 2);
    TestUtils.addEnumButtonGroupEditorSpecification(record1);
    TestUtils.addEnumButtonGroupEditorSpecification(record2);
    const renderedComponent = render(
      <EnumButtonGroupEditor propertyRecord={record1} />
    );
    renderedComponent.rerender(
      <EnumButtonGroupEditor propertyRecord={record2} />
    );
    expect(renderedComponent).toBeTruthy();
  });

  it("button press updates value and display", async () => {
    const record = TestUtils.createEnumProperty("Test", 0);
    TestUtils.addEnumButtonGroupEditorSpecification(record);

    const originalValue = (record.value as PrimitiveValue).value as number;
    expect(originalValue).toEqual(0);

    const spyOnCommit = vi.fn();
    function handleCommit(commit: PropertyUpdatedArgs): void {
      const newValue = (commit.newValue as PrimitiveValue).value as number;
      expect(newValue).toEqual(2);
      spyOnCommit();
    }

    const renderedComponent = render(
      <EnumButtonGroupEditor propertyRecord={record} onCommit={handleCommit} />
    );
    expect(
      await waitFor(() => renderedComponent.getByTestId("Green"))
    ).toBeTruthy();

    const greenButton = renderedComponent.getByTestId("Green");
    expect(greenButton.tagName).toEqual("BUTTON");
    expect(greenButton.classList.contains("nz-is-active")).toEqual(false);

    fireEvent.click(greenButton);
    await TestUtils.flushAsyncOperations();
    expect(greenButton.classList.contains("nz-is-active")).toEqual(true);
    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("button press updates string value and display", async () => {
    const record = TestUtils.createEnumStringProperty("Test", "red");
    TestUtils.addEnumButtonGroupEditorSpecification(record);

    const originalValue = (record.value as PrimitiveValue).value as string;
    expect(originalValue).toEqual("red");

    const spyOnCommit = vi.fn();
    function handleCommit(commit: PropertyUpdatedArgs): void {
      const newValue = (commit.newValue as PrimitiveValue).value as string;
      expect(newValue).toEqual("green");
      spyOnCommit();
    }

    const renderedComponent = render(
      <EnumButtonGroupEditor propertyRecord={record} onCommit={handleCommit} />
    );
    expect(
      await waitFor(() => renderedComponent.getByTestId("Green"))
    ).toBeTruthy();
    const greenButton = renderedComponent.getByTestId("Green");
    expect(greenButton.tagName).toEqual("BUTTON");
    expect(greenButton.classList.contains("nz-is-active")).toEqual(false);

    fireEvent.click(greenButton);
    await TestUtils.flushAsyncOperations();
    expect(greenButton.classList.contains("nz-is-active")).toEqual(true);
    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("test support for enable/disable button states", async () => {
    const record = TestUtils.createEnumProperty("Test", 0);
    TestUtils.addEnumButtonGroupEditorSpecification(record);

    const renderedComponent = render(
      <EnumButtonGroupEditor propertyRecord={record} />
    );
    expect(
      await waitFor(() => renderedComponent.getByTestId("Blue"))
    ).toBeTruthy();
    const blueButton = renderedComponent.getByTestId("Blue");
    expect(blueButton.tagName).toEqual("BUTTON");
    expect(blueButton.classList.contains("nz-is-disabled")).toEqual(
      !TestUtils.blueEnumValueIsEnabled
    );
    TestUtils.toggleBlueEnumValueEnabled();
    renderedComponent.rerender(
      <EnumButtonGroupEditor propertyRecord={record} />
    );
    await waitFor(() => renderedComponent.getByTestId("Blue"));
    expect(blueButton.classList.contains("nz-is-disabled")).toEqual(
      !TestUtils.blueEnumValueIsEnabled
    );
  });

  it("renders editor for 'enum' type and 'enum-buttongroup' editor", async () => {
    const propertyRecord = TestUtils.createEnumProperty("Test", 1);
    TestUtils.addEnumButtonGroupEditorSpecification(propertyRecord);
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(
      await waitFor(() => renderedComponent.getByTestId("Blue"))
    ).toBeTruthy();
    expect(
      renderedComponent.container.querySelector(
        ".components-enumbuttongroup-editor"
      )
    ).toBeTruthy();
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const record = TestUtils.createEnumStringProperty("Test", "red");
    TestUtils.addEnumButtonGroupEditorSpecification(record);
    record.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={record}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    expect(renderedComponent).toBeTruthy();

    expect(
      await waitFor(() => renderedComponent.getByTestId("Green"))
    ).toBeTruthy();
    const greenButton = renderedComponent.getByTestId("Green");

    fireEvent.keyDown(greenButton, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });
});
