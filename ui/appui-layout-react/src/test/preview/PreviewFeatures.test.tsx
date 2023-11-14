/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeaturesProvider,
  usePreviewFeatures,
} from "../../appui-layout-react";
import { fireEvent, render } from "@testing-library/react";
import { expect } from "chai";

describe("PreviewFeatures", () => {
  it("should expose all props as context values, plus `previewState` and `previewDispatch`", () => {
    const testContext: { renderedContext: any } = {
      renderedContext: null,
    };
    function TestComponent() {
      testContext.renderedContext = usePreviewFeatures();
      return <div>Rendered</div>;
    }
    render(
      <PreviewFeaturesProvider contentAlwaysMaxSize randomProp={"randomValue"}>
        <TestComponent />
      </PreviewFeaturesProvider>
    );

    const { previewState, previewDispatch, ...additionalContext } =
      testContext.renderedContext;

    expect(additionalContext).to.deep.equal({
      contentAlwaysMaxSize: true,
      randomProp: "randomValue",
    });
    expect(previewState).to.deep.equal({});
    expect(previewDispatch).to.be.a("function");
  });
  it("should expose `previewDispatch` which updates `previewState`", () => {
    const testContext: { renderedContext: any } = {
      renderedContext: null,
    };
    function TestComponent() {
      testContext.renderedContext = usePreviewFeatures();
      return (
        <button
          onClick={() => {
            testContext.renderedContext.previewDispatch({
              type: "TEST_ACTION",
            });
          }}
        >
          Rendered
        </button>
      );
    }
    render(
      <PreviewFeaturesProvider contentAlwaysMaxSize randomProp={"randomValue"}>
        <TestComponent />
      </PreviewFeaturesProvider>
    );

    expect(testContext.renderedContext.previewState).to.deep.equal({});

    fireEvent.click(document.querySelector("button")!);

    expect(testContext.renderedContext.previewState).to.deep.equal({
      tested: true,
    });
  });
  it("usePreviewFeatures().previewDispatch should not crash if provider is not used.", () => {
    const testContext: { renderedContext: any } = {
      renderedContext: null,
    };
    function TestComponent() {
      testContext.renderedContext = usePreviewFeatures();
      return <div>Rendered</div>;
    }
    render(<TestComponent />);

    const { previewState, previewDispatch } = testContext.renderedContext;

    expect(previewState).to.deep.equal({});
    expect(previewDispatch).to.be.a("function");
    expect(previewDispatch).to.not.throw();
  });
});
