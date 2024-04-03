/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  MessageCenterField,
  MessageManager,
  StatusBar,
} from "../../appui-react";
import { userEvent } from "../TestUtils";

describe(`MessageCenter`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("Message Center should close on outside click", async () => {
    render(
      <div title="outside">
        <StatusBar>
          <MessageCenterField />
        </StatusBar>
      </div>
    );
    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByRole("tablist")).to.exist;

    await theUserTo.click(screen.getByTitle("outside"));

    expect(screen.queryByRole("tablist")).toEqual(null);
  });

  it("Message Center should open on OpenMessageCenterEvent", async () => {
    render(
      <StatusBar>
        <MessageCenterField />
      </StatusBar>
    );
    expect(screen.queryByRole("tablist")).toEqual(null);
    MessageManager.onOpenMessageCenterEvent.emit({});
    expect(await screen.findByRole("tablist")).to.exist;
  });
});
