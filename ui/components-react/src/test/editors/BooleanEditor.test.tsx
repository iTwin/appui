/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import sinon from "sinon";
import { BooleanEditor } from "../../components-react/editors/BooleanEditor";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import TestUtils, { MineDataController, userEvent } from "../TestUtils";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";
import type { PrimitiveValue } from "@itwin/appui-abstract";

const testId = "components-checkbox-editor";

describe("<BooleanEditor />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(()=>{
    theUserTo = userEvent.setup();
  });

  it("value 'false' should have the checkbox unchecked", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    render(<BooleanEditor propertyRecord={record} />);
    expect(screen.getByTestId<HTMLInputElement>(testId).checked).to.be.false;
  });

  it("value 'true' should have the checkbox checked", async () => {
    const record = TestUtils.createBooleanProperty("Test", true);
    render(<BooleanEditor propertyRecord={record} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).checked).to.be.true;
  });

  it("isDisabled should have the checkbox disabled", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    record.isDisabled = true;
    render(<BooleanEditor propertyRecord={record} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).disabled).to.be.true;
  });

  it("toggling the checkbox should updates boolean value", async () => {
    const record = TestUtils.createBooleanProperty("Test1", false);
    const spyOnCommit = sinon.spy();
    render(<BooleanEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByTestId(testId));
    expect(screen.getByTestId<HTMLInputElement>(testId).checked).to.be.true;
    expect(spyOnCommit).to.have.been.calledWith(sinon.match({newValue: sinon.match({value: true})}));
    spyOnCommit.resetHistory();

    await theUserTo.click(screen.getByTestId(testId));
    expect(screen.getByTestId<HTMLInputElement>(testId).checked).to.be.false;
    expect(spyOnCommit).to.have.been.calledWith(sinon.match({newValue: sinon.match({value: false})}));
  });

  it("onCommit should be called for Space", async () => {
    const propertyRecord = TestUtils.createBooleanProperty("Test2", false);
    const spyOnCommit = sinon.spy();
    render(<EditorContainer propertyRecord={propertyRecord} title="abc" onCommit={spyOnCommit} onCancel={() => { }} />);

    screen.getByTestId(testId).focus();
    await theUserTo.keyboard(" ");

    expect(spyOnCommit).to.have.been.calledOnceWith(sinon.match({newValue: sinon.match({value: true})}));
  });

  it("new props update checkbox state", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    const {rerender} = render(<BooleanEditor propertyRecord={record} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).checked).to.be.false;

    const newRecord = TestUtils.createBooleanProperty("Test", true);
    rerender(<BooleanEditor propertyRecord={newRecord} />);

    expect(screen.getByTestId<HTMLInputElement>(testId).checked).to.be.true;
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createBooleanProperty("Test2", false);
    propertyRecord.property.dataController = "myData";

    const spyOnCommit = sinon.spy();
    render(<EditorContainer propertyRecord={propertyRecord} title="abc" onCommit={spyOnCommit} onCancel={() => { }} />);

    await theUserTo.click(screen.getByTestId(testId));

    expect(spyOnCommit.calledOnce).to.be.false;

    PropertyEditorManager.deregisterDataController("myData");
  });

  it("implements TypeEditor", async () => {
    const record = TestUtils.createBooleanProperty("Test", false);
    const ref = React.createRef<BooleanEditor>();
    render(<BooleanEditor propertyRecord={record} setFocus={true} ref={ref}/>);

    expect((await ref.current?.getPropertyValue() as PrimitiveValue).value).to.be.false;
    expect(ref.current?.hasFocus).to.be.true;
    expect(ref.current?.htmlElement).to.equal(screen.getByRole("checkbox"));
  });
});
