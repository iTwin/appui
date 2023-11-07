/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import sinon from "sinon";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import { ToggleEditor } from "../../components-react/editors/ToggleEditor";
import TestUtils, { MineDataController, userEvent } from "../TestUtils";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";
import { SpecialKey } from "@itwin/core-react";

describe("<ToggleEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
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
    const spyOnCommit = sinon.spy();
    render(<ToggleEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByRole("switch"));

    expect(spyOnCommit.calledOnce).to.be.true;
  });

  it("onCommit should be called for Space", async () => {
    const propertyRecord = TestUtils.createBooleanProperty(
      "Test2",
      false,
      "toggle"
    );
    const spyOnCommit = sinon.spy();
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

    expect(spyOnCommit).to.be.calledWith(
      sinon.match({ newValue: sinon.match({ value: true }) })
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

    const spyOnCommit = sinon.spy();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    const inputNode = wrapper.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    fireEvent.keyDown(inputNode as HTMLElement, { key: SpecialKey.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit.calledOnce).to.be.false;

    PropertyEditorManager.deregisterDataController("myData");
  });
});
