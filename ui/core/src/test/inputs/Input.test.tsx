/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { expect } from "chai";

import { Input } from "../../ui-core";

describe("<Input />", () => {
  it("renders", () => {
    const checkbox = render(<Input />);

    expect(checkbox.container.querySelector("input[type='text']")).not.to.be.null;
  });

  it("focus into input with setFocus prop", () => {
    const component = render(<Input setFocus={true} />);
    const input = component.container.querySelector("input[type='text']");

    const element = document.activeElement as HTMLElement;
    expect(element && element === input).to.be.true;
  });

});
