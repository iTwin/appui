/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Input } from "../../core-react/inputs/Input.js";

describe("<Input />", () => {
  it("renders", () => {
    const input = render(<Input />);

    expect(input.container.querySelector("input[type='text']")).toBeTruthy();
  });

  it("renders with 'numeric' type", () => {
    const input = render(<Input type="numeric" />);

    expect(input.container.querySelector("input[type='numeric']")).toBeTruthy();
  });

  it("focus into input with setFocus prop", () => {
    const component = render(<Input setFocus={true} />);
    const input = component.container.querySelector("input[type='text']");

    const element = document.activeElement as HTMLElement;
    expect(element && element === input).toEqual(true);
  });

  it("native key handler passed by props is called", () => {
    const spyOnKeyboardEvent = vi.fn();
    const spyOnSecondKeyboardEvent = vi.fn();

    const component = render(
      <Input setFocus={true} nativeKeyHandler={spyOnKeyboardEvent} />
    );
    const inputNode = component.container.querySelector("input") as HTMLElement;
    expect(inputNode).toBeTruthy();
    fireEvent.keyDown(inputNode, { key: "Enter" });
    component.rerender(
      <Input setFocus={true} nativeKeyHandler={spyOnSecondKeyboardEvent} />
    );
    fireEvent.keyDown(inputNode, { key: "Enter" });
    expect(spyOnKeyboardEvent).toHaveBeenCalledOnce();
    expect(spyOnSecondKeyboardEvent).toHaveBeenCalledOnce();
  });

  it("input element is properly set", () => {
    const inputElementRef = React.createRef<HTMLInputElement>();
    const component = render(<Input setFocus={true} ref={inputElementRef} />);
    const inputNode = component.container.querySelector(
      "input"
    ) as HTMLInputElement;
    expect(inputNode).toBeTruthy();
    fireEvent.keyDown(inputNode, { key: "Enter" });
    expect(inputElementRef.current).toBeTruthy();
    expect(inputNode).toEqual(inputElementRef.current);
  });
});
