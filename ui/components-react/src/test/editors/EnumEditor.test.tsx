/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Key } from "ts-key-enum";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import { EnumEditor } from "../../components-react/editors/EnumEditor";
import TestUtils, {
  MineDataController,
  styleMatch,
  userEvent,
} from "../TestUtils";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";
import { stubScrollIntoView } from "../test-helpers/misc";

describe("<EnumEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  stubScrollIntoView();

  it("render without record", () => {
    render(<EnumEditor style={{ width: 400 }} />);
    expect(screen.getByTestId("components-select-editor")).to.satisfy(
      styleMatch({ width: "400px" })
    );
  });

  it("uses record value", async () => {
    const record = TestUtils.createEnumProperty("Test", 0);
    render(<EnumEditor propertyRecord={record} />);

    await waitFor(() => expect(screen.getByText("Yellow")).to.exist);
  });

  it("HTML select onChange updates string value", async () => {
    const record = TestUtils.createEnumProperty("Test1", "0");
    const spyOnCommit = vi.fn();
    render(<EnumEditor propertyRecord={record} onCommit={spyOnCommit} />);
    await theUserTo.click(
      screen.getByTestId("components-select-editor").firstElementChild!
    );
    await theUserTo.click(screen.getByRole("option", { name: "Green" }));
    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("HTML select onChange updates numeric value", async () => {
    const record = TestUtils.createEnumProperty("Test1", 0);
    const spyOnCommit = vi.fn();
    render(<EnumEditor propertyRecord={record} onCommit={spyOnCommit} />);
    await theUserTo.click(
      screen.getByTestId("components-select-editor").firstElementChild!
    );
    await theUserTo.click(screen.getByRole("option", { name: "Green" }));
    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("onCommit should not be called for escape", async () => {
    const propertyRecord = TestUtils.createEnumProperty("Test", 0);
    const spyOnCommit = vi.fn();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    await TestUtils.flushAsyncOperations();
    const selectNode = wrapper.getByTestId("components-select-editor");
    expect(selectNode).toBeTruthy();

    fireEvent.keyDown(selectNode, { key: Key.Escape });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();
  });

  it("new props updates the display", async () => {
    const record = TestUtils.createEnumProperty("Test", 0);
    const { rerender } = render(<EnumEditor propertyRecord={record} />);
    await waitFor(() => expect(screen.getByText("Yellow")).to.exist);

    const testValue = 1;
    const newRecord = TestUtils.createEnumProperty("Test", testValue);
    rerender(<EnumEditor propertyRecord={newRecord} />);
    await waitFor(() => expect(screen.getByText("Red")).to.exist);
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const record = TestUtils.createEnumProperty("Test", 0);
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

    const selectNode = renderedComponent.getByTestId(
      "components-select-editor"
    );
    expect(selectNode).toBeTruthy();

    fireEvent.blur(selectNode);
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    fireEvent.keyDown(selectNode, { key: Key.Escape });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCancel).toHaveBeenCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });

  it("keyDown should propagate up", async () => {
    const propertyRecord = TestUtils.createEnumProperty("Test", 0);
    const spyParent = vi.fn();
    const wrapper = render(
      <div onKeyDown={spyParent} role="presentation">
        <EditorContainer
          propertyRecord={propertyRecord}
          title="abc"
          onCommit={() => {}}
          onCancel={() => {}}
        />
      </div>
    );
    await TestUtils.flushAsyncOperations();
    const selectNode = wrapper.getByTestId("components-select-editor");
    expect(selectNode).toBeTruthy();

    fireEvent.keyDown(selectNode, { key: Key.PageDown });
    await TestUtils.flushAsyncOperations();
    expect(spyParent).toHaveBeenCalled();
  });
});
