/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, render, screen } from "@testing-library/react";
import { MessageCenterFieldSk, MessageManager } from "../../../appui-react.js";
import { userEvent, waitForPosition } from "../../TestUtils.js";
import { Root } from "@stratakit/foundations";
import { ThemeProvider } from "@itwin/itwinui-react";

function setup({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider as={Root} density="dense" theme="dark" colorScheme="dark">
      {children}
    </ThemeProvider>
  );
}

describe(`MessageCenter with Stratakit`, () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    theUserTo = userEvent.setup();

    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vitest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      })),
    });
  });

  it("Message Center should close on outside click", async () => {
    render(
      setup({
        children: (
          <div title="outside">
            <MessageCenterFieldSk />
          </div>
        ),
      })
    );

    await theUserTo.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).to.exist;

    await theUserTo.click(screen.getByTitle("outside"));
    await waitForPosition();

    expect(screen.queryByRole("dialog")).toEqual(null);
  });

  it("Message Center should open on OpenMessageCenterEvent", async () => {
    render(setup({ children: <MessageCenterFieldSk /> }));
    expect(screen.queryByRole("dialog")).toEqual(null);

    act(() => MessageManager.onOpenMessageCenterEvent.emit({}));

    expect(await screen.findByRole("dialog")).to.exist;
  });
});
