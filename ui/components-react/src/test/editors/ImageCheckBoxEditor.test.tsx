/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import { ImageCheckBoxEditor } from "../../components-react/editors/ImageCheckBoxEditor";
import { userEvent } from "../TestUtils";
import TestUtils, { MineDataController } from "../TestUtils";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";

describe("<ImageCheckBoxEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders with no record", () => {
    render(<ImageCheckBoxEditor />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).toEqual(
      false
    );
  });

  it("value 'false' should have checkbox unchecked", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    render(<ImageCheckBoxEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).toEqual(
      false
    );
  });

  it("value 'false' should have checkbox unchecked", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", true);
    render(<ImageCheckBoxEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).toEqual(
      true
    );
  });

  it("isDisabled is set by the property record", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    record.isDisabled = true;
    render(<ImageCheckBoxEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").disabled).toEqual(
      true
    );
  });

  it("toggling the checkbox should updates boolean value", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test1", false);
    const spyOnCommit = vi.fn();
    render(
      <ImageCheckBoxEditor propertyRecord={record} onCommit={spyOnCommit} />
    );

    await theUserTo.click(screen.getByRole("checkbox"));

    expect(spyOnCommit).toHaveBeenCalled();
  });

  it("onCommit should be called for Space", async () => {
    const propertyRecord = TestUtils.createImageCheckBoxProperty(
      "Test2",
      false
    );
    const spyOnCommit = vi.fn();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    await theUserTo.click(screen.getByRole("checkbox"));

    expect(spyOnCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        newValue: expect.objectContaining({ value: true }),
      })
    );
  });

  it("new props update checkbox state", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    const { rerender } = render(
      <ImageCheckBoxEditor propertyRecord={record} />
    );
    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).toEqual(
      false
    );

    const newRecord = TestUtils.createImageCheckBoxProperty("Test", true);
    rerender(<ImageCheckBoxEditor propertyRecord={newRecord} />);
    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).toEqual(
      true
    );
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    record.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    const spyOnCancel = vi.fn();
    render(
      <EditorContainer
        propertyRecord={record}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={spyOnCancel}
      />
    );

    const inputNode = screen.getByRole("checkbox");

    fireEvent.keyDown(inputNode, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    fireEvent.keyDown(inputNode, { key: Key.Escape });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCancel).toHaveBeenCalledOnce();

    PropertyEditorManager.deregisterDataController("myData");
  });
});
