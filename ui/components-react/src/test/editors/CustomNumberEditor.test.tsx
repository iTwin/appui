/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Key } from "ts-key-enum";
import type {
  IconEditorParams,
  InputEditorSizeParams,
  PrimitiveValue,
} from "@itwin/appui-abstract";
import { PropertyEditorParamTypes } from "@itwin/appui-abstract";
import { CustomNumberEditor } from "../../components-react/editors/CustomNumberEditor";
import type { PropertyUpdatedArgs } from "../../components-react/editors/EditorContainer";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import TestUtils, {
  childStructure,
  MineDataController,
  styleMatch,
} from "../TestUtils";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";

// cSpell:ignore customnumber

const numVal = 3.345689;
const displayVal = "3.35";
const testId = "components-customnumber-editor";

describe("<CustomNumberEditor />", () => {
  it("renders correctly with style", () => {
    const record = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    render(
      <CustomNumberEditor propertyRecord={record} style={{ color: "red" }} />
    );

    expect(screen.getByTestId(testId))
      .to.satisfy(styleMatch({ color: "red" }))
      .and.to.have.property("value", "3.35");
  });

  it("change input value", () => {
    const record = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    const renderedComponent = render(
      <CustomNumberEditor propertyRecord={record} />
    );
    expect(renderedComponent).toBeTruthy();
    const inputField = renderedComponent.getByTestId(
      testId
    ) as HTMLInputElement;
    expect(inputField.value).toEqual(displayVal);
    const newValue = "7.777";
    fireEvent.change(inputField, { target: { value: newValue } });
    expect(inputField.value).toEqual(newValue);
  });

  it("EditorContainer with CustomNumberPropertyEditor", async () => {
    const spyOnCommit = vi.fn();
    const spyOnCancel = vi.fn();
    const newDisplayValue = "7.78";
    const propertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={spyOnCancel}
      />
    );
    const inputField = renderedComponent.getByTestId(
      testId
    ) as HTMLInputElement;
    expect(inputField.value).toEqual(displayVal);
    const container = renderedComponent.getByTestId(
      "editor-container"
    ) as HTMLSpanElement;

    fireEvent.change(inputField, { target: { value: "zzzz" } });
    expect(inputField.value).toEqual("zzzz");
    fireEvent.keyDown(container, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
    spyOnCommit.mockReset(); // TODO: shouldn't have called spyOnCommit?

    // resetToOriginalValue
    fireEvent.keyDown(inputField, { key: Key.Escape });
    expect(inputField.value).toEqual(displayVal);
    expect(spyOnCancel).not.toBeCalled();

    // since value is same as original, cancel
    fireEvent.keyDown(inputField, { key: Key.Escape });
    expect(inputField.value).toEqual(displayVal);
    expect(spyOnCancel).toHaveBeenCalledOnce();

    const newValue = "7.777";
    fireEvent.change(inputField, { target: { value: newValue } });
    expect(inputField.value).toEqual(newValue);
    fireEvent.keyDown(container, { key: "Enter" });

    await vi.waitFor(() => {
      expect(spyOnCommit).toHaveBeenCalledOnce();
    });

    fireEvent.change(inputField, { target: { value: "zzzz" } });
    expect(inputField.value).toEqual("zzzz");
    fireEvent.keyDown(container, { key: "Enter" });
    await TestUtils.flushAsyncOperations();

    // resetToLastValue
    fireEvent.keyDown(inputField, { key: Key.Escape });
    expect(inputField.value).toEqual(newDisplayValue);
  });

  it("CustomNumberPropertyEditor with undefined initial display value", async () => {
    const spyOnCommit = vi.fn();
    function handleCommit(commit: PropertyUpdatedArgs): void {
      const newNumValue = (commit.newValue as PrimitiveValue).value as number;
      const newDisplayValue = (commit.newValue as PrimitiveValue).displayValue;
      expect(newNumValue).toEqual(7.777);
      expect(newDisplayValue).toEqual("7.78");
      spyOnCommit();
    }

    function handleBadKeyinCommit(commit: PropertyUpdatedArgs): void {
      const newNumValue = (commit.newValue as PrimitiveValue).value as number;
      const newDisplayValue = (commit.newValue as PrimitiveValue).displayValue;
      expect(newNumValue).toEqual(numVal);
      expect(newDisplayValue).toEqual(displayVal);
      spyOnCommit();
    }

    const propertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal
    );
    // add size and width params for testing
    if (
      propertyRecord.property.editor &&
      propertyRecord.property.editor.params
    ) {
      const inputEditorSizeParams: InputEditorSizeParams = {
        type: PropertyEditorParamTypes.InputEditorSize,
        size: 8,
        maxLength: 20,
      };
      propertyRecord.property.editor.params.push(inputEditorSizeParams);
    }
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={handleCommit}
        onCancel={() => {}}
      />
    );
    const inputField = renderedComponent.getByTestId(
      testId
    ) as HTMLInputElement;
    expect(inputField.value).toEqual(displayVal);
    const newValue = "7.777";
    fireEvent.change(inputField, { target: { value: newValue } });
    expect(inputField.value).toEqual(newValue);
    const container = renderedComponent.getByTestId(
      "editor-container"
    ) as HTMLSpanElement;
    fireEvent.keyDown(container, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).toHaveBeenCalledOnce();

    // trigger componentDidUpdate processing
    const newPropertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    renderedComponent.rerender(
      <EditorContainer
        propertyRecord={newPropertyRecord}
        title="abc"
        onCommit={handleBadKeyinCommit}
        onCancel={() => {}}
      />
    );

    // handle bad value processing
    const badValue = "abcd";
    fireEvent.change(inputField, { target: { value: badValue } });
    fireEvent.keyDown(container, { key: "Enter" });
    await TestUtils.flushAsyncOperations(); // make sure handleBadKeyinCommit is processed
  });

  it("EditorContainer with readonly CustomNumberPropertyEditor", async () => {
    const propertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    propertyRecord.isReadonly = true;
    propertyRecord.isDisabled = true;

    const spyOnCommit = vi.fn();

    function handleCommit(commit: PropertyUpdatedArgs): void {
      const newNumValue = (commit.newValue as PrimitiveValue).value as number;
      const newDisplayValue = (commit.newValue as PrimitiveValue).displayValue;
      expect(newNumValue).toEqual(numVal);
      expect(newDisplayValue).toEqual(displayVal);
      spyOnCommit();
    }

    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={handleCommit}
        onCancel={() => {}}
      />
    );
    const inputField = renderedComponent.getByTestId(
      testId
    ) as HTMLInputElement;
    expect(inputField.value).toEqual(displayVal);
    const newValue = "7.777";
    fireEvent.change(inputField, { target: { value: newValue } });
    expect(inputField.value).toEqual(displayVal);
    const container = renderedComponent.getByTestId(
      "editor-container"
    ) as HTMLSpanElement;
    fireEvent.keyDown(container, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).toHaveBeenCalledOnce();
    expect(inputField.value).toEqual(displayVal);
  });

  it("test with no editor params", async () => {
    const propertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    propertyRecord.property.editor!.params!.splice(0, 1);

    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );
    const inputField = renderedComponent.queryByTestId(
      testId
    ) as HTMLInputElement;
    expect(inputField).toEqual(null);
  });

  it("should support IconEditor params", async () => {
    const iconSpec = "icon-placeholder";
    const iconParams: IconEditorParams = {
      type: PropertyEditorParamTypes.Icon,
      definition: { iconSpec },
    };

    const propertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal,
      [iconParams]
    );
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByTestId("editor-container")).to.satisfy(
      childStructure(".icon-placeholder")
    );
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createCustomNumberProperty(
      "FormattedNumber",
      numVal,
      displayVal
    );
    propertyRecord.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    const inputNode = wrapper.queryByTestId(testId) as HTMLInputElement;
    expect(inputNode).toBeTruthy();

    fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });
});
