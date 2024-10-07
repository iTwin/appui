/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import { EditorContainer } from "../../components-react/editors/EditorContainer.js";
import { ToggleEditor } from "../../components-react/editors/ToggleEditor.js";
import TestUtils, { MineDataController, userEvent } from "../TestUtils.js";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager.js";

describe("<ToggleEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    theUserTo = userEvent.setup();
  });

  it("renders correctly it no record", () => {
    render(<ToggleEditor />);

    expect(screen.getByRole("switch")).to.have.property("checked", false);
  });

  it("record set correct value", async () => {
    const record = TestUtils.createBooleanProperty("Test", true, "toggle");
    render(<ToggleEditor propertyRecord={record} />);

    expect(screen.getByRole("switch")).to.have.property("checked", true);
  });

  it("isDisabled is set by the property record", async () => {
    const record = TestUtils.createBooleanProperty("Test", false, "toggle");
    record.isDisabled = true;
    render(<ToggleEditor propertyRecord={record} />);

    expect(screen.getByRole("switch")).to.have.property("disabled", true);
  });

  it("HTML input onChange updates boolean value", async () => {
    const record = TestUtils.createBooleanProperty("Test1", false, "toggle");
    const spyOnCommit = vi.fn();
    render(<ToggleEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByRole("switch"));

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("onCommit should be called for Space", async () => {
    const propertyRecord = TestUtils.createBooleanProperty(
      "Test2",
      false,
      "toggle"
    );
    const spyOnCommit = vi.fn();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
        setFocus={true}
      />
    );

    await theUserTo.keyboard(" ");

    expect(spyOnCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        newValue: expect.objectContaining({ value: true }),
      })
    );
  });

  it("new props update display", async () => {
    const record = TestUtils.createBooleanProperty("Test", false, "toggle");
    const { rerender } = render(<ToggleEditor propertyRecord={record} />);

    const newRecord = TestUtils.createBooleanProperty("Test", true);
    rerender(<ToggleEditor propertyRecord={newRecord} />);
    expect(screen.getByRole("switch")).to.have.property("checked", true);
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createBooleanProperty(
      "Test2",
      false,
      "toggle"
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
    const inputNode = wrapper.container.querySelector("input");
    expect(inputNode).toBeTruthy();

    fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });
});
