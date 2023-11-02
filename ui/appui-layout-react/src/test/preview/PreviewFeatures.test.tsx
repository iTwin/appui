/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  PreviewFeaturesProvider,
  usePreviewFeatures,
} from "../../appui-layout-react";
import { render } from "@testing-library/react";
import { expect } from "chai";

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
      <PreviewFeaturesProvider
        panelsAlwaysOverContent
        randomProp={"randomValue"}
      >
        <TestComponent />
      </PreviewFeaturesProvider>
    );

    expect(testContext.renderedContext).to.deep.equal({
      panelsAlwaysOverContent: true,
      randomProp: "randomValue",
    });
  });
});
