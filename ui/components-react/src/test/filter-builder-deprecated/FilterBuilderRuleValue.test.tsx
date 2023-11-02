/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import * as React from "react";
import sinon from "sinon";
import type { PropertyDescription } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { render, screen, waitFor } from "@testing-library/react";
import { PropertyFilterBuilderRuleValue } from "../../components-react/filter-builder-deprecated/FilterBuilderRuleValue";
import TestUtils, { userEvent } from "../TestUtils";

describe("PropertyFilterBuilderRuleValue", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  const defaultProperty: PropertyDescription = {
    name: "prop",
    displayLabel: "Prop",
    typename: "string",
  };

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  it("renders string value", async () => {
    const { getByDisplayValue } = render(
      <PropertyFilterBuilderRuleValue
        value={{
          valueFormat: PropertyValueFormat.Primitive,
          value: "Test String",
        }}
        property={defaultProperty}
        onChange={() => {}}
      />
    );
    await waitFor(() => getByDisplayValue("Test String"));
  });

  it("renders empty value", () => {
    const { container } = render(
      <PropertyFilterBuilderRuleValue
        property={defaultProperty}
        onChange={() => {}}
      />
    );

    const input = container.querySelector<HTMLInputElement>(".iui-input");
    expect(input).to.not.be.null;

    expect(input?.value).to.be.empty;
  });

  it("calls onChange when value is changed", async () => {
    const spy = sinon.spy();
    render(
      <PropertyFilterBuilderRuleValue
        property={defaultProperty}
        onChange={spy}
      />
    );

    await theUserTo.type(screen.getByRole("textbox"), "test text");
    screen.getByRole("textbox").blur();

    await waitFor(() =>
      expect(spy).to.be.calledWith({
        valueFormat: PropertyValueFormat.Primitive,
        value: "test text",
        displayValue: "test text",
      })
    );
  });
});
