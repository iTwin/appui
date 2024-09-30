/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { UnderlinedButton } from "../../core-react/button/UnderlinedButton.js";
import { userEvent } from "@testing-library/user-event";
import { classesFromElement } from "../TestUtils.js";

describe("<UnderlinedButton />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders all props", () => {
    const title = "underlined button";

    render(
      <UnderlinedButton title={title} className={"test-class"}>
        Test text
      </UnderlinedButton>
    );

    expect(classesFromElement(screen.getByTitle(title))).to.include(
      "test-class"
    );
  });

  it("handles onClick", async () => {
    const spyClick = vi.fn();
    const spyActivate = vi.fn();

    render(
      <UnderlinedButton onClick={spyClick} onActivate={spyActivate}>
        Test text
      </UnderlinedButton>
    );

    await theUserTo.click(screen.getByRole("link"));

    expect(spyClick).toHaveBeenCalledOnce();
    expect(spyActivate).toHaveBeenCalledOnce();
  });

  ["[Enter]", "[Space]"].map((pressedKey) => {
    it(`handles onActivate for ${pressedKey} key`, async () => {
      const spyClick = vi.fn();
      const spyActivate = vi.fn();

      render(
        <UnderlinedButton onClick={spyClick} onActivate={spyActivate}>
          Test text
        </UnderlinedButton>
      );
      await theUserTo.tab();
      await theUserTo.type(screen.getByRole("link"), pressedKey, {
        skipClick: true,
      });

      expect(spyClick).not.toBeCalled();
      expect(spyActivate).toHaveBeenCalledOnce();
    });
  });
});
