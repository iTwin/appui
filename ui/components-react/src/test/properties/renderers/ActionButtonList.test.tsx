/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { Orientation } from "@itwin/core-react";
import { render } from "@testing-library/react";
import type { ActionButtonRendererProps } from "../../../components-react.js";
import { ActionButtonList } from "../../../components-react.js";
import TestUtils from "../../TestUtils.js";

describe("ActionButtonList", () => {
  let propertyRecord: PropertyRecord;

  beforeEach(() => {
    propertyRecord = TestUtils.createPrimitiveStringProperty("Label", "Model");
  });

  it("renders action buttons", () => {
    const renderer = (_: ActionButtonRendererProps) => {
      return <div className="custom-action-button">Action button content</div>;
    };

    const actionButtonListRenderer = render(
      <ActionButtonList
        orientation={Orientation.Horizontal}
        property={propertyRecord}
        actionButtonRenderers={[renderer]}
      />
    );

    const listElement = actionButtonListRenderer.container.querySelector(
      ".custom-action-button"
    )!;
    expect(listElement.textContent).toEqual("Action button content");
  });

  it("renders in correct horizontal orientation", () => {
    const renderer = vi.fn();
    const actionButtonListRenderer = render(
      <ActionButtonList
        orientation={Orientation.Horizontal}
        property={propertyRecord}
        actionButtonRenderers={[renderer]}
      />
    );

    expect(
      actionButtonListRenderer.container.children[0].classList.contains(
        "components-property-action-button-list--horizontal"
      )
    ).toEqual(true);
  });

  it("renders in correct vertical orientation", () => {
    const renderer = vi.fn();
    const actionButtonListRenderer = render(
      <ActionButtonList
        orientation={Orientation.Vertical}
        property={propertyRecord}
        actionButtonRenderers={[renderer]}
      />
    );

    expect(
      actionButtonListRenderer.container.children[0].classList.contains(
        "components-property-action-button-list--vertical"
      )
    ).toEqual(true);
  });
});
