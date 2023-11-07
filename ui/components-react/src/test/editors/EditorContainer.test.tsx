/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import sinon from "sinon";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import TestUtils, { childStructure, userEvent } from "../TestUtils";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { fireEvent, render, screen } from "@testing-library/react";
import { SpecialKey } from "@itwin/core-react";

describe("<EditorContainer />", () => {
  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  it("renders editor for 'text' type using TextEditor", () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
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
      childStructure("input.components-text-editor")
    );
  });

  it("calls onCommit for Enter", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
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

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Enter}"
    );

    sinon.assert.calledOnce(spyOnCommit);
  });

  it("calls onCancel for Escape", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const spyOnCancel = sinon.spy();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={spyOnCancel}
      />
    );

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Escape}"
    );

    sinon.assert.calledOnce(spyOnCancel);
  });

  it("calls onCancel for Cancel button in popup", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value",
      undefined,
      { name: StandardEditorNames.MultiLine }
    );
    const spyOnCancel = sinon.spy();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={spyOnCancel}
      />
    );

    await theUserTo.click(screen.getByRole("button"));
    await theUserTo.click(screen.getByTestId("components-popup-cancel-button"));

    sinon.assert.calledOnce(spyOnCancel);
  });

  it("calls onCommit for Tab", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const spyOnCommit = sinon.spy();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
        ignoreEditorBlur={true}
      />
    );

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{tab}",
      { skipAutoClose: true }
    );

    sinon.assert.calledOnce(spyOnCommit);
  });

  it("stopPropagation of other input node events", () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const blurSpy = sinon.spy();
    const contextSpy = sinon.spy();
    const keySpy = sinon.spy();
    render(
      <div
        onBlur={blurSpy}
        onContextMenu={contextSpy}
        onKeyDown={keySpy}
        role={"button"}
        tabIndex={-1}
      >
        <input data-testid={"test-control-input"} type={"text"}></input>
        <EditorContainer
          propertyRecord={propertyRecord}
          title="abc"
          onCommit={() => {}}
          onCancel={() => {}}
        />
      </div>
    );

    const testInput = screen.getByTestId("components-text-editor");

    fireEvent.blur(testInput);
    expect(blurSpy).to.not.been.called;
    fireEvent.contextMenu(testInput);
    expect(contextSpy).to.not.been.called;
    fireEvent.keyDown(testInput, { key: SpecialKey.ArrowLeft });
    expect(keySpy).to.not.been.called;

    // Sanity: Validating that a similar control would indeed cause these to be triggered.
    const controlInput = screen.getByTestId("test-control-input");
    fireEvent.blur(controlInput);
    expect(blurSpy).to.have.been.called;
    fireEvent.contextMenu(controlInput);
    expect(contextSpy).to.have.been.called;
    fireEvent.keyDown(controlInput, { key: SpecialKey.ArrowLeft });
    expect(keySpy).to.have.been.called;
  });
});
