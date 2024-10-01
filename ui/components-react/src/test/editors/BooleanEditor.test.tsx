/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BooleanEditor } from "../../components-react/editors/BooleanEditor.js";
import { EditorContainer } from "../../components-react/editors/EditorContainer.js";
import TestUtils, { MineDataController, userEvent } from "../TestUtils.js";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager.js";
import type { PrimitiveValue } from "@itwin/appui-abstract";

const testId = "components-checkbox-editor";

describe("<BooleanEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("value 'false' should have the checkbox unchecked", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    render(<BooleanEditor propertyRecord={record} />);
    expect(screen.getByTestId<HTMLInputElement>(testId).checked).toEqual(false);
  });

  it("value 'true' should have the checkbox checked", async () => {
    const record = TestUtils.createBooleanProperty("Test", true);
    render(<BooleanEditor propertyRecord={record} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).checked).toEqual(true);
  });

  it("isDisabled should have the checkbox disabled", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    record.isDisabled = true;
    render(<BooleanEditor propertyRecord={record} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).disabled).toEqual(true);
  });

  it("toggling the checkbox should updates boolean value", async () => {
    const record = TestUtils.createBooleanProperty("Test1", false);
    const spyOnCommit = vi.fn();
    render(<BooleanEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByTestId(testId));
    expect(screen.getByTestId<HTMLInputElement>(testId).checked).toEqual(true);
    expect(spyOnCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        newValue: expect.objectContaining({ value: true }),
      })
    );
    spyOnCommit.mockReset();

    await theUserTo.click(screen.getByTestId(testId));
    expect(screen.getByTestId<HTMLInputElement>(testId).checked).toEqual(false);
    expect(spyOnCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        newValue: expect.objectContaining({ value: false }),
      })
    );
  });

  it("onCommit should be called for Space", async () => {
    const propertyRecord = TestUtils.createBooleanProperty("Test2", false);
    const spyOnCommit = vi.fn();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    screen.getByTestId(testId).focus();
    await theUserTo.keyboard(" ");

    expect(spyOnCommit).toHaveBeenCalledOnce();
    expect(spyOnCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        newValue: expect.objectContaining({ value: true }),
      })
    );
  });

  it("new props update checkbox state", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    const { rerender } = render(<BooleanEditor propertyRecord={record} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).checked).toEqual(false);

    const newRecord = TestUtils.createBooleanProperty("Test", true);
    rerender(<BooleanEditor propertyRecord={newRecord} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).checked).toEqual(true);
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createBooleanProperty("Test2", false);
    propertyRecord.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    await theUserTo.click(screen.getByTestId(testId));

    expect(spyOnCommit).not.toBeCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });

  it("implements TypeEditor", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    const ref = React.createRef<BooleanEditor>();
    render(<BooleanEditor propertyRecord={record} setFocus={true} ref={ref} />);

    expect(
      ((await ref.current?.getPropertyValue()) as PrimitiveValue).value
    ).toEqual(false);
    expect(ref.current?.hasFocus).toEqual(true);
    expect(ref.current?.htmlElement).to.equal(screen.getByRole("checkbox"));
  });
});
