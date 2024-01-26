/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import {
  PreviewLayoutFeaturesProvider,
  usePreviewFeatures,
} from "../../../appui-react/layout/preview/PreviewFeatures";

describe("PreviewFeatures", () => {
  it("should expose all props as context values", () => {
    const testContext: { renderedContext: any } = {
      renderedContext: null,
    };
    function TestComponent() {
      testContext.renderedContext = usePreviewFeatures();
      return <div>Rendered</div>;
    }
    render(
      <PreviewLayoutFeaturesProvider
        contentAlwaysMaxSize
        randomProp={"randomValue"}
      >
        <TestComponent />
      </PreviewLayoutFeaturesProvider>
    );

    expect(testContext.renderedContext).to.deep.equal({
      contentAlwaysMaxSize: true,
      randomProp: "randomValue",
    });
  });
});
