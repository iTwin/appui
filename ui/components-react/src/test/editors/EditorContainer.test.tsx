/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Key } from "ts-key-enum";
import { EditorContainer } from "../../components-react/editors/EditorContainer.js";
import TestUtils, { childStructure, userEvent } from "../TestUtils.js";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<EditorContainer />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
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

  it("calls onCommit for Enter when string value changed", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const spyOnCommit = vi.fn();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    const inputNode = wrapper.container.querySelector("input") as HTMLElement;
    expect(inputNode).toBeTruthy();

    await userEvent.type(inputNode, "Test2");

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Enter}"
    );

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("does not call onCommit for Enter when string value not changed", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
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

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Enter}"
    );

    expect(spyOnCommit).not.toHaveBeenCalled();
  });

  it("calls onCommit for Enter when numerical value changed", async () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test1",
      1,
      "Editor"
    );
    const spyOnCommit = vi.fn();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    const inputNode = wrapper.container.querySelector("input") as HTMLElement;
    expect(inputNode).toBeTruthy();

    await userEvent.type(inputNode, "2");

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Enter}"
    );

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("does not call onCommit for Enter when numerical value not changed", async () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test1",
      1,
      "Editor"
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

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Enter}"
    );

    expect(spyOnCommit).not.toHaveBeenCalled();
  });

  it("calls onCancel for Escape", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const spyOnCancel = vi.fn();
    const spyOnCommit = vi.fn();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={spyOnCancel}
      />
    );

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{Escape}"
    );

    expect(spyOnCancel).toHaveBeenCalledOnce();
    expect(spyOnCommit).not.toHaveBeenCalled();
  });

  it("calls onCancel for Cancel button in popup", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value",
      undefined,
      { name: StandardEditorNames.MultiLine }
    );
    const spyOnCancel = vi.fn();
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

    expect(spyOnCancel).toHaveBeenCalledOnce();
  });

  it("calls onCommit for Tab", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const spyOnCommit = vi.fn();
    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    const inputNode = wrapper.container.querySelector("input") as HTMLElement;
    expect(inputNode).toBeTruthy();

    await userEvent.type(inputNode, "Test2");

    await theUserTo.type(
      screen.getByTestId("components-text-editor"),
      "{tab}",
      { skipAutoClose: true }
    );

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("stopPropagation of other input node events", () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test1",
      "my value"
    );
    const blurSpy = vi.fn();
    const contextSpy = vi.fn();
    const keySpy = vi.fn();
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
    expect(blurSpy).not.toBeCalled();
    fireEvent.contextMenu(testInput);
    expect(contextSpy).not.toBeCalled();
    fireEvent.keyDown(testInput, { key: Key.ArrowLeft });
    expect(keySpy).not.toBeCalled();

    // Sanity: Validating that a similar control would indeed cause these to be triggered.
    const controlInput = screen.getByTestId("test-control-input");
    fireEvent.blur(controlInput);
    expect(blurSpy).toHaveBeenCalled();
    fireEvent.contextMenu(controlInput);
    expect(contextSpy).toHaveBeenCalled();
    fireEvent.keyDown(controlInput, { key: Key.ArrowLeft });
    expect(keySpy).toHaveBeenCalled();
  });
});
