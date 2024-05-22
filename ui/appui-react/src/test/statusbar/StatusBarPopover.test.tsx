/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { StatusBarPopover } from "../../appui-react/statusbar/popup/StatusBarPopover";
import userEvent from "@testing-library/user-event";

describe("<StatusBarPopover />", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(async () => {
    user = userEvent.setup();
  });

  it("renders correctly", async () => {
    const { container } = render(
      <StatusBarPopover content={<div data-testId="popover-content" />}>
        <button className="popoverTrigger" />
      </StatusBarPopover>
    );

    expect(container.querySelector(".popoverTrigger")).toBeTruthy();
    await user.click(screen.getByRole("button"));
    expect(screen.queryByTestId("popover-content")).toBeTruthy();
  });

  it("should not close on outside click when closeOnOutsideClick is false", async () => {
    const spyOnVisibleChange = vi.fn();
    render(
      <>
        <div data-testId="outside-div" />
        <StatusBarPopover
          closeOnOutsideClick={false}
          content={<div data-testId="popover-content" />}
          onVisibleChange={spyOnVisibleChange}
        >
          <button data-testId="popover-trigger" />
        </StatusBarPopover>
      </>
    );

    await user.click(screen.getByTestId("popover-trigger"));
    await user.click(screen.getByTestId("outside-div"));

    expect(screen.queryByTestId("popover-content")).toBeTruthy();
    expect(spyOnVisibleChange).toHaveBeenCalledOnce();
  });

  it("should close on click outside when closeOnOutsideClick is true", async () => {
    const spyOnVisibleChange = vi.fn();
    render(
      <>
        <div data-testId="outside-div" />
        <StatusBarPopover
          content={<div data-testId="popover-content" />}
          onVisibleChange={spyOnVisibleChange}
        >
          <button data-testId="popover-trigger" />
        </StatusBarPopover>
      </>
    );

    await user.click(screen.getByTestId("popover-trigger"));
    expect(screen.queryByTestId("popover-content")).toBeTruthy();

    await user.click(screen.getByTestId("outside-div"));

    expect(screen.queryByTestId("popover-content")).toBeFalsy();
    expect(spyOnVisibleChange).toHaveBeenCalledTimes(2);
  });
});
