/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import sinon from "sinon";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import type {
  IconEditorParams,
  InputEditorSizeParams,
  Primitives,
  PropertyConverterInfo,
  PropertyDescription,
  PropertyEditorInfo,
  PropertyRecord,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  MessageSeverity,
  PropertyEditorParamTypes,
} from "@itwin/appui-abstract";
import { TextEditor } from "../../components-react/editors/TextEditor";
import TestUtils, {
  childStructure,
  MineDataController,
  styleMatch,
  userEvent,
} from "../TestUtils";
import type { PropertyUpdatedArgs } from "../../components-react/editors/EditorContainer";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import type { AsyncValueProcessingResult } from "../../components-react/editors/PropertyEditorManager";
import {
  DataControllerBase,
  PropertyEditorManager,
} from "../../components-react/editors/PropertyEditorManager";
import {
  StringTypeConverter,
  TypeConverterManager,
} from "../../components-react";

describe("<TextEditor />", () => {
  before(async () => {
    await TestUtils.initializeUiComponents();
  });
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders correctly with style and no record", () => {
    render(<TextEditor style={{ color: "red" }} />);

    expect(screen.getByRole("textbox"))
      .to.satisfy(styleMatch({ color: "red" }))
      .and.to.have.property("value", "");
  });

  it("getValue returns proper value after componentDidMount & setState", async () => {
    const record = TestUtils.createPrimitiveStringProperty("Test", "MyValue");
    render(<TextEditor propertyRecord={record} />);

    await waitFor(() =>
      expect(screen.getByRole("textbox")).to.have.property("value", "MyValue")
    );
  });

  it("should support record.property.converter?.name", async () => {
    class Dasher extends StringTypeConverter {
      public override convertPropertyToString(
        propertyDescription: PropertyDescription,
        value?: Primitives.Value | undefined
      ): string | Promise<string> {
        return super.convertPropertyToString(propertyDescription, `-${value}`);
      }
    }
    TypeConverterManager.registerConverter("string:dasher", Dasher);
    const record = TestUtils.createPrimitiveStringProperty("Test", "MyValue");
    const convertInfo: PropertyConverterInfo = { name: "dasher" };
    record.property.converter = convertInfo;

    render(<TextEditor propertyRecord={record} />);

    await waitFor(() =>
      expect(screen.getByRole("textbox")).to.have.property("value", "-MyValue")
    );
    TypeConverterManager.unregisterConverter("dasher");
  });

  it("HTML input onChange updates value", async () => {
    const record = TestUtils.createPrimitiveStringProperty("Test1", "MyValue");
    render(<TextEditor propertyRecord={record} />);
    await theUserTo.type(
      screen.getByRole("textbox"),
      "[Backspace>7/]The modified value"
    );

    await waitFor(() =>
      expect(screen.getByRole("textbox")).to.have.property(
        "value",
        "The modified value"
      )
    );
  });

  it("new props update display", async () => {
    const record = TestUtils.createPrimitiveStringProperty("Test", "MyValue");
    const { rerender } = render(<TextEditor propertyRecord={record} />);

    const testValue = "MyNewValue";
    const newRecord = TestUtils.createPrimitiveStringProperty(
      "Test",
      testValue
    );
    rerender(<TextEditor propertyRecord={newRecord} />);

    await waitFor(() =>
      expect(screen.getByRole("textbox")).to.have.property(
        "value",
        "MyNewValue"
      )
    );
  });

  it("should support InputEditorSize params", async () => {
    const size = 4;
    const maxLength = 60;
    const editorInfo: PropertyEditorInfo = {
      params: [
        {
          type: PropertyEditorParamTypes.InputEditorSize,
          size,
          maxLength,
        } as InputEditorSizeParams,
      ],
    };

    const record = TestUtils.createPrimitiveStringProperty(
      "Test",
      "MyValue",
      "Test",
      editorInfo
    );
    render(<TextEditor propertyRecord={record} />);

    await waitFor(() =>
      expect(screen.getByRole("textbox"))
        .to.satisfy(styleMatch({ minWidth: "3em" }))
        .and.to.have.property("maxLength", 60)
    );
  });

  it("should support IconEditor params", async () => {
    const iconSpec = "icon-placeholder";
    const editorInfo: PropertyEditorInfo = {
      params: [
        {
          type: PropertyEditorParamTypes.Icon,
          definition: { iconSpec },
        } as IconEditorParams,
      ],
    };

    const record = TestUtils.createPrimitiveStringProperty(
      "Test",
      "MyValue",
      "Test",
      editorInfo
    );
    const { container } = render(<TextEditor propertyRecord={record} />);

    await waitFor(() =>
      expect(container).to.satisfy(childStructure(".icon.icon-placeholder"))
    );
  });

  it("should call onCommit for Enter", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "Test",
      "MyValue"
    );
    const convertInfo: PropertyConverterInfo = { name: "" };
    propertyRecord.property.converter = convertInfo;

    const spyOnCommit = sinon.spy();
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
    expect(spyOnCommit.calledOnce).to.be.true;
  });

  it("should call onCommit after value change when shouldCommitOnChange is true", async () => {
    const propertyRecord = TestUtils.createPrimitiveStringProperty(
      "testName",
      "MyValue"
    );
    const convertInfo: PropertyConverterInfo = { name: "" };
    propertyRecord.property.converter = convertInfo;

    const spyOnCommit = sinon.spy();

    const wrapper = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
        shouldCommitOnChange={true}
      />
    );
    const inputNode = wrapper.container.querySelector("input");
    expect(inputNode).not.to.be.null;

    await theUserTo.type(inputNode!, "a");
    expect(spyOnCommit.called).to.be.true;
  });

  describe("Needs IModelApp", () => {
    before(async () => {
      await TestUtils.initializeUiComponents();
    });

    after(async () => {
      TestUtils.terminateUiComponents();
    });

    it("should not commit if DataController fails to validate", async () => {
      PropertyEditorManager.registerDataController(
        "myData",
        MineDataController
      );
      const propertyRecord = TestUtils.createPrimitiveStringProperty(
        "Test",
        "MyValue"
      );
      const convertInfo: PropertyConverterInfo = { name: "" };
      propertyRecord.property.converter = convertInfo;
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

      fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Enter });
      await TestUtils.flushAsyncOperations();
      expect(spyOnCommit.calledOnce).to.be.false;

      PropertyEditorManager.deregisterDataController("myData");
    });

    class MineDataController2 extends DataControllerBase {
      public override async commitValue(
        _newValue: PropertyValue,
        _record: PropertyRecord
      ): Promise<AsyncValueProcessingResult> {
        return {
          encounteredError: true,
          errorMessage: {
            severity: MessageSeverity.Error,
            briefMessage: "Test",
          },
        };
      }
    }

    it("should not commit if DataController fails to commit", async () => {
      PropertyEditorManager.registerDataController(
        "myData",
        MineDataController2
      );
      const propertyRecord = TestUtils.createPrimitiveStringProperty(
        "Test",
        "MyValue"
      );
      const convertInfo: PropertyConverterInfo = { name: "" };
      propertyRecord.property.converter = convertInfo;
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

      fireEvent.keyDown(inputNode as HTMLElement, { key: Key.Enter });
      await TestUtils.flushAsyncOperations();
      expect(spyOnCommit.calledOnce).to.be.false;

      PropertyEditorManager.deregisterDataController("myData");
    });
  });
});
