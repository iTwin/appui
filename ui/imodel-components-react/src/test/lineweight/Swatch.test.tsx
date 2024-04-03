/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { ColorDef } from "@itwin/core-common";
import { fireEvent, render } from "@testing-library/react"; // , waitForElement
import { LineWeightSwatch } from "../../imodel-components-react/lineweight/Swatch";
import { TestUtils } from "../TestUtils";

describe("<LineWeightSwatch />", () => {
  const colorDef = ColorDef.from(255, 0, 0, 255);
  const activeWeight = 3;

  it("should render", () => {
    const renderedComponent = render(
      <LineWeightSwatch colorDef={colorDef} weight={activeWeight} />
    );
    expect(renderedComponent).toBeTruthy();
    const label = renderedComponent.getByText("3");
    expect(label).toBeTruthy();
  });

  it("should render with no label", () => {
    const renderedComponent = render(
      <LineWeightSwatch
        colorDef={colorDef}
        weight={activeWeight}
        hideLabel={true}
      />
    );
    expect(renderedComponent).toBeTruthy();
    const label = renderedComponent.queryByText("3");
    expect(label).to.be.null;
  });

  it("Fire click event to pick weight", async () => {
    const spyOnPick = vi.fn();

    const renderedComponent = render(
      <LineWeightSwatch weight={activeWeight} onClick={spyOnPick} />
    );
    const weightSwatch = renderedComponent.container.firstChild as HTMLElement;
    expect(weightSwatch).not.to.be.null;
    expect(weightSwatch.tagName).toEqual("BUTTON");
    fireEvent.click(weightSwatch);
    await TestUtils.flushAsyncOperations();
    expect(spyOnPick).toHaveBeenCalledOnce();
  });
});
