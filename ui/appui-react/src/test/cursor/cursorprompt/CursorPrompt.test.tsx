/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ToolAssistance } from "@itwin/core-frontend";
import { RelativePosition } from "@itwin/appui-abstract";
import { Point } from "@itwin/core-react";
import { CursorInformation } from "../../../appui-react/cursor/CursorInformation";
import { CursorPopup } from "../../../appui-react/cursor/cursorpopup/CursorPopup";
import {
  CursorPopupManager,
  CursorPopupRenderer,
} from "../../../appui-react/cursor/cursorpopup/CursorPopupManager";
import { CursorPrompt } from "../../../appui-react/cursor/cursorprompt/CursorPrompt";
import { selectorMatches } from "../../TestUtils";
import { render, screen, waitFor } from "@testing-library/react";

describe("CursorPrompt", () => {
  beforeEach(() => {
    CursorPopupManager.clearPopups();
  });

  it("should display", async () => {
    render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const cursorPrompt = new CursorPrompt(20, false);
    cursorPrompt.display(
      "icon-placeholder",
      ToolAssistance.createInstruction("icon-placeholder", "Prompt string")
    );

    expect(CursorPopupManager.popupCount).toEqual(1);
    expect(await screen.findByText("Prompt string")).to.satisfy(
      selectorMatches(".uifw-cursor-prompt *")
    );

    cursorPrompt.close(false);
  });

  // TODO: react 18 upgrade
  it.skip("should display, update and close", async () => {
    const offset = new Point(20, 20);
    const cursor = { x: 6, y: 6 };
    CursorInformation.cursorPosition = cursor;
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { container } = render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);
    CursorPopup.fadeOutTime = 50;

    const cursorPrompt = new CursorPrompt(20, true);
    cursorPrompt.display(
      "icon-placeholder",
      ToolAssistance.createInstruction("icon-placeholder", "Prompt string"),
      offset,
      RelativePosition.BottomRight
    );

    expect(CursorPopupManager.popupCount).toEqual(1);
    expect(await screen.findByText("Prompt string")).to.satisfy(
      selectorMatches(".uifw-cursor-prompt *")
    );

    const styleForOffset = {
      top: `${offset.y + cursor.y}px`,
      left: `${offset.x + cursor.x}px`,
    };
    expect(
      container.querySelector<HTMLElement>(".uifw-cursorpopup")?.style
    ).to.include(styleForOffset);

    const move = new Point(50, 60);
    CursorInformation.handleMouseMove(move);
    vi.advanceTimersByTime(0);

    const moved = move.offset(offset);
    const styleForMoved = { top: `${moved.y}px`, left: `${moved.x}px` };
    await waitFor(() => {
      expect(
        container.querySelector<HTMLElement>(".uifw-cursorpopup")?.style
      ).to.include(styleForMoved);
    });

    vi.advanceTimersByTime(40);
    expect(CursorPopupManager.popupCount).toEqual(1);

    vi.advanceTimersByTime(1000);
    expect(CursorPopupManager.popupCount).toEqual(0);
  });

  it("should close if passed a blank instruction", async () => {
    render(<CursorPopupRenderer />);
    expect(CursorPopupManager.popupCount).toEqual(0);

    const cursorPrompt = new CursorPrompt(20, false);
    cursorPrompt.display(
      "icon-placeholder",
      ToolAssistance.createInstruction("icon-placeholder", "Prompt string")
    );

    expect(CursorPopupManager.popupCount).toEqual(1);
    expect(await screen.findByText("Prompt string")).to.satisfy(
      selectorMatches(".uifw-cursor-prompt *")
    );

    cursorPrompt.display(
      "icon-placeholder",
      ToolAssistance.createInstruction("icon-placeholder", "")
    );

    expect(CursorPopupManager.popupCount).toEqual(0);
  });
});
