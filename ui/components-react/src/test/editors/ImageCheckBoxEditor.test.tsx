/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import sinon from "sinon";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import { ImageCheckBoxEditor } from "../../components-react/editors/ImageCheckBoxEditor";
import TestUtils, { MineDataController, userEvent } from "../TestUtils";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";
import { SpecialKey } from "../../components-react/common/KeyboardKey";

describe("<ImageCheckBoxEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders with no record", () => {
    render(<ImageCheckBoxEditor />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).to.be.false;
  });

  it("value 'false' should have checkbox unchecked", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    render(<ImageCheckBoxEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).to.be.false;
  });

  it("value 'false' should have checkbox unchecked", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", true);
    render(<ImageCheckBoxEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).to.be.true;
  });

  it("isDisabled is set by the property record", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    record.isDisabled = true;
    render(<ImageCheckBoxEditor propertyRecord={record} />);

    expect(screen.getByRole<HTMLInputElement>("checkbox").disabled).to.be.true;
  });

  it("toggling the checkbox should updates boolean value", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test1", false);
    const spyOnCommit = sinon.spy();
    render(
      <ImageCheckBoxEditor propertyRecord={record} onCommit={spyOnCommit} />
    );

    await theUserTo.click(screen.getByRole("checkbox"));

    expect(spyOnCommit).to.have.been.called;
  });

  it("onCommit should be called for Space", async () => {
    const propertyRecord = TestUtils.createImageCheckBoxProperty(
      "Test2",
      false
    );
    const spyOnCommit = sinon.spy();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    await theUserTo.click(screen.getByRole("checkbox"));

    expect(spyOnCommit).to.have.been.calledWith(
      sinon.match({ newValue: sinon.match({ value: true }) })
    );
  });

  it("new props update checkbox state", async () => {
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    const { rerender } = render(
      <ImageCheckBoxEditor propertyRecord={record} />
    );
    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).to.be.false;

    const newRecord = TestUtils.createImageCheckBoxProperty("Test", true);
    rerender(<ImageCheckBoxEditor propertyRecord={newRecord} />);
    expect(screen.getByRole<HTMLInputElement>("checkbox").checked).to.be.true;
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const record = TestUtils.createImageCheckBoxProperty("Test", false);
    record.property.dataController = "myData";

    const spyOnCommit = sinon.spy();
    const spyOnCancel = sinon.spy();
    render(
      <EditorContainer
        propertyRecord={record}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={spyOnCancel}
      />
    );

    const inputNode = screen.getByRole("checkbox");

    fireEvent.keyDown(inputNode, { key: SpecialKey.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit.called).to.be.false;

    fireEvent.keyDown(inputNode, { key: SpecialKey.Escape });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCancel.calledOnce).to.be.true;

    PropertyEditorManager.deregisterDataController("myData");
  });
});
