/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import type {
  BasePropertyEditorParams,
  InputEditorSizeParams,
  RangeEditorParams,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import { NumericInputEditor } from "../../components-react/editors/NumericInputEditor";
import TestUtils, {
  MineDataController,
  styleMatch,
  userEvent,
} from "../TestUtils";
import type { PropertyUpdatedArgs } from "../../components-react/editors/EditorContainer";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";

describe("<NumericInputEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render without record", () => {
    render(<NumericInputEditor />);
    expect(screen.getByRole("textbox")).to.satisfy(
      styleMatch({ minWidth: "6em" })
    );
  });

  it("display record value", async () => {
    const record = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput
    );
    render(<NumericInputEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("123");
  });

  it("HTML input onChange updates value", () => {
    const record = TestUtils.createNumericProperty(
      "Test1",
      5,
      StandardEditorNames.NumericInput
    );

    const component = render(<NumericInputEditor propertyRecord={record} />);
    const input = component.container.querySelector(
      "input"
    ) as HTMLInputElement;
    expect(input.value).toEqual("5");

    const incrementor = component.container.querySelectorAll(
      ".core-number-input-button"
    );
    expect(incrementor.length).toEqual(2);
    fireEvent.click(incrementor[0]);
    expect(input.value).toEqual("6");
  });

  it("new props should update the display", async () => {
    const record = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput
    );
    const { rerender } = render(<NumericInputEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("123");

    const newRecord = TestUtils.createNumericProperty(
      "Test",
      987,
      StandardEditorNames.NumericInput
    );
    rerender(<NumericInputEditor propertyRecord={newRecord} />);

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("987");
  });

  it("should support InputEditorSize params", async () => {
    const size = 4;
    const maxLength = 60;
    const editorParams: BasePropertyEditorParams[] = [];
    const sizeParams: InputEditorSizeParams = {
      type: PropertyEditorParamTypes.InputEditorSize,
      size,
      maxLength,
    };
    editorParams.push(sizeParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput,
      editorParams
    );
    render(<NumericInputEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("textbox"))
      .to.satisfy(styleMatch({ minWidth: "3em" }))
      .and.to.have.property("maxLength", 60);
  });

  it("should support Range Editor Params", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const rangeParams: RangeEditorParams = {
      type: PropertyEditorParamTypes.Range,
      minimum: 1,
      maximum: 100,
      step: 5,
      precision: 2,
    };
    editorParams.push(rangeParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      95,
      StandardEditorNames.NumericInput,
      editorParams
    );
    render(<NumericInputEditor propertyRecord={record} />);

    expect(screen.getByRole("textbox")).to.have.property("value", "95.00");

    const [up, down] = screen.getAllByRole("presentation");
    await theUserTo.click(up);

    expect(screen.getByRole("textbox")).to.have.property("value", "100.00");
    await theUserTo.click(up);

    expect(screen.getByRole("textbox")).to.have.property("value", "100.00");
    await theUserTo.click(down);
    expect(screen.getByRole("textbox")).to.have.property("value", "95.00");
  });

  it("renders editor for 'number' type and 'numeric-input' editor using NumericInputEditor", () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput
    );
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(
      renderedComponent.container.querySelector(
        ".components-numeric-input-editor"
      )
    ).to.not.be.empty;
  });

  it("calls onCommit for Enter", async () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput
    );
    const spyOnCommit = vi.fn();
    function handleCommit(_commit: PropertyUpdatedArgs): void {
      spyOnCommit();
    }
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={handleCommit}
        onCancel={() => {}}
      />
    );
    const inputNode = wrapper.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("calls onCommit on increment click", async () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput
    );
    const spyOnCommit = vi.fn();
    function handleCommit(_commit: PropertyUpdatedArgs): void {
      spyOnCommit();
    }
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={handleCommit}
        onCancel={() => {}}
      />
    );
    const inputNode = wrapper.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    const input = wrapper.container.querySelector("input") as HTMLInputElement;
    const incrementor = wrapper.container.querySelectorAll(
      ".core-number-input-button"
    );
    expect(incrementor.length).toEqual(2);
    fireEvent.click(incrementor[0]);

    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).toHaveBeenCalledOnce();

    expect(input.value).toEqual("124");
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const record = TestUtils.createNumericProperty(
      "Test",
      123,
      StandardEditorNames.NumericInput
    );
    record.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    const spyOnCancel = vi.fn();
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={record}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={spyOnCancel}
      />
    );
    expect(renderedComponent).toBeTruthy();

    const inputNode = renderedComponent.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Escape });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCancel).toHaveBeenCalledOnce();

    PropertyEditorManager.deregisterDataController("myData");
  });
});
