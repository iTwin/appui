/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import React from "react";
import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";
import { expect } from "chai";
import sinon from "sinon";
import { WeightEditor } from "../../ui-components/editors/WeightEditor";
import { PropertyUpdatedArgs } from "../../ui-components/editors/EditorContainer";
import TestUtils from "../TestUtils";
import { PrimitiveValue } from "@bentley/imodeljs-frontend";

describe("<WeightEditor />", () => {
  afterEach(cleanup);

  it("should render", () => {
    const renderedComponent = render(<WeightEditor setFocus={true} />);
    expect(renderedComponent).not.to.be.undefined;
  });

  it("button press should open popup and allow weight selection", async () => {
    const weight1 = 1;
    const weight2 = 3;
    const firstWeightValue = 1;
    const record1 = TestUtils.createWeightProperty("Test", weight1);
    const record2 = TestUtils.createWeightProperty("Test", weight2);

    const originalValue = (record1.value as PrimitiveValue).value as number;
    expect(originalValue).to.be.equal(weight1);

    const renderedComponent = render(<WeightEditor propertyRecord={record1} />);

    const spyOnCommit = sinon.spy();
    function handleCommit(commit: PropertyUpdatedArgs): void {
      const newValue = (commit.newValue as PrimitiveValue).value as number;
      expect(newValue).to.be.equal(firstWeightValue);
      spyOnCommit();
    }

    renderedComponent.rerender(<WeightEditor propertyRecord={record2} onCommit={handleCommit} />);
    const pickerButton = renderedComponent.getByTestId("components-weightpicker-button");
    expect(pickerButton.tagName).to.be.equal("BUTTON");
    fireEvent.click(pickerButton);

    // ====== Example of how to see contents of portal <Popup> component ==========
    // const portalDiv = await waitForElement(() => renderedComponent.getByTestId("core-popup"));
    // expect(portalDiv).not.to.be.undefined;
    // tslint:disable-next-line:no-console
    // console.log(portalDiv.outerHTML);
    // =================================

    const popupDiv = await waitForElement(() => renderedComponent.getByTestId("components-weightpicker-popup-lines"));
    // renderedComponent.debug();  // show content of portal
    expect(popupDiv).not.to.be.undefined;
    if (popupDiv) {
      const firstWeightButton = popupDiv.firstChild as HTMLElement;
      expect(firstWeightButton).not.to.be.undefined;
      fireEvent.click(firstWeightButton);

      // wait for async processing done in WeightEditor._onLineWeightPick method
      await TestUtils.flushAsyncOperations();
      expect(spyOnCommit).to.be.calledOnce;
    }
  });

});
