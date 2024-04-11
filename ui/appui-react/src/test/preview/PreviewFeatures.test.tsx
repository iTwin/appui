/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { render } from "@testing-library/react";
import { PreviewFeaturesProvider } from "../../appui-react";
import { usePreviewFeatures } from "../../appui-react/preview/PreviewFeatures";

const knownTestFeatures = {
  contentAlwaysMaxSize: true,
};

describe("PreviewFeatures", () => {
  it("Should Provide features", () => {
    const result = { current: {} };
    function TestComponent() {
      result.current = usePreviewFeatures();
      return null;
    }
    expect(result.current).to.be.empty;
    render(
      <PreviewFeaturesProvider features={knownTestFeatures}>
        <TestComponent />
      </PreviewFeaturesProvider>
    );
    expect(result.current).to.be.deep.equal(knownTestFeatures);
  });

  it("usePreviewFeatures also should work 'outside' of the Provider react tree", () => {
    const { result } = renderHook(() => usePreviewFeatures());
    expect(result.current).to.be.empty;
    render(
      <PreviewFeaturesProvider
        features={knownTestFeatures}
      ></PreviewFeaturesProvider>
    );
    expect(result.current).to.be.deep.equal(knownTestFeatures);
  });

  it("Provider should set preview features only when mounted", () => {
    const { result } = renderHook(() => usePreviewFeatures());
    expect(result.current).to.be.empty;
    const { unmount } = render(
      <PreviewFeaturesProvider
        features={knownTestFeatures}
      ></PreviewFeaturesProvider>
    );
    expect(result.current).to.be.deep.equal(knownTestFeatures);
    unmount();
    expect(result.current).to.be.empty;
  });

  it("should set known preview features only", () => {
    render(
      <PreviewFeaturesProvider
        features={{
          ...knownTestFeatures,
          unknownFeature: true,
        }}
      ></PreviewFeaturesProvider>
    );
    const { result } = renderHook(() => usePreviewFeatures());

    expect(result.current).to.be.eql(knownTestFeatures);
  });
});
