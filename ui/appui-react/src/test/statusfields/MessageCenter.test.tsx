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
import { userEvent, waitForPosition } from "../TestUtils";

describe(`MessageCenter`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("Message Center should close on outside click", async () => {
    render(
      <div>
        <span title="outside"></span>
        <StatusBar>
          <MessageCenterField />
        </StatusBar>
      </div>
    );

    expect(screen.queryByRole("dialog")).toEqual(null);

    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).to.exist;

    await theUserTo.click(screen.getByTitle("outside"));
    await waitForPosition();

    expect(screen.queryByRole("dialog")).toEqual(null);
  });

  it("Message Center should open on OpenMessageCenterEvent", async () => {
    render(
      <StatusBar>
        <MessageCenterField />
      </StatusBar>
    );
    expect(screen.queryByRole("dialog")).toEqual(null);
    MessageManager.onOpenMessageCenterEvent.emit({});

    expect(await screen.findByRole("dialog")).to.exist;
  });
});
