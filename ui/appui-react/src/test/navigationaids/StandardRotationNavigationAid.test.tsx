/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { StandardRotationNavigationAid } from "../../appui-react.js";
import { childStructure, userEvent } from "../TestUtils.js";

describe("StandardRotationNavigationAid", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  // TODO: This only tests that the icons display, not which is displayed. Should be replaced with visual testing.
  describe("<StandardRotationNavigationAid />", () => {
    it("should expand on click and change on item click", async () => {
      render(<StandardRotationNavigationAid />);

      const aid = screen.getByRole("button");
      expect(aid).to.satisfy(childStructure("span.three-d-icon.icon"));
      await theUserTo.click(aid);

      expect(screen.getAllByText(/rotations/)).to.have.lengthOf(8);

      await theUserTo.click(screen.getByText("rotations.bottom"));
      expect(screen.getByRole("button")).to.satisfy(
        childStructure("span.three-d-icon.icon")
      );
    });
  });
});
