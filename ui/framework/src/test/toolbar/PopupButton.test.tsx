/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";

import { render, cleanup, fireEvent } from "react-testing-library";
import { expect } from "chai";
import * as sinon from "sinon";
import TestUtils from "../TestUtils";
import {
  PopupButton,
  SyncUiEventDispatcher,
  BaseItemState,
} from "../../ui-framework";

describe("<PopupButton />", async () => {
  afterEach(cleanup);

  it("should render", async () => {
    const renderedComponent = render(<PopupButton iconSpec="icon-arrow-down" label="Popup-Test">
      <div style={{ width: "200px", height: "100px" }}>
        hello world!
      </div>
    </PopupButton>);
    expect(renderedComponent).not.to.be.undefined;
    const popupButton = renderedComponent.getByTitle("Popup-Test");
    expect(popupButton).not.to.be.undefined;
    fireEvent.click(popupButton);
    await TestUtils.flushAsyncOperations();
  });

  it("should render with many props", async () => {
    const renderedComponent = render(<PopupButton iconSpec="icon-arrow-down" labelKey="Sample:test.key" isVisible={true} isEnabled={true} isActive={true} isPressed={true}>
      <div style={{ width: "200px", height: "100px" }}>
        hello world!
      </div>
    </PopupButton>);
    expect(renderedComponent).not.to.be.undefined;
    const popupButton = renderedComponent.getByTitle("test.key");
    expect(popupButton).not.to.be.undefined;
  });

  it("should render with label func", async () => {
    const renderedComponent = render(<PopupButton iconSpec="icon-arrow-down" label={() => "Test Label"}>
      <div style={{ width: "200px", height: "100px" }}>
        hello world!
      </div>
    </PopupButton>);
    expect(renderedComponent).not.to.be.undefined;
    const popupButton = renderedComponent.getByTitle("Test Label");
    expect(popupButton).not.to.be.undefined;
  });

  it("should not render if isVisible is false", async () => {
    const renderedComponent = render(<PopupButton iconSpec="icon-arrow-down" label="Popup-Test" isVisible={false} >
      <div style={{ width: "200px", height: "100px" }}>
        hello world!
      </div>
    </PopupButton>);
    expect(renderedComponent).not.to.be.undefined;
    const popupButton = renderedComponent.queryByTitle("Popup-Test");
    expect(popupButton).to.be.null;
  });

  // Note we can't retrieve info about panel in portal when testing button - I think this is because the portal is managed by the parent toolbar
  let expectedValue = true;

  it("Fire click event to open popup", async () => {
    const spyOnPick = sinon.spy();
    function handleOnExpanded(expand: boolean): void {
      expect(expand).to.equal(expectedValue);
      spyOnPick();
    }

    const renderedComponent = render(<PopupButton iconSpec="icon-arrow-down" label="Popup-Test" onExpanded={handleOnExpanded}>
      <div style={{ width: "200px", height: "100px" }}>
        hello world!
      </div>
    </PopupButton>);

    expect(renderedComponent).not.to.be.undefined;
    const popupButton = renderedComponent.getByTitle("Popup-Test");
    expect(popupButton).not.to.be.undefined;

    expect(popupButton.tagName).to.be.equal("BUTTON");
    fireEvent.click(popupButton);

    await TestUtils.flushAsyncOperations();
    expect(spyOnPick.calledOnce).to.be.true;
    spyOnPick.resetHistory();

    expectedValue = false;
    fireEvent.click(popupButton);

    await TestUtils.flushAsyncOperations();
    expect(spyOnPick.calledOnce).to.be.true;
    spyOnPick.resetHistory();
  });

  it("sync event should trigger stateFunc", () => {
    const testEventId = "test-buttonstate";
    let stateFunctionCalled = false;
    const testStateFunc = (state: Readonly<BaseItemState>): BaseItemState => {
      stateFunctionCalled = true;
      return { ...state, isActive: true };
    };

    const renderedComponent = render(<PopupButton iconSpec="icon-arrow-down" stateSyncIds={[testEventId]} stateFunc={testStateFunc}>
      <div style={{ width: "200px", height: "100px" }}>
        hello world!
      </div>
    </PopupButton>);
    expect(renderedComponent).not.to.be.undefined;
    expect(stateFunctionCalled).to.eq(false);
    SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(testEventId);
    expect(stateFunctionCalled).to.eq(true);
  });

});
